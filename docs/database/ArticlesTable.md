# Bảng Articles - Schema Design cho Supabase

## 1. DDL Script (PostgreSQL/Supabase)

```sql
-- Tạo bảng Articles (Tin tức)
CREATE TABLE articles (
  -- 1. Identity (Định danh)
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL, -- Định danh khách hàng (Multi-tenancy)
  
  -- 2. Content (Nội dung chính)
  title TEXT NOT NULL, -- Tiêu đề bài viết
  slug VARCHAR(255) NOT NULL, -- URL-friendly slug (VD: "tin-tuc-moi-nhat")
  summary TEXT, -- Tóm tắt ngắn
  content TEXT NOT NULL, -- Nội dung HTML/Markdown
  
  -- 3. Media & Assets
  featured_image_id UUID, -- Link đến bảng files (file_id)
  featured_image_url TEXT, -- URL ảnh đại diện (từ Object Storage)
  thumbnail_url TEXT, -- URL thumbnail (optimized)
  gallery_image_ids UUID[], -- Mảng IDs của ảnh trong gallery
  
  -- 4. SEO & Metadata
  meta_title VARCHAR(255), -- SEO title
  meta_description TEXT, -- SEO description
  meta_keywords TEXT[], -- Mảng keywords cho SEO
  
  -- 5. Categorization & Tagging
  category_id UUID, -- Link đến bảng categories
  tags TEXT[], -- Mảng tags (VD: ['công nghệ', 'AI', 'startup'])
  
  -- 6. Publishing & Status
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT', -- DRAFT, PUBLISHED, ARCHIVED, SCHEDULED
  published_at TIMESTAMPTZ, -- Thời điểm xuất bản (UTC)
  scheduled_at TIMESTAMPTZ, -- Thời điểm lên lịch (nếu status = SCHEDULED)
  
  -- 7. Engagement Metrics (Cache)
  view_count BIGINT DEFAULT 0, -- Số lượt xem
  like_count BIGINT DEFAULT 0, -- Số lượt thích
  comment_count BIGINT DEFAULT 0, -- Số bình luận
  share_count BIGINT DEFAULT 0, -- Số lượt chia sẻ
  
  -- 8. Author & Ownership
  author_id UUID NOT NULL, -- User ID người viết
  editor_id UUID, -- User ID người chỉnh sửa cuối
  
  -- 9. Settings & Flags
  is_featured BOOLEAN DEFAULT FALSE, -- Tin nổi bật (hiển thị ở trang chủ)
  is_pinned BOOLEAN DEFAULT FALSE, -- Tin ghim (luôn ở đầu)
  allow_comments BOOLEAN DEFAULT TRUE, -- Cho phép bình luận
  is_public BOOLEAN DEFAULT TRUE, -- Công khai hay riêng tư
  
  -- 10. Audit & Versioning (Standard Mixins)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID,
  deleted_at TIMESTAMPTZ, -- Soft Delete
  version BIGINT DEFAULT 1, -- Optimistic Locking
  
  -- 11. Constraints (Ràng buộc)
  CONSTRAINT uq_articles_slug UNIQUE (tenant_id, slug), -- Slug unique trong tenant
  CONSTRAINT chk_articles_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED'))
);

-- Indexing Strategy (Chiến lược đánh Index)
-- Index 1: Tìm kiếm theo tenant và trạng thái (Query phổ biến nhất)
CREATE INDEX idx_articles_tenant_status ON articles (tenant_id, status) WHERE deleted_at IS NULL;

-- Index 2: Tìm kiếm theo slug (SEO-friendly URLs)
CREATE INDEX idx_articles_slug ON articles (tenant_id, slug) WHERE deleted_at IS NULL;

-- Index 3: Sắp xếp theo ngày xuất bản (Latest articles)
CREATE INDEX idx_articles_published ON articles (published_at DESC) WHERE deleted_at IS NULL AND status = 'PUBLISHED';

-- Index 4: Tìm kiếm theo tác giả
CREATE INDEX idx_articles_author ON articles (author_id) WHERE deleted_at IS NULL;

-- Index 5: Full-text search (Tìm kiếm toàn văn)
CREATE INDEX idx_articles_search ON articles USING GIN (to_tsvector('english', title || ' ' || COALESCE(content, '')));

-- Index 6: Tìm kiếm trong mảng tags
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);

-- Index 7: Tin nổi bật
CREATE INDEX idx_articles_featured ON articles (is_featured, published_at DESC) WHERE deleted_at IS NULL AND status = 'PUBLISHED';

-- Trigger: Tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Tự động tạo slug từ title (nếu chưa có)
CREATE OR REPLACE FUNCTION generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_generate_slug BEFORE INSERT ON articles
FOR EACH ROW EXECUTE FUNCTION generate_slug_from_title();
```

