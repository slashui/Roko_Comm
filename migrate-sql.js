const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres.knhmfovfedmbgesxdwnv:Hsnjhmx2025@aws-0-us-east-2.pooler.supabase.com:5432/postgres'
  });

  try {
    console.log('🚀 开始迁移课程数据...');
    await client.connect();
    console.log('✅ 数据库连接成功');
    
    // 读取课程数据
    const courseFilePath = path.join(__dirname, 'public/course.json');
    const courseData = JSON.parse(fs.readFileSync(courseFilePath, 'utf8'));
    
    console.log(`📚 读取到课程: ${courseData.title}`);
    
    // 检查是否已存在数据
    const existingCourse = await client.query('SELECT id FROM "Course" LIMIT 1');
    if (existingCourse.rows.length > 0) {
      console.log('⚠️ 数据库中已存在课程数据');
      const stats = await client.query(`
        SELECT 
          (SELECT COUNT(*) FROM "Course") as courses,
          (SELECT COUNT(*) FROM "Chapter") as chapters,
          (SELECT COUNT(*) FROM "Lesson") as lessons
      `);
      console.log('📊 当前统计:', stats.rows[0]);
      return;
    }
    
    // 开始事务
    await client.query('BEGIN');
    
    // 创建课程
    const courseResult = await client.query(
      'INSERT INTO "Course" (id, title, description, "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, $2, NOW(), NOW()) RETURNING id, title',
      [courseData.title, courseData.description || null]
    );
    
    const course = courseResult.rows[0];
    console.log(`✅ 创建课程: ${course.title}`);
    
    // 角色映射
    const roleMapping = {
      'free': 'FREE',
      'prime': 'PRIME', 
      'vip': 'VIP'
    };
    
    // 状态映射
    const statusMapping = {
      'completed': 'COMPLETED',
      'draft': 'DRAFT',
      'published': 'PUBLISHED'
    };
    
    let createdChapters = 0;
    let createdLessons = 0;
    
    // 创建章节和课时
    for (let i = 0; i < courseData.chapters.length; i++) {
      const chapterData = courseData.chapters[i];
      
      const chapterResult = await client.query(`
        INSERT INTO "Chapter" (
          id, "chapterNumber", title, description, status, "requiredRole", 
          "order", "courseId", "createdAt", "updatedAt"
        ) VALUES (
          gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
        ) RETURNING id, title
      `, [
        chapterData.id,
        chapterData.title,
        chapterData.description,
        statusMapping[chapterData.status?.toLowerCase()] || 'COMPLETED',
        roleMapping[chapterData.requiredRole?.toLowerCase()] || 'FREE',
        i + 1,
        course.id
      ]);
      
      const chapter = chapterResult.rows[0];
      console.log(`  ✅ 章节 ${i + 1}: ${chapter.title}`);
      createdChapters++;
      
      // 创建课时
      for (let j = 0; j < chapterData.lessons.length; j++) {
        const lessonData = chapterData.lessons[j];
        
        await client.query(`
          INSERT INTO "Lesson" (
            id, title, duration, url, "previewUrl", "isPreview", 
            "requiredRole", "videoUrl", "order", "chapterId", "createdAt", "updatedAt"
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
          )
        `, [
          lessonData.title,
          lessonData.duration,
          lessonData.url,
          lessonData.previewUrl || null,
          lessonData.isPreview || false,
          roleMapping[lessonData.requiredRole?.toLowerCase()] || 'FREE',
          lessonData.videoUrl || null,
          j + 1,
          chapter.id
        ]);
        
        console.log(`    ✅ 课时 ${j + 1}: ${lessonData.title}`);
        createdLessons++;
      }
    }
    
    // 提交事务
    await client.query('COMMIT');
    
    // 最终统计
    const finalStats = await client.query(`
      SELECT 
        (SELECT COUNT(*) FROM "Course") as courses,
        (SELECT COUNT(*) FROM "Chapter") as chapters,
        (SELECT COUNT(*) FROM "Lesson") as lessons
    `);
    
    console.log('');
    console.log('🎉 课程数据迁移完成!');
    console.log('📊 最终统计:', finalStats.rows[0]);
    console.log('');
    console.log('✨ 新创建:');
    console.log(`   章节: ${createdChapters}`);
    console.log(`   课时: ${createdLessons}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ 迁移失败:', error.message);
    console.error('详细错误:', error);
  } finally {
    await client.end();
  }
}

// 运行迁移
migrate();