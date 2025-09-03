import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://Claude.ai
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
// - Link to privacy-policy: https://oneday.build/en/privacy
// - Governing Law: American
// - Updates to the Terms: users will be updated by email

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">

        <h1 className="text-6xl font-Bebas pb-6 text-primary">
          Privacy Policy for {config.appName}
        </h1>

        <pre className="leading-relaxed whitespace-pre-wrap font-Courier text-white">
          Your privacy is critically important to us at OneDay.Build, a product developed and provided by AgentFusion LLC. This Privacy Policy outlines our guidelines for the collection, use, and disclosure of information we receive from users of <a href="https://oneday.build" className="text-primary font-bold">OneDay.Build</a>.

          AgentFusion LLC ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at <a href="mailto:bassnova@gmail.com" className="text-primary font-bold">bassnova@gmail.com</a>.

          <h1 className="text-xl my-4">Information We Collect</h1>

          We collect information primarily to process payments and provide a seamless experience for our services. This includes, but is not limited to, personal information such as your name, email address, and payment information through our payment processing partner, Stripe.

          We also use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

          <h1 className="text-xl my-4 ">Use of Information</h1>

          We use the collected information for the following purposes:
          <br /><br />
          Order Processing: We use your personal data to process your orders and provide you with the requested services.
          Data Retention and Security
          <br /><br />
          We retain personal information only as long as necessary to provide you with our services. We commit to protecting stored data with commercially acceptable means to prevent loss, theft, unauthorized access, disclosure, copying, use, or modification.

          <h1 className="text-xl my-4 ">Data Sharing</h1>

          We do not share any personally identifiable information publicly or with third-parties, except as necessary for payment processing through Stripe or when legally required.

          <h1 className="text-xl my-4 ">Data Controller and Processor</h1>

          OneDay.Build acts as both a data controller and processor regarding personal data handled through our services, adhering to applicable data protection laws, including the EU General Data Protection Regulation (GDPR).

          <h1 className="text-xl my-4 ">External Links</h1>

          Our website may contain links to external sites. We have no control over the content and practices of these sites and cannot assume responsibility for their privacy policies.

          <h1 className="text-xl my-4 ">User Rights</h1>

          Users have the right to refuse the provision of personal data, understanding that this may prevent us from providing certain services. Users also have the right to access, rectify, or delete their personal data held by us.

          <h1 className="text-xl my-4 ">Updates to the Privacy Policy</h1>

          We reserve the right to modify this policy as necessary. Any changes will be reflected here, with the updated effective date.

          <h1 className="text-xl my-4 ">Contact Us</h1>

          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:bassnova@gmail.com" className="text-primary font-bold">bassnova@gmail.com</a>.
          <br /><br />
          Continued use of our website signifies acceptance of our privacy practices.
          <br /><br />
          Last updated: 2024-10-10

        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
