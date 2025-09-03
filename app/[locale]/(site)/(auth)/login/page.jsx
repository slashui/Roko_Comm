'use client'

import { useState, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"



export default function Login() {
    const t = useTranslations("Loginpage");
    const session = useSession()
    const router = useRouter()

    const [lang, setLang] = useState('');
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    
    useEffect(() => {
        setLang(document.documentElement.lang);
        if (session?.status === 'authenticated') {
            // 根据用户角色进行不同的跳转
            if (session?.data?.user?.role === 'ADMIN') {
                router.push(`/${lang}/admin`)
            } else {
                router.push(`/${lang}/dashboard`)
            }
        }
    }, [session?.status, lang, session?.data?.user?.role])

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: `/${lang}/dashboard`
            })

            if (result?.error) {
                console.error('Authentication error:', result.error)
                toast.error(result.error || 'Failed to login')
                return
            }

            if (result?.ok) {
                toast.success('Logged in successfully!')
                // 登录成功后，等待session更新，然后根据用户角色跳转
                // 这里先跳转到dashboard，useEffect会处理角色判断和重定向
                await router.push(`/${lang}/dashboard`)
                window.location.reload();
            } else {
                toast.error('Login failed. Please try again.')
            }
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                stack: error.stack,
                response: error.response?.data
            })
            toast.error('An unexpected error occurred')
        }
    }

    return (
        <>
            {/* Sakura petals decorative background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-20 w-4 h-4 bg-[#F4C2C2]/80 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-[#F4C2C2]/60 rounded-full opacity-85"></div>
                <div className="absolute bottom-60 left-16 w-2 h-2 bg-[#E6C2C2]/70 rounded-full opacity-75"></div>
                <div className="absolute top-80 left-1/3 w-3 h-3 bg-[#F4C2C2]/50 rounded-full opacity-60"></div>
                <div className="absolute bottom-40 right-20 w-4 h-4 bg-[#E6C2C2]/80 rounded-full opacity-70"></div>
            </div>

            <main className="w-full min-h-screen flex items-center justify-center" style={{backgroundColor: '#F5F0F0'}}>
                <div className="w-full max-w-6xl mx-auto px-8 py-12 flex items-center justify-between">
                    
                    {/* Left side - Decorative vertical title */}
                    <div className="hidden lg:flex flex-col items-end space-y-8 pr-16">
                        <div className="writing-vertical-rl text-right">
                            <h1 className="text-4xl font-bold text-[#4A4A4A] leading-relaxed tracking-wide" 
                                style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}>
                                和
                                <br />
                                果
                                <br />
                                子
                                <br />
                                学
                                <br />
                                院
                            </h1>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-px h-16 bg-[#C8D4C0]"></div>
                            <div className="w-2 h-2 bg-[#7BA05B] rounded-full"></div>
                            <div className="w-px h-16 bg-[#E6C2C2]"></div>
                        </div>
                    </div>

                    {/* Right side - Login form */}
                    <div className="w-full max-w-md lg:max-w-lg">
                        <div className="bg-[#F8F5F0]/90 backdrop-blur-sm rounded-3xl p-10 shadow-lg border border-[#E6C2C2]/30">
                            
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h3 className="text-[#4A4A4A] text-2xl font-bold mb-2" 
                                    style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}>
                                    {t("One")}
                                </h3>
                                <div className="w-12 h-px bg-[#7BA05B] mx-auto"></div>
                            </div>
                           
                            <form onSubmit={loginUser} className="space-y-6">
                                
                                {/* Email field */}
                                <div className="space-y-2">
                                    <label className="text-[#4A4A4A] font-medium text-sm block" 
                                           style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}>
                                        {t("Five")}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-4 rounded-xl border border-[#E6C2C2] bg-white/80 
                                                 focus:ring-2 focus:ring-[#7BA05B]/30 focus:border-[#7BA05B] 
                                                 outline-none transition-all duration-300 text-[#4A4A4A]
                                                 placeholder:text-[#8A8A8A]"
                                        placeholder={t("Seven")}
                                        style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}
                                    />
                                </div>

                                {/* Password field */}
                                <div className="space-y-2">
                                    <label className="text-[#4A4A4A] font-medium text-sm block"
                                           style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}>
                                        {t("Six")}
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={data.password}
                                        onChange={e => setData({ ...data, password: e.target.value })}
                                        className="w-full px-4 py-4 rounded-xl border border-[#E6C2C2] bg-white/80 
                                                 focus:ring-2 focus:ring-[#7BA05B]/30 focus:border-[#7BA05B] 
                                                 outline-none transition-all duration-300 text-[#4A4A4A]
                                                 placeholder:text-[#8A8A8A]"
                                        placeholder={t("Eight")}
                                        style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="w-full mt-8 py-4 px-8 text-white font-medium rounded-xl 
                                             transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                                             active:scale-[0.98]"
                                    style={{
                                        backgroundColor: '#7BA05B',
                                        fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#6A8F4F'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#7BA05B'}
                                >
                                    {t("Nine")}
                                </button>
                            </form>

                            {/* Decorative bottom element */}
                            <div className="flex justify-center mt-8 space-x-2">
                                <div className="w-2 h-2 bg-[#F4C2C2] rounded-full opacity-70"></div>
                                <div className="w-2 h-2 bg-[#C8D4C0] rounded-full opacity-70"></div>
                                <div className="w-2 h-2 bg-[#D4AF37] rounded-full opacity-70"></div>
                            </div>
                        </div>

                        {/* Mobile title for small screens */}
                        <div className="lg:hidden text-center mt-6">
                            <h1 className="text-2xl font-bold text-[#4A4A4A]" 
                                style={{fontFamily: 'Noto Sans CJK, 思源黑体, sans-serif'}}>
                                和果子学院
                            </h1>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}