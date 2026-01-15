# Migration Guide: figma:asset → /assets/images

## 🚨 Vấn đề

Khi tải code về local và build, gặp lỗi:

```
Error: The following dependencies are imported but could not be resolved:
  figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png
  figma:asset/14b6e09bbbce88048c49e0eb0b484cadeab01689.png
```

**Nguyên nhân:** `figma:asset` là virtual module scheme chỉ tồn tại trong môi trường Figma Make. Vite/Webpack không thể resolve khi build production.

## ✅ Giải pháp đã áp dụng

### 1. Đã sửa các components sau:

| File | Thay đổi |
|------|----------|
| `/src/app/components/Header.tsx` | ✅ Đã sửa |
| `/src/app/components/Sidebar.tsx` | ✅ Đã sửa |
| `/src/app/components/VideoDetail.tsx` | ✅ Đã sửa |

### 2. Mapping ảnh cũ → mới

| Old (figma:asset) | New (static path) | Sử dụng tại |
|-------------------|-------------------|-------------|
| `e1296ad1f0de2b1f62777a16af5adb50125e46f8.png` | `/assets/images/logo.png` | Header, Sidebar |
| `14b6e09bbbce88048c49e0eb0b484cadeab01689.png` | `/assets/images/avatar-default.png` | Header (avatar) |
| `0d4c4808f6616a3f35401a425bcd0dc9b293b526.png` | `/assets/images/video-thumbnail.png` | VideoDetail |

### 3. Tất cả components đã chuyển sang sử dụng `ImageWithFallback`

#### Before (SẼ LỖI):
```tsx
import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';

<img src={logoImage} alt="Logo" />
```

#### After (HOẠT ĐỘNG):
```tsx
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

<ImageWithFallback 
  src="/assets/images/logo.png" 
  alt="Logo" 
  className="h-8 w-auto"
/>
```

## 📁 Cấu trúc ảnh cần thiết

Tạo các file ảnh sau trong thư mục `/public/assets/images/`:

```bash
/public/
  /assets/
    /images/
      logo.png               # Logo Couppa (117x32px hoặc lớn hơn)
      avatar-default.png     # Avatar mặc định (36x36px hoặc lớn hơn)
      video-thumbnail.png    # Thumbnail video (1280x720px hoặc 16:9)
      placeholder.png        # Placeholder chung (800x600px)
```

### Quick Setup:

```bash
# Tạo thư mục
mkdir -p public/assets/images

# Option 1: Copy ảnh có sẵn
cp path/to/your/logo.png public/assets/images/logo.png
cp path/to/your/avatar.png public/assets/images/avatar-default.png
cp path/to/your/video.png public/assets/images/video-thumbnail.png

# Option 2: Tạo placeholder tạm (curl)
curl "https://via.placeholder.com/400x108/2563EB/FFFFFF?text=COUPPA" -o public/assets/images/logo.png
curl "https://via.placeholder.com/128/64748b/FFFFFF?text=Avatar" -o public/assets/images/avatar-default.png
curl "https://via.placeholder.com/1280x720/1e293b/FFFFFF?text=Video" -o public/assets/images/video-thumbnail.png
curl "https://via.placeholder.com/800x600/e2e8f0/64748b?text=Placeholder" -o public/assets/images/placeholder.png
```

Chi tiết xem: `/public/assets/SETUP_IMAGES.md`

## 🔍 Verify

### 1. Check file tồn tại:
```bash
ls -lh public/assets/images/
```

Kết quả mong muốn:
```
logo.png
avatar-default.png
video-thumbnail.png
placeholder.png
```

### 2. Test trong browser console:
```javascript
const images = [
  '/assets/images/logo.png',
  '/assets/images/avatar-default.png',
  '/assets/images/video-thumbnail.png',
  '/assets/images/placeholder.png'
];

images.forEach(src => {
  const img = new Image();
  img.onload = () => console.log('✅', src);
  img.onerror = () => console.error('❌', src);
  img.src = src;
});
```

### 3. Build test:
```bash
npm run build
```

