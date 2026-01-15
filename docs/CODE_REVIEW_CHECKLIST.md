# Code Review Checklist - Couppa SaaS Platform

## ✅ Checklist trước khi commit code

---

## 🖼️ Image & Asset Handling (CẬT NHẬT 2025-01-14)

### ⚠️ QUAN TRỌNG: figma:asset CHỈ HOẠT ĐỘNG TRONG FIGMA MAKE

`figma:asset` là virtual module chỉ tồn tại trong môi trường Figma Make. Khi build ở local hoặc deploy production, sẽ gây lỗi:

```
Error: The following dependencies are imported but could not be resolved:
  figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png
```

### ❌ Common Mistakes:

```tsx
// ❌ WRONG: Sử dụng figma:asset (SẼ LỖI KHI BUILD)
import myImage from 'figma:asset/abc123.png';
import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';

// ❌ WRONG: Sử dụng <img> trực tiếp
<img src={imageUrl} alt="Product" />

// ❌ WRONG: Hardcode image path không có fallback
<img src="/assets/logo.png" alt="Logo" />

// ❌ WRONG: Sử dụng path tương đối
import logo from '../../../assets/logo.png';
```

### ✅ Correct Way:

```tsx
// ✅ CORRECT: Sử dụng ImageWithFallback với đường dẫn tĩnh
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

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

// ✅ CORRECT: Sử dụng unsplash_tool trong generation (AI only)
const heroImage = await unsplash_tool({ query: "modern office" });

<ImageWithFallback 
  src={heroImage}
  alt="Hero background"
  className="w-full h-96 object-cover"
/>

// ✅ CORRECT: Dynamic images từ database
<ImageWithFallback 
  src={product.featured_image_url || '/assets/images/placeholder.png'}
  alt={product.title}
  className="w-full h-48 object-cover rounded-lg"
/>
```

### Migration Steps (Nếu thấy figma:asset):

1. **Find all occurrences:**
```bash
grep -r "figma:asset" src/
```

2. **Replace imports:**
```diff
- import logoImage from 'figma:asset/e1296ad1f0de2b1f62777a16af5adb50125e46f8.png';
+ import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
```

3. **Replace usage:**
```diff
- <img src={logoImage} alt="Logo" />
+ <ImageWithFallback src="/assets/images/logo.png" alt="Logo" />
```

4. **Add placeholder images:**
```bash
# Xem hướng dẫn tại /public/assets/SETUP_IMAGES.md
mkdir -p public/assets/images
# Add logo.png, avatar-default.png, video-thumbnail.png, placeholder.png
```

---

## 🎨 CSS & Styling

### ❌ Common Mistakes:

```tsx
// ❌ WRONG: Hardcode colors
<div className="bg-blue-600 text-white rounded-xl">

// ❌ WRONG: Hardcode spacing
<div style={{ padding: '24px', margin: '16px' }}>

// ❌ WRONG: Inline styles với hardcoded values
<div style={{ backgroundColor: '#2563EB', borderRadius: '12px' }}>

// ❌ WRONG: Custom fonts không được định nghĩa trong CSS
<p style={{ fontFamily: 'Arial, sans-serif' }}>
```

### ✅ Correct Way:

```tsx
// ✅ CORRECT: Sử dụng CSS variables
<div className="bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)]">

// ✅ CORRECT: Sử dụng Tailwind với design system
<div className="p-[var(--spacing-lg)] m-[var(--spacing-md)]">

// ✅ CORRECT: Sử dụng defined fonts
<p className="font-[var(--font-sans)]">

// ✅ CORRECT: Mix Tailwind + CSS variables
<div className="flex items-center gap-[var(--spacing-md)] bg-[var(--color-primary)]">
```

### CSS Variables Available:

```css
/* Colors */
--color-primary: #2563EB
--color-secondary: #64748b
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444

/* Spacing */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px

/* Border Radius */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px

/* Typography */
--font-sans: 'Inter', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

---

## 🗄️ Database Queries

### ❌ Common Mistakes:

```typescript
// ❌ WRONG: Không filter theo tenant_id (Security breach!)
const products = await supabase
  .from('products')
  .select('*');

