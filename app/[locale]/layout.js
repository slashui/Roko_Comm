import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import { notFound } from "next/navigation";
import Provider from './context/AuthContext';
import { getSEOTags } from "@/libs/seo";
import Providers from '@/libs/themes/providers';
import { cookies } from 'next/headers';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Script from 'next/script';
import config from '@/config';

const inter = Inter({ subsets: ['latin'] })
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
})
export const metadata = getSEOTags();

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  const messages = await getMessages();
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  // Check if the locale from params is in the list of supported locales
  if (!config.i18n.locales.includes(locale)) {
    notFound();
  }
  
  return (
    <html lang={locale}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-72K51YGJZH"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-72K51YGJZH');
        `}
      </Script>
      <body className={`w-full h-full bg-[#dbd1ff] mx-auto ${inter.className} ${notoSansSC.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Provider>
              {children}
            </Provider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}