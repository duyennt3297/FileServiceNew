# Changelog - Couppa SaaS Platform

All notable changes to this project will be documented in this file.

---

## [3.0.0] - 2025-01-14

### 🚨 BREAKING CHANGES

#### Migration từ figma:asset sang static assets

**Problem:** `figma:asset` virtual module chỉ hoạt động trong Figma Make environment. Khi build ở local hoặc production, gây lỗi:

```
Error: The following dependencies are imported but could not be resolved:
  figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png
```

**Solution:** Migrate tất cả images sang static paths với `ImageWithFallback` component.

#### Components đã sửa:

- ✅ `/src/app/components/Header.tsx` - Logo + Avatar
- ✅ `/src/app/components/Sidebar.tsx` - Logo  
- ✅ `/src/app/components/VideoDetail.tsx` - Video thumbnail

#### Migration Pattern:

```diff
- import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
+ import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

- <img src={logoImage} alt="Logo" />
+ <ImageWithFallback src="/assets/images/logo.png" alt="Logo" />
```

### ✨ Added

#### Documentation

- **`/docs/IMAGE_GUIDELINES.md`** - Comprehensive image handling guide
  - Warning về figma:asset limitation
  - Migration steps
  - Best practices
  - Upload flow examples

- **`/docs/MIGRATION_FIGMA_ASSET.md`** - Migration guide từ figma:asset
  - Problem statement
  - Solution overview
  - File mapping table
  - Verify steps
  - Troubleshooting

- **`/docs/CODE_REVIEW_CHECKLIST.md`** - Code review checklist
  - Image handling rules
  - CSS styling guidelines
  - Database query patterns
  - TypeScript best practices
  - Security checklist
  - Performance checklist

- **`/docs/SYSTEM_OVERVIEW.md`** - Complete system documentation
  - Architecture overview
  - Project structure
  - Design system
  - Database design
  - API guidelines
  - Deployment guide

- **`/public/assets/SETUP_IMAGES.md`** - Image setup instructions
  - Directory structure
  - Image requirements
  - Quick setup commands
  - Verification steps
  - Troubleshooting

#### Database Schema

- **`/docs/supabase-schema.sql`** - Complete PostgreSQL schema với UUID v7
  - UUID v7 generator function (timestamp-based, sortable)
  - 24 tables with 70+ indexes
  - 12 auto-update triggers
  - 4 utility functions
  - Seed data with default tenant
  - Testing & verification queries

**UUID v7 Benefits:**
- 38% faster inserts than UUID v4
- Chronologically sortable
- Reduced B-tree index fragmentation
- Better for distributed databases
- Can extract timestamp from UUID

### 🔧 Changed

#### Image Handling

**Before:**
```tsx
import logoImage from 'figma:asset/hash.png';
<img src={logoImage} alt="Logo" />
```

**After:**
```tsx
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
<ImageWithFallback src="/assets/images/logo.png" alt="Logo" />
```

#### Required Images Structure

```
/public/
  /assets/
    /images/
      logo.png               # Logo (117x32px or higher)
      avatar-default.png     # Avatar (36x36px or higher)  
      video-thumbnail.png    # Video (1280x720px or 16:9)
      placeholder.png        # General placeholder
```

### 🗄️ Database Changes

#### Standard Mixins (Required for all tables)

```sql
_id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
tenant_id UUID NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
deleted_at TIMESTAMPTZ,
created_by UUID,
updated_by UUID,
version BIGINT NOT NULL DEFAULT 1
```

#### Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Table | plural noun | `products`, `users` |
| Primary Key | `_id` | `_id UUID` |
| Foreign Key | `table_name_id` | `tenant_id`, `product_type_id` |
| Boolean | `is_*`, `has_*` | `is_active`, `has_variants` |
| Timestamp | `*_at` | `created_at`, `updated_at` |

#### Data Types Precision

