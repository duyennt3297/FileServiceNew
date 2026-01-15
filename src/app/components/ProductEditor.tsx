import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, Package, Upload, X, Tag, DollarSign, Loader2 } from 'lucide-react';
import { 
  ProductFormData, 
  getProductById, 
  createProduct, 
  updateProduct 
} from '@/services/productService';
import { toast } from 'sonner';

interface ProductEditorProps {
  productId?: string;
  onBack: () => void;
  onSave: () => void;
}

export function ProductEditor({ productId, onBack, onSave }: ProductEditorProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    sku: '',
    barcode: '',
    short_description: '',
    description: '',
    price: 0,
    compare_at_price: null,
    cost_price: null,
    track_inventory: true,
    stock_quantity: 0,
    low_stock_threshold: 10,
    featured_image_id: null,
    featured_image_url: null,
    brand: '',
    tags: [],
    status: 'DRAFT',
    is_featured: false,
    is_published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    weight: null,
    length: null,
    width: null,
    height: null,
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  const loadProduct = async (id: string) => {
    setLoading(true);
    try {
      const product = await getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          slug: product.slug,
          sku: product.sku || '',
          barcode: product.barcode || '',
          short_description: product.short_description || '',
          description: product.description || '',
          price: product.price,
          compare_at_price: product.compare_at_price,
          cost_price: product.cost_price,
          track_inventory: product.track_inventory,
          stock_quantity: product.stock_quantity,
          low_stock_threshold: product.low_stock_threshold,
          featured_image_id: product.featured_image_id,
          featured_image_url: product.featured_image_url,
          brand: product.brand || '',
          tags: product.tags || [],
          status: product.status,
          is_featured: product.is_featured,
          is_published: product.is_published,
          meta_title: product.meta_title || '',
          meta_description: product.meta_description || '',
          meta_keywords: product.meta_keywords || [],
          weight: product.weight,
          length: product.length,
          width: product.width,
          height: product.height,
        });
      }
    } catch (error) {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        featured_image_url: imageUrl,
        featured_image_id: 'file-' + Date.now(),
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: null,
      featured_image_id: null,
    }));
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.meta_keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        meta_keywords: [...prev.meta_keywords, keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      meta_keywords: prev.meta_keywords.filter(k => k !== keyword),
    }));
  };

  const handleSubmit = async (publishNow: boolean = false) => {
    if (!formData.name) {
      toast.error('Product name is required');
      return;
    }

    setSaving(true);
    try {
      const productData = {
        ...formData,
        is_published: publishNow || formData.is_published,
        status: publishNow ? 'ACTIVE' : formData.status,
      };

      if (productId) {
        await updateProduct(productId, productData);
      } else {
        await createProduct(productData);
      }
      
      toast.success('Product saved successfully');
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#F2F4F7] rounded-[8px] transition-colors"
            disabled={saving}
          >
            <ArrowLeft className="w-5 h-5 text-[#344054]" />
          </button>
          <div>
            <h1 className="text-[24px] font-bold text-[#101828]">
              {productId ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-[14px] text-[#667085] mt-1">
              {productId ? 'Update product information' : 'Create a new product'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit(false)}
            disabled={saving}
            className="px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 inline mr-2" />
            )}
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={saving}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            ) : (
              <Package className="w-4 h-4 inline mr-2" />
            )}
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Product Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter product name..."
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
                <div className="mt-2 text-[12px] text-[#667085]">
                  Slug: <span className="font-mono text-[#2563EB]">{formData.slug || '(auto-generated)'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="Product SKU..."
                    className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#344054] mb-2">
                    Barcode
                  </label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                    placeholder="Product barcode..."
                    className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-3">
              Product Image
            </label>
            {formData.featured_image_url ? (
              <div className="relative group">
                <img
                  src={formData.featured_image_url}
                  alt="Product"
                  className="w-full h-[300px] object-cover rounded-[12px]"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <X className="w-4 h-4 text-[#DC2626]" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D0D5DD] rounded-[12px] p-8 text-center cursor-pointer hover:border-[#2563EB] hover:bg-[#F9FAFB] transition-all"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      Click to upload product image
                    </p>
                    <p className="text-[14px] text-[#667085] mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-4">Description</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                  placeholder="Brief product description..."
                  rows={2}
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed product description..."
                  rows={8}
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-4">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Pricing
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Price <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Compare Price
                </label>
                <input
                  type="number"
                  value={formData.compare_at_price || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, compare_at_price: parseFloat(e.target.value) || null }))}
                  placeholder="0"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Cost Price
                </label>
                <input
                  type="number"
                  value={formData.cost_price || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost_price: parseFloat(e.target.value) || null }))}
                  placeholder="0"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO optimized title..."
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO description..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Add keyword..."
                    className="flex-1 px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.meta_keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] text-[13px] rounded-full flex items-center gap-2"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-[#DC2626]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Inventory */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[14px] font-medium text-[#344054] mb-4">Inventory</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.track_inventory}
                  onChange={(e) => setFormData(prev => ({ ...prev, track_inventory: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-[14px] text-[#344054]">Track Inventory</span>
              </label>
              {formData.track_inventory && (
                <>
                  <div>
                    <label className="block text-[14px] font-medium text-[#344054] mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      min="0"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#344054] mb-2">
                      Low Stock Alert
                    </label>
                    <input
                      type="number"
                      value={formData.low_stock_threshold}
                      onChange={(e) => setFormData(prev => ({ ...prev, low_stock_threshold: parseInt(e.target.value) || 10 }))}
                      placeholder="10"
                      min="0"
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Organization */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[14px] font-medium text-[#344054] mb-4">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Product brand..."
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                  <button
                    onClick={addTag}
                    className="px-3 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[#F0F9FF] text-[#026AA2] text-[13px] rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-[#DC2626]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[14px] font-medium text-[#344054] mb-4">Status</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Product Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-[14px] text-[#344054]">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[14px] font-medium text-[#344054] mb-4">Shipping</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || null }))}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[12px] font-medium text-[#344054] mb-2">
                    L (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.length || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, length: parseFloat(e.target.value) || null }))}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className="w-full px-2 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#344054] mb-2">
                    W (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.width || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, width: parseFloat(e.target.value) || null }))}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className="w-full px-2 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-[#344054] mb-2">
                    H (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: parseFloat(e.target.value) || null }))}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className="w-full px-2 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