// ❌ WRONG: Không check deleted_at
const products = await supabase
  .from('products')
  .select('*')
  .eq('tenant_id', tenantId);

// ❌ WRONG: Hard delete
await supabase
  .from('products')
  .delete()
  .eq('_id', productId);

// ❌ WRONG: Không set version cho optimistic locking
await supabase
  .from('products')
  .update({ title: 'New Title' })
  .eq('_id', productId);

// ❌ WRONG: Dùng gen_random_uuid() thay vì uuid_generate_v7()
const { data } = await supabase
  .from('products')
  .insert({ _id: crypto.randomUUID(), ... });
```

### ✅ Correct Way:

```typescript
// ✅ CORRECT: Filter theo tenant_id + deleted_at
const { data: products } = await supabase
  .from('products')
  .select('*')
  .eq('tenant_id', tenantId)
  .is('deleted_at', null);

// ✅ CORRECT: Soft delete với timestamp
await supabase
  .from('products')
  .update({ 
    deleted_at: new Date().toISOString(),
    deleted_by: userId 
  })
  .eq('_id', productId)
  .eq('tenant_id', tenantId);

// ✅ CORRECT: Optimistic locking
const { data } = await supabase
  .from('products')
  .update({ 
    title: 'New Title',
    version: product.version + 1,
    updated_at: new Date().toISOString(),
    updated_by: userId
  })
  .eq('_id', productId)
  .eq('tenant_id', tenantId)
  .eq('version', product.version);

if (!data || data.length === 0) {
  throw new Error('Product was modified by another user. Please refresh.');
}

// ✅ CORRECT: UUID v7 tự động generate trong database
// Không cần pass _id, database sẽ tự gen uuid_generate_v7()
const { data } = await supabase
  .from('products')
  .insert({
    tenant_id: tenantId,
    title: 'Product Name',
    // _id will be auto-generated by database
  })
  .select()
  .single();
```

---

## 🔤 TypeScript Interfaces

### ❌ Common Mistakes:

```typescript
// ❌ WRONG: Naming không đúng convention
interface product {  // Should be PascalCase
  id: string;        // Should be _id
  tenantId: string;  // Should be tenant_id
  createdAt: Date;   // Should be string (ISO timestamp)
}

// ❌ WRONG: Optional fields không đúng
interface Product {
  _id: string;
  tenant_id: string;
  title: string;
  price: number;
  deleted_at: Date;  // Should be optional
}

// ❌ WRONG: Kiểu dữ liệu không chính xác
interface Product {
  price: number;     // Should use string or maintain precision
  tags: string;      // Should be string[]
  metadata: string;  // Should be object/Record
}
```

### ✅ Correct Way:

```typescript
// ✅ CORRECT: Naming theo database schema
interface Product {
  _id: string;
  tenant_id: string;
  group_id?: string;
  product_type_id: string;
  category_id?: string;
  
  title: string;
  code: string;
  slug?: string;
  sku?: string;
  
  price: number;
  original_price?: number;
  currency?: string;
  
  quantity?: number;
  stock_quantity?: number;
  
  featured_image_url?: string;
  thumbnail_url?: string;
  gallery_image_ids?: string[];
  
  tags?: string[];
  metadata?: Record<string, any>;
  
  status: number;  // 0 or 1
  is_featured?: boolean;
  is_published?: boolean;
  
  version: number;
  created_at: string;  // ISO timestamp
  updated_at: string;
  deleted_at?: string | null;
  created_by?: string;
  updated_by?: string;
}

// ✅ CORRECT: Tạo types riêng cho API responses
interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

interface ProductListResponse {
  success: boolean;
  data?: Product[];
  total?: number;
  page?: number;
  pageSize?: number;
  error?: string;
}
```

---

## 📝 Component Structure

### ❌ Common Mistakes:

```tsx
// ❌ WRONG: Props không type-safe
function ProductCard(props: any) {
  return <div>{props.name}</div>;
}

// ❌ WRONG: Không handle loading/error states
function ProductsList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);
  
  return (
    <div>
      {products.map(p => <ProductCard product={p} />)}
    </div>
  );
}

