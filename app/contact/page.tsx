"use client";

import Contact from '../../components/Contact';
import SEOHead from '../../components/SEOHead';

export default function ContactPage() {
  return (
    <>
      <SEOHead 
        title="Contact LoonaFlow AI - Get Support for Local Business Outreach"
        description="Get in touch with the LoonaFlow AI team. We're here to help with your local business outreach, lead generation, and email automation needs."
        keywords={[
          "contact loonaflow",
          "loonaflow support",
          "local business outreach help",
          "lead generation support",
          "email automation help",
          "loonaflow ai contact",
          "business outreach support"
        ]}
        canonical="https://loonaflow.app/contact"
      />
      <Contact />
    </>
  );
}
