import SEOHead from '../../components/SEOHead';
import Logo from '../../components/Logo';

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service - LoonaFlow AI | Legal Terms and Conditions"
        description="Read the terms and conditions for using LoonaFlow AI's local business outreach platform. Understand your rights and obligations."
        keywords={[
          "loonaflow terms of service",
          "terms and conditions",
          "legal terms",
          "user agreement",
          "loonaflow ai terms",
          "service agreement",
          "platform terms"
        ]}
        canonical="https://loonaflow.app/terms"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Navigation Header */}
        <nav className="bg-white/20 backdrop-blur-md border-b border-white/30">
          <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center">
                <Logo size="md" />
              </a>
              <div className="flex items-center gap-6 text-sm">
                <a href="/" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Home
                </a>
                <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Pricing
                </a>
                <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Contact
                </a>
                <a href="/articles" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Articles
                </a>
                <a href="/privacy" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">📑 LoonaFlow AI – Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 mb-6">
                Last updated: August 25, 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-700 mb-4">
                  By accessing and using LoonaFlow AI ("Service"), you agree to be bound by these Terms. If you do not agree, you may not use the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
                <p className="text-slate-700 mb-4">
                  LoonaFlow AI is an outreach automation platform that provides:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Lead generation and scraping integrations</li>
                  <li>Email automation and campaign management</li>
                  <li>Email template creation and personalization</li>
                  <li>Analytics and reporting features</li>
                  <li>Deliverability and warmup tools</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Accounts</h2>
                <p className="text-slate-700 mb-4">
                  To use the Service, you must:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Be at least 18 years old or have parental consent</li>
                  <li>Provide accurate registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Acceptable Use Policy</h2>
                <p className="text-slate-700 mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Violate any applicable laws or regulations (including GDPR, CAN-SPAM, and the ePrivacy Directive)</li>
                  <li>Send spam, unsolicited bulk emails, or harass recipients</li>
                  <li>Collect or process personal data without a lawful basis</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Attempt unauthorized access to our systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Subscription and Billing</h2>
                <p className="text-slate-700 mb-4">
                  The Service offers free and paid subscription plans. Paid plans renew automatically unless cancelled. Fees are non-refundable except as required by law. We may change pricing with 30 days' notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Protection & Privacy</h2>
                <p className="text-slate-700 mb-4">
                  <strong>Roles</strong> – For account and platform usage data, LoonaFlow AI is the data controller. For contact data (e.g., emails, leads) uploaded or generated by users, the user is the data controller and LoonaFlow AI acts solely as a data processor, processing data only on user instructions.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Compliance</strong> – Users are solely responsible for ensuring that their use of the Service, including contacting leads, complies with all applicable laws and regulations.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Unsubscribe & Suppression</strong> – All outreach emails must include a clear unsubscribe option. LoonaFlow AI provides suppression functionality; users must not send further communication to unsubscribed contacts.
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Data Processing Addendum</strong> – A Data Processing Addendum (DPA) is available upon request.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Intellectual Property</h2>
                <p className="text-slate-700 mb-4">
                  The Service and its content are owned by LoonaFlow AI. You retain ownership of content you create using the Service but grant us a license to use it for providing and improving the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Service Availability</h2>
                <p className="text-slate-700 mb-4">
                  We aim for high availability but cannot guarantee uninterrupted access. Temporary outages may occur for maintenance or updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-700 mb-4">
                  To the maximum extent permitted by law, LoonaFlow AI shall not be liable for indirect, incidental, or consequential damages. Our total liability will not exceed the fees you paid in the 12 months before the claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Indemnification</h2>
                <p className="text-slate-700 mb-4">
                  You agree to indemnify and hold harmless LoonaFlow AI from any claims arising from your use of the Service, including violations of law or third-party rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Termination</h2>
                <p className="text-slate-700 mb-4">
                  We may suspend or terminate your account for violations of these Terms. Upon termination, your access will cease, and we may delete associated data unless retention is required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Governing Law</h2>
                <p className="text-slate-700 mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the Czech Republic and applicable European Union regulations, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts of Prague, Czech Republic.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Changes to Terms</h2>
                <p className="text-slate-700 mb-4">
                  We may update these Terms at any time. Material changes will be notified via email or within the Service. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Contact Information</h2>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">
                    <strong>Email:</strong> hello@loonaflow.app<br />
                    <strong>Address:</strong> LoonaFlow AI<br />
                    <strong>Subject:</strong> Terms of Service Inquiry
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 text-center">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30">
              <p className="text-slate-600 mb-4">Need help or have questions?</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/" className="text-violet-600 hover:text-violet-700 font-medium">
                  ← Back to Home
                </a>
                <a href="/contact" className="text-violet-600 hover:text-violet-700 font-medium">
                  Contact Support
                </a>
                <a href="/privacy" className="text-violet-600 hover:text-violet-700 font-medium">
                  Privacy Policy
                </a>
                <a href="/pricing" className="text-violet-600 hover:text-violet-700 font-medium">
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