// ❌ WRONG: Không memoize expensive operations
function ProductsList({ products }) {
  const filteredProducts = products.filter(p => p.status === 1);
  const sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
  
  return (
    <div>
      {sortedProducts.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
```

### ✅ Correct Way:

```tsx
// ✅ CORRECT: Type-safe props
interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}

function ProductCard({ product, onClick, className }: ProductCardProps) {
  return (
    <div className={className} onClick={() => onClick?.(product)}>
      <ImageWithFallback 
        src={product.featured_image_url}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <h3>{product.title}</h3>
      <p>{product.price} {product.currency}</p>
    </div>
  );
}

// ✅ CORRECT: Handle loading/error states
function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        setProducts(data.data || []);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        console.error('Failed to fetch products:', err);
      })
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) {
    return <div className="p-4">Loading...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }
  
  if (products.length === 0) {
    return <div className="p-4">No products found</div>;
  }
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

// ✅ CORRECT: Memoize expensive operations
function ProductsList({ products }: { products: Product[] }) {
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter(p => p.status === 1 && !p.deleted_at)
      .sort((a, b) => b.price - a.price);
  }, [products]);
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredAndSortedProducts.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🔒 Security Checklist

### Multi-tenancy
- [ ] Mọi query có filter theo `tenant_id`
- [ ] Mọi API endpoint validate `tenant_id` từ auth token
- [ ] Không để user access data của tenant khác

### Authentication
- [ ] API calls có `Authorization: Bearer {token}`
- [ ] Token được validate ở backend
- [ ] Sensitive operations require re-authentication

### Data Validation
- [ ] Input validation ở cả client và server
- [ ] SQL injection prevention (sử dụng prepared statements)
- [ ] XSS prevention (escape user input)

---

## 📊 Performance Checklist

### Database
- [ ] Queries có proper indexes
- [ ] Sử dụng pagination cho large datasets
- [ ] Avoid N+1 queries
- [ ] Use `select()` để chỉ lấy fields cần thiết

### Frontend
- [ ] Images có lazy loading: `loading="lazy"`
- [ ] Large lists sử dụng virtualization
- [ ] Expensive computations được memoize
- [ ] Components được React.memo khi cần

### API
- [ ] Response size được optimize
- [ ] Implement caching strategies
- [ ] Use compression (gzip)

---

## 🧪 Testing Checklist

### Unit Tests
- [ ] Test business logic functions
- [ ] Test utility functions
- [ ] Test data transformations

### Integration Tests
- [ ] Test API endpoints
- [ ] Test database queries
- [ ] Test authentication flow

### E2E Tests
- [ ] Test critical user flows
- [ ] Test error scenarios
- [ ] Test edge cases

---

## 📦 Before Commit

### Code Quality
- [ ] No console.log in production code (use proper logging)
- [ ] No commented out code
- [ ] No TODO comments without issue reference
- [ ] Proper error handling everywhere

### Documentation
- [ ] JSDoc comments for complex functions
- [ ] README updated if needed
- [ ] API documentation updated if changed

### Git
- [ ] Meaningful commit message
- [ ] Branch name follows convention
- [ ] No large files committed
- [ ] .env files not committed

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Build successful locally
- [ ] Environment variables configured

### Database
- [ ] Migrations prepared (if any)
- [ ] Backup created
- [ ] Schema changes documented

### Monitoring
- [ ] Error tracking enabled
- [ ] Performance monitoring setup
- [ ] Logging configured

---

## 📋 Quick Reference

### Must Use:
- ✅ `ImageWithFallback` for images
- ✅ CSS variables for styling
- ✅ UUID v7 (_id field)
- ✅ Multi-tenancy (tenant_id)
- ✅ Soft delete (deleted_at)
- ✅ Audit trail (created_at, updated_at)
- ✅ Optimistic locking (version)

### Never Use:
- ❌ `figma:asset` for new images
- ❌ `<img>` tag directly
- ❌ Hardcoded colors/spacing
- ❌ VARCHAR(255) for URLs
- ❌ FLOAT/DOUBLE for money
- ❌ Hard delete
- ❌ Queries without tenant_id

---

**Print this checklist and keep it handy!** 📌