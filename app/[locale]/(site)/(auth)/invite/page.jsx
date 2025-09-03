'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Gift,
  Check,
  AlertCircle,
  BookOpen,
  Clock,
  User,
  ArrowRight
} from 'lucide-react'

export default function InvitePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inviteData, setInviteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [redeeming, setRedeeming] = useState(false)
  const [success, setSuccess] = useState(false)

  const inviteCode = searchParams.get('code')

  useEffect(() => {
    if (inviteCode) {
      verifyInviteCode()
    } else {
      setError('邀请码无效')
      setLoading(false)
    }
  }, [inviteCode])

  const verifyInviteCode = async () => {
    try {
      const response = await fetch(`/api/invite-codes/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inviteCode })
      })

      if (response.ok) {
        const data = await response.json()
        setInviteData(data.inviteCode)
      } else {
        const errorData = await response.json()
        setError(errorData.error || '邀请码验证失败')
      }
    } catch (error) {
      console.error('Error verifying invite code:', error)
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const redeemInviteCode = async () => {
    if (!session) {
      // 如果用户未登录，跳转到登录页面，并带上当前邀请链接
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)
      return
    }

    setRedeeming(true)
    try {
      const response = await fetch(`/api/invite-codes/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inviteCode })
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || '兑换失败')
      }
    } catch (error) {
      console.error('Error redeeming invite code:', error)
      setError('网络错误，请稍后重试')
    } finally {
      setRedeeming(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">验证邀请码...</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">兑换成功！</h1>
            <p className="text-gray-600 mb-6">
              恭喜您成功获得课程访问权限！
            </p>
            <div className="space-y-2 mb-6">
              {inviteData?.courses?.map((course) => (
                <div key={course.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="font-medium text-green-800">{course.title}</div>
                  <div className="text-sm text-green-600">{course.description}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              3秒后自动跳转到课程页面...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">邀请码无效</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">课程邀请</h1>
          <p className="text-gray-600">
            您收到了一个课程邀请码！
          </p>
        </div>

        {/* 邀请码信息 */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-center mb-4">
            <code className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-lg font-mono">
              {inviteCode}
            </code>
          </div>

          {/* 课程列表 */}
          <div className="space-y-3">
            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="w-4 h-4 mr-2" />
              包含课程:
            </div>
            {inviteData?.courses?.map((course) => (
              <div key={course.id} className="bg-white border rounded-lg p-3">
                <div className="font-medium text-gray-900">{course.title}</div>
                <div className="text-sm text-gray-600 mt-1">{course.description}</div>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span className={`px-2 py-1 rounded-full ${
                    course.status === 'PUBLISHED' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {course.status === 'PUBLISHED' ? '已发布' : '草稿'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 过期信息 */}
          {inviteData?.expiresAt && (
            <div className="flex items-center text-sm text-orange-600 mt-4">
              <Clock className="w-4 h-4 mr-2" />
              过期时间: {new Date(inviteData.expiresAt).toLocaleString('zh-CN')}
            </div>
          )}
        </div>

        {/* 用户状态和操作按钮 */}
        {status === 'loading' ? (
          <div className="text-center text-gray-600">
            检查登录状态...
          </div>
        ) : session ? (
          <div className="space-y-4">
            <div className="flex items-center text-sm text-green-600 bg-green-50 rounded-lg p-3">
              <User className="w-4 h-4 mr-2" />
              已登录: {session.user?.email}
            </div>
            <button
              onClick={redeemInviteCode}
              disabled={redeeming}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {redeeming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  兑换中...
                </>
              ) : (
                <>
                  兑换邀请码
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 inline mr-2 text-yellow-600" />
              请先登录才能兑换邀请码
            </div>
            <button
              onClick={() => router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              登录并兑换
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}