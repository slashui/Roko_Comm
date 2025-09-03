import { getRequestConfig } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // 使用新的 requestLocale 参数
  const locale = await requestLocale || await getLocale();
  
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});


