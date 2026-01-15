import { useState } from 'react';
import { 
  ChevronRight, Edit, Pause, Play, Copy, TrendingUp, Users, CheckCircle, DollarSign,
  Calendar, Clock, MapPin, Tag, RefreshCw, Eye, Download, Filter, Search, X,
  Smartphone, Monitor, Image as ImageIcon, Video, ShoppingCart, Settings
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CouponDetailProps {
  couponId: string;
  onBack?: () => void;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({ isOpen, title, content, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{content}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-sm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockCouponDetail = {
  id: '1',
  programName: 'Flash Sale Cuối Tuần - Giảm 50%',
  campaignCode: 'FLASH50',
  type: 'Couppa Deals',
  status: 'active',
  description: 'Chương trình giảm giá đặc biệt dành cho khách hàng mua sắm vào cuối tuần. Áp dụng cho tất cả các món ăn và đồ uống.',
  totalIssued: 1000,
  sold: 856,
  used: 642,
  revenue: 45600000,
  startDate: '01/01/2024',
  endDate: '31/12/2024',
  validTime: '2PM - 5PM',
  branches: ['Chi nhánh Quận 1', 'Chi nhánh Quận 3', 'Chi nhánh Quận 7'],
  couponType: 'Giảm giá phần trăm',
  condition: 'Đơn hàng từ 200.000đ',
  refundPolicy: 'Hỗ trợ 80% trong vòng 7 ngày',
  images: [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  ],
  video: 'https://example.com/video.mp4',
  maxUsage: 1000,
  products: ['Tất cả sản phẩm'],
};

const mockCouponCodes = [
  {
    id: '1',
    code: 'COUP1A2B3C4D',
    status: 'used',
    user: 'Nguyễn Văn A',
    purchaseDate: '15/01/2024',
    useDate: '16/01/2024',
  },
  {
    id: '2',
    code: 'COUP2E3F4G5H',
    status: 'unused',
    user: 'Trần Thị B',
    purchaseDate: '16/01/2024',
    useDate: '-',
  },
  {
    id: '3',
    code: 'COUP3I4J5K6L',
    status: 'expired',
    user: 'Lê Văn C',
    purchaseDate: '10/01/2024',
    useDate: '-',
  },
];

const mockRevenueData = [
  { date: '01/01', revenue: 2400000 },
  { date: '02/01', revenue: 3200000 },
  { date: '03/01', revenue: 2800000 },
  { date: '04/01', revenue: 4100000 },
  { date: '05/01', revenue: 3800000 },
  { date: '06/01', revenue: 4500000 },
  { date: '07/01', revenue: 3900000 },
];

const mockSalesData = [
  { date: '01/01', count: 45 },
  { date: '02/01', count: 68 },
  { date: '03/01', count: 52 },
  { date: '04/01', count: 89 },
  { date: '05/01', count: 76 },
  { date: '06/01', count: 95 },
  { date: '07/01', count: 81 },
];

export function CouponDetail({ couponId, onBack }: CouponDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'info' | 'codes' | 'stats' | 'settings'>('overview');
  const [previewMode, setPreviewMode] = useState<'user' | 'agent'>('user');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'pause' | 'activate' | null;
  }>({
    isOpen: false,
    type: null,
  });
  const [codeFilter, setCodeFilter] = useState('all');
  const [codeSearch, setCodeSearch] = useState('');
  const [statsRange, setStatsRange] = useState('7days');
  const [isActive, setIsActive] = useState(mockCouponDetail.status === 'active');

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border border-gray-200',
      active: 'bg-green-100 text-green-700 border border-green-200',
      paused: 'bg-orange-100 text-orange-700 border border-orange-200',
      expired: 'bg-red-100 text-red-700 border border-red-200',
    };
    const labels = {
      draft: 'Draft',
      active: 'Active',
      paused: 'Paused',
      expired: 'Expired',
    };
    return (
      <span className={`px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className="px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-100 text-purple-700 border border-purple-200 shadow-sm">
        {type}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handlePauseActivate = () => {
    const type = isActive ? 'pause' : 'activate';
    setConfirmModal({ isOpen: true, type });
  };

  const confirmAction = () => {
    setIsActive(!isActive);
    setConfirmModal({ isOpen: false, type: null });
  };

  const filteredCodes = mockCouponCodes.filter(code => {
    const matchesFilter = codeFilter === 'all' || code.status === codeFilter;
    const matchesSearch = code.code.toLowerCase().includes(codeSearch.toLowerCase()) ||
                         code.user.toLowerCase().includes(codeSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'info', label: 'Thông tin chương trình' },
    { id: 'codes', label: 'Mã coupon' },
    { id: 'stats', label: 'Thống kê' },
    { id: 'settings', label: 'Cài đặt' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            Coupon
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            Chương trình Coupon
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{mockCouponDetail.programName}</span>
        </div>

        {/* Title & Actions */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{mockCouponDetail.programName}</h1>
            <div className="flex items-center gap-3">
              {getTypeBadge(mockCouponDetail.type)}
              {getStatusBadge(mockCouponDetail.status)}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
              <Edit className="w-4 h-4" />
              Chỉnh sửa
            </button>
            <button 
              onClick={handlePauseActivate}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                isActive 
                  ? 'border-2 border-orange-300 text-orange-700 hover:bg-orange-50'
                  : 'border-2 border-green-300 text-green-700 hover:bg-green-50'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  Tạm dừng
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Kích hoạt
                </>
              )}
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm">
              <Copy className="w-4 h-4" />
              Sao chép
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockCouponDetail.totalIssued.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Tổng phát hành</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockCouponDetail.sold.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Đã bán</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockCouponDetail.used.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Đã sử dụng</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockCouponDetail.revenue)}</p>
              <p className="text-sm text-gray-500 mt-1">Doanh thu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* TAB 1 - Tổng quan */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6">
              {/* Left - Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('user')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        previewMode === 'user'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 inline mr-2" />
                      User
                    </button>
                    <button
                      onClick={() => setPreviewMode('agent')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        previewMode === 'agent'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Monitor className="w-4 h-4 inline mr-2" />
                      Agent
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-xl p-8 border border-gray-200">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                    <ImageWithFallback
                      src={mockCouponDetail.images[0]}
                      alt={mockCouponDetail.programName}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{mockCouponDetail.programName}</h4>
                    <p className="text-sm text-gray-600 mb-4">{mockCouponDetail.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">Giá trị</span>
                      <span className="text-lg font-bold text-red-600">-50%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Quick Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin nhanh</h3>
                
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Thời gian hiệu lực</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {mockCouponDetail.startDate} - {mockCouponDetail.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Khung giờ áp dụng</p>
                      <p className="text-sm text-gray-600 mt-1">{mockCouponDetail.validTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Chi nhánh</p>
                      <div className="mt-1 space-y-1">
                        {mockCouponDetail.branches.map((branch, idx) => (
                          <p key={idx} className="text-sm text-gray-600">{branch}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Loại coupon</p>
                      <p className="text-sm text-gray-600 mt-1">{mockCouponDetail.couponType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Điều kiện áp dụng</p>
                      <p className="text-sm text-gray-600 mt-1">{mockCouponDetail.condition}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Chính sách nhận lại</p>
                      <p className="text-sm text-gray-600 mt-1">{mockCouponDetail.refundPolicy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 - Thông tin chương trình */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa thông tin
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Tên chương trình</label>
                  <p className="text-sm text-gray-900">{mockCouponDetail.programName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Mô tả</label>
                  <p className="text-sm text-gray-900">{mockCouponDetail.description}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Gallery ảnh</label>
                  <div className="grid grid-cols-3 gap-4">
                    {mockCouponDetail.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <ImageWithFallback
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Video</label>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <Video className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">video_preview.mp4</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Lượt sử dụng</label>
                  <p className="text-sm text-gray-900">{mockCouponDetail.maxUsage.toLocaleString()} lượt</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Sản phẩm áp dụng</label>
                  <div className="flex flex-wrap gap-2">
                    {mockCouponDetail.products.map((product, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 - Mã coupon */}
          {activeTab === 'codes' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo mã..."
                    value={codeSearch}
                    onChange={(e) => setCodeSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <select
                  value={codeFilter}
                  onChange={(e) => setCodeFilter(e.target.value)}
                  className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="unused">Chưa dùng</option>
                  <option value="used">Đã dùng</option>
                  <option value="expired">Hết hạn</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm border-2 border-gray-300 rounded-xl hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Xuất file
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Mã</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Người dùng</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ngày mua</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Ngày dùng</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCodes.map((code) => (
                      <tr key={code.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <code className="text-sm font-mono font-semibold text-gray-900">{code.code}</code>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            code.status === 'used' ? 'bg-green-100 text-green-700' :
                            code.status === 'unused' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {code.status === 'used' ? 'Đã dùng' :
                             code.status === 'unused' ? 'Chưa dùng' : 'Hết hạn'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{code.user}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{code.purchaseDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{code.useDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg">
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4 - Thống kê */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Thống kê</h3>
                <select
                  value={statsRange}
                  onChange={(e) => setStatsRange(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="7days">7 ngày qua</option>
                  <option value="30days">30 ngày qua</option>
                  <option value="custom">Tùy chọn</option>
                </select>
              </div>

              {/* Revenue Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Doanh thu theo ngày</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Sales Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Số coupon bán ra</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Bar dataKey="count" fill="#2563EB" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 5 - Cài đặt */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Cài đặt chương trình</h3>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-6">
                {/* Status Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Trạng thái chương trình</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {isActive ? 'Chương trình đang hoạt động' : 'Chương trình đang tạm dừng'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      isActive ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        isActive ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Chính sách</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Mức hỗ trợ nhận lại</label>
                      <p className="text-sm text-gray-900">{mockCouponDetail.refundPolicy}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Thời gian áp dụng</label>
                      <p className="text-sm text-gray-900">
                        {mockCouponDetail.startDate} - {mockCouponDetail.endDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Khung giờ: {mockCouponDetail.validTime}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full px-4 py-3 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm">
                    <Settings className="w-4 h-4 inline mr-2" />
                    Cập nhật chính sách
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'pause' ? 'Tạm dừng chương trình?' : 'Kích hoạt chương trình?'}
        content={
          confirmModal.type === 'pause'
            ? 'Chương trình sẽ ẩn với khách hàng'
            : 'Chương trình sẽ hiển thị lại trên hệ thống'
        }
        onConfirm={confirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, type: null })}
      />
    </div>
  );
}