Không còn lỗi `Cannot resolve figma:asset` → ✅ Success!

## 📚 Documentation đã cập nhật

| File | Status |
|------|--------|
| `/docs/IMAGE_GUIDELINES.md` | ✅ Updated với warning về figma:asset |
| `/docs/CODE_REVIEW_CHECKLIST.md` | ✅ Added migration steps |
| `/docs/SYSTEM_OVERVIEW.md` | ℹ️  Cần update (optional) |
| `/public/assets/SETUP_IMAGES.md` | ✅ Created - hướng dẫn setup ảnh |

## 🔄 Files còn lại cần check (Optional)

Các files trong `/src/imports/` vẫn còn sử dụng `figma:asset`:

```
/src/imports/Group38184.tsx
/src/imports/Group38184-58-3995.tsx
/src/imports/NavigationTemplate.tsx
/src/imports/NavigationTemplate-58-4066.tsx
/src/imports/XemChiTiếtVideo.tsx
/src/imports/ThaoTacXoaHangLoạt.tsx
/src/imports/ThaoTacẨnHangLoạt.tsx
/src/imports/ThaoTacHiệnHangLoạt.tsx
/src/imports/DangVideo.tsx
```

**Lưu ý:** Các files này là Figma imports tự động generate, **KHÔNG NÊN chỉnh sửa thủ công**.  
Chỉ cần đảm bảo các components chính (Header, Sidebar, VideoDetail) không import từ các files này.

## ✅ Checklist hoàn thành

- [x] Sửa Header.tsx (logo + avatar)
- [x] Sửa Sidebar.tsx (logo)
- [x] Sửa VideoDetail.tsx (video thumbnail)
- [x] Tạo `/public/assets/SETUP_IMAGES.md`
- [x] Update `/docs/IMAGE_GUIDELINES.md`
- [x] Update `/docs/CODE_REVIEW_CHECKLIST.md`
- [ ] Tạo placeholder images trong `/public/assets/images/` **(NGƯỜI DÙNG CẦN LÀM)**
- [ ] Verify build thành công **(NGƯỜI DÙNG CẦN LÀM)**

## 🎯 Next Steps (Cho người dùng)

1. **Tạo hoặc copy ảnh vào `/public/assets/images/`:**
   ```bash
   mkdir -p public/assets/images
   # Copy/download 4 files ảnh
   ```

2. **Verify ảnh load được:**
   ```bash
   npm run dev
   # Mở http://localhost:5173
   # Check Header có logo + avatar
   ```

3. **Test build:**
   ```bash
   npm run build
   # Không có lỗi → Success!
   ```

4. **Deploy:**
   ```bash
   npm run preview  # Test production build local
   # Hoặc deploy lên Vercel/Netlify/etc.
   ```

## 📞 Troubleshooting

### Issue: Ảnh vẫn không hiển thị

**Check:**
1. File tồn tại: `ls public/assets/images/logo.png`
2. Path đúng: `/assets/images/logo.png` (KHÔNG phải `/public/assets/...`)
3. Component dùng `ImageWithFallback`
4. Clear cache: Ctrl+Shift+R (hard reload)

### Issue: Build vẫn lỗi figma:asset

**Check:**
1. Grep tìm figma:asset: `grep -r "figma:asset" src/app/`
2. Nếu còn → sửa theo pattern trong doc này
3. Ignore files trong `/src/imports/` (chúng không được sử dụng)

### Issue: ImageWithFallback không hoạt động

**Check:**
1. Import đúng: `import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'`
2. File component tồn tại: `ls src/app/components/figma/ImageWithFallback.tsx`
3. Props đúng format: `src`, `alt`, `className`

---

## 📝 Summary

**Vấn đề:** `figma:asset` chỉ hoạt động trong Figma Make  
**Giải pháp:** Chuyển sang `ImageWithFallback` + static paths  
**Status:** ✅ Code đã fix, chờ user add images  
**Next:** User cần tạo 4 files ảnh trong `/public/assets/images/`

**Version:** 1.0  
**Date:** 2025-01-14  
**Author:** Couppa Development Team
