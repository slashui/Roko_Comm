const { PrismaClient } = require('@prisma/client')
const Stripe = require('stripe')

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function createProductMapping() {
  try {
    console.log('创建Stripe产品和课程的映射关系...')
    
    // 获取环境变量中的产品ID
    const productIds = JSON.parse(process.env.STRIPE_PRODUCT_IDS || '[]')
    console.log(`找到 ${productIds.length} 个Stripe产品ID:`, productIds)
    
    if (productIds.length === 0) {
      console.log('❌ 环境变量中没有配置STRIPE_PRODUCT_IDS')
      return
    }
    
    // 获取所有课程
    const courses = await prisma.course.findMany({
      where: {
        status: 'PUBLISHED'
      }
    })
    
    console.log(`找到 ${courses.length} 个已发布的课程`)
    
    if (courses.length === 0) {
      console.log('❌ 数据库中没有已发布的课程')
      return
    }
    
    // 获取Stripe产品信息
    console.log('\n获取Stripe产品信息...')
    for (const productId of productIds) {
      try {
        const product = await stripe.products.retrieve(productId)
        console.log(`产品: ${product.name} (${product.id})`)
        
        // 检查是否已存在映射
        const existingMapping = await prisma.productCourseMapping.findUnique({
          where: { stripeProductId: productId }
        })
        
        if (existingMapping) {
          console.log(`  ⚠️  映射已存在，跳过`)
          continue
        }
        
        // 为第一个课程创建映射（可以根据需要调整逻辑）
        const targetCourse = courses[0] // 简单起见，都映射到第一个课程
        
        const mapping = await prisma.productCourseMapping.create({
          data: {
            stripeProductId: productId,
            courseId: targetCourse.id,
            isActive: true
          }
        })
        
        console.log(`  ✅ 创建映射: ${product.name} -> ${targetCourse.title}`)
        
      } catch (error) {
        console.error(`❌ 处理产品 ${productId} 失败:`, error.message)
      }
    }
    
    // 显示所有映射关系
    console.log('\n=== 当前所有映射关系 ===')
    const allMappings = await prisma.productCourseMapping.findMany({
      include: {
        course: {
          select: {
            title: true,
            courseId: true,
            status: true
          }
        }
      }
    })
    
    for (const mapping of allMappings) {
      try {
        const product = await stripe.products.retrieve(mapping.stripeProductId)
        console.log(`${product.name} (${mapping.stripeProductId}) -> ${mapping.course.title} (${mapping.course.courseId})`)
      } catch (error) {
        console.log(`${mapping.stripeProductId} -> ${mapping.course.title} (${mapping.course.courseId}) [产品信息获取失败]`)
      }
    }
    
    console.log('\n🎉 产品映射创建完成！')
    console.log('现在用户购买Stripe产品后，webhook将自动授权对应的课程访问权限。')
    
  } catch (error) {
    console.error('❌ 创建映射失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createProductMapping()