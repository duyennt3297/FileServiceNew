import { X, Search } from 'lucide-react';
import { useState } from 'react';

interface Coupon {
  id: string;
  name: string;
  price: string;
  discount: string;
  expiryDate: string;
  remaining: number;
  status: 'active' | 'inactive';
}

interface CouponSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCoupons: string[];
  onConfirm: (coupons: string[]) => void;
}

// Mock coupon data
const mockCoupons: Coupon[] = [
  {
    id: 'CP001',
    name: 'Giảm 50K cho đơn từ 200K',
    price: '200,000đ',
    discount: '50,000đ',
    expiryDate: '31/12/2025',
    remaining: 150,
    status: 'active',
  },
  {
    id: 'CP002',
    name: 'Giảm 30% tối đa 100K',
    price: '100,000đ',
    discount: '30%',
    expiryDate: '25/12/2025',
    remaining: 80,
    status: 'active',
  },
  {
    id: 'CP003',
    name: 'Freeship đơn từ 150K',
    price: '150,000đ',
    discount: 'Freeship',
    expiryDate: '30/12/2025',
    remaining: 200,
    status: 'active',
  },
  {
    id: 'CP004',
    name: 'Combo tiết kiệm giảm 100K',
    price: '300,000đ',
    discount: '100,000đ',
    expiryDate: '28/12/2025',
    remaining: 50,
    status: 'active',
  },
  {
    id: 'CP005',
    name: 'Ưu đãi cuối năm giảm 20%',
    price: '0đ',
    discount: '20%',
    expiryDate: '31/12/2025',
    remaining: 300,
    status: 'active',
  },
];

export function CouponSelector({ isOpen, onClose, selectedCoupons, onConfirm }: CouponSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>(selectedCoupons);

  if (!isOpen) return null;

  // Filter available coupons (status active and remaining > 0)
  const availableCoupons = mockCoupons.filter(
    (coupon) => coupon.status === 'active' && coupon.remaining > 0
  );

  // Filter by search query
  const filteredCoupons = availableCoupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCoupon = (couponId: string) => {
    if (tempSelected.includes(couponId)) {
      setTempSelected(tempSelected.filter((id) => id !== couponId));
    } else {
      setTempSelected([...tempSelected, couponId]);
    }
  };

  const handleConfirm = () => {
    // Check if any selected coupon is no longer available
    const unavailableCoupons = tempSelected.filter(
      (id) => !availableCoupons.find((c) => c.id === id)
    );

    if (unavailableCoupons.length > 0) {
      alert('Coupon này không còn khả dụng');
      return;
    }

    onConfirm(tempSelected);
  };

  const handleClose = () => {
    setTempSelected(selectedCoupons);
    setSearchQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Chọn Coupon</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm coupon theo tên hoặc mã..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Coupon List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Bạn chưa có Coupon nào đang phát hành</p>
              <button className="text-red-500 hover:text-red-600">
                Tạo Coupon ngay →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCoupons.map((coupon) => {
                const isSelected = tempSelected.includes(coupon.id);
                return (
                  <div
                    key={coupon.id}
                    onClick={() => toggleCoupon(coupon.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCoupon(coupon.id)}
                          className="w-5 h-5 text-red-500 rounded border-gray-300 focus:ring-red-500"
                        />
                      </div>

                      {/* Coupon Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{coupon.name}</h4>
                            <p className="text-sm text-gray-500">Mã: {coupon.id}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-red-500 font-semibold">
                              {coupon.discount}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-600">
                            <span>Giá trị đơn: {coupon.price}</span>
                          </div>
                          <div className="text-gray-600">
                            <span>HSD: {coupon.expiryDate}</span>
                          </div>
                          <div className="text-gray-600">
                            <span>
                              Còn lại: <span className="text-green-600 font-medium">{coupon.remaining}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Đã chọn: <span className="font-medium text-gray-900">{tempSelected.length}</span> coupon
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
