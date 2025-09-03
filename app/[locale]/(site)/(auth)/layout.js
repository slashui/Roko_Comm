
import AuthBrand from '@/components/AuthBrand'

import { Toaster } from 'react-hot-toast'
import { useLocale } from "next-intl";
import { getSEOTags } from '@/libs/seo';
import {NextIntlClientProvider, useMessages} from 'next-intl';

export const metadata = getSEOTags();
  export default function RootLayout({ children, params }) {
    const messages = useMessages();
    const locale = useLocale();

    // Show a 404 error if the user requests an unknown locale
    if (params.locale !== locale) {
      notFound();
    }
    return (
     <html lang={locale}>
      <body>
      <Toaster position='top-center' />
        <div className='w-full h-screen flex flex-row bgg'>
          <div className='w-1/2 h-full hidden md:block'><AuthBrand /></div>
          <div className='w-full md:w-1/2 h-full relative flex bg-black items-center justify-center'>
          <NextIntlClientProvider messages={messages}>
            {children}
            </NextIntlClientProvider>
          </div>
        </div>
        </body>
     </html>
    )

  }