const { PrismaClient } = require('@prisma/client')
const Stripe = require('stripe')

const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function checkProductMappings() {
  try {
    console.log('🔍 检查产品课程映射关系...')
    
    // 1. 检查所有ProductCourseMapping
    console.log('\n1. 检查ProductCourseMapping表:')
    const mappings = await prisma.productCourseMapping.findMany({
      include: {
        course: {
          select: {
            id: true,
            courseId: true,
            title: true,
            stripeId: true,
            status: true
          }
        }
      }
    })
    
    console.log(`找到 ${mappings.length} 个产品课程映射:`)
    for (const mapping of mappings) {
      console.log(`\n映射 ${mappings.indexOf(mapping) + 1}:`)
      console.log(`  Stripe产品ID: ${mapping.stripeProductId}`)
      console.log(`  课程ID: ${mapping.courseId}`)
      console.log(`  课程标识: ${mapping.course.courseId}`)
      console.log(`  课程标题: ${mapping.course.title}`)
      console.log(`  课程Stripe ID: ${mapping.course.stripeId}`)
      console.log(`  课程状态: ${mapping.course.status}`)
      console.log(`  映射是否激活: ${mapping.isActive}`)
      
      // 尝试获取Stripe产品信息
      try {
        const product = await stripe.products.retrieve(mapping.stripeProductId)
        console.log(`  Stripe产品名称: ${product.name}`)
        console.log(`  Stripe产品状态: ${product.active ? '激活' : '未激活'}`)
      } catch (error) {
        console.log(`  ❌ 无法获取Stripe产品信息: ${error.message}`)
      }
    }
    
    // 2. 检查orderlist中的产品ID是否有映射
    console.log('\n2. 检查orderlist中的产品是否有映射:')
    const orders = await prisma.orderlist.findMany()
    
    for (const order of orders) {
      console.log(`\n订单: ${order.id}`)
      console.log(`  邮箱: ${order.email}`)
      console.log(`  产品名称: ${order.productname}`)
      console.log(`  价格ID: ${order.priceid}`)
      
      // 尝试通过价格ID获取产品ID
      try {
        const price = await stripe.prices.retrieve(order.priceid, {
          expand: ['product']
        })
        const productId = price.product.id
        console.log(`  Stripe产品ID: ${productId}`)
        
        // 检查是否有映射
        const mapping = mappings.find(m => m.stripeProductId === productId)
        if (mapping) {
          console.log(`  ✅ 找到映射: ${mapping.course.title}`)
        } else {
          console.log(`  ❌ 没有找到映射关系`)
        }
        
      } catch (error) {
        console.log(`  ❌ 无法获取价格信息: ${error.message}`)
      }
    }
    
    // 3. 检查所有Stripe产品
    console.log('\n3. 检查所有Stripe产品:')
    try {
      const products = await stripe.products.list({ limit: 10 })
      console.log(`找到 ${products.data.length} 个Stripe产品:`)
      
      for (const product of products.data) {
        console.log(`\n产品: ${product.name} (${product.id})`)
        console.log(`  状态: ${product.active ? '激活' : '未激活'}`)
        console.log(`  描述: ${product.description || '无描述'}`)
        
        // 检查是否有映射
        const mapping = mappings.find(m => m.stripeProductId === product.id)
        if (mapping) {
          console.log(`  ✅ 已映射到课程: ${mapping.course.title}`)
        } else {
          console.log(`  ❌ 未映射到任何课程`)
        }
        
        // 获取价格信息
        try {
          const prices = await stripe.prices.list({ product: product.id })
          if (prices.data.length > 0) {
            console.log(`  价格: ${prices.data.map(p => `${p.unit_amount/100} ${p.currency.toUpperCase()} (${p.id})`).join(', ')}`)
          }
        } catch (error) {
          console.log(`  价格信息获取失败: ${error.message}`)
        }
      }
    } catch (error) {
      console.log(`❌ 获取Stripe产品失败: ${error.message}`)
    }
    
    // 4. 总结问题
    console.log('\n🎯 问题分析:')
    if (mappings.length === 0) {
      console.log('❌ 没有找到任何产品课程映射关系')
      console.log('💡 建议: 需要创建ProductCourseMapping来建立Stripe产品和课程的关联')
    } else {
      console.log(`✅ 找到 ${mappings.length} 个映射关系`)
      const activeMappings = mappings.filter(m => m.isActive)
      console.log(`   其中 ${activeMappings.length} 个是激活状态`)
    }
    
    if (orders.length > 0) {
      console.log(`\n📋 orderlist表中有 ${orders.length} 条购买记录`)
      console.log('💡 这些记录可能需要迁移到新的Purchase系统')
    }
    
  } catch (error) {
    console.error('❌ 检查失败:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkProductMappings()