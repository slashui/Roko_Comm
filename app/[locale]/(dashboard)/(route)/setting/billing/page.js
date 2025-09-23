'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BillingPage({ params }) {
  const { data: session, status } = useSession()
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const lang = params.locale

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!session?.user?.id) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/purchases')
        if (response.ok) {
          const data = await response.json()
          setPurchases(data)
        } else {
          setError('获取账单记录失败')
        }
      } catch (err) {
        setError('加载账单时出现错误')
      } finally {
        setLoading(false)
      }
    }

    if (status !== 'loading') {
      fetchPurchases()
    }
  }, [session, status])

  const getStatusText = (status) => {
    switch (status) {
      case 'COMPLETED': return '已完成'
      case 'PENDING': return '处理中'
      case 'FAILED': return '失败'
      case 'REFUNDED': return '已退款'
      default: return status
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      case 'REFUNDED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // 货币格式化 - 统一显示美元
  const formatAmount = (amount, currency) => {
    if (currency === 'USD') {
      return `$${amount.toFixed(2)}`
    }
    return `${currency} ${amount.toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F0F0" }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4" 
               style={{ backgroundColor: "#F4C2C2" }}>
            💳
          </div>
          <p style={{ color: "#6A6A6A" }}>加载账单记录中...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F0F0" }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4" 
               style={{ backgroundColor: "#F4C2C2" }}>
            🔒
          </div>
          <p style={{ color: "#6A6A6A" }}>请先登录查看账单记录</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 p-4 lg:p-8" style={{ backgroundColor: "#F5F0F0", fontFamily: "Noto Sans CJK, sans-serif" }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href={`/${lang}/dashboard`}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← 返回控制台
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#4A4A4A" }}>
          账单记录
        </h1>
        <p className="text-lg" style={{ color: "#6A6A6A" }}>
          查看您的支付记录和交易历史
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Purchase Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-3" 
                 style={{ backgroundColor: "#7BA05B", color: "white" }}>
              💰
            </div>
            <h3 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>总支出</h3>
            <p className="text-2xl font-bold" style={{ color: "#7BA05B" }}>
              ${purchases.reduce((sum, p) => p.status === 'COMPLETED' ? sum + p.amount : sum, 0).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-3" 
                 style={{ backgroundColor: "#F4C2C2", color: "white" }}>
              📦
            </div>
            <h3 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>购买次数</h3>
            <p className="text-2xl font-bold" style={{ color: "#F4C2C2" }}>
              {purchases.filter(p => p.status === 'COMPLETED').length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-3" 
                 style={{ backgroundColor: "#D4AF37", color: "white" }}>
              📊
            </div>
            <h3 className="font-semibold mb-2" style={{ color: "#4A4A4A" }}>平均支出</h3>
            <p className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
              ${purchases.filter(p => p.status === 'COMPLETED').length > 0 ? 
                (purchases.reduce((sum, p) => p.status === 'COMPLETED' ? sum + p.amount : sum, 0) / 
                 purchases.filter(p => p.status === 'COMPLETED').length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b" style={{ backgroundColor: "#F8F5F0" }}>
          <h2 className="text-xl font-bold" style={{ color: "#4A4A4A" }}>
            支付记录
          </h2>
        </div>
        
        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4" 
                 style={{ backgroundColor: "#F4C2C2" }}>
              📄
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#4A4A4A" }}>
              暂无支付记录
            </h3>
            <p style={{ color: "#6A6A6A" }}>
              您还没有任何支付记录
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b" style={{ backgroundColor: "#F5F0F0" }}>
                <tr>
                  <th className="text-left p-4 font-semibold" style={{ color: "#4A4A4A" }}>支付时间</th>
                  <th className="text-left p-4 font-semibold" style={{ color: "#4A4A4A" }}>产品名称</th>
                  <th className="text-left p-4 font-semibold" style={{ color: "#4A4A4A" }}>金额</th>
                  <th className="text-left p-4 font-semibold" style={{ color: "#4A4A4A" }}>货币</th>
                  <th className="text-left p-4 font-semibold" style={{ color: "#4A4A4A" }}>状态</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4" style={{ color: "#6A6A6A" }}>
                      {new Date(purchase.createdAt).toLocaleString('zh-CN')}
                    </td>
                    <td className="p-4" style={{ color: "#6A6A6A" }}>
                      <div className="text-sm">
                        <div className="font-medium">{purchase.productName || '未知产品'}</div>
                        {purchase.productDescription && (
                          <div className="text-xs text-gray-500 mt-1">{purchase.productDescription}</div>
                        )}
                        <div className="font-mono text-xs text-gray-400 mt-1">
                          ID: {purchase.productId.slice(-8)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold" style={{ color: "#4A4A4A" }}>
                      {formatAmount(purchase.amount, purchase.currency)}
                    </td>
                    <td className="p-4" style={{ color: "#6A6A6A" }}>
                      {purchase.currency}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(purchase.status)}`}>
                        {getStatusText(purchase.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Additional Actions */}
      <div className="mt-8 flex justify-center">
        <Link 
          href={`/${lang}/dashboard`}
          className="px-6 py-3 rounded-full font-medium transition-colors"
          style={{ backgroundColor: "#7BA05B", color: "white" }}
        >
          返回控制台
        </Link>
      </div>
    </main>
  )
}