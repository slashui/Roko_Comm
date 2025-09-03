'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useTranslations } from "next-intl"
import { useRouter } from 'next/navigation';


export default function Register() {
    const router = useRouter();
    const t = useTranslations("Register");
    const [lang, setLang] = useState('');
    const [data, setData] = useState({
        
        email: '',
        password: '',
        user_level: 'VIP', // 默认选择VIP
        inviteCode: '' // 邀请码字段
    })
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setLang(document.documentElement.lang);
        // 获取 URL 参数中的 email
        const params = new URLSearchParams(window.location.search);
        const emailFromUrl = params.get('email');
        if (emailFromUrl) {
            setData(prev => ({
                ...prev,
                email: emailFromUrl
            }));
        }
    }, []);
    const registerUser = async (e) => {
        e.preventDefault()
        
        // 验证邀请码
        if (!data.inviteCode.trim()) {
            toast.error('请输入邀请码');
            return;
        }
        
        if (isLoading) return; // 防止重复提交
        
        setIsLoading(true)
        try {
            // 先验证邀请码
            const verifyResponse = await axios.post('/api/invite-codes/verify', {
                code: data.inviteCode
            });
            
            if (!verifyResponse.data.valid) {
                toast.error(verifyResponse.data.error || '邀请码验证失败');
                return;
            }
            
            const registerData = {
                ...data,
                name: 'user_' + Math.random().toString(36).substr(2, 8), // 生成随机用户名
                inviteCode: data.inviteCode // 确保邀请码传递给注册API
            };
            
            // 注册用户 (注册API会自动处理邀请码的使用和课程关联)
            const registerResponse = await axios.post('/api/register', registerData);
            
            if (registerResponse.data.success) {
                toast.success('注册成功！正在跳转到登录页面...');
                setTimeout(() => {
                    router.push(`/${lang}/login`);
                }, 2000);
            }
            
        } catch (error) {
            console.error('Registration error:', error);

            if (error.response && error.response.data) {
                toast.error(error.response.data.message || error.response.data.error || '注册失败');
            } else {
                toast.error('注册过程中出现错误，请稍后重试');
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            <main className="w-full h-screen flex flex-col bg-gradient-to-br from-[#d6cbff] to-[#b8a5ff] items-center justify-center sm:px-4">
                <div className="w-full space-y-6 sm:max-w-md">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">请注册成为课程会员</h3>
                            <p className="text-gray-600">{t("Two")}</p>
                        </div>
                    </div>
                    <div className="mx-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8">
                        <form
                            onSubmit={registerUser}
                            className="space-y-5"
                        >
                            <div className='space-y-4'>
                                

                                <div>
                                    <label className="text-gray-700 font-medium block mb-2">
                                        {t("Six")}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#845eee]/50 focus:border-[#845eee] outline-none transition-all"
                                        placeholder={t("Seven")}
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-medium block mb-2">
                                        {t("Eight")}
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={data.password}
                                        onChange={e => setData({ ...data, password: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#845eee]/50 focus:border-[#845eee] outline-none transition-all"
                                        placeholder={t("Nine")}
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 font-medium block mb-2">
                                        邀请码
                                    </label>
                                    <input
                                        id="inviteCode"
                                        name="inviteCode"
                                        type="text"
                                        required
                                        value={data.inviteCode}
                                        onChange={e => setData({ ...data, inviteCode: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#845eee]/50 focus:border-[#845eee] outline-none transition-all"
                                        placeholder="请输入邀请码"
                                    />
                                </div>

                                
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#845eee] py-3 px-6 text-white font-medium hover:bg-[#845eee]/90 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: isLoading ? '#6b46c1' : '#845eee' }}
                            >
                                {isLoading ? '注册中...' : t("Ten")}
                            </button>
                        </form>
                    </div>
                    <div className="text-center  text-gray-600">
                        {t("Eleven")}? <a href={`/${lang}/login`} className="text-[#845eee] hover:text-[#845eee]/80 font-semibold transition-colors">{t("Twelve")}</a>
                    </div>
                </div>
            </main>

        </>
    )
}