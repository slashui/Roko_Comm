'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Trash2,
  Edit,
  Check,
  X,
  Upload,
  Video,
  FileVideo,
  BookOpen,
  Settings,
  Info,
  Gift,
  LogOut,
  Users,
  Search,
  UserPlus,
  UserMinus
} from 'lucide-react'
import AdminVideoUploader from '../../../components/AdminVideoUploader'
import AdminMaterialUploader from '../../../components/AdminMaterialUploader'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null) // Can be course, chapter or lesson
  const [expandedChapters, setExpandedChapters] = useState(new Set())
  const [editingItem, setEditingItem] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [mdxContent, setMdxContent] = useState('')
  const [loadingMdx, setLoadingMdx] = useState(false)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingChapter, setEditingChapter] = useState(null)
  const [editingLesson, setEditingLesson] = useState(null)
  const [editName, setEditName] = useState('')
  const [chapterEditData, setChapterEditData] = useState({ showName: '', description: '' })
  const [lessonEditData, setLessonEditData] = useState({})
  
  // 获取当前课时的编辑数据
  const getCurrentLessonData = () => {
    if (!selectedItem) return { showName: '', duration: '', url: '', videoUrl: '', streamId: '', thumbnail: '', materials: [] }
    const lessonKey = `${selectedItem.chapterNumber}-${selectedItem.lessonNumber}`
    return lessonEditData[lessonKey] || { showName: '', duration: '', url: '', videoUrl: '', streamId: '', thumbnail: '', materials: [] }
  }
  
  // 更新当前课时的编辑数据
  const updateCurrentLessonData = (updates) => {
    if (!selectedItem) return
    const lessonKey = `${selectedItem.chapterNumber}-${selectedItem.lessonNumber}`
    setLessonEditData(prev => ({
      ...prev,
      [lessonKey]: {
        ...getCurrentLessonData(),
        ...updates
      }
    }))
  }
  
  // 处理视频上传回调
  const handleVideoUpload = (videoData) => {
    updateCurrentLessonData({
      videoUrl: videoData.videoUrl,
      streamId: videoData.streamId,
      thumbnail: videoData.thumbnail
    })
  }

  // 处理课件上传回调
  const handleMaterialUpload = (materialsData) => {
    updateCurrentLessonData({
      materials: materialsData
    })
  }
  
  // 用户管理相关状态
  const [activeTab, setActiveTab] = useState('courses') // 'courses', 'users', 'invites'
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userSearchEmail, setUserSearchEmail] = useState('')
  const [searchingUser, setSearchingUser] = useState(false)
  const [availableCourses, setAvailableCourses] = useState([]) // 可分配的课程列表
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  
  // 课程编辑器状态
  const [courseEditor, setCourseEditor] = useState({
    title: '',
    description: '',
    price: null,
    category: '',
    status: 'DRAFT',
    createdAt: '',
    updatedAt: '',
    structure: null
  })
  
  // Toast 通知状态
  const [toasts, setToasts] = useState([])
  
  // 软删除确认对话框状态
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: null, // 'course', 'chapter', 'lesson'
    title: '',
    courseId: null,
    chapterNumber: null,
    lessonNumber: null
  })

  // Toast 通知函数
  const showToast = (message, type = 'success') => {
    const id = Date.now()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    // 3秒后自动移除
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  // 搜索用户
  const searchUser = async () => {
    if (!userSearchEmail.trim()) {
      showToast('请输入邮箱地址', 'error')
      return
    }
    
    setSearchingUser(true)
    try {
      const response = await fetch(`/api/admin/users?email=${encodeURIComponent(userSearchEmail.trim())}`)
      
      if (response.ok) {
        const userData = await response.json()
        setSelectedUser(userData)
        showToast('用户查询成功', 'success')
      } else if (response.status === 404) {
        showToast('未找到该用户', 'error')
        setSelectedUser(null)
      } else {
        showToast('查询失败', 'error')
      }
    } catch (error) {
      console.error('Error searching user:', error)
      showToast('查询失败', 'error')
    } finally {
      setSearchingUser(false)
    }
  }

  // 加载可分配的课程列表
  const loadAvailableCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        const coursesData = await response.json()
        setAvailableCourses(coursesData)
      }
    } catch (error) {
      console.error('Error loading available courses:', error)
    }
  }

  // 为用户添加课程
  const addCourseToUser = async (courseId) => {
    if (!selectedUser) return
    
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId })
      })
      
      if (response.ok) {
        // 重新查询用户信息以更新课程列表
        await searchUser()
        setShowAddCourseModal(false)
        showToast('课程添加成功', 'success')
      } else {
        const errorData = await response.json()
        showToast(`添加失败: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Error adding course to user:', error)
      showToast('添加课程失败', 'error')
    }
  }

  // 移除用户的课程
  const removeCourseFromUser = async (courseId) => {
    if (!selectedUser) return
    
    if (!confirm('确定要移除该用户的课程权限吗？')) {
      return
    }
    
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/courses?courseId=${courseId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        // 重新查询用户信息以更新课程列表
        await searchUser()
        showToast('课程移除成功', 'success')
      } else {
        const errorData = await response.json()
        showToast(`移除失败: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Error removing course from user:', error)
      showToast('移除课程失败', 'error')
    }
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // 显示删除确认对话框
  const showDeleteConfirm = (type, title, courseId, chapterNumber = null, lessonNumber = null) => {
    setDeleteConfirm({
      show: true,
      type,
      title,
      courseId,
      chapterNumber,
      lessonNumber
    })
  }

  // 隐藏删除确认对话框
  const hideDeleteConfirm = () => {
    setDeleteConfirm({
      show: false,
      type: null,
      title: '',
      courseId: null,
      chapterNumber: null,
      lessonNumber: null
    })
  }

  // 执行软删除
  const performSoftDelete = async () => {
    if (!deleteConfirm.courseId || !deleteConfirm.type) return

    try {
      const response = await fetch(`/api/courses/${deleteConfirm.courseId}/soft-delete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: deleteConfirm.type,
          chapterNumber: deleteConfirm.chapterNumber,
          lessonNumber: deleteConfirm.lessonNumber
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Soft delete success:', data)
        
        // 隐藏确认对话框
        hideDeleteConfirm()
        
        // 刷新数据
        await updateCoursesData(true)
        
        // 显示成功消息
        let message = ''
        switch (deleteConfirm.type) {
          case 'course':
            message = '课程已删除'
            // 清空选择，因为课程已被删除
            setSelectedCourse(null)
            setSelectedItem(null)
            break
          case 'chapter':
            message = '章节已删除'
            break
          case 'lesson':
            message = '课时已删除'
            break
        }
        showToast(message, 'success')
      } else {
        const errorData = await response.json()
        showToast(`删除失败: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Error performing soft delete:', error)
      showToast('删除失败', 'error')
    }
  }

  // 智能更新课程数据，保持当前选择状态
  const updateCoursesData = async (preserveSelection = true) => {
    const currentCourseId = selectedCourse?.courseId
    const currentExpandedChapters = expandedChapters
    const currentSelectedItem = selectedItem

    try {
      const response = await fetch('/api/courses?includeStructure=true')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
        
        // 如果需要保持选择状态
        if (preserveSelection && currentCourseId) {
          // 找到对应的课程
          const restoredCourse = data.find(course => course.courseId === currentCourseId)
          if (restoredCourse) {
            setSelectedCourse(restoredCourse)
            // 恢复展开的章节
            setExpandedChapters(currentExpandedChapters)
            // 保持选中的项目
            setSelectedItem(currentSelectedItem)
          }
        } else if (data.length > 0 && !selectedCourse) {
          setSelectedCourse(data[0])
          if (data[0].fileSystemStructure?.chapters?.length > 0) {
            setExpandedChapters(new Set([data[0].fileSystemStructure.chapters[0].chapterNumber]))
          }
        }
      }
    } catch (error) {
      console.error('Error updating courses data:', error)
      showToast('刷新数据失败', 'error')
    } finally {
      // 无论成功还是失败，都要设置loading为false
      setLoading(false)
    }
  }

  // 加载课程数据
  useEffect(() => {
    if (status === 'authenticated') {
      updateCoursesData(false)
    }
  }, [status])

  // 当切换到用户管理tab时，加载可分配的课程
  useEffect(() => {
    if (activeTab === 'users') {
      loadAvailableCourses()
    }
  }, [activeTab])

  // 选择项目
  const selectItem = (type, ...args) => {
    if (type === 'course') {
      const [courseId] = args
      const course = courses.find(c => c.courseId === courseId)
      setSelectedItem({ type: 'course', courseId })
      setSelectedCourse(course)
    } else if (type === 'chapter') {
      const [chapterNumber] = args
      const chapter = selectedCourse.fileSystemStructure?.chapters?.find(
        c => c.chapterNumber === chapterNumber
      )
      setSelectedItem({ type: 'chapter', chapterNumber })
      // 设置章节编辑数据
      setChapterEditData({
        showName: chapter?.title || chapter?.showName || chapterNumber || '',
        description: chapter?.description || ''
      })
    } else if (type === 'lesson') {
      const [chapterNumber, lessonNumber] = args
      const chapter = selectedCourse.fileSystemStructure?.chapters?.find(
        c => c.chapterNumber === chapterNumber
      )
      const lesson = chapter?.lessons?.find(l => l.lessonNumber === lessonNumber)
      setSelectedItem({ type: 'lesson', chapterNumber, lessonNumber })
      // 设置课时编辑数据
      const lessonKey = `${chapterNumber}-${lessonNumber}`
      setLessonEditData(prev => ({
        ...prev,
        [lessonKey]: {
          showName: lesson?.title || lesson?.showName || lessonNumber || '',
          duration: lesson?.duration || '30分钟',
          url: lesson?.url || '',
          videoUrl: lesson?.videoUrl || '',
          streamId: lesson?.streamId || '',
          thumbnail: lesson?.thumbnail || '',
          materials: lesson?.materials || []
        }
      }))
      loadLessonContent(chapterNumber, lessonNumber)
    }
  }

  // 加载课时内容
  const loadLessonContent = async (chapterNumber, lessonNumber) => {
    if (!selectedCourse) return
    
    setLoadingMdx(true)
    try {
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/content?chapter=${chapterNumber}&lesson=${lessonNumber}`)
      if (response.ok) {
        const data = await response.json()
        setMdxContent(data.content || '')
      } else {
        showToast('加载课时内容失败', 'error')
      }
    } catch (error) {
      console.error('Error loading lesson content:', error)
      showToast('加载课时内容失败', 'error')
    } finally {
      setLoadingMdx(false)
    }
  }

  // 创建课程
  const createCourse = async (courseData) => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      })

      if (response.ok) {
        const createdCourse = await response.json()
        showToast('课程创建成功！', 'success')
        setShowCourseModal(false)
        await updateCoursesData(false)
        
        // 选择新创建的课程
        const updatedResponse = await fetch('/api/courses?includeStructure=true')
        if (updatedResponse.ok) {
          const updatedCourses = await updatedResponse.json()
          const newCourse = updatedCourses.find(c => c.courseId === createdCourse.courseId)
          setSelectedCourse(newCourse)
          if (newCourse.fileSystemStructure?.chapters?.length > 0) {
            setExpandedChapters(new Set([newCourse.fileSystemStructure.chapters[0].chapterNumber]))
          }
        }
      } else {
        const errorData = await response.json()
        showToast(`创建失败: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Error creating course:', error)
      showToast('创建课程失败', 'error')
    }
  }

  // 保存课程编辑器信息
  const saveCourseEditor = async () => {
    if (!selectedCourse) return
    
    try {
      // 更新数据库中的课程信息
      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse.courseId,
          title: courseEditor.title.trim(),
          description: courseEditor.description.trim(),
          price: courseEditor.price,
          category: courseEditor.category.trim(),
          status: courseEditor.status
        })
      })
      
      if (response.ok) {
        await updateCoursesData(true) // 保持当前选择，更新数据
        showToast('课程信息已保存', 'success')
      } else {
        const errorData = await response.json()
        showToast(`保存失败: ${errorData.error || '未知错误'}`, 'error')
      }
    } catch (error) {
      console.error('Error saving course info:', error)
      showToast('保存失败', 'error')
    }
  }

  // 添加章节
  const addChapter = async () => {
    if (!selectedCourse) return
    
    // 找到最大的章节号，避免冲突
    const chapters = selectedCourse.fileSystemStructure?.chapters || []
    let maxChapterNum = 0
    chapters.forEach(chapter => {
      const match = chapter.chapterNumber.match(/chapter(\d+)/)
      if (match) {
        const num = parseInt(match[1])
        if (num > maxChapterNum) {
          maxChapterNum = num
        }
      }
    })
    const newChapterNumber = `chapter${maxChapterNum + 1}`
    
    try {
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'chapter',
          chapterNumber: newChapterNumber
        })
      })
      
      if (response.ok) {
        showToast('章节添加成功', 'success')
        await updateCoursesData(true)
        setExpandedChapters(prev => new Set([...prev, newChapterNumber]))
      } else {
        showToast('添加章节失败', 'error')
      }
    } catch (error) {
      console.error('Error adding chapter:', error)
      showToast('添加章节失败', 'error')
    }
  }

  // 添加课时
  const addLesson = async (chapterNumber) => {
    if (!selectedCourse) return
    
    const chapter = selectedCourse.fileSystemStructure?.chapters?.find(
      c => c.chapterNumber === chapterNumber
    )
    
    // 找到最大的课时号，避免冲突
    const lessons = chapter?.lessons || []
    let maxLessonNum = 0
    lessons.forEach(lesson => {
      const match = lesson.lessonNumber.match(/lesson(\d+)/)
      if (match) {
        const num = parseInt(match[1])
        if (num > maxLessonNum) {
          maxLessonNum = num
        }
      }
    })
    const newLessonNumber = `lesson${maxLessonNum + 1}`
    
    try {
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lesson',
          chapterNumber,
          lessonNumber: newLessonNumber,
          lessonData: { title: '新课时', duration: '30分钟' }
        })
      })
      
      if (response.ok) {
        showToast('课时添加成功', 'success')
        await updateCoursesData(true)
      } else {
        showToast('添加课时失败', 'error')
      }
    } catch (error) {
      console.error('Error adding lesson:', error)
      showToast('添加课时失败', 'error')
    }
  }

  // 保存章节信息
  const saveChapterInfo = async () => {
    if (!selectedItem || !selectedCourse) return
    
    try {
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/update-chapter`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterNumber: selectedItem.chapterNumber,
          showName: chapterEditData.showName.trim(),
          description: chapterEditData.description.trim()
        })
      })
      
      if (response.ok) {
        await updateCoursesData(true) // 保持当前选择，更新数据
        showToast('章节信息已更新', 'success')
      } else {
        showToast('更新失败', 'error')
      }
    } catch (error) {
      console.error('Error updating chapter info:', error)
      showToast('更新失败', 'error')
    }
  }

  // 保存课时内容
  const save_mdx_content = async (chapterNumber, lessonNumber, content) => {
    if (!selectedCourse) return false
    
    try {
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterNumber,
          lessonNumber,
          content
        })
      })
      
      if (response.ok) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error saving lesson content:', error)
      return false
    }
  }

  // 保存课时信息
  const saveLessonInfo = async () => {
    if (!selectedItem || !selectedCourse) return
    
    try {
      // 首先保存课时信息
      const response = await fetch(`/api/courses/${selectedCourse.courseId}/update-lesson`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterNumber: selectedItem.chapterNumber,
          lessonNumber: selectedItem.lessonNumber,
          showName: getCurrentLessonData().showName.trim(),
        duration: getCurrentLessonData().duration.trim(),
        videoUrl: getCurrentLessonData().videoUrl.trim(),
        streamId: getCurrentLessonData().streamId.trim(),
        thumbnail: getCurrentLessonData().thumbnail.trim(),
        materials: getCurrentLessonData().materials
        })
      })
      
      if (response.ok) {
        // 然后保存MDX内容
        const mdxSuccess = await save_mdx_content(selectedItem.chapterNumber, selectedItem.lessonNumber, mdxContent)
        
        await updateCoursesData(true) // 保持当前选择，更新数据
        
        if (mdxSuccess) {
          showToast('课时信息和内容已保存', 'success')
        } else {
          showToast('课时信息已保存，但内容保存失败', 'error')
        }
      } else {
        showToast('保存失败', 'error')
      }
    } catch (error) {
      console.error('Error saving lesson info:', error)
      showToast('保存失败', 'error')
    }
  }

  // 开始编辑章节名称
  const startEditChapter = (chapterNumber) => {
    setEditingChapter(chapterNumber)
    setEditName(chapterNumber)
  }

  // 开始编辑课时名称
  const startEditLesson = (chapterNumber, lessonNumber) => {
    setEditingLesson(`${chapterNumber}-${lessonNumber}`)
    setEditName(lessonNumber)
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingChapter(null)
    setEditingLesson(null)
    setEditName('')
  }

  // Toast 组件
  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
            toast.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : toast.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 text-pink-800'
          }`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )

  // 课程创建模态框组件
  const CourseModal = () => {
    const [formData, setFormData] = useState({
      courseId: '',
      title: '',
      description: '',
      price: '',
      category: '',
      status: 'DRAFT'
    })

    return showCourseModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">创建新课程</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程ID</label>
              <input
                type="text"
                value={formData.courseId}
                onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="例如: javascript-basic"
                pattern="^[a-z0-9-]+$"
                title="只能包含小写字母、数字和连字符"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="输入课程标题"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows="3"
                placeholder="输入课程描述"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="例如：编程、设计"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCourseModal(false)}
              className="px-4 py-2 border border-pink-200 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => createCourse(formData)}
              disabled={!formData.courseId || !formData.title}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md transition-all duration-300"
            >
              创建课程
            </button>
          </div>
        </div>
      </div>
    ) : null
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">请先登录</p>
        </div>
      </div>
    )
  }

  // 检查用户是否为管理员
  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">您没有权限访问此页面</p>
          <p className="text-sm text-gray-500 mt-2">只有管理员才能访问管理界面</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-pink-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left side - Tab navigation */}
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 text-sm rounded-xl transition-colors ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                  : 'text-gray-600 hover:bg-pink-50'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              课程管理
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 text-sm rounded-xl transition-colors ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                  : 'text-gray-600 hover:bg-pink-50'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              用户管理
            </button>
            <button
              onClick={() => window.location.href = '/cn/invite-codes'}
              className={`px-4 py-2 text-sm rounded-xl transition-colors ${
                activeTab === 'invites'
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Gift className="w-4 h-4 inline mr-2" />
              邀请码管理
            </button>
          </div>
          
          {/* Right side - User info and logout */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">管理员:</span>
              <span className="ml-1">{session?.user?.email || 'admin@example.com'}</span>
            </div>
            <button
              onClick={() => setShowCourseModal(true)}
              className="px-3 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 text-sm flex items-center shadow-md transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              新建课程
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/cn/login' })}
              className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm flex items-center"
            >
              <LogOut className="w-4 h-4 mr-1" />
              退出
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'users' ? (
          // 用户管理界面
          <>
            {/* Left Panel - User Search */}
            <div className="w-1/3 bg-white border-r border-pink-200 overflow-y-auto">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3">用户搜索</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱地址
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        value={userSearchEmail}
                        onChange={(e) => setUserSearchEmail(e.target.value)}
                        placeholder="输入用户邮箱地址"
                        className="flex-1 px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
                        onKeyDown={(e) => e.key === 'Enter' && searchUser()}
                      />
                      <button
                        onClick={searchUser}
                        disabled={searchingUser}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 flex items-center shadow-md transition-all duration-300"
                      >
                        {searchingUser ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Panel - User Details */}
            <div className="w-1/3 bg-white border-r border-pink-200 overflow-y-auto">
              {selectedUser ? (
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-3">用户详情</h2>
                  
                  {/* 用户基本信息 */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-xl mb-4 border border-pink-100">
                    <h3 className="font-medium text-gray-900 mb-2">基本信息</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">姓名:</span>
                        <span className="ml-2 font-medium">{selectedUser.name || '未设置'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">邮箱:</span>
                        <span className="ml-2 font-medium">{selectedUser.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">角色:</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedUser.role === 'ADMIN' 
                            ? 'bg-red-100 text-red-800' 
                            : selectedUser.role === 'VIP'
                            ? 'bg-purple-100 text-purple-800'
                            : selectedUser.role === 'PRIME'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedUser.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">注册时间:</span>
                        <span className="ml-2 text-xs">{new Date(selectedUser.createdAt).toLocaleString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* 用户课程列表 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">拥有课程 ({selectedUser.courses?.length || 0})</h3>
                      <button
                        onClick={() => setShowAddCourseModal(true)}
                        className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 text-sm flex items-center shadow-md transition-all duration-300"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        添加课程
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {selectedUser.courses && selectedUser.courses.length > 0 ? (
                        selectedUser.courses.map((course) => (
                          <div
                            key={course.id}
                            className="p-3 bg-white border border-pink-200 rounded-xl shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900">{course.title}</h4>
                                <p className="text-xs text-gray-600 mt-1">{course.courseId}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    course.status === 'PUBLISHED' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {course.status}
                                  </span>
                                  {course.price && (
                                    <span className="text-xs text-gray-500">¥{course.price}</span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => removeCourseFromUser(course.id)}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-300 hover:scale-110"
                                title="移除课程"
                              >
                                <UserMinus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                          <p>该用户暂无课程权限</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>请搜索用户</p>
                </div>
              )}
            </div>

            {/* Right Panel - Add Course Modal or Instructions */}
            <div className="w-1/3 bg-white overflow-y-auto">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3">使用说明</h2>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">如何管理用户课程:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>在左侧输入用户邮箱地址并搜索</li>
                      <li>查看用户基本信息和现有课程</li>
                      <li>点击"添加课程"为用户分配新课程</li>
                      <li>点击课程旁的移除按钮取消用户权限</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">用户角色说明:</h4>
                    <ul className="space-y-1">
                      <li><span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">FREE</span> 免费用户</li>
                      <li><span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">PRIME</span> 付费用户</li>
                      <li><span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">VIP</span> VIP用户</li>
                      <li><span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">ADMIN</span> 管理员</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // 原有的课程管理界面
          <>
        {/* Left Panel - Course List */}
        <div className="w-1/3 bg-white border-r border-pink-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">课程列表</h2>
            
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                    selectedCourse?.id === course.id
                      ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-300'
                      : 'bg-white border-pink-200 hover:bg-gradient-to-br hover:from-pink-25 hover:to-purple-25'
                  }`}
                  onClick={() => {
                    setSelectedCourse(course)
                    setSelectedItem({ type: 'course', courseId: course.courseId })
                    if (course.fileSystemStructure?.chapters?.length > 0) {
                      setExpandedChapters(new Set([course.fileSystemStructure.chapters[0].chapterNumber]))
                    }
                    // 初始化课程编辑器数据
                    setCourseEditor({
                      title: course.metadata?.title || course.title || '',
                      description: course.metadata?.description || course.description || '',
                      price: course.metadata?.price || course.price || null,
                      category: course.metadata?.category || course.category || '',
                      status: course.metadata?.status || course.status || 'DRAFT',
                      createdAt: course.metadata?.createdAt || course.createdAt || '',
                      updatedAt: course.metadata?.updatedAt || course.updatedAt || '',
                      structure: course.metadata?.structure || null
                    })
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          course.status === 'PUBLISHED' 
                            ? 'bg-green-100 text-green-700' 
                            : course.status === 'DRAFT'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {course.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {course.fileSystemStructure?.chapters?.length || 0} 章节
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        showDeleteConfirm('course', course.title, course.courseId)
                      }}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                      title="删除课程"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Panel - Course Structure */}
        <div className="w-1/3 bg-white border-r border-pink-200 overflow-y-auto">
          {selectedCourse ? (
            <>
              <div className="p-4 border-b border-pink-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedCourse.title}</h2>
                    <p className="text-sm text-gray-600">课程结构管理</p>
                  </div>
                  <button
                    onClick={addChapter}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 text-sm shadow-md transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加章节
                  </button>
                </div>
              </div>

              <div className="p-4">
                {selectedCourse.fileSystemStructure?.chapters?.map((chapter) => (
                  <div key={chapter.chapterNumber} className="mb-4">
                    {/* Chapter Header */}
                    <div 
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        selectedItem?.type === 'chapter' && selectedItem?.chapterNumber === chapter.chapterNumber
                          ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-300 shadow-sm'
                          : 'bg-gray-50 border-transparent hover:bg-gradient-to-br hover:from-pink-25 hover:to-purple-25'
                      }`}
                      onClick={() => selectItem('chapter', chapter.chapterNumber)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setExpandedChapters(prev => {
                                const newSet = new Set(prev)
                                if (newSet.has(chapter.chapterNumber)) {
                                  newSet.delete(chapter.chapterNumber)
                                } else {
                                  newSet.add(chapter.chapterNumber)
                                }
                                return newSet
                              })
                            }}
                            className="mr-2 p-1 hover:bg-gray-200 rounded"
                          >
                            {expandedChapters.has(chapter.chapterNumber) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          
                          {editingChapter === chapter.chapterNumber ? (
                            <div className="flex-1 flex items-center">
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="flex-1 px-2 py-1 text-sm border border-pink-200 rounded"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    // saveChapterName(chapter.chapterNumber, editName)
                                  }
                                }}
                              />
                              <button
                                onClick={() => cancelEdit()}
                                className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {chapter.title || chapter.showName || `章节 ${chapter.chapterNumber}`}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                 {chapter.chapterNumber}
                               </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {editingChapter !== chapter.chapterNumber && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                startEditChapter(chapter.chapterNumber)
                              }}
                              className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                              title="编辑章节名称"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              addLesson(chapter.chapterNumber)
                            }}
                            className="p-1 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-lg transition-all duration-300"
                            title="添加课程"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              showDeleteConfirm('chapter', chapter.title || chapter.showName || chapter.chapterNumber, selectedCourse.courseId, chapter.chapterNumber)
                            }}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                            title="删除章节"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Lessons */}
                    {expandedChapters.has(chapter.chapterNumber) && chapter.lessons && (
                      <div className="ml-6 mt-2 space-y-2">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.lessonNumber}
                            className={`p-2 rounded-xl border cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md ${
                              selectedItem?.type === 'lesson' && 
                              selectedItem?.chapterNumber === chapter.chapterNumber && 
                              selectedItem?.lessonNumber === lesson.lessonNumber
                                ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-300'
                                : 'bg-white border-pink-200 hover:bg-gradient-to-br hover:from-pink-25 hover:to-purple-25'
                            }`}
                            onClick={() => selectItem('lesson', chapter.chapterNumber, lesson.lessonNumber)}
                          >
                            <div className="flex items-center justify-between">
                              {editingLesson === `${chapter.chapterNumber}-${lesson.lessonNumber}` ? (
                                <div className="flex-1 flex items-center">
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border border-pink-200 rounded"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        // saveLessonName(chapter.chapterNumber, lesson.lessonNumber, editName)
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => cancelEdit()}
                                    className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="font-medium text-gray-900 text-sm">
                                    {lesson.title || lesson.showName || `课时 ${lesson.lessonNumber}`}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                     {lesson.lessonNumber}
                                    </div>
                                </>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              {editingLesson !== `${chapter.chapterNumber}-${lesson.lessonNumber}` && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    startEditLesson(chapter.chapterNumber, lesson.lessonNumber)
                                  }}
                                  className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                  title="编辑课时名称"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  showDeleteConfirm('lesson', lesson.title || lesson.showName || lesson.lessonNumber, selectedCourse.courseId, chapter.chapterNumber, lesson.lessonNumber)
                                }}
                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-300 hover:scale-110"
                                title="删除课时"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>请选择一个课程开始管理</p>
            </div>
          )}
        </div>

        {/* Right Panel - Content Editor */}
        <div className="w-1/3 bg-white overflow-y-auto">
          {selectedItem ? (
            <div className="p-6">
              {selectedItem.type === 'course' ? (
                // Course Editor
                <>
                  <div className="border-b border-pink-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">课程编辑</h2>
                    <p className="text-gray-600 mt-1">编辑课程基本信息</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 课程ID - 只读 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课程ID</label>
                      <input
                        type="text"
                        value={selectedCourse?.courseId || ''}
                        disabled
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">课程ID不可修改</p>
                    </div>

                    {/* 课程标题 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课程标题</label>
                      <input
                        type="text"
                        value={courseEditor.title}
                        onChange={(e) => setCourseEditor({...courseEditor, title: e.target.value})}
                        placeholder="输入课程标题"
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    {/* 课程描述 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课程描述</label>
                      <textarea
                        rows={4}
                        value={courseEditor.description}
                        onChange={(e) => setCourseEditor({...courseEditor, description: e.target.value})}
                        placeholder="输入课程描述，向学员介绍这门课程的内容和特色"
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    {/* 课程价格 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课程价格</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">¥</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={courseEditor.price || ''}
                          onChange={(e) => setCourseEditor({...courseEditor, price: e.target.value ? parseFloat(e.target.value) : null})}
                          placeholder="0.00"
                          className="w-full pl-8 pr-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">设置为0或留空表示免费课程</p>
                    </div>

                    {/* 课程分类 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课程分类</label>
                      <input
                        type="text"
                        value={courseEditor.category || ''}
                        onChange={(e) => setCourseEditor({...courseEditor, category: e.target.value})}
                        placeholder="例如：编程、设计、商业等"
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    
                    {/* 课程状态 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">发布状态</label>
                      <div className="space-y-3">
                        {[
                          { value: 'DRAFT', label: '草稿', desc: '课程未公开，仅管理员可见', color: 'text-yellow-600' },
                          { value: 'PUBLISHED', label: '已发布', desc: '课程已公开，用户可以看到和购买', color: 'text-green-600' },
                          { value: 'ARCHIVED', label: '已归档', desc: '课程已下线，不再对外展示', color: 'text-gray-600' }
                        ].map((status) => (
                          <label key={status.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="courseStatus"
                              value={status.value}
                              checked={courseEditor.status === status.value}
                              onChange={(e) => setCourseEditor({...courseEditor, status: e.target.value})}
                              className="mt-0.5 h-4 w-4 text-pink-600 border-pink-300 focus:ring-pink-500"
                            />
                            <div className="ml-3">
                              <span className={`text-sm font-medium ${status.color}`}>
                                {status.label}
                              </span>
                              <p className="text-xs text-gray-500 mt-1">{status.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 课程统计信息 */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">课程统计</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">章节数量:</span>
                          <span className="ml-2 font-medium">{courseEditor.structure?.chapters?.length || selectedCourse?.fileSystemStructure?.chapters?.length || 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">课时总数:</span>
                          <span className="ml-2 font-medium">
                            {courseEditor.structure?.chapters?.reduce((total, chapter) => 
                              total + (chapter.lessons?.length || 0), 0) || 
                             selectedCourse?.fileSystemStructure?.chapters?.reduce((total, chapter) => 
                              total + (chapter.lessons?.length || 0), 0) || 0}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">创建时间:</span>
                          <span className="ml-2 font-medium">
                            {courseEditor.createdAt ? new Date(courseEditor.createdAt).toLocaleString('zh-CN') : 
                             selectedCourse?.createdAt ? new Date(selectedCourse.createdAt).toLocaleString('zh-CN') : '未知'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 保存按钮 */}
                    <button
                      onClick={saveCourseEditor}
                      className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                    >
                      保存课程信息
                    </button>
                  </div>
                </>
              ) : selectedItem.type === 'chapter' ? (
                // Chapter Editor
                <>
                  <div className="border-b border-pink-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">章节编辑</h2>
                    <p className="text-gray-600 mt-1">编辑章节信息</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">章节名称</label>
                      <input
                        type="text"
                        value={chapterEditData.showName}
                        onChange={(e) => setChapterEditData({...chapterEditData, showName: e.target.value})}
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入章节名称"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">章节描述</label>
                      <textarea
                        rows={4}
                        value={chapterEditData.description}
                        onChange={(e) => setChapterEditData({...chapterEditData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入章节描述"
                      />
                    </div>
                    
                    <button
                      onClick={saveChapterInfo}
                      className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500"
                    >
                      保存章节信息
                    </button>
                  </div>
                </>
              ) : (
                // Lesson Editor
                <>
                  <div className="border-b border-pink-200 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">课时编辑</h2>
                    <p className="text-gray-600 mt-1">编辑课时信息和内容</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课时名称</label>
                      <input
                        type="text"
                        value={getCurrentLessonData().showName}
                        onChange={(e) => updateCurrentLessonData({ showName: e.target.value })}
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入课时名称"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课时时长</label>
                      <input
                        type="text"
                        value={getCurrentLessonData().duration}
                        onChange={(e) => updateCurrentLessonData({ duration: e.target.value })}
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="例如：30分钟"
                      />
                    </div>
                    
                    {/* 视频上传组件 */}
                    <AdminVideoUploader
                      courseId={selectedCourse?.courseId}
                      chapterNumber={selectedItem?.chapterNumber}
                      lessonNumber={selectedItem?.lessonNumber}
                      currentVideoUrl={getCurrentLessonData().videoUrl}
                      currentStreamId={getCurrentLessonData().streamId}
                      currentThumbnail={getCurrentLessonData().thumbnail}
                      onVideoUpload={handleVideoUpload}
                    />

                    {/* 课件上传组件 */}
                    <AdminMaterialUploader
                      courseId={selectedCourse?.courseId}
                      chapterNumber={selectedItem?.chapterNumber}
                      lessonNumber={selectedItem?.lessonNumber}
                      currentMaterials={getCurrentLessonData().materials}
                      onMaterialUpload={handleMaterialUpload}
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">课时内容 (MDX)</label>
                      <textarea
                        rows={12}
                        value={mdxContent}
                        onChange={(e) => setMdxContent(e.target.value)}
                        className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-sm"
                        placeholder="输入课时内容，支持 Markdown 格式"
                      />
                    </div>
                    
                    <button
                      onClick={saveLessonInfo}
                      className="w-full px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:from-pink-500 hover:to-purple-500"
                    >
                      保存课时信息
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>请选择要编辑的内容</p>
            </div>
          )}
        </div>
          </>
        )}
      </div>

      {/* Modals and Components */}
      <div>
        {/* Course Creation Modal */}
        <CourseModal />
        
        {/* Toast Notifications */}
        <ToastContainer />
        
        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 mx-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">确认删除</h3>
                  <p className="text-sm text-gray-500">此操作将隐藏内容但不会永久删除</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  确定要删除以下{deleteConfirm.type === 'course' ? '课程' : deleteConfirm.type === 'chapter' ? '章节' : '课时'}吗？
                </p>
                <p className="font-medium text-gray-900 bg-gray-50 p-2 rounded">
                  {deleteConfirm.title}
                </p>
                {deleteConfirm.type === 'chapter' && (
                  <p className="text-sm text-orange-600 mt-2">
                    ⚠️ 删除章节将同时隐藏该章节下的所有课时
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={hideDeleteConfirm}
                  className="px-4 py-2 border border-pink-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={performSoftDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Course to User Modal */}
        {showAddCourseModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">为用户添加课程</h2>
              <p className="text-sm text-gray-600 mb-4">用户: {selectedUser.email}</p>
              
              <div className="space-y-3">
                {availableCourses.map((course) => {
                  const userHasCourse = selectedUser.courses?.some(c => c.id === course.id)
                  return (
                    <div
                      key={course.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        userHasCourse
                          ? 'bg-gray-100 border-pink-200 cursor-not-allowed'
                          : 'bg-white border-pink-200 hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 hover:border-pink-300'
                      }`}
                      onClick={() => !userHasCourse && addCourseToUser(course.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{course.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{course.courseId}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              course.status === 'PUBLISHED' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {course.status}
                            </span>
                            {course.price && (
                              <span className="text-xs text-gray-500">¥{course.price}</span>
                            )}
                          </div>
                        </div>
                        {userHasCourse ? (
                          <span className="text-xs text-gray-500">已拥有</span>
                        ) : (
                          <UserPlus className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 border border-pink-200 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}