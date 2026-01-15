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