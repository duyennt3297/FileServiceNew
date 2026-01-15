# Image Guidelines - Hướng dẫn sử dụng ảnh trong Couppa

## ⚠️ QUAN TRỌNG: figma:asset CHỈ HOẠT ĐỘNG TRONG FIGMA MAKE

**`figma:asset` là virtual module scheme chỉ tồn tại trong môi trường Figma Make.**

Khi tải code về local hoặc deploy lên production, `figma:asset` sẽ gây lỗi build:
```
Error: The following dependencies are imported but could not be resolved:
  figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png
```

## 1. Quy tắc Import Ảnh (CẬP NHẬT 2025-01-14)

### ❌ KHÔNG BAO GIỜ sử dụng figma:asset trong code mới
```tsx
// ❌ WRONG - Sẽ lỗi khi build ở local/production
import myImage from 'figma:asset/some-hash.png';
import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
```

**Lý do:** `figma:asset` chỉ là virtual module trong Figma Make environment. Khi build thực tế, Vite/Webpack không thể resolve module này.

### ✅ ĐÚNG: Sử dụng ImageWithFallback cho TẤT CẢ ảnh

```tsx
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

function MyComponent() {
  return (
    <ImageWithFallback 
      src="/assets/images/logo.png"
      alt="Company Logo"
      className="w-12 h-12"
    />
  );
}
```

### ✅ ĐÚNG: Sử dụng đường dẫn tĩnh từ /public hoặc /assets

```tsx
<ImageWithFallback 
  src="/assets/images/logo.png"
  alt="Logo"
  className="h-8 w-auto"
/>

<ImageWithFallback 
  src="/assets/images/avatar-default.png"
  alt="Avatar"
  className="w-10 h-10 rounded-full"
/>

<ImageWithFallback 
  src="/assets/images/video-thumbnail.png"
  alt="Video"
  className="w-full h-48 object-cover"
/>
```

## 2. Migration từ figma:asset

Nếu bạn thấy code cũ có `figma:asset`, cần thay thế ngay:

### Before (SẼ LỖI):
```tsx
import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
import imgAvatar from 'figma:asset/14b6e09bbbce88048c49e0eb0b484cadeab01689.png';

<img src={logoImage} alt="Logo" />
<img src={imgAvatar} alt="Avatar" />
```

### After (HOẠT ĐỘNG):
```tsx
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

<ImageWithFallback src="/assets/images/logo.png" alt="Logo" />
<ImageWithFallback src="/assets/images/avatar-default.png" alt="Avatar" />
```

## 3. Cấu trúc thư mục ảnh

```
/public/
  /assets/
    /images/        # Ảnh tĩnh
      logo.png
      placeholder.png
    /icons/         # Icons/SVG
      check.svg
    /avatars/       # Avatar placeholders
      default.png
```

## 4. Component ImageWithFallback

### Features:
- ✅ Tự động fallback khi ảnh lỗi
- ✅ Hiển thị placeholder SVG khi load fail
- ✅ Compatible với tất cả img attributes
- ✅ Support className, style, etc.

### Usage Examples:

#### Basic Usage
```tsx
<ImageWithFallback 
  src="/assets/images/logo.png"
  alt="Logo"
  className="w-20 h-20"
/>
```

#### Product Image
```tsx
<ImageWithFallback 
  src={product.featured_image_url}
  alt={product.title}
  className="w-full h-48 object-cover rounded-lg"
/>
```

#### Avatar
```tsx
<ImageWithFallback 
  src={user.avatar_url || '/assets/avatars/default.png'}
  alt={user.full_name}
  className="w-10 h-10 rounded-full"
/>
```

#### Remote URL với fallback
```tsx
<ImageWithFallback 
  src={imageUrl}
  alt="Remote image"
  className="max-w-full"
  onError={() => console.log('Image failed to load')}
/>
```

## 5. Làm việc với Figma Imports (Đã có sẵn)

Các import từ Figma đã tồn tại trong project:

```tsx
// ✅ CORRECT - Sử dụng các imports có sẵn từ Figma
import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
import imgEllipse3 from 'figma:asset/14b6e09bbbce88048c49e0eb0b484cadeab01689.png';
import imgMountains from 'figma:asset/0d4c4808f6616a3f35401a425bcd0dc9b293b526.png';

// Sử dụng trực tiếp
<img src={logoImage} alt="Logo" className="w-12 h-12" />
```

**Lưu ý:** KHÔNG chỉnh sửa hoặc xóa các imports n��y trong `/src/imports/` folder.

## 6. Database Schema - Image URLs

### Products Table
```sql
-- Sử dụng TEXT cho URL ảnh (hỗ trợ Presigned URLs dài)
CREATE TABLE products (
    featured_image_url TEXT,        -- URL ảnh chính
    thumbnail_url TEXT,              -- URL thumbnail
    gallery_image_ids UUID[],        -- Mảng IDs ảnh gallery (FK to files table)
    ...
);
```

