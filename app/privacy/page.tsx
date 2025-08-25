import SEOHead from '../../components/SEOHead';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - LoonaFlow AI | How We Use Your Data"
        description="Learn about how LoonaFlow AI collects, uses, and protects your personal information and data privacy practices."
        keywords={[
          "loonaflow privacy policy",
          "data protection",
          "cookie policy",
          "privacy practices",
          "loonaflow ai privacy",
          "user data protection",
          "GDPR compliance"
        ]}
        canonical="https://loonaflow.app/privacy"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 mb-6">
                Last updated: August 25, 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
                <p className="text-slate-700 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support. This may include:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Name and email address</li>
                  <li>Company information</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-slate-700 mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Provide personalized content and features</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve our services and user experience</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Types of Cookies We Use:</h3>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Essential Cookies</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    These cookies are necessary for the website to function properly. They enable basic functions 
                    like page navigation, access to secure areas, and authentication.
                  </p>
                  
                  <h4 className="font-semibold text-slate-900 mb-2">Analytics Cookies</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  
                  <h4 className="font-semibold text-slate-900 mb-2">Functional Cookies</h4>
                  <p className="text-slate-700 text-sm">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our services and develop new features</li>
                  <li>Protect against fraud and ensure security</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Information Sharing</h2>
                <p className="text-slate-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist in operating our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
                <p className="text-slate-700 mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of 
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
                <p className="text-slate-700 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-slate-700 mb-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Us</h2>
                <p className="text-slate-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700">
                    <strong>Email:</strong> hello@loonaflow.app<br />
                    <strong>Address:</strong> LoonaFlow AI<br />
                    <strong>Subject:</strong> Privacy Policy Inquiry
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Changes to This Policy</h2>
                <p className="text-slate-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
