const fs = require('fs');
const path = require('path');

// 测试章节创建功能
async function testChapterCreation() {
  console.log('开始测试章节创建功能...');
  
  try {
    // 测试基础路径
    const COURSE_BASE_PATH = path.join(process.cwd(), 'app/[locale]/(dashboard)/(route)/course');
    console.log('课程基础路径:', COURSE_BASE_PATH);
    console.log('基础路径是否存在:', fs.existsSync(COURSE_BASE_PATH));
    
    // 测试课程目录
    const testCourseId = '11';
    const coursePath = path.join(COURSE_BASE_PATH, testCourseId);
    console.log('课程路径:', coursePath);
    console.log('课程目录是否存在:', fs.existsSync(coursePath));
    
    // 测试metadata.json
    const metadataPath = path.join(coursePath, 'metadata.json');
    console.log('metadata.json路径:', metadataPath);
    console.log('metadata.json是否存在:', fs.existsSync(metadataPath));
    
    if (fs.existsSync(metadataPath)) {
      try {
        const content = fs.readFileSync(metadataPath, 'utf8');
        const metadata = JSON.parse(content);
        console.log('metadata.json读取成功');
        console.log('当前章节数量:', metadata.structure?.chapters?.length || 0);
      } catch (error) {
        console.error('读取metadata.json失败:', error.message);
      }
    }
    
    // 测试新章节创建
    const newChapterNumber = `chapter${Date.now()}`;
    const newChapterPath = path.join(coursePath, newChapterNumber);
    console.log('\n尝试创建新章节:', newChapterNumber);
    console.log('新章节路径:', newChapterPath);
    
    try {
      // 创建章节目录
      if (!fs.existsSync(newChapterPath)) {
        fs.mkdirSync(newChapterPath, { recursive: true });
        console.log('✅ 章节目录创建成功');
        
        // 清理测试目录
        fs.rmSync(newChapterPath, { recursive: true, force: true });
        console.log('✅ 测试目录已清理');
      } else {
        console.log('章节目录已存在');
      }
    } catch (error) {
      console.error('❌ 创建章节目录失败:', error.message);
      console.error('错误详情:', error);
    }
    
    // 测试文件权限
    try {
      const testFile = path.join(coursePath, 'test-permission.txt');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log('✅ 文件写入权限正常');
    } catch (error) {
      console.error('❌ 文件写入权限问题:', error.message);
    }
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error('错误详情:', error);
  }
}

// 运行测试
testChapterCreation().then(() => {
  console.log('\n测试完成');
}).catch(error => {
  console.error('测试失败:', error);
});