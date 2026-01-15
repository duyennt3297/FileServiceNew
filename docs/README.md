# Couppa SaaS Platform - Documentation

## 📚 Table of Contents

### 🚀 Getting Started
- **[SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md)** - Tổng quan toàn bộ hệ thống
- **[supabase-schema.sql](./supabase-schema.sql)** - SQL Schema hoàn chỉnh với UUID v7

### 🗄️ Database Design
- **[database/Database.md](./database/Database.md)** - Polyglot Persistence Architecture
- **[database/DatabaseCommand.md](./database/DatabaseCommand.md)** - SQL Commands & Examples
- **[database/supabase.md](./database/supabase.md)** - Supabase Best Practices
- **[database/ProductsTable.md](./database/ProductsTable.md)** - Products Table Schema Chi Tiết

### 🖼️ Asset Management
- **[IMAGE_GUIDELINES.md](./IMAGE_GUIDELINES.md)** - Hướng dẫn sử dụng ảnh & media

---

## 📋 Quick Start

### 1. Setup Database

```bash
# Bước 1: Mở Supabase SQL Editor
# Bước 2: Copy toàn bộ nội dung từ supabase-schema.sql
# Bước 3: Paste và RUN
# Bước 4: Đợi ~1 phút để tạo xong 24 tables, 70+ indexes, 12 triggers
```

### 2. Verify Installation

```sql
-- Check UUID v7 generation
SELECT uuid_generate_v7();

-- Check tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Check default tenant
SELECT * FROM tenants WHERE code = 'default-tenant';

-- Check product types
SELECT * FROM product_types;
```

### 3. Test Insert

```sql
-- Insert test product
INSERT INTO products (
  tenant_id, 
  product_type_id, 
  title, 
  code, 
  price
)
SELECT 
  t._id,
  pt._id,
  'iPhone 15 Pro Max',
  'IP15PM-256',
  29990000
FROM tenants t
CROSS JOIN product_types pt
WHERE t.code = 'default-tenant' 
  AND pt.code = 'GOODS'
LIMIT 1;

-- Verify
SELECT 
  _id,
  title,
  price,
  created_at,
  uuid_v7_to_timestamptz(_id) as uuid_timestamp
FROM products
ORDER BY _id DESC LIMIT 1;
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (React + TypeScript)               │
│  • Figma Design System                                      │
│  • Tailwind CSS v4 với CSS Variables                        │
│  • Components: Header, Sidebar, Products, Videos            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              API LAYER (Supabase Edge Functions)             │
│  • Hono Server                                              │
│  • Routes: /make-server-402c3f0d/*                          │
│  • CORS enabled, Bearer auth                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           DATABASE (Supabase PostgreSQL)                     │
│  • UUID v7 Primary Keys                                     │
│  • 24 Tables, 70+ Indexes                                   │
│  • Multi-tenancy Isolation                                  │
│  • Soft Delete Pattern                                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│        STORAGE (Supabase Object Storage)                     │
│  • Private Buckets                                          │
│  • Presigned URLs (1 year)                                  │
│  • Images, Videos, Documents                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

### ✅ Database (PostgreSQL/Supabase)
- **UUID v7** - Timestamp-based, chronologically sortable (38% faster than v4)
- **Multi-tenancy** - Complete isolation với tenant_id
- **Soft Delete** - Khôi phục được dữ liệu đã xóa
- **Audit Trail** - created_at, updated_at, created_by, updated_by
- **Optimistic Locking** - version field cho concurrency control
- **Full-text Search** - GIN indexes cho tìm kiếm nhanh
- **JSONB Support** - Dynamic attributes với indexing

### ✅ Naming Convention (snake_case)
```
Tables:       products, users, tenant_members
Primary Key:  _id (UUID v7)
Foreign Keys: tenant_id, product_type_id, user_id
Booleans:     is_active, has_variants, can_export
Timestamps:   created_at, updated_at, deleted_at
Dates:        birth_date, start_date, end_date
```

### ✅ Data Types Precision
```sql
Money:      NUMERIC(19, 4)  -- KHÔNG dùng FLOAT/DOUBLE
URLs:       TEXT            -- KHÔNG dùng VARCHAR(255)
Timestamps: TIMESTAMPTZ     -- Luôn lưu UTC
Arrays:     TEXT[], UUID[]  -- Native array support
JSON:       JSONB           -- Indexable với GIN
```

### ✅ Standard Mixins (Bắt buộc mọi bảng)
```sql
-- Identity
_id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
tenant_id UUID NOT NULL,

-- Audit
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
created_by UUID,
updated_by UUID,

-- Soft Delete
deleted_at TIMESTAMPTZ,

-- Versioning
version BIGINT NOT NULL DEFAULT 1
```

---

## 📊 Database Statistics

| Metric | Count |
|--------|-------|
| **Tables** | 24 |
| **Indexes** | 70+ |
| **Triggers** | 12 |
| **Functions** | 4 |
| **Extensions** | 3 (uuid-ossp, pg_trgm, pgcrypto) |

### Table Categories:

**Organization (8 tables):**
- tenants, users, tenant_members
- departments, department_members
- user_groups, group_members
- locations

**Authentication (6 tables):**
- user_linked_identities
- user_sessions
- user_mfa_methods
- user_webauthn_credentials
- user_backup_codes

**Products (6 tables):**
- product_categories
- product_types
- product_attribute_definitions
- products (SPU)
- product_attribute_values
- product_variants (SKU)

**Files (2 tables):**
- folders
- files

---

## 🔧 Development Guidelines

### Code Style
```typescript
// ✅ Use TypeScript interfaces
interface Product {
  _id: string;
  tenant_id: string;
  title: string;
  price: number;
  status: number;
}

