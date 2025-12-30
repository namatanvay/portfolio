# Tanvay Nama - Photography Portfolio Website

A modern, dark-themed portfolio website for professional photography and videography services. Built with Astro, React, Tailwind CSS, and Motion animations.

## Features

- **Dark Theme**: Modern dark UI (#121212 background) following Material Design guidelines
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Fast Performance**: Static site generation with Astro for optimal speed
- **Animated UI**: Smooth animations using Motion library
- **Portfolio Gallery**: Filterable image and video gallery with lightbox
- **Contact Form**: Integrated with Formspree for easy form submissions
- **SEO Optimized**: Meta tags and semantic HTML for better search rankings

## Pages

1. **Home** - Hero section, featured work, services overview, testimonials
2. **About** - Bio, skills, equipment, why choose me
3. **Portfolio** - Filterable gallery of photography and videography work
4. **Services** - Detailed service offerings, pricing, testimonials, FAQ
5. **Contact** - Contact form, contact information, social media links

## Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **UI Library**: [React](https://react.dev) - For interactive components
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- **Animations**: [Motion](https://motion.dev) - Web animation library
- **Icons**: [Font Awesome](https://fontawesome.com) - Icon library
- **Forms**: [Formspree](https://formspree.io) - Form backend service
- **Hosting**: [GitHub Pages](https://pages.github.com) - Free static hosting

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your information:
```bash
cp .env.example .env
```

4. Update environment variables in `.env` with your actual data

### Development

Run the development server:
```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Building for Production

Build the static site:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Configuration

### Environment Variables

Update the `.env` file with your information. See `.env.example` for all available options.

Key configurations:
- **FORMSPREE_ENDPOINT**: Get your form endpoint from [Formspree](https://formspree.io)
- **Social media URLs**: Update with your actual profiles
- **Contact information**: Email, phone, location
- **Accent colors**: Customize the color scheme

### Astro Configuration

Update `astro.config.mjs`:
- **site**: Your GitHub Pages URL (e.g., `https://yourusername.github.io`)
- **base**: Your repository name (e.g., `/portfolio`)

### Adding Content

#### Images
Place your images in the appropriate folders:
- Portfolio photos: `public/images/portfolio/{portraits,events,landscapes,commercial}/`
- Profile photo: `public/images/profile/`
- Client logos: `public/images/clients/`

#### Videos
Place your videos in:
- `public/videos/{music,travel,reels,commercial}/`
- Use MP4 format (H.264 codec) for best compatibility

#### Updating Content
Edit the respective page files in `src/pages/`:
- `index.astro` - Homepage content
- `about.astro` - Bio, skills, equipment
- `portfolio.astro` - Gallery items
- `services.astro` - Services, pricing, testimonials
- `contact.astro` - Contact information

## Deployment

### GitHub Pages (Automatic)

1. Create a GitHub repository

2. Update `astro.config.mjs` with your repository details:
```js
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name',
  // ...
});
```

3. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/repository-name.git
git push -u origin main
```

4. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to main

### Manual Deployment

Build and deploy to any static hosting:
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## Customization

### Colors
Edit `src/styles/global.css` to change color scheme:
```css
:root {
  --bg-dark: #121212;
  --accent-primary: #00CED1;  /* Change to your brand color */
  --accent-secondary: #FF6B6B;
  /* ... */
}
```

### Fonts
Update the font family in `src/styles/global.css` or import custom fonts in `src/layouts/Layout.astro`.

### Navigation
Edit navigation items in `src/components/Navigation.astro`.

### Footer
Update footer content in `src/components/Footer.astro`.

## File Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── images/                 # Your images
│   │   ├── portfolio/
│   │   ├── profile/
│   │   └── clients/
│   └── videos/                 # Your videos
├── src/
│   ├── components/             # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── Gallery.tsx
│   ├── layouts/
│   │   └── Layout.astro        # Base layout
│   ├── pages/                  # Site pages
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── portfolio.astro
│   │   ├── services.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css          # Global styles
├── .env.example                # Environment variables template
├── .gitignore
├── astro.config.mjs            # Astro configuration
├── package.json
├── README.md
└── tsconfig.json
```

## Performance Optimization

- **Images**: Astro automatically optimizes images to WebP format
- **Lazy Loading**: Images load only when visible
- **Code Splitting**: JavaScript is split for faster initial load
- **Static Generation**: All pages pre-rendered at build time

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules .astro && npm install`

### Form Not Working
- Verify Formspree endpoint in `src/pages/contact.astro`
- Check form action URL matches your Formspree form ID

### Images Not Loading
- Verify image paths are correct
- Check file extensions match (case-sensitive)
- Ensure images are in the `public` folder

## Support

For issues or questions:
- Check the [Astro Documentation](https://docs.astro.build)
- Review [Tailwind CSS Docs](https://tailwindcss.com/docs)
- Visit [Motion Documentation](https://motion.dev)

## License

This project is free to use for personal and commercial purposes.

## Credits

- **Design**: Custom design following dark UI best practices
- **Icons**: Font Awesome Free
- **Fonts**: System fonts for optimal performance

---

Built with ❤️ by Tanvay Nama
