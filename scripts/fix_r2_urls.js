#!/usr/bin/env node

/**
 * 修复数据库中的R2 URL格式
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fix_r2_urls() {
  console.log('🔧 修复数据库中的R2 URL格式...\n')
  
  try {
    // 查找所有包含materials的课时
    const lessons = await prisma.lesson.findMany({
      where: {
        materials: {
          not: null
        }
      },
      include: {
        chapter: {
          include: {
            course: true
          }
        }
      }
    })
    
    console.log(`📚 找到 ${lessons.length} 个包含课件的课时`)
    
    let updatedCount = 0
    
    for (const lesson of lessons) {
      const materials = lesson.materials || []
      let hasInvalidUrls = false
      
      // 检查是否有错误的URL格式
      const updatedMaterials = materials.map(material => {
        if (material.url && material.url.includes('r2.0e422c62fd0877137d57cead3f42415f.com')) {
          hasInvalidUrls = true
          
          // 提取文件路径部分
          const urlPath = material.url.split('.com/')[1]
          
          // 生成正确的URL格式
          const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
          const r2Domain = process.env.CLOUDFLARE_R2_DOMAIN
          
          let newUrl
          if (r2Domain) {
            // 使用自定义域名
            newUrl = `https://${r2Domain}/${urlPath}`
          } else if (accountId) {
            // 使用R2公共URL
            newUrl = `https://pub-${accountId}.r2.dev/${urlPath}`
          } else {
            // 如果都没有配置，保持原URL但标记为需要修复
            newUrl = material.url
            console.log(`⚠️  无法修复URL，缺少配置: ${material.url}`)
          }
          
          console.log(`🔄 修复URL:`)
          console.log(`   原URL: ${material.url}`)
          console.log(`   新URL: ${newUrl}`)
          
          return {
            ...material,
            url: newUrl,
            fixedAt: new Date().toISOString()
          }
        }
        
        return material
      })
      
      // 如果有需要修复的URL，更新数据库
      if (hasInvalidUrls) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            materials: updatedMaterials,
            updatedAt: new Date()
          }
        })
        
        updatedCount++
        console.log(`✅ 已修复课时: ${lesson.chapter.course.courseId}/${lesson.chapter.chapterNumber}/${lesson.lessonNumber}`)
      }
    }
    
    console.log(`\n🎉 修复完成！更新了 ${updatedCount} 个课时的URL`)
    
    // 显示建议
    console.log('\n💡 建议配置:')
    console.log('1. 在Cloudflare R2中设置自定义域名（推荐）')
    console.log('2. 或者在.env中配置 CLOUDFLARE_R2_DOMAIN=your-domain.com')
    console.log('3. 确保R2 bucket有公共读取权限')
    
  } catch (error) {
    console.error('❌ 修复失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fix_r2_urls()