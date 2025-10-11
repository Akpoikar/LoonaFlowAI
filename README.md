# LoonaFlow AI

LoonaFlow AI is an all-in-one outreach & lead-generation platform tailored for **local businesses and small agencies**. It helps users find relevant leads, send personalized outreach emails, and track campaign performance — all from one unified dashboard.

---

## 🚀 What LoonaFlow Does

- **Local business data sourcing**  
  Input your target (e.g. "dentists in Prague") and LoonaFlow finds verified business contacts, filters duplicates, enriches profiles, and skips poor-quality or personal/free email addresses.  

- **Personalized Email Templates & Automation**  
  Write a single template with placeholders (e.g. `{name}`, `{city}`), and the system personalizes each email dynamically for every lead.

- **Safe Sending Engine / Deliverability Protection**  
  Sends from your own inbox with smart pacing, warm-up, throttling, and deliverability protection features (SPF/DKIM/DMARC guidance, sending windows) to prevent your messages from being marked as spam.

- **Campaign Tracking & Analytics**  
  Monitor opens, clicks, replies, and deliverability stats. Run A/B tests to optimize subject lines, content, sending times, etc.

- **GDPR & Compliance Tools**  
  Built-in suppression lists, opt-out management, data minimization (skipping free mailboxes), and support for a Data Processing Addendum (DPA) to help with legal compliance.

- **Flexible Pricing & Free Trial**  
  Month-to-month subscriptions with no hidden fees. A free trial (no credit card required) lets you test the service before committing.

---

## 📂 Features Overview

| Feature | Benefit |
|--------|---------|
| **Local-niche lead sourcing** | Specifically optimized for small, local niches (salons, gyms, clinics, etc.) |
| **Template + placeholder system** | Enables scalable personalization without heavy manual copywriting |
| **Safe sending / inbox-first architecture** | Helps ensure your outreach lands in inboxes, not spam |
| **Campaign insights & A/B tests** | Understand performance and improve ROI over time |
| **Compliance tooling** | Makes it easier to respect opt-outs and data regulation |
| **Transparent & SMB-friendly pricing** | Designed to be accessible for smaller teams or solo operators |

---

## 🛠️ How It Works (User Flow)

1. **Pick your audience**  
   Enter the criteria (industry, location, etc.) to find relevant local businesses.

2. **Compose your email template**  
   Create one base email with dynamic placeholders (e.g. `{name}`).

3. **Launch campaigns with safe sending**  
   Use LoonaFlow's internal sending engine to send messages at a controlled pace.

4. **Track & iterate**  
   Review metrics like open rate, click rate, replies; run variants to improve results.

---

## ✅ Why Use LoonaFlow

- All essential outreach tools in **one place**, rather than needing different tools for list building, sending, and tracking.  
- Built specifically for **local / small business outreach** rather than enterprise B2B.  
- Includes **deliverability safeguards** so you don't ruin your sending reputation.  
- Helps comply with **GDPR / opt-out / suppression** features built in.  
- Offers **affordable pricing** and a risk-free free trial to get started.

---

## 🧾 Getting Started

1. **Sign up / register**  
   Start with the free trial—no credit card needed.

2. **Define your target audience**  
   Use LoonaFlow's search filters (industry, location, etc.).

3. **Write template & placeholders**  
   Craft your message once; personalization is automated.

4. **Configure sending settings**  
   Set pacing, warm-up, time windows.

5. **Run campaign**  
   Launch and let the engine handle delivery.

6. **Review metrics & optimize**  
   Check opens, replies, clicks; adjust subject lines or message variants as needed.

---

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
loonaflowai/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout with Inter font
│   ├── page.tsx         # Main landing page
│   ├── articles/        # SEO-optimized articles
│   ├── pricing/         # Pricing page
│   ├── contact/         # Contact page
│   ├── privacy/         # Privacy policy
│   └── terms/           # Terms of service
├── components/          # Reusable UI components
├── lib/                 # Utility functions and API client
├── types/               # TypeScript type definitions
└── public/              # Static assets and sitemap
```

## Design Features

- **Frosted Glass Effect**: Translucent white panels with backdrop blur
- **Animated Elements**: Slow-spinning glowing ring and floating bokeh dots
- **Gradient Text**: Custom gradient text utility for highlights
- **Responsive Grid**: Mobile-first responsive design
- **Custom Animations**: Tailwind-extended animations for smooth effects
- **SEO Optimized**: Comprehensive meta tags, sitemap, and structured content
