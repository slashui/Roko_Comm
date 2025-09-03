# 课程数据迁移指南

本文档描述了如何将课程信息从 `course.json` 文件迁移到数据库中。

## 数据库结构

### 新增的表结构

1. **Course** - 课程表
   - `id`: 主键
   - `title`: 课程标题
   - `description`: 课程描述
   - `createdAt/updatedAt`: 时间戳

2. **Chapter** - 章节表
   - `id`: 主键
   - `chapterNumber`: 章节编号 (如 "chapter1")
   - `title`: 章节标题
   - `description`: 章节描述
   - `status`: 状态 (DRAFT/COMPLETED/PUBLISHED)
   - `requiredRole`: 所需角色 (FREE/PRIME/VIP)
   - `order`: 排序
   - `courseId`: 关联课程

3. **Lesson** - 课时表
   - `id`: 主键
   - `title`: 课时标题
   - `duration`: 时长
   - `url`: 课时链接
   - `previewUrl`: 预览链接
   - `isPreview`: 是否为预览
   - `requiredRole`: 所需角色
   - `videoUrl`: 视频链接
   - `order`: 在章节内的排序
   - `chapterId`: 关联章节

## 迁移步骤

### 1. 数据库更新

```bash
# 生成Prisma客户端（如果遇到权限问题可以跳过）
npx prisma generate

# 推送数据库变更
npx prisma db push
```

### 2. 运行数据迁移脚本

```bash
# 运行迁移脚本将course.json数据导入数据库
node scripts/migrate-course-data.js
```

### 3. 验证数据

```bash
# 启动Prisma Studio查看数据
npx prisma studio
```

## 新增的API接口

### 课程管理

#### 获取课程
- `GET /api/courses` - 获取所有课程
- `GET /api/courses?courseId=xxx` - 获取特定课程

#### 创建课程
- `POST /api/courses`
```json
{
  "title": "课程标题",
  "description": "课程描述"
}
```

#### 获取课程结构（兼容原course.json格式）
- `GET /api/courses/structure` - 获取第一个课程的结构
- `GET /api/courses/structure?courseId=xxx` - 获取特定课程的结构

### 章节管理

#### 获取章节
- `GET /api/chapters` - 获取所有章节
- `GET /api/chapters?courseId=xxx` - 获取课程的所有章节
- `GET /api/chapters?chapterId=xxx` - 获取特定章节

#### 创建章节
- `POST /api/chapters`
```json
{
  "chapterNumber": "chapter1",
  "title": "章节标题",
  "description": "章节描述",
  "status": "COMPLETED",
  "requiredRole": "FREE",
  "order": 1,
  "courseId": "课程ID"
}
```

#### 更新章节
- `PUT /api/chapters`
```json
{
  "id": "章节ID",
  "title": "新标题"
}
```

#### 删除章节
- `DELETE /api/chapters?chapterId=xxx`

### 课时管理

#### 获取课时
- `GET /api/lessons` - 获取所有课时
- `GET /api/lessons?chapterId=xxx` - 获取章节的所有课时
- `GET /api/lessons/[id]` - 获取特定课时
- `GET /api/lessons?slug=xxx` - 获取MDX内容（保持原有功能）

#### 创建课时
- `POST /api/lessons`
```json
{
  "title": "课时标题",
  "duration": "30分钟",
  "url": "/cn/course/chapter1/lesson1",
  "previewUrl": "/cn/demo/lesson1",
  "isPreview": true,
  "requiredRole": "FREE",
  "videoUrl": "视频URL",
  "order": 1,
  "chapterId": "章节ID"
}
```

#### 更新课时
- `PUT /api/lessons/[id]`
```json
{
  "title": "新标题",
  "duration": "45分钟"
}
```

#### 删除课时
- `DELETE /api/lessons/[id]`

## 前端集成建议

### 替换course.json的使用

原来的代码：
```javascript
import courseData from '../public/course.json'
```

替换为：
```javascript
const courseData = await fetch('/api/courses/structure').then(res => res.json())
```

### 角色权限检查

新的数据结构中，每个章节和课时都有 `requiredRole` 字段：
- `FREE` - 免费用户可访问
- `PRIME` - 高级用户可访问  
- `VIP` - VIP用户可访问

### 使用示例

```javascript
// 获取课程结构
const courseStructure = await fetch('/api/courses/structure').then(res => res.json())

// 获取特定章节的课时
const lessons = await fetch('/api/lessons?chapterId=xxx').then(res => res.json())

// 检查用户权限 - 新的平行权限系统
function can_access_lesson(lesson, user_role) {
  // FREE内容所有用户都可以访问
  if (lesson.requiredRole === 'FREE') {
    return true;
  }
  // VIP和PRIME用户各自只能访问对应的内容，不再有包含关系
  return user_role === lesson.requiredRole;
}
```

## 注意事项

1. **数据完整性**：所有章节和课时都需要设置正确的 `order` 字段来保持显示顺序
2. **角色权限**：确保前端正确检查用户角色权限
3. **URL结构**：保持原有的URL结构以兼容现有的路由
4. **向后兼容**：现有的 `/api/lessons?slug=xxx` 接口保持不变，继续支持MDX内容获取

## 故障排除

如果遇到Prisma权限问题，可以手动运行：
```bash
sudo npx prisma generate
```

如果数据迁移失败，检查数据库连接和 `DATABASE_URL` 环境变量配置。