import createMiddleware from 'next-intl/middleware';
import gconfig from './config';
export default createMiddleware({
  // A list of all locales that are supported
  locales: gconfig.i18n.locales,
 
  // Used when no locale matches
  defaultLocale: gconfig.i18n.defaultLocale
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|cn)/:path*']
};