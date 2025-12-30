# Quick Start Guide - Tanvay Nama Portfolio

## Project Status: ✅ COMPLETE & READY TO USE

The website is fully built and tested! All pages are working correctly.

## What's Been Built

### ✅ Complete Pages
1. **Homepage** - Hero section, featured work, services, testimonials
2. **About** - Bio, skills progress bars, equipment showcase
3. **Portfolio** - Interactive gallery with category filtering
4. **Services** - Service packages, pricing, testimonials, FAQ
5. **Contact** - Contact form (Formspree), contact info, social links

### ✅ Features Implemented
- Dark theme (#121212 background, proper contrast)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations
- SEO optimized
- Fast static site generation
- Font Awesome icons
- Tailwind CSS styling
- React components for interactivity

## Immediate Next Steps

### 1. Fill Out `.env.example` (5 minutes)

Open `.env.example` and replace placeholder values with your actual information:

**Critical Fields:**
- `OWNER_EMAIL` - Your actual email address
- `OWNER_PHONE` - Your phone number
- `OWNER_LOCATION` - Your city/state
- `FORMSPREE_ENDPOINT` - Get from https://formspree.io after creating free account
- Social media URLs (Instagram, YouTube, etc.)

**How to use:**
```bash
# Copy the example file to create your actual .env
cp .env.example .env

# Then edit .env with your real values
# DO NOT commit .env to Git (it's already in .gitignore)
```

### 2. Add Your Content (30-60 minutes)

#### Your Photos
Place images in these folders:
```
portfolio/public/images/
├── profile/            # Your headshot (name it anything.jpg)
├── portfolio/
│   ├── portraits/     # Portrait photography samples
│   ├── events/        # Event/wedding photos
│   ├── landscapes/    # Landscape photos
│   └── commercial/    # Commercial work
└── clients/           # Client logos (optional)
```

#### Your Videos
Place MP4 videos in:
```
portfolio/public/videos/
├── music/      # Music videos
├── travel/     # Travel videos
├── reels/      # Short-form content
└── commercial/ # Commercial videos
```

#### Update Text Content
Edit these files to customize content:
- `src/pages/about.astro` - Your bio, skills, equipment (line 7-32)
- `src/pages/services.astro` - Service descriptions and pricing (line 7-71)
- `src/pages/portfolio.astro` - Gallery items (line 7-31)

### 3. Set Up Formspree (5 minutes)

1. Go to https://formspree.io and create free account
2. Create a new form
3. Copy your form ID (looks like: `YOUR_FORM_ID`)
4. Update `.env` file: `FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID`
5. Also update `src/pages/contact.astro` line 30 with same endpoint

### 4. Test Locally

```bash
cd portfolio

# Start development server
npm run dev

# Open browser to http://localhost:4321
# Test all pages and links
```

### 5. Deploy to GitHub Pages (15 minutes)

#### One-Time Setup:

1. **Create GitHub Repository**
   - Go to GitHub.com
   - Create new repository (name it anything, e.g., "portfolio")
   - Leave it empty (don't initialize with README)

2. **Update Astro Config**

   Edit `astro.config.mjs` (lines 9-10):
   ```js
   site: 'https://YOUR-GITHUB-USERNAME.github.io',
   base: '/YOUR-REPO-NAME',
   ```

3. **Push to GitHub**
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Click Settings > Pages
   - Under "Source", select: **GitHub Actions**
   - The site will auto-deploy in 2-3 minutes

5. **Visit Your Site**
   - https://YOUR-USERNAME.github.io/YOUR-REPO-NAME

## File Locations Reference

### Where to Find Things

| What You Want to Change | File Location |
|------------------------|---------------|
| Your bio/about info | `src/pages/about.astro` |
| Services & pricing | `src/pages/services.astro` |
| Portfolio gallery items | `src/pages/portfolio.astro` |
| Contact information | `src/pages/contact.astro` |
| Homepage hero text | `src/pages/index.astro` |
| Navigation menu items | `src/components/Navigation.astro` |
| Footer content | `src/components/Footer.astro` |
| Color scheme | `src/styles/global.css` (lines 5-15) |
| Social media links | `.env` file |

## Common Customizations

### Change Accent Color

Edit `src/styles/global.css` line 12:
```css
--accent-primary: #00CED1;  /* Change to your brand color */
```

### Add Real Photos to Gallery

Edit `src/pages/portfolio.astro` around line 10:
```js
const portfolioItems = [
  {
    id: 1,
    title: 'Wedding in Bali',
    category: 'events',
    image: '/images/portfolio/events/wedding-bali.jpg',  // Your image path
    type: 'photo'
  },
  // ... add more items
];
```

### Update Testimonials

Edit `src/pages/services.astro` around line 75:
```js
const testimonials = [
  {
    name: 'Client Name',
    role: 'Wedding Client',
    rating: 5,
    text: 'Amazing work! ...',
    date: 'October 2024'
  },
  // ... add more
];
```

## Troubleshooting

### Build fails?
```bash
rm -rf node_modules .astro
npm install
npm run build
```

### Changes not showing?
- Hard refresh browser (Ctrl+F5)
- Clear browser cache
- Restart dev server

### Images not loading?
- Ensure images are in `public/` folder
- Use paths like `/images/photo.jpg` (not `./images/`)
- Check file extensions match exactly

## Support

Read the comprehensive README.md for detailed documentation.

Key commands:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## What to Provide Me (When You're Ready)

Once you've added your content and want a review, share:
1. Screenshots of any issues
2. Your GitHub repo URL
3. Specific features you want modified

---

## Summary

**Status:** ✅ Website is 100% complete and functional
**Next:** Fill out `.env`, add your photos/videos, deploy to GitHub
**Time:** 1-2 hours total for customization and deployment

The hard work is done! Now just add your personal content and deploy. 🚀
