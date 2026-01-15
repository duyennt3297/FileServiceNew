# Setup Images - Hướng dẫn chuẩn bị ảnh cho project

## 📁 Cấu trúc thư mục

Tạo các thư mục và đặt ảnh vào đúng vị trí sau:

```
/public/
  /assets/
    /images/
      logo.png                  # Logo công ty (117x32px hoặc tương tự)
      avatar-default.png        # Avatar mặc định (36x36px hoặc lớn hơn)
      video-thumbnail.png       # Thumbnail video mặc định (1280x720px hoặc 16:9)
      placeholder.png           # Placeholder chung
    /icons/
      (các icon SVG nếu cần)
    /avatars/
      default.png              # Avatar fallback
```

## 🖼️ Yêu cầu ảnh

### Logo (`logo.png`)
- **Kích thước đề xuất:** 400x108px (scale down về 117x32px trong UI)
- **Format:** PNG với transparent background
- **File size:** < 50KB
- **Sử dụng tại:** Header component

### Avatar Default (`avatar-default.png`)
- **Kích thước đề xuất:** 128x128px (scale down về 36x36px trong UI)
- **Format:** PNG hoặc JPG
- **File size:** < 20KB
- **Sử dụng tại:** Header component, User profile

### Video Thumbnail (`video-thumbnail.png`)
- **Kích thước đề xuất:** 1280x720px (16:9 aspect ratio)
- **Format:** JPG hoặc PNG
- **File size:** < 200KB
- **Sử dụng tại:** Video detail modal

### Placeholder (`placeholder.png`)
- **Kích thước đề xuất:** 800x600px
- **Format:** PNG
- **File size:** < 100KB
- **Sử dụng tại:** Product cards, General fallback

## 🚀 Quick Start

### Option 1: Tải ảnh có sẵn

Nếu bạn đã có ảnh, chỉ cần copy vào đúng vị trí:

```bash
# Từ thư mục root của project
mkdir -p public/assets/images
mkdir -p public/assets/icons
mkdir -p public/assets/avatars

# Copy ảnh vào (thay đổi path tùy theo vị trí ảnh của bạn)
cp path/to/your/logo.png public/assets/images/logo.png
cp path/to/your/avatar.png public/assets/images/avatar-default.png
cp path/to/your/video-thumb.png public/assets/images/video-thumbnail.png
```

### Option 2: Tạo placeholder tạm thời

Nếu chưa có ảnh, bạn có thể:

1. **Sử dụng online tool** để tạo placeholder:
   - https://placeholder.com/
   - https://via.placeholder.com/

2. **Download và đặt vào project:**

```bash
# Logo (117x32)
curl "https://via.placeholder.com/400x108/2563EB/FFFFFF?text=COUPPA" -o public/assets/images/logo.png

# Avatar (128x128)
curl "https://via.placeholder.com/128/64748b/FFFFFF?text=Avatar" -o public/assets/images/avatar-default.png

# Video thumbnail (1280x720)
curl "https://via.placeholder.com/1280x720/1e293b/FFFFFF?text=Video+Thumbnail" -o public/assets/images/video-thumbnail.png

# Placeholder general
curl "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Placeholder" -o public/assets/images/placeholder.png
```

### Option 3: Sử dụng Unsplash (Production-ready)

Cho production app, nên sử dụng ảnh chất lượng từ Unsplash:

```bash
# Tạo thư mục
mkdir -p public/assets/images

# Download ảnh từ Unsplash (ví dụ)
# Logo: Có thể cần thiết kế riêng
# Avatar: https://unsplash.com/photos/...
# Video thumbnail: https://unsplash.com/photos/...
```

## 🔍 Verify Installation

Sau khi đặt ảnh xong, kiểm tra bằng cách:

1. **Mở browser console** và test URLs:

```javascript
// Test trong DevTools Console
const images = [
  '/assets/images/logo.png',
  '/assets/images/avatar-default.png',
  '/assets/images/video-thumbnail.png',
  '/assets/images/placeholder.png'
];

images.forEach(src => {
  const img = new Image();
  img.onload = () => console.log('✅', src, 'loaded successfully');
  img.onerror = () => console.error('❌', src, 'failed to load');
  img.src = src;
});
```

2. **Kiểm tra file system:**

```bash
ls -lh public/assets/images/
```

Kết quả mong muốn:
```
logo.png               (< 50KB)
avatar-default.png     (< 20KB)
video-thumbnail.png    (< 200KB)
placeholder.png        (< 100KB)
```

## ⚙️ ImageWithFallback Component

Component này sẽ tự động hiển thị fallback SVG nếu ảnh load fail, nên không cần lo nếu ảnh chưa có:

```tsx
// Component tự động fallback
<ImageWithFallback 
  src="/assets/images/logo.png"  // Nếu fail...
  alt="Logo"                       // ...sẽ show placeholder SVG
  className="h-8 w-auto"
/>
```

## 🎨 Tối ưu ảnh (Optional)

Để tối ưu performance, nên compress ảnh trước khi đưa vào project:

### Online Tools:
- **TinyPNG**: https://tinypng.com/ (PNG compression)
- **Squoosh**: https://squoosh.app/ (Universal)
- **ImageOptim**: https://imageoptim.com/ (Mac app)

### Command Line (ImageMagick):

```bash
# Install ImageMagick
# brew install imagemagick (Mac)
# sudo apt install imagemagick (Linux)

# Optimize PNG
mogrify -strip -quality 85 public/assets/images/*.png

# Convert to WebP (modern format)
for img in public/assets/images/*.png; do
  cwebp -q 85 "$img" -o "${img%.png}.webp"
done
```

## 📊 Checklist

- [ ] Tạo thư mục `/public/assets/images/`
- [ ] Thêm `logo.png` (< 50KB)
- [ ] Thêm `avatar-default.png` (< 20KB)
- [ ] Thêm `video-thumbnail.png` (< 200KB)
- [ ] Thêm `placeholder.png` (< 100KB)
- [ ] Test URLs trong browser console
- [ ] Verify file sizes
- [ ] (Optional) Compress images
- [ ] (Optional) Generate WebP versions

## 🚨 Troubleshooting

### Issue: Ảnh không hiển thị

**Nguyên nhân:** Đường dẫn file sai hoặc file không tồn tại

**Giải pháp:**
1. Check file tồn tại: `ls public/assets/images/logo.png`
2. Check casing (logo.png vs Logo.png)
3. Check trong browser DevTools → Network tab
4. Verify component đang dùng `ImageWithFallback`

### Issue: Ảnh bị vỡ/méo

**Nguyên nhân:** Aspect ratio không đúng

**Giải pháp:**
1. Sử dụng `object-cover` hoặc `object-contain` trong className
2. Set cả width và height để maintain aspect ratio
3. Crop ảnh về đúng tỷ lệ trước khi upload

### Issue: Build lỗi "Cannot resolve image"

**Nguyên nhân:** Đang dùng `figma:asset` hoặc đường dẫn sai

**Giải pháp:**
1. Xem lại file error: `figma:asset/...` → sửa thành `/assets/images/...`
2. Đảm bảo dùng `ImageWithFallback` component
3. Check import statement không có `figma:asset`

## 📝 Notes

- Tất cả ảnh trong `/public/assets/` đều public accessible
- URL path bắt đầu bằng `/assets/` (không cần `/public/`)
- ImageWithFallback tự động handle errors nên app không bao giờ crash
- Production nên dùng CDN cho ảnh (Cloudflare, AWS CloudFront, etc.)

---

**Sau khi setup xong, xóa file này hoặc giữ lại để reference.**
