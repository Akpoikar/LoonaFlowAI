# Images Folder

This folder contains images used in the LoonaFlow AI landing page.

## Image Structure

- `logo.svg` - LoonaFlow AI logo
- `hero-bg.jpg` - Hero background image (optional)
- `icons/` - Folder containing icon assets
  - `search.svg` - Search icon for the input field
  - `ai.svg` - AI icon for features
  - `email.svg` - Email icon for campaigns
  - `chart.svg` - Analytics/chart icon
  - `shield.svg` - Security/safeguards icon

## Usage

Images in this folder are referenced in the components using relative paths:

```jsx
import Image from 'next/image'

<Image 
  src="/images/logo.svg" 
  alt="LoonaFlow AI Logo" 
  width={150} 
  height={40} 
/>
```

## Image Optimization

All images are automatically optimized by Next.js when using the `Image` component. For best performance:

- Use SVG for logos and icons
- Use WebP or optimized JPG for photos
- Keep file sizes under 500KB for web images
- Use appropriate dimensions for each use case
