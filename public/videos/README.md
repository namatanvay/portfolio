# Videos Directory

Videos are organized by category in subfolders:

```
public/videos/
├── events/              → Event & BTS videos
│   ├── bts-reel.mp4
│   ├── bts-shooting-reel.mp4
│   └── bts-shoot-part1.mp4
├── food/                → Food & restaurant videos
│   ├── meraki-art-cafe.MP4
│   ├── meraki-art-cafe-announcement.MP4
│   ├── meraki-food.mp4
│   └── meraki-food-pizza.MP4
└── portraits-fashion/   → Fashion & portrait videos
    └── valentino-song-24k.mp4
```

## Usage

Add videos to the appropriate folder and reference in `src/pages/portfolio.astro`:

```javascript
{
  id: 4,
  title: "My Video",
  category: "events",  // or "food", "portraits-fashion"
  image: "",  // Optional: Add thumbnail image URL
  video: "/videos/events/my-video.mp4",
  type: "video"
}
```

## Guidelines

- **Format:** MP4 (H.264 codec)
- **Size:** Under 50MB recommended for local files
- **For large files:** Use Google Drive instead (no size limit!)

## ⚠️ Important: File Size

**Your current video `valentino-song-24k.mp4` is 108MB - too large!**

This causes buffering and playback issues.

**Solutions:**
1. **Compress** with HandBrake to ~20-30MB
2. **Use Google Drive** for unlimited size (recommended)

---

**For complete instructions, video compression, and Google Drive setup, see:** `HOW_TO_ADD_MEDIA.md` in project root.
