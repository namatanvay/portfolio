# Images Directory

Place your portfolio images here organized by category:

```
public/images/
├── clients/          → Client logos (for client showcase)
├── profile/          → Your profile/headshot photos
└── portfolio/        → Portfolio images
    ├── portraits/    → Portrait & fashion photography
    ├── events/       → Event photography
    ├── food/         → Food photography
    └── product/      → Product photography
```

## Usage

Add images here and reference them in `src/pages/portfolio.astro`:

```javascript
{
  id: 1,
  title: "My Photo",
  category: "portraits-fashion",
  image: "/images/portfolio/portraits/photo.jpg",
  type: "photo"
}
```

## Guidelines

- **Format:** WebP (optimized for web, 70-90% smaller than JPG)
- **Size:** Under 500KB recommended
- **Naming:** Use descriptive names: `beach-sunset-portrait.webp`
- **Note:** All portfolio images are now in WebP format for faster loading

---

**For complete instructions and Google Drive support, see:** `HOW_TO_ADD_MEDIA.md` in project root.
