// Stripe产品与课程的映射关系
// 当用户购买Stripe产品时，系统会根据此映射给用户开通对应的课程访问权限
// 现在从数据库动态读取映射关系

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 缓存映射关系，避免频繁查询数据库
let cachedMapping = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 从数据库获取产品课程映射
async function loadProductCourseMappingFromDB() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        stripeId: {
          not: null
        }
        // 移除状态限制，允许DRAFT状态的课程也参与映射
      },
      select: {
        courseId: true,
        title: true,
        stripeId: true
      }
    });
    
    const mapping = {};
    courses.forEach(course => {
      mapping[course.stripeId] = {
        courseId: course.courseId,
        courseName: course.title,
        description: course.description || ''
      };
    });
    
    return mapping;
  } catch (error) {
    console.error('Failed to load product-course mapping from database:', error);
    return {};
  }
}

// 获取映射关系（带缓存）
async function getProductCourseMapping() {
  const now = Date.now();
  
  // 检查缓存是否有效
  if (cachedMapping && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedMapping;
  }
  
  // 重新加载映射关系
  cachedMapping = await loadProductCourseMappingFromDB();
  cacheTimestamp = now;
  
  return cachedMapping;
}

// 清除缓存（用于手动刷新）
function clearCache() {
  cachedMapping = null;
  cacheTimestamp = null;
}

// 根据Stripe产品ID获取对应的课程信息
async function getCourseByProductId(productId) {
  const mapping = await getProductCourseMapping();
  return mapping[productId] || null;
}

// 根据课程ID获取对应的Stripe产品ID
async function getProductIdByCourseId(courseId) {
  const mapping = await getProductCourseMapping();
  for (const [productId, courseInfo] of Object.entries(mapping)) {
    if (courseInfo.courseId === courseId) {
      return productId;
    }
  }
  return null;
}

// 获取所有产品课程映射
async function getAllProductCourseMappings() {
  return await getProductCourseMapping();
}

// 验证产品ID是否存在
async function isValidProductId(productId) {
  const mapping = await getProductCourseMapping();
  return productId in mapping;
}

// 验证课程ID是否存在
async function isValidCourseId(courseId) {
  const mapping = await getProductCourseMapping();
  return Object.values(mapping).some(course => course.courseId === courseId);
}

module.exports = {
  getCourseByProductId,
  getProductIdByCourseId,
  getAllProductCourseMappings,
  isValidProductId,
  isValidCourseId,
  getProductCourseMapping,
  clearCache,
  loadProductCourseMappingFromDB
};