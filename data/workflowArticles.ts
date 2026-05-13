export type WorkflowArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  readTime: string;
  date: string;
  updated: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  quickAnswer: string;
  intro: string[];
  sections: Array<{
    title: string;
    body: string;
    bullets?: string[];
    callout?: string;
  }>;
  exampleTitle: string;
  exampleBody: string;
  exampleItems: string[];
  mistakes: string[];
  getStarted: {
    title: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedLinks: Array<{
    label: string;
    href: string;
    description: string;
  }>;
};

export const workflowArticles: WorkflowArticle[] = [
  {
    slug: "how-to-find-100-local-business-leads",
    title: "How to Find 100 Local Business Leads in One Afternoon",
    metaTitle: "How to Find 100 Local Business Leads in One Afternoon | LoonaFlow AI",
    metaDescription:
      "A practical workflow for finding 100 local business leads fast without building a messy spreadsheet. Learn how to pick a niche, choose cities, qualify prospects, and prepare outreach.",
    keywords: [
      "how to find local business leads",
      "find 100 local business leads",
      "local business leads",
      "Google Maps lead generation",
      "local lead generation",
      "business prospecting workflow",
      "B2B lead generation for local businesses",
      "AI lead generation"
    ],
    category: "Workflow Guide",
    readTime: "9 min read",
    date: "2026-05-14",
    updated: "2026-05-14",
    eyebrow: "Local Lead Generation Workflow",
    heroTitle: "How to Find 100 Local Business Leads in One Afternoon",
    heroDescription:
      "A simple, human workflow for building a useful local prospect list without spending the whole day copying names from Google Maps.",
    quickAnswer:
      "To find 100 local business leads quickly, pick one niche, choose 3 to 5 cities, search with buyer-intent keywords, remove poor-fit businesses, collect the basics, and group leads by message angle before you start outreach.",
    intro: [
      "Most people make local lead generation harder than it needs to be. They open a spreadsheet, search a broad term like \"restaurants near me\", copy anything that looks like a business, and end up with a list they do not trust.",
      "A better approach is narrower and more intentional. If you know who you are helping, where they are, and why they might care, 100 leads is not a random number. It becomes a focused starter list for a real campaign.",
      "This guide is written for founders, freelancers, agencies, and small sales teams who need a practical way to build a clean list and move into outreach the same day."
    ],
    sections: [
      {
        title: "1. Pick one niche before you search",
        body:
          "The fastest way to waste an afternoon is to search every kind of business at once. Start with one niche where your offer is easy to understand, such as dentists, HVAC contractors, med spas, accountants, law firms, or real estate agencies.",
        bullets: [
          "Choose a niche with a clear business problem you can solve.",
          "Avoid mixing unrelated businesses in the same campaign.",
          "Write down the reason this niche would care before you collect leads."
        ],
        callout:
          "Good example: \"I help dental clinics get more implant consultation requests.\" Weak example: \"I help local businesses grow.\""
      },
      {
        title: "2. Choose cities where outreach can feel local",
        body:
          "Local outreach works better when your email sounds like it came from someone who understands the area. Choose a few cities or neighborhoods instead of searching an entire country.",
        bullets: [
          "Start with 3 to 5 cities, not 30.",
          "Use nearby cities if your offer has regional relevance.",
          "Keep each city grouped so you can personalize subject lines and first lines."
        ]
      },
      {
        title: "3. Search with problem-aware keywords",
        body:
          "Do not only search for the business type. Search for signals that match your offer. If you sell website redesigns, look for businesses with old sites, missing booking flows, weak review pages, or no clear call to action.",
        bullets: [
          "For web design: \"dentist city\", \"dental clinic city\", \"cosmetic dentist city\".",
          "For marketing: \"med spa city\", \"aesthetic clinic city\", \"laser hair removal city\".",
          "For B2B services: \"accounting firm city\", \"law firm city\", \"insurance agency city\"."
        ]
      },
      {
        title: "4. Qualify while you collect",
        body:
          "A lead is not just a company name. A useful lead has enough context to explain why you are reaching out. As you collect, remove businesses that clearly do not fit your offer.",
        bullets: [
          "Skip closed businesses, franchises that require corporate approval, and companies with no visible fit.",
          "Keep businesses with active websites, recent reviews, and signs they care about growth.",
          "Add one note per lead so your first email does not sound generic."
        ]
      },
      {
        title: "5. Split leads by message angle",
        body:
          "Before sending anything, group leads by the reason they might care. This is where humanized outreach starts. You are not blasting 100 strangers. You are starting 3 or 4 focused conversations.",
        bullets: [
          "Group 1: Businesses with strong reviews but weak websites.",
          "Group 2: Businesses running ads but missing landing pages.",
          "Group 3: Businesses with multiple locations and inconsistent messaging.",
          "Group 4: Businesses with no obvious follow-up or booking flow."
        ]
      },
      {
        title: "6. Move into outreach while the context is fresh",
        body:
          "The best time to write your first email is right after you review the list. You remember what stood out, which makes the message sound more specific and less automated.",
        bullets: [
          "Write one simple template for each message angle.",
          "Personalize the first line with a real observation.",
          "Send in small batches so you can improve the copy as replies come in."
        ]
      }
    ],
    exampleTitle: "A simple 100-lead plan",
    exampleBody:
      "Here is a realistic structure for one afternoon. It keeps the list focused enough to use, but broad enough to test your offer.",
    exampleItems: [
      "Niche: dental clinics",
      "Cities: Austin, Dallas, Fort Worth, San Antonio",
      "Goal: find clinics that could improve consultation booking",
      "Lead groups: weak website, strong reviews, no online booking, multiple locations",
      "Outreach angle: \"I noticed a few places where patients may drop off before booking.\""
    ],
    mistakes: [
      "Collecting leads before you know the offer.",
      "Mixing too many industries in one campaign.",
      "Sending the same email to every business.",
      "Ignoring local context like city, service area, or customer type.",
      "Measuring success only by open rate instead of replies and booked calls."
    ],
    getStarted: {
      title: "Turn your next afternoon into a real prospect list",
      body:
        "LoonaFlow AI helps you find local businesses by niche and country, organize leads, personalize emails, and track replies from one place.",
      primaryHref: "/signup",
      primaryLabel: "Start Free",
      secondaryHref: "/seo/local-business-leads",
      secondaryLabel: "Learn About Local Business Leads"
    },
    faqs: [
      {
        question: "How many local business leads should I collect before sending outreach?",
        answer:
          "Start with 50 to 100 leads in one clear niche. That is enough to test your offer, subject line, and first message without creating a list so large that you cannot personalize it."
      },
      {
        question: "What makes a local business lead worth contacting?",
        answer:
          "A good lead has a clear fit for your offer, public business information, a reachable website or contact channel, and at least one real reason your message would make sense."
      },
      {
        question: "Should I use Google Maps for local lead generation?",
        answer:
          "Google Maps is a useful starting point because it shows local businesses, categories, reviews, locations, and websites. The important part is qualifying the list before outreach."
      }
    ],
    relatedLinks: [
      {
        label: "Local Business Leads",
        href: "/seo/local-business-leads",
        description: "See how LoonaFlow approaches local business lead generation."
      },
      {
        label: "Google Maps Lead Generation",
        href: "/articles/google-maps-lead-generation-2025",
        description: "A deeper guide to finding and researching businesses with Google Maps."
      },
      {
        label: "Find Dental Clinics",
        href: "/for/dental-clinics",
        description: "An example industry page for niche-specific prospecting."
      }
    ]
  },
  {
    slug: "how-agencies-build-prospect-list-before-ads",
    title: "How Agencies Can Build a Prospect List Before Launching Ads",
    metaTitle: "How Agencies Can Build a Prospect List Before Launching Ads | LoonaFlow AI",
    metaDescription:
      "A practical prospecting workflow for agencies before they spend on ads. Learn how to validate a niche, build a lead list, write useful outreach, and test demand first.",
    keywords: [
      "agency prospect list",
      "build prospect list before ads",
      "lead generation for agencies",
      "marketing agency outreach",
      "agency client acquisition",
      "B2B prospecting for agencies",
      "local business outreach"
    ],
    category: "Agency Growth",
    readTime: "8 min read",
    date: "2026-05-14",
    updated: "2026-05-14",
    eyebrow: "Agency Prospecting Workflow",
    heroTitle: "How Agencies Can Build a Prospect List Before Launching Ads",
    heroDescription:
      "Before you spend money on ads, build a small list of real businesses and test whether your offer creates conversations.",
    quickAnswer:
      "Agencies should build a prospect list before running ads by choosing one offer, defining the best-fit local businesses, collecting leads by niche and city, checking visible pain points, and sending a small batch of personal outreach to validate demand.",
    intro: [
      "Ads can scale an agency, but they can also hide a weak offer. If your message does not work in direct outreach, paid traffic usually makes the problem more expensive.",
      "A prospect list gives you a faster feedback loop. You can see who responds, what objections come up, which niches understand the offer, and what language gets people to book a call.",
      "This workflow is for agencies that want to validate a service, enter a new local market, or test a niche before committing budget."
    ],
    sections: [
      {
        title: "1. Start with one service, not your whole agency",
        body:
          "Local businesses do not respond to a menu of services. They respond to a specific outcome. Pick one service you can explain in a sentence.",
        bullets: [
          "Website redesign for clinics that need more bookings.",
          "SEO cleanup for service businesses with weak local visibility.",
          "Paid ads setup for businesses that already have strong reviews.",
          "Email follow-up systems for businesses losing inbound leads."
        ]
      },
      {
        title: "2. Define what a good prospect looks like",
        body:
          "Before searching, write down the signals that make a business worth contacting. This keeps your list useful and protects your team from chasing bad-fit accounts.",
        bullets: [
          "They sell a service with meaningful customer value.",
          "They have recent reviews or signs of active demand.",
          "Their website or funnel has an obvious improvement opportunity.",
          "They are reachable by email, contact form, or phone."
        ]
      },
      {
        title: "3. Build a test list by niche and city",
        body:
          "A focused list of 75 to 150 businesses is enough to test a niche. Keep the first version small so you can personalize it and learn from the replies.",
        bullets: [
          "Choose one niche, such as dentists, med spas, roofers, accountants, or law firms.",
          "Choose a few cities where your examples and language will feel relevant.",
          "Create one note per prospect about what you noticed."
        ]
      },
      {
        title: "4. Write the outreach before you launch ads",
        body:
          "Your outreach message becomes the seed for your ad copy. If the direct message is vague, the ad will probably be vague too.",
        bullets: [
          "Lead with the problem you noticed, not your agency name.",
          "Use plain language a business owner would actually say.",
          "Ask for a small next step, not a full sales call immediately."
        ],
        callout:
          "A useful test: if your email sounds awkward when read out loud, rewrite it before sending."
      },
      {
        title: "5. Track replies like market research",
        body:
          "The first campaign is not only about closing clients. It is also research. Look for repeated objections, confused responses, and phrases prospects use to describe the problem.",
        bullets: [
          "Save positive replies and objections.",
          "Note which niche responds fastest.",
          "Use real reply language in your ads and landing pages."
        ]
      },
      {
        title: "6. Only scale the message that earned a response",
        body:
          "Once a specific niche and offer starts getting replies, then ads make more sense. You are no longer guessing. You are amplifying a message that already started conversations.",
        bullets: [
          "Turn common objections into landing page sections.",
          "Turn the strongest outreach angle into ad hooks.",
          "Retarget prospects who visited your site but did not book."
        ]
      }
    ],
    exampleTitle: "A pre-ad validation workflow",
    exampleBody:
      "This is how a web design agency could test a local niche before spending on ads.",
    exampleItems: [
      "Offer: booking-focused website redesign",
      "Niche: med spas",
      "Cities: Phoenix, Scottsdale, Tempe",
      "Prospect signal: strong reviews but unclear booking flow",
      "CTA: \"Want me to send over the 3 booking leaks I noticed?\""
    ],
    mistakes: [
      "Launching ads before knowing which niche cares.",
      "Writing outreach that talks more about the agency than the prospect.",
      "Building a giant list without qualification notes.",
      "Ignoring negative replies that explain why the offer is unclear.",
      "Using ad budget to compensate for weak positioning."
    ],
    getStarted: {
      title: "Validate your agency offer before you buy traffic",
      body:
        "Use LoonaFlow AI to build niche prospect lists, personalize outreach, and learn which message deserves ad budget.",
      primaryHref: "/signup",
      primaryLabel: "Build Your First List",
      secondaryHref: "/for/marketing-agencies",
      secondaryLabel: "Lead Generation for Agencies"
    },
    faqs: [
      {
        question: "Should agencies run ads or cold outreach first?",
        answer:
          "If the offer is new, cold outreach first is usually smarter. It gives you direct feedback from real prospects before you spend money scaling the message."
      },
      {
        question: "How many prospects should an agency test before launching ads?",
        answer:
          "A focused test of 75 to 150 prospects can be enough to spot patterns. The goal is not volume. The goal is to learn whether the niche understands and wants the offer."
      },
      {
        question: "What should agencies track during prospecting?",
        answer:
          "Track reply rate, positive replies, booked calls, objections, niche, city, and the specific message angle. Those signals can shape better landing pages and ad campaigns."
      }
    ],
    relatedLinks: [
      {
        label: "Marketing Agencies",
        href: "/for/marketing-agencies",
        description: "See how marketing agencies can use LoonaFlow for client acquisition."
      },
      {
        label: "Business Prospecting Tools",
        href: "/seo/business-prospecting-tools",
        description: "Compare how prospecting tools help teams find better-fit accounts."
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Review plans before testing your first prospecting workflow."
      }
    ]
  },
  {
    slug: "how-to-contact-local-businesses-without-sounding-spammy",
    title: "How to Contact Local Businesses Without Sounding Spammy",
    metaTitle: "How to Contact Local Businesses Without Sounding Spammy | LoonaFlow AI",
    metaDescription:
      "Learn how to contact local businesses with respectful, specific outreach that sounds human. Includes examples, mistakes to avoid, and a practical email structure.",
    keywords: [
      "contact local businesses",
      "local business outreach",
      "how to email local businesses",
      "cold email local businesses",
      "non spammy cold email",
      "personalized outreach",
      "email outreach automation"
    ],
    category: "Outreach Strategy",
    readTime: "8 min read",
    date: "2026-05-14",
    updated: "2026-05-14",
    eyebrow: "Human Outreach Guide",
    heroTitle: "How to Contact Local Businesses Without Sounding Spammy",
    heroDescription:
      "A practical guide to writing local outreach that feels specific, respectful, and useful instead of automated and forgettable.",
    quickAnswer:
      "To contact local businesses without sounding spammy, keep the message short, mention a real observation, connect it to one clear business problem, offer a small next step, and avoid fake urgency, exaggerated claims, and over-personalization.",
    intro: [
      "Local business owners can spot a mass email quickly. They see vague compliments, long intros, fake urgency, and messages that could have been sent to any company in any city.",
      "The fix is not to write longer emails. The fix is to write more honest ones. A good local outreach email says why you are reaching out, why it is relevant, and what the next step is.",
      "This page gives you a simple structure you can use whether you are selling web design, SEO, software, consulting, recruiting, or another B2B service."
    ],
    sections: [
      {
        title: "1. Start with a real reason",
        body:
          "The first line should prove that you know who you are contacting. It does not need to be clever. It needs to be true.",
        bullets: [
          "Mention their city, service, reviews, website, recent post, or booking process.",
          "Avoid generic praise like \"I love what you are doing\" unless you can explain why.",
          "Use one observation, not a paragraph of forced personalization."
        ]
      },
      {
        title: "2. Connect the observation to a business outcome",
        body:
          "A local business does not care that you found a website issue. They care if it affects calls, bookings, leads, trust, or time.",
        bullets: [
          "Weak: \"Your website could be better.\"",
          "Better: \"Your reviews are strong, but the booking button is hard to find on mobile.\"",
          "Best: \"That may be costing you consultation requests from people who are already interested.\""
        ]
      },
      {
        title: "3. Keep the email short enough to read on a phone",
        body:
          "Many local business owners read email between appointments, jobs, or customer calls. If your message needs three scrolls, it probably will not be read.",
        bullets: [
          "Aim for 80 to 130 words.",
          "Use short sentences and clear spacing.",
          "Make one point, not five."
        ]
      },
      {
        title: "4. Ask for a small next step",
        body:
          "Do not ask a cold prospect to commit to a long meeting immediately. Offer something easy to say yes to, such as sending a short audit, sharing examples, or asking if the topic is relevant.",
        bullets: [
          "\"Want me to send over the 3 things I noticed?\"",
          "\"Would it be useful if I shared a quick example?\"",
          "\"Is improving this a priority right now?\""
        ]
      },
      {
        title: "5. Be transparent about automation",
        body:
          "Automation is not the problem. Careless automation is. If you use a tool, use it to organize research and follow-ups, not to pretend every email was handwritten from scratch.",
        bullets: [
          "Personalize the first line and the reason for outreach.",
          "Keep follow-ups polite and easy to opt out of.",
          "Stop messaging people who show no interest."
        ]
      },
      {
        title: "6. Follow up like a person",
        body:
          "A good follow-up adds context. A bad follow-up just says \"bumping this\" five times. Each follow-up should either clarify the value or make it easy to close the loop.",
        bullets: [
          "Follow-up 1: restate the problem in one sentence.",
          "Follow-up 2: share a useful example or quick win.",
          "Follow-up 3: politely close the loop."
        ]
      }
    ],
    exampleTitle: "A non-spammy local outreach example",
    exampleBody:
      "Here is a simple message for a web design agency contacting a local clinic.",
    exampleItems: [
      "Subject: quick note about your booking page",
      "Hi Sarah, I found your clinic while looking at med spas in Scottsdale. Your reviews are strong, but on mobile it takes a few taps to reach the booking form.",
      "For clinics, that small friction can mean people leave before choosing a time.",
      "I help local clinics tighten that path from website visit to booked consultation. Want me to send the 3 quick changes I noticed?"
    ],
    mistakes: [
      "Opening with fake flattery.",
      "Writing a long pitch before explaining relevance.",
      "Using aggressive urgency with someone who does not know you.",
      "Pretending a generic email is deeply personal.",
      "Sending repeated follow-ups with no new reason to reply."
    ],
    getStarted: {
      title: "Write outreach that sounds like a real person sent it",
      body:
        "LoonaFlow AI helps you organize local leads, add context, personalize templates, and follow up without losing the human part of outreach.",
      primaryHref: "/signup",
      primaryLabel: "Start Writing Better Outreach",
      secondaryHref: "/seo/email-outreach-automation",
      secondaryLabel: "Explore Email Outreach Automation"
    },
    faqs: [
      {
        question: "Is cold email to local businesses spam?",
        answer:
          "Cold email can be spammy if it is irrelevant, deceptive, or difficult to opt out of. It is much better when the message is specific, respectful, useful, and sent to businesses that reasonably fit your offer."
      },
      {
        question: "How long should a local business outreach email be?",
        answer:
          "Most local outreach emails should be short, usually around 80 to 130 words. The goal is to make the reason for contact clear enough that the owner can reply quickly."
      },
      {
        question: "What should I personalize in a cold email?",
        answer:
          "Personalize the reason for reaching out. Mention something real about the business, then connect it to the problem you solve. Avoid personal details that feel invasive or unrelated."
      }
    ],
    relatedLinks: [
      {
        label: "Email Outreach Automation",
        href: "/seo/email-outreach-automation",
        description: "Learn how automation can support better email outreach."
      },
      {
        label: "Cold Email Strategies",
        href: "/articles/cold-email-strategies-2025",
        description: "See more cold email tactics for reply-focused campaigns."
      },
      {
        label: "Local Business Outreach",
        href: "/articles/local-business-outreach-2025",
        description: "Read the broader local outreach strategy guide."
      }
    ]
  },
  {
    slug: "how-to-personalize-cold-emails-with-business-name",
    title: "How to Personalize Cold Emails When All You Have Is a Business Name",
    metaTitle: "How to Personalize Cold Emails With Only a Business Name | LoonaFlow AI",
    metaDescription:
      "Learn how to personalize cold emails with only a business name. Use public context, local signals, simple templates, and honest observations to write better outreach.",
    keywords: [
      "personalize cold emails",
      "cold email personalization",
      "personalized cold outreach",
      "business name email personalization",
      "AI cold email personalization",
      "cold email automation",
      "local business email template"
    ],
    category: "Cold Email",
    readTime: "9 min read",
    date: "2026-05-14",
    updated: "2026-05-14",
    eyebrow: "Cold Email Personalization",
    heroTitle: "How to Personalize Cold Emails When All You Have Is a Business Name",
    heroDescription:
      "You do not need a full buyer profile to write a useful email. You need a real observation, a clear problem, and a message that respects the reader's time.",
    quickAnswer:
      "When you only have a business name, personalize a cold email by checking the website, category, location, reviews, services, and visible customer journey. Use one honest observation in the first line, then connect it to a clear outcome.",
    intro: [
      "A lot of outreach starts with very little data. Maybe you have a business name, a city, a website, and a category. That is still enough to write something better than \"Hope you are doing well.\"",
      "The trick is to personalize the context, not the person. For local business outreach, you usually do not need to know the owner's hobbies or job history. You need to show that your message is connected to their business.",
      "This guide shows how to turn a basic lead into a specific email without overdoing it."
    ],
    sections: [
      {
        title: "1. Look for business-level signals first",
        body:
          "If all you have is a business name, start with public signals that are easy to verify. You are looking for a reason your offer could be relevant.",
        bullets: [
          "Website quality and mobile experience.",
          "Google reviews and review themes.",
          "Services listed on the site.",
          "Booking, quote, or contact flow.",
          "City, neighborhood, or service area."
        ]
      },
      {
        title: "2. Use one observation, not five",
        body:
          "More personalization is not always better. A cold email can feel strange if you list every detail you found. Pick the one observation that connects most clearly to your offer.",
        bullets: [
          "For SEO: mention a missing location page or unclear service page.",
          "For web design: mention mobile booking friction.",
          "For recruiting: mention team growth or open roles.",
          "For software: mention a manual workflow the business appears to use."
        ]
      },
      {
        title: "3. Turn the observation into a helpful hypothesis",
        body:
          "Do not pretend you know their exact numbers. Say what might be happening and offer to check. This sounds more honest and less salesy.",
        bullets: [
          "Instead of: \"You are losing leads.\"",
          "Say: \"There may be a few places where interested visitors drop off before contacting you.\"",
          "Instead of: \"Your SEO is bad.\"",
          "Say: \"A couple of service pages look hard to find from the homepage.\""
        ]
      },
      {
        title: "4. Keep the template flexible",
        body:
          "The best template has a stable structure but leaves room for a specific first line. That gives you scale without sounding like a robot.",
        bullets: [
          "Line 1: real observation.",
          "Line 2: why it might matter.",
          "Line 3: what you help with.",
          "Line 4: small question or offer."
        ]
      },
      {
        title: "5. Use AI to draft, then make the final call",
        body:
          "AI can help turn business context into a first draft. The human part is deciding whether the observation is fair, useful, and worth sending.",
        bullets: [
          "Do not let AI invent facts about the business.",
          "Keep claims modest unless you can prove them.",
          "Edit for clarity and remove phrases you would not say out loud."
        ]
      },
      {
        title: "6. Save the winning angles",
        body:
          "As replies come in, keep track of which observations led to conversations. Over time, you will learn which signals matter for each niche.",
        bullets: [
          "Track the observation used in each email.",
          "Track positive replies by niche and city.",
          "Turn winning angles into reusable campaign templates."
        ]
      }
    ],
    exampleTitle: "Personalization from only a business name",
    exampleBody:
      "Imagine your lead is \"BrightPath Dental\" in Denver and you sell booking-focused website improvements.",
    exampleItems: [
      "Observation: their reviews are strong, but the appointment button is low on the mobile page.",
      "Email line: \"I found BrightPath while looking at Denver dental clinics. Your reviews are strong, but on mobile the appointment button is easy to miss.\"",
      "Why it matters: \"For patients already comparing clinics, that small delay can reduce consultation requests.\"",
      "CTA: \"Want me to send over the quick fixes I noticed?\""
    ],
    mistakes: [
      "Using the business name as the only personalization.",
      "Inventing details that are not publicly visible.",
      "Writing a first line that sounds like a compliment generator.",
      "Making claims about lost revenue without evidence.",
      "Using too many variables until the email feels stitched together."
    ],
    getStarted: {
      title: "Personalize faster without making emails feel fake",
      body:
        "LoonaFlow AI helps you turn business names, niches, and locations into cleaner lead lists and more relevant outreach templates.",
      primaryHref: "/signup",
      primaryLabel: "Try LoonaFlow Free",
      secondaryHref: "/seo/cold-email-automation",
      secondaryLabel: "Learn Cold Email Automation"
    },
    faqs: [
      {
        question: "Can you personalize a cold email with only a business name?",
        answer:
          "Yes. Use the business name to find public context like the website, city, service category, reviews, and customer journey. Then write one specific observation connected to your offer."
      },
      {
        question: "Is AI good for cold email personalization?",
        answer:
          "AI is useful for drafting and organizing personalization, but it should not invent facts. The best workflow combines AI speed with a human review of the actual business context."
      },
      {
        question: "What is the easiest cold email personalization field?",
        answer:
          "The easiest useful field is usually a business-level observation: website friction, service category, city, reviews, or the main offer shown on the site."
      }
    ],
    relatedLinks: [
      {
        label: "Cold Email Automation",
        href: "/seo/cold-email-automation",
        description: "Learn how cold email automation works when personalization matters."
      },
      {
        label: "AI Lead Generation",
        href: "/seo/ai-lead-generation",
        description: "See how AI can help find and prepare better prospects."
      },
      {
        label: "How to Contact Local Businesses",
        href: "/articles/how-to-contact-local-businesses-without-sounding-spammy",
        description: "Pair personalization with a respectful outreach structure."
      }
    ]
  }
];

export function getWorkflowArticle(slug: string) {
  return workflowArticles.find((article) => article.slug === slug);
}
