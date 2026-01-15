Dưới đây là tài liệu chi tiết cho **Phần III: Nhóm Sản phẩm và eCommerce (Product & eCommerce)** được thiết kế dựa trên các tiêu chuẩn SaaS "World-class", triết lý **Polyglot Persistence** và các yêu cầu nghiệp vụ từ dự án Couppa.

---

### I. Quy tắc thiết kế chung (Global Rules)
1.  **Định danh:** Sử dụng **UUID v7** cho tất cả trường `_id` để tối ưu sắp xếp theo thời gian và hiệu năng ghi phân tán.
2.  **Mixins bắt buộc:** Mọi bảng phải bao gồm các trường: `tenant_id`, `version`, `created_at`, `updated_at`, và `deleted_at`.
3.  **Cách ly dữ liệu:** Luôn sử dụng `tenant_id` (đối với doanh nghiệp) và `group_id` (đối với cửa hàng) trong các ràng buộc và chỉ mục.
4.  **Tiền tệ:** Sử dụng kiểu **NUMERIC(19, 4)** để đảm bảo chính xác tuyệt đối, tránh sai số làm tròn.
5.  **Lưu trữ:** Dữ liệu quan hệ và giao dịch ACID được lưu trữ tại **YugabyteDB (YSQL)**.

---

### II. Chi tiết các bảng dữ liệu (Data Dictionary)

#### 1. Bảng `product_categories` (Danh mục sản phẩm)
Quản lý cây phân loại sản phẩm, sử dụng **Materialized Path** để truy vấn nhanh.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic Kiểm tra | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | ID duy nhất của danh mục. |
| `tenant_id` | UUID | NO | | REFERENCES tenants(_id) | Tenant sở hữu danh mục. |
| `code` | VARCHAR(50) | NO | | UNIQUE(tenant_id, code) | Mã danh mục. |
| `name` | VARCHAR(255) | NO | | CHECK (length > 0) | Tên danh mục. |
| `parent_id` | UUID | YES | NULL | REFERENCES product_categories(_id) | ID danh mục cha. |
| `path` | TEXT | NO | | MATERIALIZED PATH | Đường dẫn cây (VD: /root/child). |
| `level` | INT | NO | 0 | CHECK (level >= 0) | Độ sâu trong cây. |
| `sort_order` | INT | NO | 0 | | Thứ tự hiển thị. |
| `status` | SMALLINT | NO | 1 | CHECK (status IN (0,1)) | 0=Ẩn, 1=Hiển thị. |
| `version` | BIGINT | NO | 1 | | Mixin bắt buộc. |

#### 2. Bảng `product_types` (Phân loại sản phẩm)
Định nghĩa bản chất sản phẩm (Hàng hóa, Dịch vụ, Combo) để áp dụng các quy tắc nghiệp vụ.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | Định danh loại sản phẩm. |
| `tenant_id` | UUID | NO | | REFERENCES tenants(_id) | Tenant sở hữu khai báo. |
| `code` | VARCHAR(50) | NO | | UNIQUE(tenant_id, code), UPPER | Mã loại (VD: GOODS, SERVICE). |
| `name` | VARCHAR(255) | NO | | | Tên hiển thị loại sản phẩm. |
| `status` | SMALLINT | NO | 1 | CHECK (0,1) | Trạng thái hiển thị. |

#### 3. Bảng `product_attribute_definitions` (Định nghĩa thuộc tính)
Khai báo các thuộc tính tương ứng với từng phân loại sản phẩm.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | ID định nghĩa thuộc tính. |
| `tenant_id` | UUID | NO | | | Phân tách dữ liệu. |
| `product_type_id` | UUID | NO | | REFERENCES product_types(_id) | Thuộc loại sản phẩm nào. |
| `code` | VARCHAR(50) | NO | | | Mã kỹ thuật (VD: color, size). |
| `name` | TEXT | NO | | | Tên thuộc tính hiển thị. |
| `input_type` | VARCHAR(20) | NO | 'TEXT' | CHECK (TEXT, NUMBER, SELECT) | Loại dữ liệu nhập vào. |

