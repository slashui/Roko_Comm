'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { 
  Plus,
  Trash2,
  Copy,
  Check,
  Calendar,
  Users,
  Gift,
  AlertCircle,
  BookOpen,
  LogOut
} from 'lucide-react'

export default function InviteCodesPage() {
  const { data: session, status } = useSession()
  const [courses, setCourses] = useState([])
  const [inviteCodes, setInviteCodes] = useState([])
  const [selectedCoursesForInvite, setSelectedCoursesForInvite] = useState(new Set())
  const [inviteCodeExpiry, setInviteCodeExpiry] = useState('')
  const [generatingInviteCode, setGeneratingInviteCode] = useState(false)
  const [loadingInviteCodes, setLoadingInviteCodes] = useState(false)
  const [deletingInviteCode, setDeletingInviteCode] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)
  const [loading, setLoading] = useState(true)

  // Toast 通知状态
  const [toasts, setToasts] = useState([])

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

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // 加载课程数据
  useEffect(() => {
    if (status === 'authenticated') {
      loadCourses()
      loadInviteCodes()
    }
  }, [status])

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/courses?includeStructure=true')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Error loading courses:', error)
    } finally {
      setLoading(false)
    }
  }

  // 加载邀请码
  const loadInviteCodes = async () => {
    setLoadingInviteCodes(true)
    try {
      const response = await fetch('/api/invite-codes')
      if (response.ok) {
        const data = await response.json()
        // 确保数据是数组格式，API 返回的是 { inviteCodes: [...] }
        const codes = data.inviteCodes || []
        setInviteCodes(Array.isArray(codes) ? codes : [])
      } else {
        console.error('Failed to load invite codes:', response.status)
        setInviteCodes([])
        showToast('加载邀请码失败', 'error')
      }
    } catch (error) {
      console.error('Error loading invite codes:', error)
      setInviteCodes([])
      showToast('加载邀请码失败', 'error')
    } finally {
      setLoadingInviteCodes(false)
    }
  }

  // 生成邀请码
  const generateInviteCode = async () => {
    if (selectedCoursesForInvite.size === 0) {
      showToast('请选择至少一个课程', 'error')
      return
    }

    setGeneratingInviteCode(true)
    try {
      const response = await fetch('/api/invite-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseIds: Array.from(selectedCoursesForInvite),
          expiresAt: inviteCodeExpiry || null
        })
      })

      if (response.ok) {
        showToast('邀请码生成成功！', 'success')
        setSelectedCoursesForInvite(new Set())
        setInviteCodeExpiry('')
        await loadInviteCodes()
      } else {
        const errorData = await response.json()
        showToast(`生成失败: ${errorData.error}`, 'error')
      }
    } catch (error) {
      console.error('Error generating invite code:', error)
      showToast('生成邀请码失败', 'error')
    } finally {
      setGeneratingInviteCode(false)
    }
  }

  // 删除邀请码
  const deleteInviteCode = async (codeId) => {
    setDeletingInviteCode(codeId)
    try {
      const response = await fetch('/api/invite-codes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeId })
      })

      if (response.ok) {
        showToast('邀请码已删除', 'success')
        await loadInviteCodes()
      } else {
        showToast('删除失败', 'error')
      }
    } catch (error) {
      console.error('Error deleting invite code:', error)
      showToast('删除失败', 'error')
    } finally {
      setDeletingInviteCode(null)
    }
  }

  // 复制邀请码
  const copyInviteCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      showToast('邀请码已复制到剪贴板', 'success')
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (error) {
      showToast('复制失败', 'error')
    }
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
              : 'bg-blue-50 border border-blue-200 text-blue-800'
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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">请先登录</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* 头部导航 */}
      <div className="bg-white border-b border-pink-100 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left side - Tab navigation */}
          <div className="flex space-x-1">
            <button
              onClick={() => window.location.href = '/cn/admin'}
              className="px-4 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-pink-50"
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              课程管理
            </button>
            <button
              onClick={() => window.location.href = '/cn/admin'}
              className="px-4 py-2 text-sm rounded-md transition-colors text-gray-600 hover:bg-pink-50"
            >
              <Users className="w-4 h-4 inline mr-2" />
              用户管理
            </button>
            <button
              className="px-4 py-2 text-sm rounded-md transition-colors bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm"
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
              onClick={() => signOut({ callbackUrl: '/cn/login' })}
              className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 text-sm flex items-center shadow-md transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-1" />
              退出
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 左侧 - 生成邀请码 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
            <div className="flex items-center mb-6">
              <Plus className="w-6 h-6 text-pink-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">生成新邀请码</h2>
            </div>

            {/* 选择课程 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                选择课程 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto border border-pink-200 rounded-xl p-3 bg-gradient-to-br from-pink-25 to-purple-25">
                {courses.map((course) => (
                  <label key={course.id} className="flex items-center p-2 hover:bg-pink-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCoursesForInvite.has(course.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedCoursesForInvite)
                        if (e.target.checked) {
                          newSelected.add(course.id)
                        } else {
                          newSelected.delete(course.id)
                        }
                        setSelectedCoursesForInvite(newSelected)
                      }}
                      className="mr-3 h-4 w-4 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {selectedCoursesForInvite.size > 0 && (
                <button
                  onClick={() => setSelectedCoursesForInvite(new Set())}
                  className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                >
                  清空选择
                </button>
              )}
            </div>

            {/* 过期时间 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                过期时间 (可选)
              </label>
              <input
                type="datetime-local"
                value={inviteCodeExpiry}
                onChange={(e) => setInviteCodeExpiry(e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-400"
              />
              <p className="text-xs text-gray-500 mt-1">不设置则永不过期</p>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={generateInviteCode}
              disabled={generatingInviteCode || selectedCoursesForInvite.size === 0}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-md"
            >
              {generatingInviteCode ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  生成中...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  生成邀请码
                </>
              )}
            </button>
          </div>

          {/* 右侧 - 邀请码列表 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-pink-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">邀请码列表</h2>
              </div>
              <button
                onClick={loadInviteCodes}
                disabled={loadingInviteCodes}
                className="px-3 py-1 text-sm bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 rounded-lg hover:from-pink-200 hover:to-purple-200 disabled:opacity-50 transition-all duration-300"
              >
                {loadingInviteCodes ? '刷新中...' : '刷新'}
              </button>
            </div>

            <div className="space-y-4">
              {inviteCodes.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">暂无邀请码</p>
                  <p className="text-sm text-gray-400">点击左侧生成新的邀请码</p>
                </div>
              ) : (
                inviteCodes.map((invite) => {
                  // 判断邀请码状态
                  const isUsed = invite.status === 'USED'
                  const isExpired = invite.status === 'EXPIRED' || (invite.expiresAt && new Date() > new Date(invite.expiresAt))
                  
                  return (
                  <div key={invite.id} className={`border-2 rounded-xl p-4 transition-all duration-200 shadow-sm hover:shadow-md ${
                    isUsed || isExpired
                      ? 'border-gray-300 bg-gray-50' 
                      : 'border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100'
                  }`}>
                    {/* 使用状态标识 */}
                    <div className="flex items-center justify-between mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isUsed
                          ? 'bg-red-200 text-red-800'
                          : isExpired
                          ? 'bg-orange-200 text-orange-800' 
                          : 'bg-gradient-to-r from-pink-200 to-purple-200 text-pink-800'
                      }`}>
                        {isUsed ? (
                          <>
                            <AlertCircle className="w-4 h-4 mr-1" />
                            已使用
                          </>
                        ) : isExpired ? (
                          <>
                            <AlertCircle className="w-4 h-4 mr-1" />
                            已过期
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            可用
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => deleteInviteCode(invite.id)}
                        disabled={deletingInviteCode === invite.id}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full disabled:opacity-50 transition-all duration-300 hover:scale-110"
                        title="删除邀请码"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 大号邀请码显示 */}
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center bg-white border-2 border-pink-200 rounded-xl p-3 shadow-lg">
                        <code className="text-2xl font-mono font-bold text-pink-800 tracking-wider">
                          {invite.code}
                        </code>
                        <button
                          onClick={() => copyInviteCode(invite.code)}
                          className="ml-4 p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-all duration-300 hover:scale-110"
                          title="复制邀请码"
                        >
                          {copiedCode === invite.code ? (
                            <Check className="w-6 h-6 text-green-500" />
                          ) : (
                            <Copy className="w-6 h-6" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* 邀请码详细信息 */}
                    <div className="space-y-2">
                      {/* 关联课程 */}
                      <div>
                        <span className="font-semibold text-gray-800 block mb-2">关联课程：</span>
                        <div className="flex flex-wrap gap-2">
                          {(invite.courses || []).map((courseRelation) => {
                            const course = courseRelation.course || courseRelation;
                            return (
                              <span key={course.id} className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 px-3 py-2 rounded-full text-sm font-medium shadow-sm">
                                {course.title}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* 使用情况详情 */}
                      {isUsed && (
                        <div className="flex items-center text-gray-700 bg-gray-100 p-3 rounded-lg">
                          <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                          <span className="font-medium">
                            使用者: {invite.user?.email || '未知用户'}
                          </span>
                        </div>
                      )}

                      {/* 过期时间 */}
                      {invite.expiresAt && (
                        <div className="flex items-center text-gray-700">
                          <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                          <span>
                            过期时间: {new Date(invite.expiresAt).toLocaleString('zh-CN')}
                          </span>
                        </div>
                      )}

                      {/* 创建时间 */}
                      <div className="text-sm text-gray-500 pt-2 border-t border-gray-200">
                        创建于: {new Date(invite.createdAt).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast 通知 */}
      <ToastContainer />
    </div>
  )
}