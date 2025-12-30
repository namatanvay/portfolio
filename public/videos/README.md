# Videos Directory - Complete Guide

This guide explains where to place videos and which files to update to display them on your portfolio website.

---

## 📁 Directory Structure

```
public/videos/
├── music/        → Music video projects
├── travel/       → Travel videography
├── reels/        → Short-form content (Instagram reels, TikToks)
└── commercial/   → Commercial video work, events, food videos
```

---

## 🎯 Quick Reference: Where Files Need to Be Updated

| Video Type | Folder Location | File to Edit | Line Numbers |
|-----------|----------------|--------------|--------------|
| **Portfolio Videos** | `public/videos/[category]/` | `src/pages/portfolio.astro` | Lines 11-32 |
| **Client Work Videos** | `public/videos/[category]/` | `src/pages/portfolio.astro` | Lines 39-72 |

---

## 🎬 How to Add Videos - Step by Step

### 1. Portfolio Gallery Videos

**Step 1:** Add videos to the appropriate category folder
```
Examples:
public/videos/music/wedding-music-video.mp4
public/videos/travel/bali-vlog.mp4
public/videos/reels/instagram-reel.mp4
public/videos/commercial/restaurant-promo.mp4
```

**Step 2:** (Optional but recommended) Add video thumbnail/poster images
```
Create a JPG thumbnail with the same name:
public/videos/music/wedding-music-video.jpg  ← Thumbnail
public/videos/music/wedding-music-video.mp4  ← Video
```

**Step 3:** Edit `src/pages/portfolio.astro` (Lines 11-32)

Find the `portfolioItems` array and add video entries with `type: 'video'`:

```javascript
const portfolioItems = [
  // Example: Fashion video
  {
    id: 4,
    title: 'Fashion Video',
    category: 'portraits-fashion',
    image: '/videos/commercial/fashion-shoot.jpg',  // ← Thumbnail (optional)
    video: '/videos/commercial/fashion-shoot.mp4',   // ← Add video path
    type: 'video'  // ← Must be 'video', not 'photo'
  },

  // Example: Event highlights
  {
    id: 8,
    title: 'Event Highlights',
    category: 'events',
    image: '/videos/commercial/event-highlights.jpg',  // ← Thumbnail
    video: '/videos/commercial/event-highlights.mp4',   // ← Video path
    type: 'video'
  },

  // Example: Travel vlog
  {
    id: 14,
    title: 'Travel Vlog',
    category: 'travel',
    image: '/videos/travel/bali-vlog.jpg',     // ← Thumbnail
    video: '/videos/travel/bali-vlog.mp4',     // ← Video path
    type: 'video'
  },
];
```

**Path format:** `/videos/[category]/filename.mp4`

**Categories available:**
- `portraits-fashion` → use `commercial/` folder
- `events` → use `commercial/` folder
- `food` → use `commercial/` folder
- `travel` → use `travel/` folder

---

### 2. Client Showcase Videos

**Step 1:** Add video to the appropriate category folder
```
Example: public/videos/commercial/restaurant-menu-video.mp4
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
        id: 103,
        title: 'Chef Special',
        category: 'food',
        image: '/videos/commercial/chef-special.jpg',    // ← Thumbnail
        video: '/videos/commercial/chef-special.mp4',    // ← Video path
        type: 'video'
      },
    ]
  },
];
```

---

### 3. Video Components (Advanced)

If you need to add videos to other pages, use the HTML5 video element:

```tsx
<video
  controls
  poster="/videos/commercial/video-thumbnail.jpg"
  className="w-full rounded-lg"
>
  <source src="/videos/commercial/my-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Or with autoplay (muted for best compatibility):

```tsx
<video
  autoplay
  muted
  loop
  playsInline
  poster="/videos/commercial/video-thumbnail.jpg"
  className="w-full rounded-lg"
>
  <source src="/videos/commercial/my-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

---

## ⚙️ Path Rules (IMPORTANT!)

✅ **Correct paths:**
```
/videos/music/wedding-video.mp4
/videos/travel/mountain-vlog.mp4
/videos/commercial/product-demo.mp4
```

❌ **Incorrect paths:**
```
public/videos/music/wedding-video.mp4     ❌ Don't include "public/"
videos/music/wedding-video.mp4            ❌ Must start with "/"
/videos/music\wedding-video.mp4           ❌ Use forward slashes, not backslashes
```

**Key points:**
- Always start paths with `/`
- Never include `public/` in the path
- Use forward slashes `/` even on Windows
- Paths are case-sensitive on production servers

---

## 📏 Video Guidelines

### Format & Codec
- **Container:** MP4 (`.mp4`)
- **Video Codec:** H.264 (best browser compatibility)
- **Audio Codec:** AAC
- **Alternative:** WebM format for better compression (modern browsers)

### Resolution
- **1080p (1920x1080)** - Recommended for most videos
- **4K (3840x2160)** - For showcase pieces (larger file size)
- **720p (1280x720)** - For smaller files/reels

### File Size
- **Portfolio videos:** Under 50MB per video
- **Reels/Short-form:** Under 20MB
- **Long-form:** Under 100MB (or host on YouTube/Vimeo)

### Frame Rate
- **24fps** - Cinematic look
- **30fps** - Standard video
- **60fps** - Smooth motion (larger file size)

### Aspect Ratios
- **16:9** - Standard landscape (YouTube, most web)
- **9:16** - Vertical (Instagram Reels, TikTok)
- **1:1** - Square (Instagram feed)
- **4:5** - Portrait (Instagram)