#### 4. Bảng `products` (Thông tin sản phẩm chính - SPU)
Lưu thông tin sản phẩm thật, dùng để validate coupon khi redeem và quản lý bán hàng.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | Định danh duy nhất sản phẩm. |
| `tenant_id` | UUID | NO | | REFERENCES tenants(_id) | Doanh nghiệp sở hữu. |
| `group_id` | UUID | YES | NULL | REFERENCES user_groups(_id) | Cửa hàng sở hữu sản phẩm. |
| `product_type_id` | UUID | NO | | REFERENCES product_types(_id) | Liên kết loại sản phẩm. |
| `title` | VARCHAR(255) | NO | | | Tên hiển thị sản phẩm. |
| `code` | VARCHAR(50) | NO | | UNIQUE(group_id, code), UPPER | Mã sản phẩm nội bộ. |
| `suggest_title` | VARCHAR(320) | NO | | GENERATED | Hỗ trợ tìm kiếm nhanh. |
| `price` | NUMERIC(19,4) | YES | 0 | CHECK (price >= 0) | Giá bán lẻ mặc định. |
| `original_price` | NUMERIC(19,4) | YES | 0 | | Giá gốc. |
| `quantity` | INT | NO | 0 | CHECK (quantity >= 0) | Tổng tồn kho cache. |
| `metadata` | JSONB | NO | '{}' | | Thuộc tính động linh hoạt. |
| `brief` | TEXT | NO | | HTML VALID | Mô tả ngắn. |
| `content` | TEXT | NO | | HTML VALID | Mô tả chi tiết. |
| `status` | SMALLINT | NO | 1 | CHECK (0,1) | 0=Ẩn, 1=Hiển thị. |

#### 5. Bảng `product_attribute_values` (Giá trị thuộc tính sản phẩm)
Lưu giá trị nhập cụ thể của từng sản phẩm dựa trên định nghĩa thuộc tính.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | ID giá trị thuộc tính. |
| `product_id` | UUID | NO | | REFERENCES products(_id) | Liên kết sản phẩm. |
| `attribute_id` | UUID | NO | | REFERENCES product_attr_def(_id) | Định nghĩa thuộc tính. |
| `value` | TEXT | NO | | | Giá trị thực tế (VD: Đỏ, 1kg). |

#### 6. Bảng `product_variants` (Biến thể sản phẩm - SKU)
Quản lý chi tiết tồn kho và giá bán theo từng biến thể (màu sắc, kích thước).

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | UUID | NO | | PRIMARY KEY (v7) | ID duy nhất biến thể. |
| `product_id` | UUID | NO | | REFERENCES products(_id) | Sản phẩm cha. |
| `code` | VARCHAR(50) | NO | | UNIQUE(product_id, code) | Mã SKU (VD: RED_L). |
| `title` | VARCHAR(255) | NO | | | Tên biến thể (VD: Áo đỏ - L). |
| `price` | NUMERIC(19,4) | YES | NULL | | Giá bán riêng biến thể. |
| `quantity` | INT | NO | 0 | | Tồn kho khả dụng của SKU. |

---

### III. Câu lệnh YSQL khởi tạo

```sql
-- 1. Bảng Danh mục sản phẩm
CREATE TABLE product_categories (
    _id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(_id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES product_categories(_id),
    path TEXT NOT NULL,
    level INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    status SMALLINT DEFAULT 1,
    version BIGINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_category_code UNIQUE (tenant_id, code)
);
CREATE INDEX idx_categories_path ON product_categories (tenant_id, path text_pattern_ops);

-- 2. Bảng Phân loại sản phẩm
CREATE TABLE product_types (
    _id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(_id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status SMALLINT DEFAULT 1,
    version BIGINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_product_type_code UNIQUE (tenant_id, code)
);

-- 3. Bảng Định nghĩa thuộc tính
CREATE TABLE product_attribute_definitions (
    _id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    product_type_id UUID NOT NULL REFERENCES product_types(_id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name TEXT NOT NULL,
    input_type VARCHAR(20) DEFAULT 'TEXT',
    version BIGINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_attribute_def UNIQUE (product_type_id, code)
);

-- 4. Bảng Sản phẩm chính (SPU)
CREATE TABLE products (
    _id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(_id),
    group_id UUID REFERENCES user_groups(_id) ON DELETE CASCADE,
    product_type_id UUID NOT NULL REFERENCES product_types(_id),
    title VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    price NUMERIC(19, 4) DEFAULT 0,
    original_price NUMERIC(19, 4) DEFAULT 0,
    quantity INT DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    status SMALLINT DEFAULT 1,
    version BIGINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_product_code UNIQUE (group_id, code)
);
CREATE INDEX idx_products_tenant_group ON products (tenant_id, group_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);

-- 5. Bảng Giá trị thuộc tính sản phẩm
CREATE TABLE product_attribute_values (
    _id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(_id) ON DELETE CASCADE,
    attribute_id UUID NOT NULL REFERENCES product_attribute_definitions(_id),
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Bảng Biến thể sản phẩm (SKU)
CREATE TABLE product_variants (
    _id UUID PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(_id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(19, 4),
    quantity INT DEFAULT 0,
    status SMALLINT DEFAULT 1,
    version BIGINT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_variant_code UNIQUE (product_id, code)
);
CREATE INDEX idx_variants_product ON product_variants (product_id) WHERE deleted_at IS NULL;
```

Dưới đây là tài liệu tách riêng cho phân hệ **File Management (Quản lý Tập tin)** trong hệ thống SaaS multi-tenant, được thiết kế tối ưu cho YugabyteDB (YSQL) và ClickHouse theo các tiêu chuẩn đã phân tích.

### 1. Tổng quan phân hệ File Management
Phân hệ này chịu trách nhiệm quản lý **metadata** của tập tin (tên, kích thước, loại, thẻ phân loại), trong khi dữ liệu nhị phân thực tế được lưu trữ tại các dịch vụ **Object Storage** như S3, MinIO hoặc Supabase Storage.

### 2. Thiết kế chi tiết bảng `files` (YSQL/YugabyteDB)
Bảng này đóng vai trò là "nguồn sự thật" cho mọi tập tin trong hệ thống, sử dụng **UUID v7** làm khóa chính để tối ưu hóa hiệu suất sắp xếp theo thời gian.

| Tên trường (Field) | Kiểu dữ liệu | Null? | Mặc định | Ràng buộc & Logic | Mô tả |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **_id** | UUID | NO | `uuid_v7()` | **PRIMARY KEY** | Định danh duy nhất, đồng thời là đường dẫn tham chiếu trong storage. |
| **tenant_id** | UUID | NO | - | REFERENCES tenants(_id) | Phân tách dữ liệu theo khách hàng sở hữu (Sharding Key). |
| **original_name** | TEXT | NO | - | - | Tên gốc của file khi upload (VD: "Bao_cao.pdf"). |
| **file_name** | TEXT | NO | - | **UNIQUE** | Đường dẫn lưu trữ thực tế (VD: "tenant_123/1705123456-rpt.pdf"). |
| **size** | BIGINT | NO | - | CHECK (size >= 0) | Kích thước file tính bằng bytes. |
| **type** | VARCHAR(100)| NO | - | - | Định dạng MIME (VD: "image/png"). |
| **storage_region**| VARCHAR(50) | YES | NULL | - | Vùng lưu trữ vật lý (VD: "ap-southeast-1"). |
| **folder_path** | TEXT | YES | '/' | - | Đường dẫn thư mục logic giúp quản lý cây thư mục. |
| **uploaded_by** | UUID | YES | NULL | REFERENCES tenant_members | ID thành viên thực hiện upload. |
| **checksum_md5** | VARCHAR(32) | YES | NULL | - | Mã băm MD5 để kiểm tra trùng lặp và tính toàn vẹn. |
| **tags** | JSONB | YES | '[]' | - | Mảng các thẻ phân loại file. |
| **metadata** | JSONB | NO | '{}' | - | Metadata mở rộng (kích thước ảnh, thời lượng video...). |
| **is_public** | BOOLEAN | NO | FALSE | - | Cờ cho phép truy cập công khai không cần token. |
| **access_count** | INT | NO | 0 | CHECK (access_count >= 0)| Tổng số lượt tải/xem. |
| **last_accessed_at**| TIMESTAMPTZ | YES | NULL | - | Thời điểm truy cập gần nhất. |
| **expires_at** | TIMESTAMPTZ | YES | NULL | - | Thời điểm file tự động xóa (dùng cho file tạm). |
| **created_at** | TIMESTAMPTZ | NO | now() | - | Thời điểm tạo bản ghi (UTC). |
| **updated_at** | TIMESTAMPTZ | NO | now() | CHECK (updated_at >= created_at)| Thời điểm cập nhật metadata gần nhất. |
| **deleted_at** | TIMESTAMPTZ | YES | NULL | - | **Soft Delete**: File ẩn khỏi UI nhưng vẫn còn trong storage. |
| **version** | BIGINT | NO | 1 | CHECK (version >= 1) | **Optimistic Locking** chống xung đột cập nhật. |

