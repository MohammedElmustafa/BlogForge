import { Footer } from "@/app/components/frontend/Footer";
import { Hero } from "@/app/components/frontend/Hero";
import { FaFilePdf } from "react-icons/fa";
export default async function PrivacyRoute() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="text-sm font-semibold leading-7 text-primary uppercase tracking-wide">
            Your privacy is important to us
          </p>
        </ div>
          <div className="max-w-5xl mx-auto text-left">
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground flex items-center">
            Effective date: Sep 2024
            <a href="https://utfs.io/f/QNdj1LVCSHGVCqZ2GctzDh6g8f7zcHtA5aoNUpeVEMkJWSvs" target="_blank">
              <FaFilePdf className="cursor-pointer text-primary size-8 ml-2" />
            </a>
          </p>
          <h2 className="mt-4 text-2xl font-bold">1. Introduction</h2>
          <p className="mt-2">
            At Blog Forge, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website blogforge.net (the &quot;Site&quot;). We aim to be transparent about our practices, so you can make informed decisions about your interactions with us.
          </p>

          <h2 className="mt-4 text-2xl font-bold">2. Information We Collect</h2>
          <p className="mt-2">
            We may collect the following types of information:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li><strong>Personal Information:</strong> We may collect personal information that you provide to us, such as your name, email address, and contact information when you register, subscribe, or interact with our Site.</li>
            <li><strong>Usage Data:</strong> We may collect information about how you use our Site, including your IP address, browser type, pages visited, and time spent on those pages. This information helps us analyze trends and improve our Site.</li>
            <li><strong>Cookies:</strong> We may use cookies and similar tracking technologies to monitor activity on our Site and store certain information. You can manage your cookie preferences through your browser settings.</li>
            <li><strong>Feedback and Survey Data:</strong> If you participate in surveys, contests, or provide feedback, we may collect the information you provide.</li>
          </ul>

          <h2 className="mt-4 text-2xl font-bold">3. How We Use Your Information</h2>
          <p className="mt-2">
            We may use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>To provide, maintain, and improve our Site and services.</li>
            <li>To communicate with you, including responding to your comments and questions, and sending you updates and newsletters.</li>
            <li>To analyze usage of our Site to improve user experience and to develop new services.</li>
            <li>To detect, prevent, and address technical issues.</li>
            <li>To send you marketing communications and promotional offers that may be of interest to you, if you have opted to receive such communications.</li>
          </ul>

          <h2 className="mt-4 text-2xl font-bold">4. Sharing Your Information</h2>
          <p className="mt-2">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>With service providers who assist us in operating our Site and conducting our business, such as hosting providers, payment processors, and email service providers.</li>
            <li>When required by law or in response to legal requests.</li>
            <li>To protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others.</li>
            <li>In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          <h2 className="mt-4 text-2xl font-bold">5. Your Rights</h2>
          <p className="mt-2">
            Depending on your jurisdiction, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>

          <h2 className="mt-4 text-2xl font-bold">6. Security of Your Information</h2>
          <p className="mt-2">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
          </p>

          <h2 className="mt-4 text-2xl font-bold">7. Children&apos;s Privacy</h2>
          <p className="mt-2">
            Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to remove that information from our servers promptly. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
          </p>

          <h2 className="mt-4 text-2xl font-bold">8. Changes to This Privacy Policy</h2>
          <p className="mt-2">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with a new effective date. You are advised to review this Privacy Policy periodically for any changes. Your continued use of the Site after the posting of changes constitutes your acceptance of such changes.
          </p>

          <h2 className="mt-4 text-2xl font-bold">9. Contact Us</ h2>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li>Email: info@blogforge.net</li>
            <li>Phone: +1 (123) 456-7890</li>
          </ul>

          <h2 className="mt-4 text-2xl font-bold">10. Data Retention</h2>
          <p className="mt-2">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>

          <h2 className="mt-4 text-2xl font-bold">11. Third-Party Services</h2>
          <p className="mt-2">
            We may employ third-party companies and individuals to facilitate our Site (&quot;Service Providers&quot;), provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Site is used. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>

          <h2 className="mt-4 text-2xl font-bold">12. Links to Other Sites</h2>
          <p className="mt-2">
            Our Site may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy and terms of service of any site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2 className="mt-4 text-2xl font-bold">13. International Data Transfers</h2>
          <p className="mt-2">
            Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside [Your Country] and choose to provide information to us, please note that we transfer the data, including personal data, to [Your Country] and process it there.
          </p>

          <h2 className="mt-4 text-2xl font-bold">14. Compliance with Laws</h2>
          <p className="mt-2">
            We will disclose your personal information where required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
          </p>

          <h2 className="mt-4 text-2xl font-bold">15. Your Consent</h2>
          <p className="mt-2">
            By using our Site, you consent to our Privacy Policy and agree to its terms.
          </p>

          <h2 className="mt-4 text-2xl font-bold">16. Marketing Communications</h2>
          <p className="mt-2">
            If you have opted to receive marketing communications from us, we may use your personal information to send you newsletters, marketing materials, and other information that may be of interest to you. You can opt-out of receiving these communications at any time by following the unsubscribe link in the emails we send or by contacting us directly.
          </p>

          <h2 className="mt-4 text-2xl font-bold">17. Opting Out of Cookies</h2>
          <p className="mt-2">
            You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site. For more information about how to manage cookies, please visit [link to cookie management instructions].
          </p>

          <h2 className="mt-4 text-2xl font-bold">18. GDPR Compliance</h2>
          <p className="mt-2">
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights. Blog Forge aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
          </p>

          <h2 className="mt-4 text-2xl font-bold">19. CCPA Compliance</h2>
          <p className="mt-2">
            If you are a California resident, you have the right to request information from us regarding the disclosure of your personal information to third parties for their direct marketing purposes. To make such a request, please contact us using the contact information provided in this Privacy Policy.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
