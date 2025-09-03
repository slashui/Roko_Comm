import { Inter } from 'next/font/google'
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Provider from '../context/AuthContext';
import { getSEOTags } from "@/libs/seo";
import Providers from '@/libs/themes/providers';
const inter = Inter({ subsets: ['latin'] })

// These lines incorporate default SEO tags for all pages in our application.
// You have the option to customize them individually on each page by providing parameters to the getSOTags() function.
export const metadata = getSEOTags();
export default function RootLayout({ children, params }) {
  const locale = useLocale();
  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale} >
      <body className="w-full h-full bg-[#f2f2f2] dark:bg-black mx-auto"><Providers><Provider>{children}</Provider></Providers></body>
    </html>
  )
}
