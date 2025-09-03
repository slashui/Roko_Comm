// layout.js
import { Inter } from 'next/font/google'
import '../globals.css'
import { getSEOTags } from "@/libs/seo"
import ClientLayout from './ClientLayout'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] })

export const metadata = getSEOTags()

export default async function RootLayout({ children, params }) {
  const session = await getServerSession(authOptions)

  
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ClientLayout params={params}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}