#!/usr/bin/env node

/**
 * 检查更换Account ID对现有文件的影响
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check_r2_migration_impact() {
  console.log('🔍 检查更换Cloudflare Account ID的影响...\n')
  
  try {
    const currentAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
    console.log(`当前Account ID: ${currentAccountId}`)
    
    // 查找所有包含R2 URL的课时
    const lessonsWithMaterials = await prisma.lesson.findMany({
      where: {
        materials: {
          not: null
        }
      },
      select: {
        id: true,
        title: true,
        materials: true,
        chapter: {
          select: {
            chapterNumber: true,
            course: {
              select: {
                courseId: true,
                title: true
              }
            }
          }
        }
      }
    })
    
    console.log(`\n📚 找到 ${lessonsWithMaterials.length} 个包含课件的课时`)
    
    let totalFiles = 0
    let currentAccountFiles = 0
    let differentAccountFiles = 0
    let invalidUrls = 0
    
    const urlPatterns = {
      oldFormat: 0,      // r2.{accountId}.com 
      newFormat: 0,      // pub-{accountId}.r2.dev
      customDomain: 0,   // 自定义域名
      other: 0
    }
    
    lessonsWithMaterials.forEach(lesson => {
      const materials = lesson.materials || []
      
      materials.forEach(material => {
        totalFiles++
        
        if (!material.url) {
          invalidUrls++
          return
        }
        
        const url = material.url
        
        // 检查URL格式
        if (url.includes('r2.') && url.includes('.com/')) {
          // 旧格式: https://r2.{accountId}.com/
          urlPatterns.oldFormat++
          const urlAccountId = url.match(/r2\.([a-f0-9]+)\.com/)?.[1]
          if (urlAccountId === currentAccountId) {
            currentAccountFiles++
          } else {
            differentAccountFiles++
          }
        } else if (url.includes('pub-') && url.includes('.r2.dev/')) {
          // 新格式: https://pub-{accountId}.r2.dev/
          urlPatterns.newFormat++
          const urlAccountId = url.match(/pub-([a-f0-9]+)\.r2\.dev/)?.[1]
          if (urlAccountId === currentAccountId) {
            currentAccountFiles++
          } else {
            differentAccountFiles++
          }
        } else if (url.startsWith('https://') && !url.includes('r2.dev') && !url.includes('r2.') && !url.includes('.com')) {
          // 自定义域名
          urlPatterns.customDomain++
        } else {
          urlPatterns.other++
        }
        
        console.log(`📁 ${lesson.chapter.course.courseId}/${lesson.chapter.chapterNumber}/${lesson.title}:`)
        console.log(`   文件: ${material.originalName || material.name}`)
        console.log(`   URL: ${url.substring(0, 60)}...`)
      })
    })
    
    console.log('\n📊 统计结果:')
    console.log(`总文件数: ${totalFiles}`)
    console.log(`当前Account ID的文件: ${currentAccountFiles}`)
    console.log(`不同Account ID的文件: ${differentAccountFiles}`)
    console.log(`无效URL: ${invalidUrls}`)
    
    console.log('\n🔗 URL格式分布:')
    console.log(`旧格式 (r2.{id}.com): ${urlPatterns.oldFormat}`)
    console.log(`新格式 (pub-{id}.r2.dev): ${urlPatterns.newFormat}`)
    console.log(`自定义域名: ${urlPatterns.customDomain}`)
    console.log(`其他格式: ${urlPatterns.other}`)
    
    // 给出建议
    console.log('\n💡 更换Account ID的建议:')
    
    if (differentAccountFiles > 0) {
      console.log('⚠️  检测到使用不同Account ID的文件，更换后这些文件可能无法访问')
      console.log('   建议：先迁移现有文件到新Account，或保持当前Account ID')
    }
    
    if (currentAccountFiles > 0) {
      console.log('✅ 现有文件使用当前Account ID，更换前需要考虑迁移')
    }
    
    if (urlPatterns.customDomain > 0) {
      console.log('✅ 使用自定义域名的文件不受Account ID更换影响（推荐）')
    }
    
    console.log('\n🔧 更换Account ID的步骤:')
    console.log('1. 在新Account中创建R2 bucket')
    console.log('2. 迁移现有文件到新bucket（如果需要）')
    console.log('3. 更新 CLOUDFLARE_ACCOUNT_ID 环境变量')
    console.log('4. 更新 CLOUDFLARE_API_TOKEN（新Account的Token）')
    console.log('5. 运行URL修复脚本')
    
  } catch (error) {
    console.error('❌ 检查失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

check_r2_migration_impact()