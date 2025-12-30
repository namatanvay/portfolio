# Images Directory - Complete Guide

This guide explains where to place images and which files to update to display them on your portfolio website.

---

## 📁 Directory Structure

```
public/images/
├── profile/          → Your profile/headshot photos
├── portfolio/        → Gallery and portfolio images
│   ├── portraits/    → Portrait photography
│   ├── events/       → Event photography
│   ├── landscapes/   → Landscape photography
│   └── commercial/   → Commercial photography
└── clients/          → Client company logos
```

---

## 🎯 Quick Reference: Where Files Need to Be Updated

| Image Type | Folder Location | File to Edit | Line Numbers |
|-----------|----------------|--------------|--------------|
| **Profile Photo** | `public/images/profile/` | `src/components/AnimatedAbout.tsx` | Line 175 |
| **Portfolio Gallery** | `public/images/portfolio/[category]/` | `src/pages/portfolio.astro` | Lines 11-32 |
| **Client Work** | `public/images/portfolio/[category]/` | `src/pages/portfolio.astro` | Lines 39-72 |
| **Client Logos** | `public/images/clients/` | `src/pages/portfolio.astro` | Lines 35-72 |

---

## 📸 How to Add Images - Step by Step

### 1. Profile Photo

**Step 1:** Add your image to `public/images/profile/`
```
Example: public/images/profile/profile_image.jpeg
```

**Step 2:** Edit `src/components/AnimatedAbout.tsx` (Line 175)
```tsx
<img
  src="/images/profile/profile_image.jpeg"
  alt="Profile"
  className="w-full h-full object-cover"
/>
```

**Path format:** `/images/profile/your-image.jpg`

---

### 2. Portfolio Gallery Images

**Step 1:** Add images to the appropriate category folder
```
Examples:
public/images/portfolio/portraits/photo1.jpg
public/images/portfolio/events/wedding1.jpg
public/images/portfolio/landscapes/mountain.jpg
public/images/portfolio/commercial/product.jpg
```

**Step 2:** Edit `src/pages/portfolio.astro` (Lines 11-32)

Find the `portfolioItems` array and update the `image` property:

```javascript
const portfolioItems = [
  // Change from empty string to actual path
  {
    id: 1,
    title: 'Portrait Session 1',
    category: 'portraits-fashion',
    image: '/images/portfolio/portraits/photo1.jpg',  // ← Add path here
    type: 'photo'
  },
  {
    id: 5,
    title: 'Corporate Event',
    category: 'events',
    image: '/images/portfolio/events/corporate-event.jpg',  // ← Add path here
    type: 'photo'
  },
  // Add more items as needed...
];
```

**Path format:** `/images/portfolio/[category]/filename.jpg`

**Categories available:**
- `portraits-fashion` → use `portraits/` folder
- `events` → use `events/` folder
- `food` → use `commercial/` folder or create `food/` folder
- `travel` → use `landscapes/` or `commercial/` folder

---

### 3. Client Showcase Images

**Step 1:** Add images to the appropriate category folder (same as portfolio)
```
Example: public/images/portfolio/commercial/restaurant-dish.jpg
```

**Step 2:** Edit `src/pages/portfolio.astro` (Lines 35-72)

Find the `clients` array and update the `work` items:

```javascript
const clients = [
  {
    name: 'Restaurant ABC',
    description: 'Food photography and menu documentation',
    work: [
      {
        id: 101,
        title: 'Signature Dish',
        category: 'food',
        image: '/images/portfolio/commercial/signature-dish.jpg',  // ← Add path here
        type: 'photo'
      },
      // More work items...
    ]
  },
  // More clients...
];
```

---

### 4. Client Logos

**Step 1:** Add logo to `public/images/clients/`
```
Example: public/images/clients/company-logo.png
```

**Step 2:** If you want to display client logos, add them to the client data:
```javascript
{
  name: 'Company XYZ',
  logo: '/images/clients/company-logo.png',  // Add this field
  description: 'Event coverage...',
  work: [...]
}
```

---

## ⚙️ Path Rules (IMPORTANT!)

✅ **Correct paths:**
```
/images/profile/photo.jpg
/images/portfolio/portraits/photo.jpg
/images/clients/logo.png
```

❌ **Incorrect paths:**
```
public/images/profile/photo.jpg        ❌ Don't include "public/"
images/profile/photo.jpg               ❌ Must start with "/"
/images/portfolio\portraits\photo.jpg  ❌ Use forward slashes, not backslashes
```

**Key points:**
- Always start paths with `/`
- Never include `public/` in the path
- Use forward slashes `/` even on Windows
- Paths are case-sensitive on production servers

---

## 📏 Image Guidelines

### Profile Photos
- **Recommended size:** 800x800px or higher
- **Format:** JPG or PNG
- **Aspect ratio:** Square (1:1) works best

### Portfolio Images
- **Recommended size:** At least 1920px on the longest side
- **Format:** JPG (optimized for web)
- **File size:** Under 2MB per image (use online tools to compress)
- **Naming:** Use descriptive names with hyphens: `wedding-sunset-couple.jpg`

### Client Logos
- **Recommended size:** 200x100px or similar aspect ratio
- **Format:** PNG with transparent background preferred
- **File size:** Under 100KB

---

## 🎨 Image Optimization Tips

1. **Compress images** before uploading using tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)

2. **Use descriptive filenames:**
   - ✅ Good: `beach-sunset-portrait.jpg`
   - ❌ Bad: `IMG_1234.jpg`

3. **Keep consistent aspect ratios** within each category for better gallery appearance

4. **Use WebP format** for better compression (optional):
   - Modern browsers support WebP
   - Smaller file sizes without quality loss

---

## 🔄 After Adding Images

After adding images and updating the files:

1. **Development:** Changes should appear immediately (hot reload)
2. **Production (Cloudflare):**
   - Commit your changes: `git add .`
   - Commit: `git commit -m "Add portfolio images"`
   - Push: `git push`
   - Cloudflare will automatically rebuild and deploy

---

## 🆘 Troubleshooting

**Image not showing?**
1. Check the file path is correct (case-sensitive!)
2. Make sure the image is in `public/images/` folder
3. Verify the path starts with `/images/` (not `/public/images/`)
4. Check browser console for 404 errors
5. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Image looks pixelated?**
- Use higher resolution source images (at least 1920px wide)

**Page loads slowly?**
- Compress your images to reduce file size
- Aim for under 500KB per portfolio image

---

## 📝 Example: Complete Workflow

1. **Take or select photo** → `my-best-portrait.jpg`

2. **Optimize image** using TinyPNG → file size reduced from 5MB to 800KB

3. **Rename file** → `downtown-portrait-session.jpg`

4. **Move to folder** → `public/images/portfolio/portraits/downtown-portrait-session.jpg`

5. **Edit** `src/pages/portfolio.astro`:
   ```javascript
   {
     id: 16,
     title: 'Downtown Portrait Session',
     category: 'portraits-fashion',
     image: '/images/portfolio/portraits/downtown-portrait-session.jpg',
     type: 'photo'
   }
   ```

6. **Save and check** → View in browser at http://localhost:4321/portfolio

7. **Commit and push** → Image goes live on Cloudflare Pages!

---

For video instructions, see `/public/videos/README.md`
