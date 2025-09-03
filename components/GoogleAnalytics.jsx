import React from 'react';

/**
 * Google Analytics Component
 * 
 * Embeds Google Analytics tracking code to monitor website traffic and user behavior.
 */


const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src={`https://www.google-analytics.com/analytics.js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${process.env.GOOGLE_ANALYTICS_ID}', 'auto');
            ga('send', 'pageview');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;