| Data Type | PostgreSQL | Note |
|-----------|-----------|------|
| Money | `NUMERIC(19, 4)` | KHÔNG dùng FLOAT/DOUBLE |
| URLs | `TEXT` | KHÔNG dùng VARCHAR(255) |
| Timestamp | `TIMESTAMPTZ` | Luôn lưu UTC |
| Arrays | `TEXT[]`, `UUID[]` | Native support |
| JSON | `JSONB` | Indexable với GIN |

### 📊 Statistics

#### Database

- **24 tables** (Organization, Auth, Products, Files)
- **70+ indexes** (GIN, Partial, Composite)
- **12 triggers** (auto-update, slug generation)
- **4 functions** (UUID v7, timestamp extract, slug, stock status)
- **3 extensions** (uuid-ossp, pg_trgm, pgcrypto)

#### Documentation

- **8 major documents** (2,500+ lines)
- **Complete API examples**
- **Migration guides**
- **Best practices**
- **Troubleshooting guides**

### 🔒 Security

#### Multi-tenancy Isolation

```typescript
// ✅ ALWAYS filter by tenant_id
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('tenant_id', tenantId)
  .is('deleted_at', null);
```

#### Soft Delete Pattern

```typescript
// ✅ Soft delete (recoverable)
await supabase
  .from('products')
  .update({ 
    deleted_at: new Date().toISOString(),
    deleted_by: userId 
  })
  .eq('_id', productId);
```

#### Optimistic Locking

```typescript
// ✅ Prevent concurrent modifications
const { data } = await supabase
  .from('products')
  .update({ 
    title: 'New Title',
    version: product.version + 1 
  })
  .eq('_id', productId)
  .eq('version', product.version);
```

### 📝 Notes

#### For Developers

1. **Read `/docs/MIGRATION_FIGMA_ASSET.md`** first
2. **Setup images** in `/public/assets/images/` (xem `/public/assets/SETUP_IMAGES.md`)
3. **Never use** `figma:asset` in new code
4. **Always use** `ImageWithFallback` component
5. **Always filter** by `tenant_id` in queries

#### For Database Team

1. **Read `/docs/supabase-schema.sql`**
2. **Run schema** in Supabase SQL Editor
3. **Verify** UUID v7 function works
4. **Check** default tenant & product types created

#### For Frontend Team

1. **Read `/docs/IMAGE_GUIDELINES.md`**
2. **Read `/docs/CODE_REVIEW_CHECKLIST.md`**
3. **Use CSS variables** for styling
4. **Use defined fonts** only
5. **Handle loading/error states**

### 🚀 Deployment Checklist

- [ ] Run `/docs/supabase-schema.sql` in Supabase
- [ ] Add images to `/public/assets/images/`
- [ ] Configure environment variables
- [ ] Test build: `npm run build`
- [ ] Verify no `figma:asset` errors
- [ ] Deploy to production

### 🐛 Known Issues

- **Files trong `/src/imports/`** vẫn có `figma:asset` imports (KHÔNG SỬA)
  - Các files này là auto-generated từ Figma
  - KHÔNG được sử dụng trực tiếp trong app
  - Chỉ cần đảm bảo components chính không import từ chúng

### 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `/docs/MIGRATION_FIGMA_ASSET.md` | Migration guide |
| `/docs/IMAGE_GUIDELINES.md` | Image handling complete guide |
| `/docs/CODE_REVIEW_CHECKLIST.md` | Code review standards |
| `/docs/SYSTEM_OVERVIEW.md` | System architecture |
| `/docs/supabase-schema.sql` | Database schema (UUID v7) |
| `/docs/README.md` | Documentation index |
| `/public/assets/SETUP_IMAGES.md` | Image setup guide |

---

## [2.0.0] - 2025-01-13

### Added
- Products Management module (replace Articles)
- File upload & management
- Database schema design documents
- Multi-tenancy architecture

### Changed
- Updated design system with CSS variables
- Tailwind CSS v4 migration

---

## [1.0.0] - 2025-01-12

### Added
- Initial project setup
- Header & Sidebar components
- Video management module
- Figma design integration

---

**For full documentation, see `/docs/README.md`**
