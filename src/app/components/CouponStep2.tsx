import { useState } from 'react';
import { Check, Search, ChevronDown } from 'lucide-react';

type CouponType = 'percentage' | 'amount' | 'gift' | 'voucher';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

const allProducts: Product[] = [
  { id: '1', name: 'Áo thun nam cotton', sku: 'TSH-001', price: 199000, stock: 150 },
  { id: '2', name: 'Quần jean nữ slim fit', sku: 'JEN-002', price: 499000, stock: 80 },
  { id: '3', name: 'Giày sneaker unisex', sku: 'SNK-003', price: 799000, stock: 45 },
  { id: '4', name: 'Túi xách da cao cấp', sku: 'BAG-004', price: 1299000, stock: 0 },
  { id: '5', name: 'Đồng hồ thông minh', sku: 'WCH-005', price: 2499000, stock: 30 },
  { id: '6', name: 'Kính mát thời trang', sku: 'GLM-006', price: 399000, stock: 120 },
  { id: '7', name: 'Ví da nam cao cấp', sku: 'WLT-007', price: 599000, stock: 0 },
  { id: '8', name: 'Thắt lưng da bò', sku: 'BLT-008', price: 299000, stock: 95 },
];

const couponTypes = [
  { id: 'percentage' as CouponType, name: 'Giảm %', icon: '📊' },
  { id: 'amount' as CouponType, name: 'Giảm tiền', icon: '💰' },
  { id: 'gift' as CouponType, name: 'Tặng thêm', icon: '🎁' },
  { id: 'voucher' as CouponType, name: 'Phiếu mua hàng', icon: '🎟️' },
];

export function CouponStep2() {
  const [selectedType, setSelectedType] = useState<CouponType>('percentage');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  // Form values for different coupon types
  const [percentageValue, setPercentageValue] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  const [minOrder, setMinOrder] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [giftProduct, setGiftProduct] = useState('');
  const [voucherAmount, setVoucherAmount] = useState('');

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock = !showInStockOnly || product.stock > 0;
    const notSelected = !selectedProducts.includes(product.id);
    return matchesSearch && matchesStock && notSelected;
  });

  const displayedProducts = allProducts
    .filter(product => selectedProducts.includes(product.id))
    .filter(product => !showInStockOnly || product.stock > 0);

  const handleProductSelect = (productId: string) => {
    setSelectedProducts([...selectedProducts, productId]);
    setSearchTerm('');
    setShowProductDropdown(false);
  };

  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSelectAll = () => {
    const visibleProductIds = displayedProducts.map(p => p.id);
    const allSelected = visibleProductIds.every(id => selectedProducts.includes(id));
    
    if (allSelected) {
      setSelectedProducts(selectedProducts.filter(id => !visibleProductIds.includes(id)));
    } else {
      const newSelected = [...new Set([...selectedProducts, ...visibleProductIds])];
      setSelectedProducts(newSelected);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="space-y-8">
      {/* Section 1 - Coupon Type Selection */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn loại coupon</h2>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {couponTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`relative p-6 rounded-lg border-2 transition-all ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Radio Circle */}
              <div className="absolute top-3 right-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 bg-white'
                }`}>
                  {selectedType === type.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-3xl">{type.icon}</div>
                <div className="text-sm font-medium text-gray-900">{type.name}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Form Based on Type */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Thông tin giảm giá</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Percentage Type */}
            {selectedType === 'percentage' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    % giảm <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={percentageValue}
                      onChange={(e) => setPercentageValue(e.target.value)}
                      placeholder="Nhập % giảm"
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm tối đa
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="Nhập số tiền giảm tối đa"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn tối thiểu
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      placeholder="Nhập giá trị đơn tối thiểu"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </>
            )}

            {/* Amount Type */}
            {selectedType === 'amount' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền giảm <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amountValue}
                      onChange={(e) => setAmountValue(e.target.value)}
                      placeholder="Nhập số tiền giảm"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn tối thiểu
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      placeholder="Nhập giá trị đơn tối thiểu"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </>
            )}

            {/* Gift Type */}
            {selectedType === 'gift' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sản phẩm tặng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={giftProduct}
                      onChange={(e) => setGiftProduct(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Chọn sản phẩm tặng</option>
                      {allProducts.filter(p => p.stock > 0).map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.sku})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn tối thiểu
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      placeholder="Nhập giá trị đơn tối thiểu"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </>
            )}

            {/* Voucher Type */}
            {selectedType === 'voucher' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá trị phiếu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={voucherAmount}
                      onChange={(e) => setVoucherAmount(e.target.value)}
                      placeholder="Nhập giá trị phiếu"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn tối thiểu
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={minOrder}
                      onChange={(e) => setMinOrder(e.target.value)}
                      placeholder="Nhập giá trị đơn tối thiểu"
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VNĐ</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section 2 - Product Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Sản phẩm áp dụng</h2>
          
          {/* Toggle In Stock Only */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-gray-700">Chỉ hiển thị còn hàng</span>
            <div
              onClick={() => setShowInStockOnly(!showInStockOnly)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                showInStockOnly ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  showInStockOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        </div>

        {/* Searchable Dropdown */}
        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowProductDropdown(true);
              }}
              onFocus={() => setShowProductDropdown(true)}
              placeholder="Tìm kiếm sản phẩm theo tên hoặc SKU..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Dropdown Results */}
          {showProductDropdown && searchTerm && filteredProducts.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</div>
                      <div className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Kho: {product.stock}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={displayedProducts.length > 0 && displayedProducts.every(p => selectedProducts.includes(p.id))}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tên sản phẩm</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SKU</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Giá</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tồn kho</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Chưa chọn sản phẩm nào
                  </td>
                </tr>
              ) : (
                displayedProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductToggle(product.id)}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
