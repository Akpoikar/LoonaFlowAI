# LoonaFlow AI

A modern, responsive landing page for LoonaFlow AI - an all-in-one local outreach platform.

## Features

- 🎨 Beautiful frosted glass UI with backdrop blur effects
- 🌈 Pastel gradient background with animated bokeh blobs
- ✨ Rotating glowing ring animation
- 📱 Fully responsive design
- 🚀 Built with Next.js 14, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)

## Getting Started

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
│   └── page.tsx         # Main landing page
├── package.json         # Dependencies and scripts
├── tailwind.config.ts   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
└── .gitignore          # Git ignore rules
```

## Design Features

- **Frosted Glass Effect**: Translucent white panels with backdrop blur
- **Animated Elements**: Slow-spinning glowing ring and floating bokeh dots
- **Gradient Text**: Custom gradient text utility for highlights
- **Responsive Grid**: Mobile-first responsive design
- **Custom Animations**: Tailwind-extended animations for smooth effects
