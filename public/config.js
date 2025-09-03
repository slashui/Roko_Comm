
const config = {
  // The three items here are mandatory and are basic information about your startup that is vital for SEO. 
  // The domain name part is not required “https://”, “www”, and finally no slash. just the naked domain.
  // The contact email is used for the support email in the app, and also for the Mailgun integration (if you use it).
  appName:        "OneDay.Build",
  appDescription: "OneDay.Build provides individual developers or startups with a set of basic functionality packages for building a SaaS platform.The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app.",
  domainName:     "OneDay.Build",
  contactEmail:   "bassnova@gmail.com",
  ogImage: "https://OneDay.Build/images/og.png",
	links: {
		twitter: "https://twitter.com/OneDayBuild",
		instagram: "https://instagram.com/OneDayBuild",
	},



  // Next is the basic setup of the platform
  // The platform is set up in multiple languages, with default languages. If you don't need to configure multi-language, please download the source code of the version without multi-language switch.
  // I18n multiple languages package are available in root/libs/i18n/messages. default language is en.json. If you need to add more languages, please add them in this folder. 
  // You can also add more languages use a language translation tool.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cn"],
  },
  // Set the theme of the platform, dark or light style. default is dark.
  // Below you can set the base background color and text color for dark and light.This can be a custom color, like: "#f37055". or a tailwindcss style name, like: "bg-primary-500"
  // Set the highlight color of the platform in main, if you think the default value is OK, you can not change it.
  colors: {
    theme: "dark",
    primary: "#EBFF00",
  },
  










  


};

export default config;
