'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function UpdateUser() {
    const [email, setEmail] = useState('')
    const [userData, setUserData] = useState(null)
    const [newUserLevel, setNewUserLevel] = useState('')
    const [loading, setLoading] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)

    const searchUser = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('请输入邮箱地址')
            return
        }

        setLoading(true)
        try {
            const response = await axios.get(`/api/user/search?email=${email}`)
            setUserData(response.data)
            setNewUserLevel(response.data.role)
            toast.success('✅ 找到用户信息！', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            })
        } catch (error) {
            console.error('搜索用户失败:', error)
            toast.error('❌ 未找到该用户，请检查邮箱地址', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#EF4444',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            })
            setUserData(null)
        } finally {
            setLoading(false)
        }
    }

    const updateUserLevel = async (e) => {
        e.preventDefault()
        if (!userData || !newUserLevel) {
            toast.error('请先查找用户并选择新等级')
            return
        }

        setLoading(true)
        setUpdateSuccess(false)
        try {
            await axios.put('/api/user/update-level', {
                email: userData.email,
                role: newUserLevel
            })

            // 显示成功提示
            toast.success('🎉 用户等级更新成功！', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            })

            setUserData({ ...userData, role: newUserLevel })
            setUpdateSuccess(true)

            // 3秒后隐藏成功状态
            setTimeout(() => {
                setUpdateSuccess(false)
            }, 3000)

        } catch (error) {
            console.error('更新失败:', error)
            toast.error('❌ 更新用户等级失败，请重试', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#EF4444',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '8px'
                }
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="w-full min-h-screen flex flex-col bg-gradient-to-br from-[#d6cbff] to-[#b8a5ff] items-center justify-center px-4">
            <div className="w-full max-w-2xl space-y-6">
                <div className="text-center">
                    <h1 className="text-gray-800 text-3xl font-bold">用户信息管理</h1>
                    <p className="text-gray-600 mt-2">通过邮箱查找并更新用户等级</p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8">
                    {/* 搜索用户 */}
                    <form onSubmit={searchUser} className="space-y-4 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">查找用户</h2>
                        <div>
                            <label className="text-gray-700 font-medium block mb-2">
                                用户邮箱
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#845eee]/50 focus:border-[#845eee] outline-none transition-all"
                                placeholder="请输入用户邮箱"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-6 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                            style={{
                                backgroundColor: loading ? '#8B5CF6' : '#7C3AED',
                                borderColor: '#7C3AED'
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#6D28D9'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.target.style.backgroundColor = '#7C3AED'
                                }
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    搜索中...
                                </span>
                            ) : '查找用户'}
                        </button>
                    </form>

                    {/* 用户信息显示 */}
                    {userData && (
                        <div className="border-t pt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">用户信息</h2>
                                {updateSuccess && (
                                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-lg animate-pulse">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        更新成功！
                                    </div>
                                )}
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-gray-600 font-medium">姓名:</span>
                                        <span className="ml-2">{userData.name || '未设置'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 font-medium">邮箱:</span>
                                        <span className="ml-2">{userData.email}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 font-medium">当前等级:</span>
                                        <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${userData.role === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                                            userData.role === 'PRIME' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {userData.role}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 font-medium">注册时间:</span>
                                        <span className="ml-2">{new Date(userData.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 更新等级 */}
                            <form onSubmit={updateUserLevel} className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">更新用户等级</h3>
                                <div>
                                    <label className="text-gray-700 font-medium block mb-3">
                                        选择新等级
                                    </label>
                                    <div className="flex space-x-6">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="user_level"
                                                value="FREE"
                                                checked={newUserLevel === 'FREE'}
                                                onChange={e => setNewUserLevel(e.target.value)}
                                                className="w-4 h-4 text-[#845eee] border-gray-300 focus:ring-[#845eee] focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-700 font-medium">免费用户</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="user_level"
                                                value="VIP"
                                                checked={newUserLevel === 'VIP'}
                                                onChange={e => setNewUserLevel(e.target.value)}
                                                className="w-4 h-4 text-[#845eee] border-gray-300 focus:ring-[#845eee] focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-700 font-medium">VIP会员</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="user_level"
                                                value="PRIME"
                                                checked={newUserLevel === 'PRIME'}
                                                onChange={e => setNewUserLevel(e.target.value)}
                                                className="w-4 h-4 text-[#845eee] border-gray-300 focus:ring-[#845eee] focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-700 font-medium">Prime会员</span>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || newUserLevel === userData.role}
                                    className="w-full py-3 px-6 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                                    style={{
                                        backgroundColor: (loading || newUserLevel === userData.role) ? '#10B981' : '#059669',
                                        borderColor: '#059669',
                                        opacity: (loading || newUserLevel === userData.role) ? 0.7 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!loading && newUserLevel !== userData.role) {
                                            e.target.style.backgroundColor = '#047857'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!loading && newUserLevel !== userData.role) {
                                            e.target.style.backgroundColor = '#059669'
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="animate-pulse">更新中...</span>
                                        </span>
                                    ) : '更新用户等级'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}