### Files Table (Object Storage)
```sql
CREATE TABLE files (
    _id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    tenant_id UUID NOT NULL,
    
    -- File Info
    name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_type VARCHAR(100),         -- 'image', 'video', 'document'
    mime_type VARCHAR(100),         -- 'image/png', 'image/jpeg'
    size BIGINT DEFAULT 0,
    
    -- Storage Info (Supabase Storage)
    storage_path TEXT NOT NULL,     -- 'tenant-id/products/abc123.png'
    storage_url TEXT,               -- Presigned URL (TEXT cho URL dài)
    thumbnail_url TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',    -- {"width": 1920, "height": 1080, "format": "png"}
    ...
);
```

## 7. Upload Flow (Sử dụng Supabase Storage)

### Frontend Upload Component
```tsx
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

function ProductImageUpload({ productId }: { productId: string }) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('product_id', productId);

      const response = await fetch('/api/upload-product-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      
      {imageUrl && (
        <ImageWithFallback 
          src={imageUrl}
          alt="Uploaded product"
          className="mt-4 w-full h-48 object-cover rounded-lg"
        />
      )}
      
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

### Backend API (Supabase Edge Function)
```typescript
// /supabase/functions/server/upload-product-image.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export async function uploadProductImage(file: File, productId: string, tenantId: string) {
  const bucketName = 'make-402c3f0d-products';
  
  // 1. Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === bucketName);
  
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
  }
  
  // 2. Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${tenantId}/${productId}/${Date.now()}.${fileExt}`;
  
  // 3. Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false
    });
  
  if (uploadError) throw uploadError;
  
  // 4. Generate signed URL (valid for 1 year)
  const { data: urlData } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(fileName, 31536000); // 365 days
  
  // 5. Save to files table
  const { data: fileRecord } = await supabase
    .from('files')
    .insert({
      tenant_id: tenantId,
      name: file.name,
      original_name: file.name,
      file_type: 'image',
      mime_type: file.type,
      size: file.size,
      storage_path: fileName,
      storage_url: urlData.signedUrl,
      metadata: {
        product_id: productId
      }
    })
    .select()
    .single();
  
  // 6. Update product table
  await supabase
    .from('products')
    .update({ 
      featured_image_url: urlData.signedUrl,
      featured_image_id: fileRecord._id
    })
    .eq('_id', productId);
  
  return {
    url: urlData.signedUrl,
    fileId: fileRecord._id
  };
}
```

## 8. Best Practices

### ✅ DO:
- Sử dụng `ImageWithFallback` cho tất cả ảnh động
- Lưu URL ảnh dạng TEXT trong database (không phải VARCHAR(255))
- Sử dụng Unsplash tool khi cần ảnh demo/stock
- Compress ảnh trước khi upload (max 2MB cho web)
- Tạo thumbnail cho ảnh lớn
- Sử dụng lazy loading: `loading="lazy"`

### ❌ DON'T:
- Không tự tạo import `figma:asset`
- Không hardcode ảnh base64 trong code
- Không dùng `<img>` trực tiếp (dùng `ImageWithFallback`)
- Không lưu ảnh trong database (BLOB) - dùng object storage
- Không dùng VARCHAR(255) cho URL ảnh

## 9. Image Optimization

### Responsive Images
```tsx
<ImageWithFallback 
  src={imageUrl}
  srcSet={`
    ${thumbnailUrl} 480w,
    ${mediumUrl} 800w,
    ${largeUrl} 1200w
  `}
  sizes="(max-width: 768px) 480px, (max-width: 1200px) 800px, 1200px"
  alt="Product"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Background Images with Tailwind
```tsx
<div 
  className="bg-cover bg-center h-64"
  style={{ backgroundImage: `url(${imageUrl})` }}
>
  Content here
</div>
```

## 10. Placeholder & Loading States

### Skeleton Loader
```tsx
function ProductCard({ product, loading }: { product?: Product; loading: boolean }) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-300 h-48 rounded-lg"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }
  
  return (
    <div>
      <ImageWithFallback 
        src={product.featured_image_url}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3>{product.title}</h3>
    </div>
  );
}
```

## 11. Testing Image URLs

```typescript
// Test if URL is valid
function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

// Test if image loads
async function canLoadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
```

---

## Tổng kết

1. **Ảnh từ Figma:** Giữ nguyên imports có sẵn, không tự tạo mới
2. **Ảnh mới:** Sử dụng `ImageWithFallback` component
3. **Ảnh demo:** Sử dụng unsplash_tool
4. **Database:** Lưu URL dạng TEXT, không lưu binary
5. **Storage:** Sử dụng Supabase Storage với signed URLs
6. **Best Practice:** Lazy loading, optimization, fallback handling

**File này là guideline chính thức cho toàn bộ team development!**