## 2. Bảng Data Dictionary

| STT | Tên trường | Kiểu dữ liệu | Null? | Mặc định | Mô tả & Quy tắc nghiệp vụ |
|-----|-----------|-------------|-------|----------|---------------------------|
| **I. ĐỊNH DANH** |
| 1 | _id | UUID | NO | gen_random_uuid() | Khóa chính (PK). Định danh duy nhất. |
| 2 | tenant_id | UUID | NO | - | Định danh khách hàng (Multi-tenancy). Bắt buộc cho SaaS. |
| **II. NỘI DUNG CHÍNH** |
| 3 | title | TEXT | NO | - | Tiêu đề bài viết. Tối đa khuyến nghị 200 ký tự. |
| 4 | slug | VARCHAR(255) | NO | - | URL-friendly slug. UNIQUE trong tenant. Auto-generate từ title. |
| 5 | summary | TEXT | YES | NULL | Tóm tắt ngắn (excerpt). Hiển thị trong listing. |
| 6 | content | TEXT | NO | - | Nội dung đầy đủ. Hỗ trợ HTML/Markdown. |
| **III. MEDIA & ASSETS** |
| 7 | featured_image_id | UUID | YES | NULL | Foreign Key đến bảng `files._id`. |
| 8 | featured_image_url | TEXT | YES | NULL | URL ảnh đại diện (từ Object Storage). Denormalized để query nhanh. |
| 9 | thumbnail_url | TEXT | YES | NULL | URL thumbnail (ảnh nhỏ tối ưu). |
| 10 | gallery_image_ids | UUID[] | YES | NULL | Mảng IDs của ảnh trong gallery. Link đến bảng `files`. |
| **IV. SEO & METADATA** |
| 11 | meta_title | VARCHAR(255) | YES | NULL | SEO title (khác title chính nếu cần optimize). |
| 12 | meta_description | TEXT | YES | NULL | SEO description cho search engines. |
| 13 | meta_keywords | TEXT[] | YES | NULL | Mảng keywords cho SEO. |
| **V. PHÂN LOẠI** |
| 14 | category_id | UUID | YES | NULL | Foreign Key đến bảng `categories._id`. |
| 15 | tags | TEXT[] | YES | NULL | Mảng tags tự do. VD: ['công nghệ', 'AI']. |
| **VI. PUBLISHING** |
| 16 | status | VARCHAR(20) | NO | 'DRAFT' | DRAFT, PUBLISHED, ARCHIVED, SCHEDULED. |
| 17 | published_at | TIMESTAMPTZ | YES | NULL | Thời điểm xuất bản (UTC). NULL nếu chưa publish. |
| 18 | scheduled_at | TIMESTAMPTZ | YES | NULL | Thời điểm lên lịch (nếu status = SCHEDULED). |
| **VII. ENGAGEMENT** |
| 19 | view_count | BIGINT | YES | 0 | Số lượt xem. Cache từ analytics. |
| 20 | like_count | BIGINT | YES | 0 | Số lượt thích. |
| 21 | comment_count | BIGINT | YES | 0 | Số bình luận. Cache từ bảng comments. |
| 22 | share_count | BIGINT | YES | 0 | Số lượt chia sẻ. |
| **VIII. OWNERSHIP** |
| 23 | author_id | UUID | NO | - | User ID người viết. Foreign Key đến `users._id`. |
| 24 | editor_id | UUID | YES | NULL | User ID người chỉnh sửa cuối cùng. |
| **IX. SETTINGS** |
| 25 | is_featured | BOOLEAN | YES | FALSE | Tin nổi bật (hiển thị ở homepage). |
| 26 | is_pinned | BOOLEAN | YES | FALSE | Tin ghim (luôn ở đầu danh sách). |
| 27 | allow_comments | BOOLEAN | YES | TRUE | Cho phép người dùng bình luận. |
| 28 | is_public | BOOLEAN | YES | TRUE | Công khai hay riêng tư (draft). |
| **X. AUDIT** |
| 29 | created_at | TIMESTAMPTZ | NO | NOW() | Thời điểm tạo bản ghi. |
| 30 | created_by | UUID | YES | NULL | User ID người tạo. |
| 31 | updated_at | TIMESTAMPTZ | NO | NOW() | Thời điểm cập nhật cuối. Auto-update bằng trigger. |
| 32 | updated_by | UUID | YES | NULL | User ID người cập nhật cuối. |
| 33 | deleted_at | TIMESTAMPTZ | YES | NULL | Soft Delete. Nếu != NULL coi như đã xóa. |
| 34 | version | BIGINT | NO | 1 | Optimistic Locking. Tăng +1 mỗi lần update. |