---

## 🎨 Video Thumbnails (Poster Images)

Thumbnails make your videos look professional before playback:

### Creating Thumbnails
1. Export a frame from your video at an interesting moment
2. Save as JPG with the same filename as your video:
   ```
   wedding-highlights.mp4  ← Video
   wedding-highlights.jpg  ← Thumbnail
   ```

### Thumbnail Guidelines
- **Size:** 1920x1080px (16:9) or match video aspect ratio
- **Format:** JPG (optimized)
- **File size:** Under 300KB
- **Content:** Choose a compelling, clear frame

### Using Thumbnails

```javascript
// In portfolio.astro
{
  id: 8,
  title: 'Event Highlights',
  category: 'events',
  image: '/videos/commercial/event-highlights.jpg',  // Thumbnail shows in gallery
  video: '/videos/commercial/event-highlights.mp4',  // Video plays on click
  type: 'video'
}
```

---

## 🎥 Video Optimization

### Compress Videos
Use these tools to reduce file size without losing quality:

1. **HandBrake** (Free, Windows/Mac/Linux)
   - Preset: "Web" or "Fast 1080p30"
   - Quality: RF 20-23 (lower = better quality, larger file)

2. **FFmpeg** (Command line)
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4
   ```

3. **Online Tools**
   - Cloudinary
   - Compress.com
   - FreeConvert.com

### Best Practices

1. **Use descriptive filenames:**
   - ✅ Good: `wedding-ceremony-highlights.mp4`
   - ❌ Bad: `VID_20241230.mp4`

2. **Keep videos short:**
   - Portfolio highlights: 30-60 seconds
   - Reels: 15-30 seconds
   - Full videos: Consider YouTube/Vimeo embedding

3. **Test on mobile:**
   - Ensure videos play on iOS and Android
   - Use `playsInline` attribute to prevent fullscreen on iOS

4. **Provide fallbacks:**
   - Always include a poster/thumbnail
   - Test without autoplay (some browsers block it)

---

## 🌐 Hosting Large Videos (Alternative)

For videos over 100MB, consider hosting on external platforms:

### YouTube Embedding
```tsx
<iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

### Vimeo Embedding
```tsx
<iframe
  src="https://player.vimeo.com/video/VIDEO_ID"
  width="100%"
  height="400"
  frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>
```

**Benefits:**
- Faster page loading
- Adaptive streaming (quality adjusts to connection)
- No bandwidth costs for you
- Professional video player

**Update portfolio.astro:**
```javascript
{
  id: 100,
  title: 'Full Wedding Film',
  category: 'events',
  embedUrl: 'https://www.youtube.com/embed/VIDEO_ID',  // External video
  type: 'video'
}
```

---

## 🔄 After Adding Videos

After adding videos and updating the files:

1. **Development:** Changes should appear immediately
2. **Production (Cloudflare):**
   - Commit: `git add .`
   - Commit: `git commit -m "Add portfolio videos"`
   - Push: `git push`
   - Cloudflare will automatically rebuild

**Note:** Large video files may take longer to upload to GitHub. Consider using Git LFS for files over 50MB.

---

## 🆘 Troubleshooting

**Video not playing?**
1. Check the file path is correct (case-sensitive!)
2. Verify codec is H.264 (use MediaInfo tool to check)
3. Make sure file is in `public/videos/` folder
4. Test in different browsers (Chrome, Firefox, Safari)

**Video plays but looks low quality?**
- Use higher bitrate export settings
- Check source video quality
- Export at 1080p minimum

**Video file too large?**
- Compress using HandBrake or FFmpeg
- Reduce resolution (4K → 1080p)
- Lower bitrate (CRF 20-23 for H.264)
- Consider YouTube/Vimeo for very long videos

**Video stutters or lags?**
- File size too large, compress more
- Server response slow, check Cloudflare
- Browser cache issue, hard refresh (Ctrl+Shift+R)

---

## 📝 Example: Complete Video Workflow

1. **Export video from editing software**
   - Format: MP4
   - Codec: H.264
   - Resolution: 1080p
   - Frame rate: 30fps

2. **Compress with HandBrake**
   - Preset: "Fast 1080p30"
   - Quality: RF 22
   - Output: `wedding-highlights.mp4` (45MB)

3. **Export thumbnail frame**
   - Take screenshot at 5-second mark
   - Save as `wedding-highlights.jpg`
   - Optimize with TinyPNG

4. **Move files to folder**
   ```
   public/videos/commercial/wedding-highlights.mp4
   public/videos/commercial/wedding-highlights.jpg
   ```

5. **Edit** `src/pages/portfolio.astro`:
   ```javascript
   {
     id: 20,
     title: 'Wedding Highlights',
     category: 'events',
     image: '/videos/commercial/wedding-highlights.jpg',
     video: '/videos/commercial/wedding-highlights.mp4',
     type: 'video'
   }
   ```

6. **Test in browser** → http://localhost:4321/portfolio

7. **Commit and push** → Goes live on Cloudflare Pages!

---

## 🔗 Useful Resources

- **Video Compression:** https://handbrake.fr
- **Format Converter:** https://cloudconvert.com
- **Video Info Tool:** https://mediaarea.net/en/MediaInfo
- **FFmpeg Guide:** https://ffmpeg.org/documentation.html

---

For image instructions, see `/public/images/README.md`