---

### 3. Câu lệnh YSQL tạo bảng và Index

```sql
-- 1. Tạo bảng quản lý file
CREATE TABLE files (
    _id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    tenant_id UUID NOT NULL REFERENCES tenants(_id) ON DELETE CASCADE,
    original_name TEXT NOT NULL,
    file_name TEXT NOT NULL UNIQUE,
    size BIGINT NOT NULL CHECK (size >= 0),
    type VARCHAR(100) NOT NULL,
    storage_region VARCHAR(50),
    folder_path TEXT DEFAULT '/',
    uploaded_by UUID REFERENCES tenant_members(_id),
    checksum_md5 VARCHAR(32),
    tags JSONB DEFAULT '[]',
    metadata JSONB NOT NULL DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    access_count INT DEFAULT 0 CHECK (access_count >= 0),
    last_accessed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    version BIGINT NOT NULL DEFAULT 1
);

-- 2. Chỉ mục chiến lược (Indexing)
-- Tìm file theo tenant và sắp xếp theo thời gian mới nhất
CREATE INDEX idx_files_tenant ON files (tenant_id, created_at DESC) 
WHERE deleted_at IS NULL;

-- Tìm kiếm file trong thư mục logic (Dùng text_pattern_ops để tối ưu LIKE)
CREATE INDEX idx_files_folder ON files (tenant_id, folder_path text_pattern_ops) 
WHERE deleted_at IS NULL;

-- Kiểm tra trùng lặp dựa trên MD5 trong cùng một tenant
CREATE INDEX idx_files_checksum ON files (tenant_id, checksum_md5) 
WHERE deleted_at IS NULL;

-- GIN Index cho tìm kiếm trong mảng tags
CREATE INDEX idx_files_tags ON files USING GIN (tags);

-- Index cho Cleanup Job xóa file tạm hết hạn
CREATE INDEX idx_files_expiry ON files (expires_at) 
WHERE expires_at IS NOT NULL AND deleted_at IS NULL;
```
*(Nguồn tham khảo chỉ mục:)*

---

### 4. Nhật ký truy cập file (ClickHouse)
Mọi hành động tương tác với tập tin (xem, tải, chia sẻ, xóa) sẽ được ghi lại trong bảng **`file_access_logs`** tại ClickHouse để đảm bảo hiệu năng và phục vụ tra soát bảo mật (Audit).

```sql
CREATE TABLE file_access_logs (
    _id UUID,
    tenant_id UUID,
    file_id UUID,
    member_id Nullable(UUID),
    action Enum8('VIEW'=1, 'DOWNLOAD'=2, 'SHARE'=3, 'DELETE'=4),
    ip_address IPv6,
    user_agent String,
    access_granted Bool,
    denial_reason Nullable(String),
    created_at DateTime64(3) DEFAULT now()
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(created_at)
ORDER BY (tenant_id, file_id, created_at, _id);
```
*(Nguồn tham khảo schema log:)*

### 5. Các quy tắc nghiệp vụ quan trọng (Business Rules)
*   **Định dạng đường dẫn:** Cấu trúc file trong storage tuân theo định dạng: `{tenant_id}/{timestamp}-{sanitized_original_name}`.
*   **Kiểm soát kích thước:** Giới hạn mặc định là **50MB/file** (có thể cấu hình riêng cho từng tenant trong phần settings).
*   **Xóa mềm (Soft Delete):** Khi xóa, file sẽ được giữ lại trong storage 30 ngày trước khi bị xóa vĩnh viễn.
*   **Phát hiện trùng lặp:** Hệ thống sẽ kiểm tra `checksum_md5` trước khi thực hiện upload thực tế để tiết kiệm không gian lưu trữ.
*   **Tự động dọn dẹp:** Một tiến trình chạy ngầm sẽ dựa vào trường `expires_at` để tự động dọn dẹp các tập tin tạm.