## 3. Các Ràng buộc (Constraints)

| Tên Constraint | Loại | Cột | Quy tắc Logic |
|---------------|------|-----|---------------|
| pk_articles | PRIMARY KEY | _id | Khóa chính duy nhất. |
| uq_articles_slug | UNIQUE | (tenant_id, slug) | Slug unique trong mỗi tenant. |
| chk_articles_status | CHECK | status | Chỉ chấp nhận: DRAFT, PUBLISHED, ARCHIVED, SCHEDULED. |

## 4. Foreign Keys (Liên kết với bảng khác)

Nếu bạn có các bảng liên quan, thêm Foreign Keys:

```sql
-- Link đến bảng files (Quản lý file)
ALTER TABLE articles
ADD CONSTRAINT fk_articles_featured_image 
FOREIGN KEY (featured_image_id) REFERENCES files(_id) ON DELETE SET NULL;

-- Link đến bảng users (Tác giả)
ALTER TABLE articles
ADD CONSTRAINT fk_articles_author 
FOREIGN KEY (author_id) REFERENCES users(_id) ON DELETE RESTRICT;

-- Link đến bảng categories
ALTER TABLE articles
ADD CONSTRAINT fk_articles_category 
FOREIGN KEY (category_id) REFERENCES categories(_id) ON DELETE SET NULL;
```

## 5. Queries Ví dụ

### Lấy danh sách bài viết đã publish (Latest first)
```sql
SELECT _id, title, slug, featured_image_url, summary, published_at, view_count
FROM articles
WHERE tenant_id = 'your-tenant-id'
  AND status = 'PUBLISHED'
  AND deleted_at IS NULL
ORDER BY published_at DESC
LIMIT 10;
```

### Tìm kiếm toàn văn
```sql
SELECT _id, title, slug, published_at
FROM articles
WHERE tenant_id = 'your-tenant-id'
  AND to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', 'search keyword')
  AND deleted_at IS NULL;
```

### Lấy bài viết theo tag
```sql
SELECT _id, title, slug
FROM articles
WHERE tenant_id = 'your-tenant-id'
  AND 'AI' = ANY(tags)
  AND status = 'PUBLISHED'
  AND deleted_at IS NULL;
```

## 6. Lưu ý Kỹ thuật

### Denormalization (Phi chuẩn hóa)
- `featured_image_url` được lưu trực tiếp trong bảng articles mặc dù đã có `featured_image_id`. 
- **Lý do:** Giảm JOIN khi query danh sách bài viết (performance).
- **Trade-off:** Nếu file bị xóa/đổi URL, cần update lại articles.

### Soft Delete
- Không xóa cứng (DELETE). Chỉ set `deleted_at = NOW()`.
- **Lý do:** Có thể khôi phục nếu người dùng xóa nhầm.

### Optimistic Locking
- Dùng cột `version` để tránh ghi đè khi nhiều người cùng sửa.
- **Logic:** `UPDATE articles SET ... WHERE _id = ? AND version = old_version`.

### Full-text Search
- Dùng PostgreSQL GIN index với `to_tsvector` cho tìm kiếm nhanh.
- Có thể nâng cấp lên ElasticSearch nếu cần search phức tạp hơn.

## 7. Row Level Security (RLS) cho Supabase

```sql
-- Bật RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Chỉ xem được bài viết của tenant mình
CREATE POLICY articles_tenant_isolation ON articles
FOR SELECT
USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Policy: Chỉ tác giả mới sửa được bài của mình
CREATE POLICY articles_author_update ON articles
FOR UPDATE
USING (author_id = auth.uid());
```

## 8. Sample Data (Mock)

```sql
INSERT INTO articles (
  tenant_id, title, slug, summary, content, 
  featured_image_url, status, published_at, author_id, 
  tags, is_featured
) VALUES (
  'tenant-001',
  'Xu hướng AI 2024: Những điều cần biết',
  'xu-huong-ai-2024',
  'Tổng hợp những xu hướng AI nổi bật năm 2024 mà doanh nghiệp cần quan tâm.',
  '<p>Nội dung đầy đủ bài viết về AI...</p>',
  'https://storage.example.com/articles/ai-2024.jpg',
  'PUBLISHED',
  '2024-01-15 10:00:00+00',
  'user-001',
  ARRAY['AI', 'công nghệ', 'xu hướng'],
  TRUE
);
```

---

**Bảng này đã sẵn sàng để tạo trong Supabase!** Copy đoạn SQL DDL vào Supabase SQL Editor và chạy.
