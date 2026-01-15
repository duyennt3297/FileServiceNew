import { useState } from 'react';
import { Search, Download, Plus, MoreVertical, Eye, Edit, Trash2, Copy, X, Play, Pause, Calendar, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Coupon {
  id: string;
  thumbnail: string;
  programName: string;
  campaignCode: string;
  type: 'Couppa Deals' | 'Couppa Auto' | 'Couppa Club' | 'Couppa Book' | 'Couppa Pass' | 'Couppa Share' | 'Couppa Multi';
  status: 'draft' | 'active' | 'paused' | 'expired';
  startDate: string;
  endDate: string;
  soldCount: number;
  revenue: number;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=120&fit=crop',
    programName: 'Flash Sale Cuối Tuần - Giảm 50%',
    campaignCode: 'FLASH50',
    type: 'Couppa Deals',
    status: 'active',
    startDate: '01/01/2024',
    endDate: '31/12/2024',
    soldCount: 1234,
    revenue: 45600000,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=200&h=120&fit=crop',
    programName: 'Happy Hour - Giảm 30% từ 2-5PM',
    campaignCode: 'HAPPY30',
    type: 'Couppa Auto',
    status: 'active',
    startDate: '15/01/2024',
    endDate: '15/06/2024',
    soldCount: 856,
    revenue: 23400000,
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=120&fit=crop',
    programName: 'Member Exclusive - Ưu đãi đặc biệt',
    campaignCode: 'MEMBER2024',
    type: 'Couppa Club',
    status: 'paused',
    startDate: '01/02/2024',
    endDate: '28/02/2024',
    soldCount: 432,
    revenue: 18900000,
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=120&fit=crop',
    programName: 'Đặt Bàn Trước - Free Drink',
    campaignCode: 'BOOK2024',
    type: 'Couppa Book',
    status: 'draft',
    startDate: '01/03/2024',
    endDate: '31/03/2024',
    soldCount: 0,
    revenue: 0,
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&h=120&fit=crop',
    programName: 'Tết Nguyên Đán 2024',
    campaignCode: 'TET2024',
    type: 'Couppa Pass',
    status: 'expired',
    startDate: '01/01/2024',
    endDate: '15/02/2024',
    soldCount: 2456,
    revenue: 89700000,
  },
];

interface CouponListProps {
  onCreateNew?: () => void;
  onViewDetail?: (couponId: string) => void;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmModal({ isOpen, title, content, onConfirm, onCancel, confirmText = 'Xác nhận', cancelText = 'Hủy' }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4 animate-in fade-in-0 zoom-in-95">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{content}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onCreateNew }: { onCreateNew?: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Bạn chưa có chương trình coupon nào
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Tạo chương trình coupon đầu tiên để bắt đầu thu hút khách hàng
        </p>
        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow"
        >
          <Plus className="w-5 h-5" />
          Tạo chương trình đầu tiên
        </button>
      </div>
    </div>
  );
}

