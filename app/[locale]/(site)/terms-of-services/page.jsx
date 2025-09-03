import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://oneday.build
// - Name: oneday.build
// - Contact information: bassnova@gmail.com
// - Description: OneDay.Build provides individual developers or startups with a set of basic functionality packages for building a SaaS platform.  to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 3 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://oneday.build/en/terms-of-services
// - Governing Law: American
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">

        <h1 className="text-6xl font-extrabold pb-6 font-Bebas text-primary">
          Terms of Service for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap font-Courier text-white"

        >

          Welcome to OneDay.Build! These Terms of Service outline the rules and regulations for the use of our website, <a href="https://oneday.build" className="text-primary font-bold">https://oneday.build</a> (the "Site").
          <br /><br />
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use OneDay.Build if you do not agree to take all of the terms and conditions stated on this page.

          <h1 className="text-xl my-4">Introduction</h1>
          OneDay.Build is a product developed and provided by AgentFusion LLC, a company specializing in developer tools and solutions. By using OneDay.Build, located at https://oneday.build, you acknowledge and agree to these terms and conditions. AgentFusion LLC offers this service to help individual developers and startups rapidly build and launch SaaS platforms with essential features.

          <h1 className="text-xl my-4">Agreement to Terms</h1>
          This Agreement is effective upon your first use of OneDay.Build and governs your access to and use of the services provided by AgentFusion LLC through OneDay.Build. These terms constitute a legally binding agreement between you and AgentFusion LLC.
          <h1 className="text-xl my-4 ">Grant of License</h1>
          OneDay.Build grants you a limited, non-exclusive, non-transferable license to access and use our services primarily for creating and managing your online presence. This license is subject to this Terms of Service and does not include any resale or commercial use of our services.

          <h1 className="text-xl my-4 ">Refunds Policy</h1>
          We offer a refund within 3 days of purchase if you are not satisfied with our service. To request a refund, please contact our support team with your purchase details.

          <h1 className="text-xl my-4 ">Disclaimer of Warranties</h1>
          OneDay.Build does not guarantee that the service will meet your requirements or that its operation will be uninterrupted or error-free. We exclude all implied warranties or conditions to the extent permitted by law. OneDay.Build is not responsible for any loss of data, profits, or other damages arising from the use of our service.

          <h1 className="text-xl my-4 ">Limitation of Liability</h1>
          OneDay.Build’s liability for any claim related to these terms or the services provided shall be limited to the amount you paid for the services. We are not liable for any indirect, incidental, special, or consequential damages.

          <h1 className="text-xl my-4 ">User Responsibilities</h1>
          Users are solely responsible for their activities on OneDay.Build, including the content they upload, the legality, and the rights to use such content.

          <h1 className="text-xl my-4">Grant of License</h1>
          OneDay.Build grants you a limited, non-exclusive, non-transferable license to access and use our services primarily for creating and managing your online presence. This license is subject to this Terms of Service and does not include any resale or commercial use of our services.
          <br />
          Upon purchasing a package, you are granted ownership of the code provided for creating your applications. However, this ownership is subject to the following restrictions:
          <br />
          <ul className="list-disc list-inside mt-4 mb-4 space-y-2">
            <li>You may use, modify, and incorporate the code into your own projects.</li>
            <li>You do not have the right to resell, redistribute, or relicense the code, either in its original form or as part of a derivative work, to any third party.</li>
            <li>You may not use the code to create a competing service or product that directly rivals OneDay.Build's offerings.</li>
            <li>The intellectual property rights of the underlying framework and tools remain with OneDay.Build.</li>
          </ul>

          Any attempt to resell, redistribute, or relicense the code in violation of these terms may result in the immediate termination of your license and potential legal action.

          <h1 className="text-xl my-4 ">Modifications to Terms</h1>
          OneDay.Build reserves the right to modify these terms at any time. We will post the revised terms on our website with an updated effective date.

          <h1 className="text-xl my-4 ">Contact Information</h1>
          For any questions regarding these terms, please contact us at <a href="mailto:bassnova@gmail.com" className="text-primary font-bold">bassnova@gmail.com</a>.
          <br /><br />
          Please read our Privacy Policy for information about how we collect, use, and disclose information about you.
          <br /><br />
          Last updated: 2024-10-10
        </pre>
      </div>
    </main>
  );
};

export default TOS;
