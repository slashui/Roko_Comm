export const locales = ['en', 'cn']
export const localePrefix = 'always'

export function getLocalePartsFrom({ pathname, locale }) {
  return {
    locale,
    pathname
  }
}