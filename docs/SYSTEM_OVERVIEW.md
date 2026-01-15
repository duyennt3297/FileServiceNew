# Couppa SaaS Platform - System Overview

## 📋 Tổng quan hệ thống

Couppa là nền tảng quản lý video SaaS B2B được xây dựng với kiến trúc hiện đại, tuân thủ chuẩn World-class SaaS Design.

---

## 🏗️ Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + TypeScript)            │
│  - Figma Design Implementation                              │
│  - Tailwind CSS v4 với Design System Variables              │
│  - Components: Header, Sidebar, VideoList, ProductsList     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  API LAYER (Hono Server)                     │
│  Supabase Edge Functions                                    │
│  - /make-server-402c3f0d/* routes                           │
│  - CORS enabled                                             │
│  - Bearer token authentication                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (Supabase PostgreSQL)                  │
│  - UUID v7 for all primary keys                             │
│  - 24 tables với full indexing                              │
│  - Multi-tenancy isolation                                  │
│  - Soft delete pattern                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           STORAGE (Supabase Storage - Object Storage)        │
│  - Private buckets: make-402c3f0d-*                         │
│  - Presigned URLs (1 year validity)                         │
│  - Image/Video/Document storage                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Cấu trúc Project

```
/
├── docs/                           # 📚 Documentation
│   ├── supabase-schema.sql         # SQL Schema với UUID v7
│   ├── IMAGE_GUIDELINES.md         # Hướng dẫn sử dụng ảnh
│   ├── SYSTEM_OVERVIEW.md          # Document này
│   └── database/                   # Database design docs
│       ├── Database.md             # Polyglot Persistence Design
│       ├── DatabaseCommand.md      # SQL Commands
│       ├── ProductsTable.md        # Products schema chi tiết
│       └── supabase.md             # Supabase guidelines
│
├── supabase/
│   └── functions/
│       └── server/                 # 🚀 Edge Functions
│           ├── index.tsx           # Main Hono server
│           └── kv_store.tsx        # Key-Value utilities
│
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main app component
│   │   └── components/             # React components
│   │       ├── Header.tsx          # Top navigation
│   │       ├── Sidebar.tsx         # Left sidebar menu
│   │       ├── VideosList.tsx      # Video management
│   │       ├── ProductsList.tsx    # Product management
│   │       ├── VideoDetail.tsx     # Video detail view
│   │       └── figma/
│   │           └── ImageWithFallback.tsx  # Image component
│   │
│   ├── imports/                    # Figma imports (DO NOT EDIT)
│   │   ├── svg-*.tsx               # SVG components
│   │   └── Group*.tsx              # Figma frames
│   │
│   ├── services/                   # API services
│   │   ├── productService.ts       # Product CRUD
│   │   └── videoService.ts         # Video CRUD
│   │
│   ├── styles/                     # Styling
│   │   ├── global.css              # Global styles + Design System
│   │   ├── theme.css               # CSS Variables
│   │   └── fonts.css               # Font imports
│   │
│   └── lib/                        # Utilities
│       └── supabase.ts             # Supabase client
│
└── public/                         # Static assets
    └── assets/
        ├── images/
        ├── icons/
        └── avatars/
```

---

## 🎨 Design System

### CSS Variables (Defined in `/src/styles/theme.css`)

```css
:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Quy tắc sử dụng:

✅ **DO:**
```tsx
// Sử dụng CSS variables
<div className="bg-[var(--color-primary)] rounded-[var(--radius-lg)] p-[var(--spacing-md)]">
```

❌ **DON'T:**
```tsx
// Hardcode colors/values
<div className="bg-blue-600 rounded-xl p-4">
```

---

## 🗄️ Database Design

### UUID v7 Implementation

**Tất cả bảng sử dụng UUID v7 (timestamp-based) cho primary key:**

```sql
CREATE TABLE products (
    _id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    tenant_id UUID NOT NULL,
    ...
);
```

**Lợi ích:**
- ✅ Chronologically sortable
- ✅ Giảm 38% index fragmentation
- ✅ Performance tốt hơn 40% vs UUID v4
- ✅ Có thể extract timestamp từ UUID

### Standard Mixins (Bắt buộc cho mọi bảng)

```sql
-- Identity & Multi-tenancy
_id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
tenant_id UUID NOT NULL,

-- Audit Trail
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
created_by UUID,
updated_by UUID,

-- Soft Delete
deleted_at TIMESTAMPTZ,

-- Optimistic Locking
version BIGINT NOT NULL DEFAULT 1
```

### Naming Convention (snake_case)

| Type | Pattern | Example |
|------|---------|---------|
| Table | plural noun | `products`, `users`, `tenant_members` |
| Primary Key | `_id` | `_id UUID` |
| Foreign Key | `table_name_id` | `tenant_id`, `product_type_id` |
| Boolean | `is_*`, `has_*`, `can_*` | `is_active`, `has_variants` |
| Timestamp | `*_at` | `created_at`, `updated_at`, `deleted_at` |
| Date | `*_date` | `birth_date`, `start_date` |

### Data Types Precision

| Data Type | PostgreSQL Type | Example | Note |
|-----------|----------------|---------|------|
| Money | `NUMERIC(19, 4)` | `price NUMERIC(19,4)` | KHÔNG dùng FLOAT/DOUBLE |
| Text URL | `TEXT` | `image_url TEXT` | KHÔNG dùng VARCHAR(255) |
| Timestamp | `TIMESTAMPTZ` | `created_at TIMESTAMPTZ` | Luôn lưu UTC |
| Arrays | `TEXT[]`, `UUID[]` | `tags TEXT[]` | Native array support |
| JSON | `JSONB` | `metadata JSONB` | Indexable với GIN |

---

## 🔐 Authentication & Security

### Multi-tenancy Isolation

Mọi query phải filter theo `tenant_id`:

```sql
-- ✅ CORRECT
SELECT * FROM products 
WHERE tenant_id = 'current-tenant-uuid' 
  AND deleted_at IS NULL;

-- ❌ WRONG - Security breach!
SELECT * FROM products WHERE deleted_at IS NULL;
```

### Soft Delete Pattern

```sql
-- Delete (soft)
UPDATE products 
SET deleted_at = NOW(), deleted_by = 'user-uuid'
WHERE _id = 'product-uuid';

-- Query active records
SELECT * FROM products 
WHERE tenant_id = '...' AND deleted_at IS NULL;

-- Restore
UPDATE products 
SET deleted_at = NULL 
WHERE _id = 'product-uuid';
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their tenant's data
CREATE POLICY tenant_isolation ON products
FOR ALL
USING (tenant_id = current_setting('app.current_tenant_id')::UUID);
```

---

## 📦 Key Features

### 1. Product Management
- ✅ Full CRUD operations
- ✅ Multi-tenant isolation
- ✅ Image upload với Supabase Storage
- ✅ Product categories (Materialized Path)
- ✅ Product variants (SKU management)
- ✅ Dynamic attributes (JSONB)
- ✅ Full-text search
- ✅ Stock tracking
- ✅ SEO metadata

### 2. File Management
- ✅ Upload to Supabase Storage
- ✅ Presigned URLs (1 year)
- ✅ Private buckets
- ✅ File metadata tracking
- ✅ Folder hierarchy
- ✅ Image thumbnails

### 3. Organization Management
- ✅ Tenants (Multi-company)
- ✅ Users (Global)
- ✅ Tenant Members (User-Tenant mapping)
- ✅ Departments (Hierarchical)
- ✅ User Groups (Chi nhánh/Cửa hàng)
- ✅ Locations (GPS coordinates)

### 4. Authentication
- ✅ Email/Password
- ✅ OAuth (Google, GitHub, Microsoft)
- ✅ MFA (TOTP, SMS)
- ✅ WebAuthn/Passkey
- ✅ Backup codes
- ✅ Session management với rotation

---

## 🔧 API Guidelines

### Request Format

```typescript
// POST /make-server-402c3f0d/products
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-402c3f0d/products`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      tenant_id: 'uuid',
      title: 'Product Name',
      code: 'PROD-001',
      price: 100000,
      status: 1
    })
  }
);
```

### Response Format

```typescript
// Success
{
  "success": true,
  "data": {
    "_id": "018d3f74-8b2a-7000-8000-123456789abc",
    "title": "Product Name",
    ...
  }
}

// Error
{
  "success": false,
  "error": "Error message here",
  "code": "VALIDATION_ERROR"
}
```

### Error Handling

```typescript
try {
  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
} catch (error) {
  console.error('API Error:', error);
  throw error;
}
```

---

## 🖼️ Image Handling

### Quy tắc vàng:

1. **KHÔNG tự tạo** `figma:asset` imports
2. **SỬ DỤNG** `ImageWithFallback` cho ảnh mới
3. **SỬ DỤNG** `unsplash_tool` cho ảnh demo
4. **LƯU** URL ảnh dạng TEXT trong database
5. **UPLOAD** vào Supabase Storage, không lưu binary trong DB

### Example:

```tsx
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

function ProductCard({ product }: { product: Product }) {
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

Chi tiết xem: `/docs/IMAGE_GUIDELINES.md`

---

## 🚀 Deployment

### Supabase Setup

1. Create Supabase project
2. Run `/docs/supabase-schema.sql` in SQL Editor
3. Configure Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server (trong Edge Functions)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Deploy Edge Functions
supabase functions deploy make-server-402c3f0d
```

---

## 📊 Performance Optimization

### Database Indexes

- ✅ 70+ indexes trên 24 tables
- ✅ GIN indexes cho JSONB & Arrays
- ✅ Partial indexes (WHERE deleted_at IS NULL)
- ✅ Full-text search indexes
- ✅ Composite indexes cho multi-tenant queries

### Caching Strategy

```typescript
// Client-side caching với React Query (recommended)
import { useQuery } from '@tanstack/react-query';

function useProducts(tenantId: string) {
  return useQuery({
    queryKey: ['products', tenantId],
    queryFn: () => fetchProducts(tenantId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Image Optimization

```tsx
// Lazy loading
<ImageWithFallback 
  src={imageUrl}
  alt="Product"
  loading="lazy"
  className="w-full"
/>

// Responsive images
<ImageWithFallback 
  src={imageUrl}
  srcSet={`
    ${thumbnailUrl} 480w,
    ${mediumUrl} 800w,
    ${largeUrl} 1200w
  `}
  sizes="(max-width: 768px) 480px, 800px"
  alt="Product"
/>
```

---

## 🧪 Testing

### Database Testing

```sql
-- Test UUID v7 generation
SELECT uuid_generate_v7();

-- Test timestamp extraction
SELECT uuid_v7_to_timestamptz('018d3f74-8b2a-7000-8000-123456789abc');

-- Test soft delete
SELECT * FROM products WHERE deleted_at IS NOT NULL;
```

### API Testing

```bash
# Test product creation
curl -X POST https://your-project.supabase.co/functions/v1/make-server-402c3f0d/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "tenant_id": "uuid",
    "title": "Test Product",
    "code": "TEST-001",
    "price": 100000
  }'
```

---

## 📚 Documentation References

| Document | Description |
|----------|-------------|
| `/docs/supabase-schema.sql` | Complete database schema |
| `/docs/IMAGE_GUIDELINES.md` | Image handling guidelines |
| `/docs/database/Database.md` | Polyglot Persistence design |
| `/docs/database/ProductsTable.md` | Products schema details |
| `/docs/database/supabase.md` | Supabase best practices |

---

## 🛠️ Development Guidelines

### Code Style

```typescript
// ✅ Use TypeScript
interface Product {
  _id: string;
  tenant_id: string;
  title: string;
  price: number;
  status: number;
}

// ✅ Use async/await
async function fetchProducts(tenantId: string): Promise<Product[]> {
  const response = await fetch(url);
  return response.json();
}

// ✅ Handle errors properly
try {
  await createProduct(data);
} catch (error) {
  console.error('Failed to create product:', error);
  throw error;
}
```

### Git Commit Messages

```
feat: Add product image upload
fix: Fix soft delete query
docs: Update database schema
refactor: Optimize product listing query
perf: Add database indexes
test: Add product CRUD tests
```

---

## 🆘 Troubleshooting

### Common Issues

**Issue: UUID v7 not working**
```sql
-- Ensure extensions are installed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Test function
SELECT uuid_generate_v7();
```

**Issue: Images not loading**
```tsx
// Use ImageWithFallback instead of <img>
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
```

**Issue: Multi-tenancy leak**
```sql
-- Always filter by tenant_id
SELECT * FROM products 
WHERE tenant_id = 'current-tenant' 
  AND deleted_at IS NULL;
```

---

## 📞 Support

Nếu gặp vấn đề hoặc cần hỗ trợ:

1. Kiểm tra documentation trong `/docs/`
2. Xem lại guidelines (IMAGE_GUIDELINES.md, etc.)
3. Verify database schema trong `/docs/supabase-schema.sql`
4. Check logs trong Supabase Dashboard

---

**Document Version:** 3.0  
**Last Updated:** 2025-01-14  
**Author:** Couppa Development Team
