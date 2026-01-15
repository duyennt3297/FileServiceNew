import { supabase } from '@/lib/supabase';

export interface Product {
  _id: string;
  tenant_id: string;
  group_id: string | null;
  product_type_id: string;
  category_id: string | null;
  title: string;
  code: string;
  slug: string | null;
  sku: string | null;
  barcode: string | null;
  brief: string | null;
  content: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  original_price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  currency: string;
  quantity: number;
  track_inventory: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
  featured_image_id: string | null;
  featured_image_url: string | null;
  thumbnail_url: string | null;
  gallery_image_ids: string[] | null;
  brand: string | null;
  tags: string[] | null;
  status: number; // 0=Ẩn, 1=Hiển thị
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  has_variants: boolean;
  variant_attributes: any | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  view_count: number;
  order_count: number;
  rating_average: number;
  review_count: number;
  metadata: any;
  created_at: string;
  created_by: string | null;
  updated_at: string;
  updated_by: string | null;
  deleted_at: string | null;
  version: number;
}

export interface ProductFormData {
  title: string;
  code: string;
  slug: string;
  sku: string;
  barcode: string;
  short_description: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  track_inventory: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
  featured_image_id: string | null;
  featured_image_url: string | null;
  brand: string;
  tags: string[];
  status: number; // 0=Ẩn, 1=Hiển thị
  is_featured: boolean;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
}

// Temporary tenant ID
const TENANT_ID = 'default-tenant';

/**
 * Fetch all products with optional filters
 */
export async function getProducts(filters?: {
  status?: Product['status'];
  search?: string;
  is_featured?: boolean;
}): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('tenant_id', TENANT_ID)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,sku.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('_id', id)
      .eq('tenant_id', TENANT_ID)
      .is('deleted_at', null)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: ProductFormData): Promise<Product | null> {
  try {
    const newProduct = {
      ...productData,
      tenant_id: TENANT_ID,
      created_by: TENANT_ID,
      published_at: productData.is_published ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to create product:', error);
    return null;
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  productData: Partial<ProductFormData>
): Promise<Product | null> {
  try {
    const updateData: any = {
      ...productData,
      updated_at: new Date().toISOString(),
      updated_by: TENANT_ID,
    };

    // If is_published changes to true and no published_at, set it
    if (productData.is_published && !updateData.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('_id', id)
      .eq('tenant_id', TENANT_ID)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to update product:', error);
    return null;
  }
}

/**
 * Soft delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        updated_by: TENANT_ID,
      })
      .eq('_id', id)
      .eq('tenant_id', TENANT_ID);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete product:', error);
    return false;
  }
}

/**
 * Get products statistics
 */
export async function getProductsStats(): Promise<{
  total: number;
  active: number;
  outOfStock: number;
  totalValue: number;
}> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('status, price, stock_quantity')
      .eq('tenant_id', TENANT_ID)
      .is('deleted_at', null);

    if (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }

    const stats = {
      total: data?.length || 0,
      active: data?.filter((p) => p.status === 'ACTIVE').length || 0,
      outOfStock: data?.filter((p) => p.status === 'OUT_OF_STOCK').length || 0,
      totalValue: data?.reduce((sum, p) => sum + (p.price * p.stock_quantity), 0) || 0,
    };

    return stats;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return {
      total: 0,
      active: 0,
      outOfStock: 0,
      totalValue: 0,
    };
  }
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('tenant_id', TENANT_ID)
      .eq('track_inventory', true)
      .is('deleted_at', null)
      .order('stock_quantity', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }

    // Filter products where stock_quantity <= low_stock_threshold
    const lowStockProducts = (data || []).filter(
      p => p.stock_quantity <= p.low_stock_threshold
    );

    return lowStockProducts;
  } catch (error) {
    console.error('Failed to fetch low stock products:', error);
    return [];
  }
}