// ✅ Use async/await
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(url);
  return response.json();
}

// ✅ Handle errors
try {
  await createProduct(data);
} catch (error) {
  console.error('Error:', error);
  throw error;
}
```

### Database Queries
```sql
-- ✅ ALWAYS filter by tenant_id
SELECT * FROM products 
WHERE tenant_id = 'uuid' AND deleted_at IS NULL;

-- ✅ Use prepared statements
PREPARE get_products AS
SELECT * FROM products 
WHERE tenant_id = $1 AND deleted_at IS NULL;

-- ✅ Create indexes for common queries
CREATE INDEX idx_products_tenant_status 
ON products (tenant_id, status) 
WHERE deleted_at IS NULL;
```

### Image Handling
```tsx
// ✅ Use ImageWithFallback
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

<ImageWithFallback 
  src={product.featured_image_url}
  alt={product.title}
  className="w-full h-48 object-cover"
/>

// ❌ Don't use <img> directly
<img src={url} alt="Product" />

// ❌ Don't create figma:asset imports
import img from 'figma:asset/hash.png';
```

---

## 📖 Document Descriptions

### [SYSTEM_OVERVIEW.md](./SYSTEM_OVERVIEW.md)
Tài liệu tổng quan toàn diện về:
- Kiến trúc hệ thống
- Cấu trúc project
- Design system
- API guidelines
- Deployment
- Performance optimization
- Troubleshooting

### [supabase-schema.sql](./supabase-schema.sql)
SQL Schema hoàn chỉnh bao gồm:
- UUID v7 generator function
- 24 tables với full constraints
- 70+ indexes (GIN, Partial, Composite)
- 12 triggers (auto-update, slug generation)
- 4 utility functions
- Seed data (default tenant, product types)
- Testing & verification queries

### [IMAGE_GUIDELINES.md](./IMAGE_GUIDELINES.md)
Hướng dẫn chi tiết về:
- Quy tắc import ảnh (figma:asset vs normal)
- Component ImageWithFallback
- Database schema cho URLs
- Upload flow với Supabase Storage
- Best practices
- Optimization techniques
- Testing

### [database/Database.md](./database/Database.md)
Polyglot Persistence Architecture:
- MongoDB vs YugabyteDB vs ClickHouse
- Khi nào dùng database nào
- Data flow strategy (CQRS, CDC)
- Naming conventions chi tiết
- Data types precision
- Standard mixins

### [database/ProductsTable.md](./database/ProductsTable.md)
Chi tiết bảng products:
- DDL script đầy đủ
- Data dictionary (53 fields)
- Related tables (5 tables)
- Sample queries (5+ examples)
- JSONB & Array usage
- Sample data
- Compliance checklist

---

## 🚨 Important Notes

### ⚠️ DO NOT:
- ❌ Tự tạo imports `figma:asset/*`
- ❌ Sử dụng `<img>` thay vì `ImageWithFallback`
- ❌ Hardcode colors thay vì CSS variables
- ❌ Dùng VARCHAR(255) cho URLs
- ❌ Dùng FLOAT/DOUBLE cho tiền
- ❌ Quên filter theo tenant_id
- ❌ Hard delete (phải soft delete)

### ✅ MUST DO:
- ✅ Sử dụng UUID v7 cho all primary keys
- ✅ Filter theo tenant_id trong mọi query
- ✅ Implement soft delete pattern
- ✅ Add created_at, updated_at, version
- ✅ Use TEXT cho URLs
- ✅ Use NUMERIC(19,4) cho money
- ✅ Use ImageWithFallback cho images
- ✅ Use CSS variables cho styling

---

## 🔍 Search & Navigation

| Need to find... | Look in... |
|-----------------|-----------|
| Database schema | `supabase-schema.sql` |
| Table details | `database/ProductsTable.md` |
| Image handling | `IMAGE_GUIDELINES.md` |
| System overview | `SYSTEM_OVERVIEW.md` |
| SQL commands | `database/DatabaseCommand.md` |
| Best practices | `database/supabase.md` |
| Architecture | `database/Database.md` |

---

## 📞 Support & Resources

### Internal Documentation
- 📁 `/docs/` - All documentation
- 📁 `/src/app/components/` - React components
- 📁 `/supabase/functions/` - Edge functions
- 📁 `/src/services/` - API services

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [UUID v7 Specification](https://datatracker.ietf.org/doc/draft-peabody-dispatch-new-uuid-format/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

**Last Updated:** 2025-01-14  
**Version:** 3.0  
**Maintainer:** Couppa Development Team

---

## 🎓 Learning Path

### New Developers:
1. Read `SYSTEM_OVERVIEW.md` first
2. Review `supabase-schema.sql` structure
3. Study `IMAGE_GUIDELINES.md`
4. Check `database/ProductsTable.md` as example
5. Start coding!

### Database Designers:
1. Read `database/Database.md` for architecture
2. Study `database/supabase.md` for Supabase specifics
3. Review `supabase-schema.sql` for implementation
4. Check `database/ProductsTable.md` for patterns

### Frontend Developers:
1. Read `SYSTEM_OVERVIEW.md` for overview
2. Study `IMAGE_GUIDELINES.md` thoroughly
3. Review components in `/src/app/components/`
4. Check CSS variables in `/src/styles/`

---

**Happy Coding! 🚀**