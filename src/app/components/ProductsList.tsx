import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Package,
  Edit2,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Loader2,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { getProducts, getProductsStats, deleteProduct, Product } from '@/services/productService';
import { toast } from 'sonner';

interface ProductsListProps {
  onCreateClick: () => void;
  onEditClick: (productId: string) => void;
}

export function ProductsList({ onCreateClick, onEditClick }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  useEffect(() => {
    loadProducts();
    loadStats();
  }, [statusFilter]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (statusFilter !== 'all') {
        filters.status = statusFilter;
      }
      if (searchQuery) {
        filters.search = searchQuery;
      }
      
      const data = await getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getProductsStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSearch = () => {
    loadProducts();
  };

  const handleDelete = async (productId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const success = await deleteProduct(productId);
      if (success) {
        toast.success('Product deleted successfully');
        loadProducts();
        loadStats();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadge = (status: Product['status']) => {
    const styles = {
      1: 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]',
      0: 'bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]',
    };

    const labels = {
      1: 'Active',
      0: 'Inactive',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-[11px] font-medium border ${styles[status as 0 | 1]}`}>
        {labels[status as 0 | 1]}
      </span>
    );
  };

  const getStockStatus = (product: Product) => {
    if (!product.track_inventory) {
      return null;
    }

    if (product.stock_quantity <= 0) {
      return (
        <span className="flex items-center gap-1 text-[#DC2626] text-[12px]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Out of stock
        </span>
      );
    }

    if (product.stock_quantity <= product.low_stock_threshold) {
      return (
        <span className="flex items-center gap-1 text-[#F59E0B] text-[12px]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Low stock ({product.stock_quantity})
        </span>
      );
    }

    return (
      <span className="text-[#667085] text-[12px]">
        Stock: {product.stock_quantity}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#101828]">Products Management</h1>
          <p className="text-[14px] text-[#667085] mt-1">
            Manage your product inventory and pricing
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-[8px] hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Total Products</p>
              <p className="text-[24px] font-bold text-[#101828]">{stats.total}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#2563EB]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Active</p>
              <p className="text-[24px] font-bold text-[#101828]">{stats.active}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#047857]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Out of Stock</p>
              <p className="text-[24px] font-bold text-[#101828]">{stats.outOfStock}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Inventory Value</p>
              <p className="text-[18px] font-bold text-[#101828]">
                {formatCurrency(stats.totalValue)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[12px] border border-[#EAECF0]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-[320px] border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="INACTIVE">Inactive</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
        </div>
      )}

      {/* Products List */}
      {!loading && products.length > 0 && (
        <div className="bg-white rounded-[12px] border border-[#EAECF0] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <tr>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  SKU
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.featured_image_url ? (
                        <img
                          src={product.featured_image_url}
                          alt={product.title}
                          className="w-12 h-12 rounded-[8px] object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-[8px] bg-[#F9FAFB] flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-[#D0D5DD]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[14px] font-medium text-[#101828] truncate">
                            {product.title}
                          </h3>
                          {product.is_featured && (
                            <span className="px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] text-[10px] rounded font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        {product.brand && (
                          <p className="text-[12px] text-[#667085] truncate mt-0.5">
                            {product.brand}
                          </p>
                        )}
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {product.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-[#F0F9FF] text-[#026AA2] text-[10px] rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[14px] text-[#344054] font-mono">
                      {product.sku || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-[14px] font-semibold text-[#101828]">
                        {formatCurrency(product.price)}
                      </p>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <p className="text-[12px] text-[#667085] line-through">
                          {formatCurrency(product.compare_at_price)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStockStatus(product)}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onEditClick(product._id)}
                        className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id, product.title)}
                        className="p-1.5 text-[#DC2626] hover:text-[#B91C1C] hover:bg-[#FEF2F2] rounded"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-12 text-center">
          <Package className="w-12 h-12 text-[#D0D5DD] mx-auto mb-3" />
          <h3 className="text-[16px] font-medium text-[#101828] mb-1">No products found</h3>
          <p className="text-[14px] text-[#667085]">
            {searchQuery ? 'Try adjusting your search' : 'Add your first product to get started'}
          </p>
        </div>
      )}
    </div>
  );
}