// 根据Stripe产品购买给用户开通课程访问权限
const { PrismaClient } = require('@prisma/client');
const { getCourseByProductId } = require('./product-course-mapping');

const prisma = new PrismaClient();

/**
 * 根据Stripe产品ID给用户开通课程访问权限
 * @param {string} userEmail - 用户邮箱
 * @param {string} stripeProductId - Stripe产品ID
 * @param {string} stripeCustomerId - Stripe客户ID (可选)
 * @param {string} paymentIntentId - 支付意图ID (可选)
 */
async function grantCourseAccessByProduct(userEmail, stripeProductId, stripeCustomerId = null, paymentIntentId = null) {
  try {
    console.log(`开始为用户 ${userEmail} 处理产品 ${stripeProductId} 的课程访问权限...`);
    
    // 1. 根据产品ID获取对应的课程信息
    const courseInfo = getCourseByProductId(stripeProductId);
    if (!courseInfo) {
      throw new Error(`未找到产品ID ${stripeProductId} 对应的课程`);
    }
    
    console.log(`找到对应课程: ${courseInfo.courseName} (${courseInfo.courseId})`);
    
    // 2. 查找用户
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });
    
    if (!user) {
      throw new Error(`未找到邮箱为 ${userEmail} 的用户`);
    }
    
    console.log(`找到用户: ${user.name || user.email} (ID: ${user.id})`);
    
    // 3. 查找课程
    const course = await prisma.course.findUnique({
      where: { courseId: courseInfo.courseId }
    });
    
    if (!course) {
      throw new Error(`未找到课程ID为 ${courseInfo.courseId} 的课程`);
    }
    
    console.log(`找到课程: ${course.title} (ID: ${course.id})`);
    
    // 4. 检查用户是否已经有该课程的访问权限
    const existingAccess = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    });
    
    if (existingAccess) {
      console.log(`用户已经拥有该课程的访问权限，更新购买信息...`);
      
      // 更新现有记录的购买信息
      const updatedAccess = await prisma.userCourse.update({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id
          }
        },
        data: {
          stripeProductId: stripeProductId,
          stripeCustomerId: stripeCustomerId,
          paymentIntentId: paymentIntentId,
          updatedAt: new Date()
        }
      });
      
      console.log(`✅ 成功更新用户课程访问权限`);
      return updatedAccess;
    } else {
      // 5. 创建新的用户课程访问权限记录
      const userCourse = await prisma.userCourse.create({
        data: {
          userId: user.id,
          courseId: course.id,
          stripeProductId: stripeProductId,
          stripeCustomerId: stripeCustomerId,
          paymentIntentId: paymentIntentId,
          enrolledAt: new Date()
        }
      });
      
      console.log(`✅ 成功为用户开通课程访问权限`);
      return userCourse;
    }
    
  } catch (error) {
    console.error(`❌ 开通课程访问权限失败:`, error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * 批量处理多个产品的课程访问权限
 * @param {string} userEmail - 用户邮箱
 * @param {Array} products - 产品列表 [{productId, customerId, paymentIntentId}]
 */
async function grantMultipleCourseAccess(userEmail, products) {
  const results = [];
  
  for (const product of products) {
    try {
      const result = await grantCourseAccessByProduct(
        userEmail, 
        product.productId, 
        product.customerId, 
        product.paymentIntentId
      );
      results.push({ success: true, product: product.productId, result });
    } catch (error) {
      results.push({ success: false, product: product.productId, error: error.message });
    }
  }
  
  return results;
}

// 如果直接运行此脚本，执行测试
if (require.main === module) {
  // 测试示例
  const testUserEmail = 'test@example.com';
  const testProductId = 'prod_Sz6yZ35XCGAKTj'; // AI编程实战营
  
  console.log('=== 测试课程访问权限开通功能 ===\n');
  console.log(`注意: 这是测试模式，请确保用户 ${testUserEmail} 存在于数据库中`);
  console.log(`将为该用户开通产品 ${testProductId} 对应的课程访问权限\n`);
  
  // 取消注释下面的代码来执行实际测试
  // grantCourseAccessByProduct(testUserEmail, testProductId)
  //   .then(result => {
  //     console.log('测试完成:', result);
  //   })
  //   .catch(error => {
  //     console.error('测试失败:', error.message);
  //   });
  
  console.log('如需执行实际测试，请取消注释脚本末尾的测试代码');
}

module.exports = {
  grantCourseAccessByProduct,
  grantMultipleCourseAccess
};