export function CouponList({ onCreateNew, onViewDetail }: CouponListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'revenue'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'pause' | 'activate' | null;
    couponId: string | null;
  }>({
    isOpen: false,
    type: null,
    couponId: null,
  });

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = coupon.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.campaignCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || coupon.status === selectedStatus;
    const matchesType = selectedType === 'all' || coupon.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const hasActiveFilters = selectedStatus !== 'all' || selectedType !== 'all' || dateRange.from || dateRange.to || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedType('all');
    setDateRange({ from: '', to: '' });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCoupons(filteredCoupons.map(c => c.id));
    } else {
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCoupons([...selectedCoupons, id]);
    } else {
      setSelectedCoupons(selectedCoupons.filter(cId => cId !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700',
      active: 'bg-green-100 text-green-700',
      paused: 'bg-orange-100 text-orange-700',
      expired: 'bg-red-100 text-red-700',
    };
    const labels = {
      draft: 'Draft',
      active: 'Active',
      paused: 'Paused',
      expired: 'Expired',
    };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Couppa Deals': 'bg-purple-100 text-purple-700 border border-purple-200',
      'Couppa Auto': 'bg-blue-100 text-blue-700 border border-blue-200',
      'Couppa Club': 'bg-pink-100 text-pink-700 border border-pink-200',
      'Couppa Book': 'bg-teal-100 text-teal-700 border border-teal-200',
      'Couppa Pass': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
      'Couppa Share': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      'Couppa Multi': 'bg-cyan-100 text-cyan-700 border border-cyan-200',
    };
    return (
      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg shadow-sm ${colors[type] || 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
        {type}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handlePauseActivate = (couponId: string, type: 'pause' | 'activate') => {
    setConfirmModal({ isOpen: true, type, couponId });
  };

  const confirmAction = () => {
    console.log(`${confirmModal.type} coupon ${confirmModal.couponId}`);
    setConfirmModal({ isOpen: false, type: null, couponId: null });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý Coupon</h1>
          <p className="text-sm text-gray-500 mt-1">Danh sách và quản lý các chương trình coupon</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow"
        >
          <Plus className="w-5 h-5" />
          Tạo chương trình mới
        </button>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-10 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 space-y-4">
          {/* First Row: Search + Filters */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo tên chương trình, mã chiến dịch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="min-w-[140px] px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="all">Trạng thái</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="min-w-[160px] px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="all">Loại chương trình</option>
              <option value="Couppa Deals">Couppa Deals</option>
              <option value="Couppa Auto">Couppa Auto</option>
              <option value="Couppa Club">Couppa Club</option>
              <option value="Couppa Book">Couppa Book</option>
              <option value="Couppa Pass">Couppa Pass</option>
              <option value="Couppa Share">Couppa Share</option>
              <option value="Couppa Multi">Couppa Multi</option>
            </select>

            {/* Date Range */}
            <div className="relative min-w-[220px]">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Khoảng thời gian hiệu lực"
                readOnly
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </button>
            )}

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all">
              <Download className="w-4 h-4" />
              Xuất file
            </button>
          </div>

          {/* Bulk Actions */}
          {selectedCoupons.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm font-medium text-blue-900">
                Đã chọn <span className="font-semibold">{selectedCoupons.length}</span> chương trình
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 text-sm font-medium bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                  Tạm dừng
                </button>
                <button className="px-4 py-1.5 text-sm font-medium bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">
                  Kích hoạt
                </button>
                <button className="px-4 py-1.5 text-sm font-medium bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                  Xóa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredCoupons.length === 0 && !hasActiveFilters ? (
        <EmptyState onCreateNew={onCreateNew} />
      ) : filteredCoupons.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <p className="text-gray-500">Không tìm thấy chương trình phù hợp với bộ lọc</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedCoupons.length === filteredCoupons.length && filteredCoupons.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tên chương trình
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Đã bán
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Doanh thu
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCoupons.map((coupon) => (
                  <tr 
                    key={coupon.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      // Navigate to detail page
                      if (onViewDetail) {
                        onViewDetail(coupon.id);
                      }
                    }}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedCoupons.includes(coupon.id)}
                        onChange={(e) => handleSelectCoupon(coupon.id, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                          <ImageWithFallback
                            src={coupon.thumbnail}
                            alt={coupon.programName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {coupon.programName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {coupon.campaignCode}
                            </code>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(coupon.campaignCode);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getTypeBadge(coupon.type)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(coupon.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{coupon.startDate}</p>
                        <p className="text-gray-400">→ {coupon.endDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {coupon.soldCount.toLocaleString('vi-VN')}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(coupon.revenue)}
                      </p>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <button
                            onClick={() => setShowActionMenu(showActionMenu === coupon.id ? null : coupon.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          {showActionMenu === coupon.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  Xem chi tiết
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Edit className="w-4 h-4" />
                                  Chỉnh sửa
                                </button>
                                {coupon.status === 'active' ? (
                                  <button 
                                    onClick={() => handlePauseActivate(coupon.id, 'pause')}
                                    className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                                  >
                                    <Pause className="w-4 h-4" />
                                    Tạm dừng
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handlePauseActivate(coupon.id, 'activate')}
                                    className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                                  >
                                    <Play className="w-4 h-4" />
                                    Kích hoạt
                                  </button>
                                )}
                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Copy className="w-4 h-4" />
                                  Sao chép
                                </button>
                                <div className="border-t border-gray-200 my-1" />
                                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                  <Trash2 className="w-4 h-4" />
                                  Xóa
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  Hiển thị <span className="font-semibold text-gray-900">{filteredCoupons.length}</span> trong tổng số <span className="font-semibold text-gray-900">{mockCoupons.length}</span> chương trình
                </p>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value={10}>10 / trang</option>
                  <option value={20}>20 / trang</option>
                  <option value={50}>50 / trang</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'pause' ? 'Tạm dừng chương trình?' : 'Kích hoạt chương trình?'}
        content={
          confirmModal.type === 'pause' 
            ? 'Chương trình sẽ không hiển thị với khách hàng' 
            : 'Chương trình sẽ hiển thị lại trên hệ thống'
        }
        onConfirm={confirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, type: null, couponId: null })}
      />
    </div>
  );
}