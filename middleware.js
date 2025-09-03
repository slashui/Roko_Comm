import createMiddleware from 'next-intl/middleware';
import { localePrefix } from './navigation'
import gconfig from './config';

export default createMiddleware({
  locales: gconfig.i18n.locales,
  localePrefix,
  defaultLocale: gconfig.i18n.defaultLocale
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};