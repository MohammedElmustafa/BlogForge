'use client';
import { Hero } from "../components/frontend/Hero";
import { Footer } from "../components/frontend/Footer";
import { FaFilePdf } from "react-icons/fa";

export default function TermsPage(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <div className="flex flex-col flex-1 items-center justify-center">
        <div>
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>
            <p className="text-sm font-semibold leading-7 text-primary uppercase tracking-wide">
              Welcome to Our Service
            </p>
          </div>
          <div className="max-w-5xl mx-auto text-left">
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground flex items-center">
            Effective date: Sep 2024
            <a href="https://utfs.io/f/QNdj1LVCSHGVqbajmGD2EJNzPu7DCHLRc5MiSelmadGOfYAy" target="_blank">
              <FaFilePdf className="cursor-pointer text-primary size-8 ml-2" />
            </a>
          </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              These Terms of Service govern your use of our website and services. By accessing or using the service, you agree to be bound by these terms.
            </p>
            <br />
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p>Our service offers various features, including content creation, user engagement tools, and analytics. You are responsible for your usage and compliance with these terms. This introduction outlines the fundamental aspects of our service and the commitment to providing quality and reliable features.</p>
            <p>We prioritize user satisfaction and continually enhance our service to meet your needs. Our dedicated team is here to support you and ensure that you have the best experience possible.</p>
            <h2 className="text-2xl font-bold">2. Acceptance of Terms</h2>
            <p>By using our site, you agree to these terms. If you do not agree, do not use our services. It is your responsibility to review these terms periodically to stay informed about any updates or changes.</p>
            <p>Your continued use of the service after any changes to the terms constitutes acceptance of those changes.</p>
            <h2 className="text-2xl font-bold">3. Modifications to Terms</h2>
            <p>We may update these terms occasionally. We will notify you of any significant changes via email or through a prominent notice on our site.</p>
            <p>For example, if we introduce new features that affect how you interact with the service, we will inform you about those changes and provide updated terms.</p>
            <h2 className="text-2xl font-bold">4. Access to the Service</h2>
            <p>You must have a stable internet connection and compatible devices to access our services. We recommend using the latest versions of browsers for optimal performance.</p>
            <p>Access to our services is provided on a temporary basis, and we reserve the right to suspend or withdraw access without notice.</p>
            <h2 className="text-2xl font-bold">5. Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
            <p>For example, if you suspect any unauthorized access to your account, you should notify us immediately. We will not be liable for any losses arising from your failure to protect your account information.</p>
            <h2 className="text-2xl font-bold">6. Content</h2>
            <p>All content provided on our platform is protected by copyright laws. You may not reproduce or distribute any content without permission.</p>
            <p>We encourage users to create and share original content, but you must ensure that you have the rights to any materials you upload.</p>
            <p>For example, if you use images or videos, ensure that they are either your own or that you have obtained the necessary licenses.</p>
            <h2 className="text-2xl font-bold">7. Prohibited Uses</h2>
            <p>You agree not to engage in any activity that could harm the service or other users, including but not limited to harassment, spamming, or distributing malware.</p>
            <p>This includes using bots or automated systems to interact with the service in ways that disrupt normal user experiences.</p>
            <p>If you violate these terms, we reserve the right to terminate your access immediately.</p>
            <h2 className="text-2xl font-bold">8. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our service if you violate these terms. In case of termination, you will receive a notification explaining the reason for the action.</p>
            <p>You may also terminate your account at any time by contacting us. However, please note that termination does not absolve you of any obligations arising before the termination.</p>
            <h2 className="text-2xl font-bold">9. Disclaimer of Warranties</h2>
            <p>Our service is provided &quot;as is&quot; without any warranties of any kind. We do not guarantee uninterrupted or error-free service.</p>
            <p>While we strive to provide high-quality services, we do not warrant that the service will meet your expectations or that all errors will be corrected promptly.</p>
            <h2 className="text-2xl font-bold">10. Indemnification</h2>
            <p>You agree to indemnify and hold us harmless from any claims arising from your use of the service or your violation of these terms.</p>
            <p>This means that if someone makes a claim against us because of your actions, you will be responsible for any damages or expenses we incur.</p>
            <h2 className="text-2xl font-bold">11. Governing Law</h2>
            <p>These terms are governed by the laws of Any Country. Any disputes will be resolved in the courts of [Your Location].</p>
            <p>We encourage users to resolve any disputes amicably before seeking legal action. In the event of a legal dispute, the prevailing party may be entitled to recover reasonable attorneys&apos; fees.</p>
            <h2 className="text-2xl font-bold">12. Contact Information</h2>
            <p>If you have any questions about these terms, please contact us at info@blogforge.net. We value your feedback and are here to assist you with any concerns.</p>
            <h2 className="text-2xl font-bold">13. User Responsibilities</h2>
            <p>As a user, you are responsible for your actions while using our service. This includes ensuring that your conduct adheres to our community guidelines and does not infringe on the rights of others.</p>
            <p>For instance, do not post content that is abusive, threatening, or otherwise objectionable.</p>
            <h2 className="text-2xl font-bold">14. Third-Party Links</h2>
            <p>Our service may contain links to third-party websites. We do not endorse these sites and are not responsible for their content or practices.</p>
            <p>When you click on a link to a third-party site, you should review their privacy policy and terms of service as we have no control over their practices.</p>
            <h2 className="text-2xl font-bold">15. Feedback</h2>
            <p>We welcome feedback from our users. If you have suggestions or comments about improving our service, please reach out to us.</p>
            <p>Your feedback helps us enhance our offerings and provide a better experience for all users.</p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Thank you for using our services! We appreciate your commitment to adhering to these terms.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}