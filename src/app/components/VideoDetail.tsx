import { useState, useEffect } from 'react';
import { X, ChevronDown, PlayCircle } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface VideoDetailProps {
  videoId: number;
  onClose: () => void;
  userRole?: string;
  videoOwnerId?: number;
  currentUserId?: number;
}

interface CouponData {
  id: number;
  title: string;
  quota: string;
  expiry: string;
  remaining: number;
  used: number;
  clicks: number;
  revenue: string;
}

interface MetricsData {
  views: number;
  likes: number;
  clicks: number;
  follows: number;
  watchTime: string;
  ctr: number;
}

interface ChartDataPoint {
  date: string;
  views: number;
  likes: number;
  clicks: number;
  follows: number;
  watchTime: number;
}

const mockCoupons: CouponData[] = [
  {
    id: 1,
    title: 'Giảm 50K cho đơn từ 200K',
    quota: '20,000đ',
    expiry: '01/12/2025',
    remaining: 155,
    used: 65,
    clicks: 155,
    revenue: '3,250,000đ',
  },
  {
    id: 2,
    title: 'Giảm 30% cho đơn từ 200K',
    quota: '20,000đ',
    expiry: '01/12/2025',
    remaining: 156,
    used: 45,
    clicks: 45,
    revenue: '1,125,000đ',
  },
];

const generateMockData = (days: number, isToday: boolean = false): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  if (isToday) {
    // Generate hourly data for today
    const currentHour = today.getHours();
    for (let i = 0; i <= currentHour; i += 2) {
      const endHour = Math.min(i + 2, 24);
      data.push({
        date: `${i}–${endHour}`,
        views: Math.floor(Math.random() * 300) + 100,
        likes: Math.floor(Math.random() * 100) + 30,
        clicks: Math.floor(Math.random() * 200) + 80,
        follows: Math.floor(Math.random() * 30) + 5,
        watchTime: Math.floor(Math.random() * 150) + 50,
      });
    }
  } else {
    // Generate daily data
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
        views: Math.floor(Math.random() * 800) + 200,
        likes: Math.floor(Math.random() * 300) + 100,
        clicks: Math.floor(Math.random() * 600) + 300,
        follows: Math.floor(Math.random() * 100) + 20,
        watchTime: Math.floor(Math.random() * 500) + 200,
      });
    }
  }
  
  return data;
};

export function VideoDetail({ videoId, onClose, userRole = 'Merchant', videoOwnerId = 1, currentUserId = 1 }: VideoDetailProps) {
  const [timeFilter, setTimeFilter] = useState('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [metrics, setMetrics] = useState<MetricsData>({
    views: 0,
    likes: 0,
    clicks: 0,
    follows: 0,
    watchTime: '0:00:00',
    ctr: 0,
  });
  
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [visibleLines, setVisibleLines] = useState({
    views: true,
    likes: true,
    clicks: true,
    follows: true,
    watchTime: true,
  });

  // Permission check on mount
  useEffect(() => {
    // Track open_video_detail
    console.log('Event: open_video_detail', { videoId, userRole });
    
    // Check permissions
    if (userRole !== 'Merchant' || videoOwnerId !== currentUserId) {
      setShowPermissionModal(true);
      return;
    }
    
    // Simulate data loading
    setTimeout(() => {
      loadData();
    }, 800);
  }, [videoId, userRole, videoOwnerId, currentUserId]);

  // Load data based on filter
  useEffect(() => {
    if (!showPermissionModal) {
      loadData();
    }
  }, [timeFilter]);

  const loadData = () => {
    setIsLoading(true);
    setHasError(false);
    
    // Simulate API call
    setTimeout(() => {
      try {
        let days = 30;
        let isToday = false;
        if (timeFilter === '7days') days = 7;
        else if (timeFilter === '28days') days = 28;
        else if (timeFilter === 'custom' && startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        } else if (timeFilter === 'today') {
          isToday = true;
        }
        
        const data = generateMockData(days, isToday);
        setChartData(data);
        
        // Calculate metrics
        const totalViews = data.reduce((sum, d) => sum + d.views, 0);
        const totalLikes = data.reduce((sum, d) => sum + d.likes, 0);
        const totalClicks = data.reduce((sum, d) => sum + d.clicks, 0);
        const totalFollows = data.reduce((sum, d) => sum + d.follows, 0);
        const totalWatchTime = data.reduce((sum, d) => sum + d.watchTime, 0);
        
        const hours = Math.floor(totalWatchTime / 60);
        const minutes = totalWatchTime % 60;
        
        setMetrics({
          views: totalViews,
          likes: totalLikes,
          clicks: totalClicks,
          follows: totalFollows,
          watchTime: `${hours}:${minutes.toString().padStart(2, '0')}:32`,
          ctr: totalViews > 0 ? Number(((totalClicks / totalViews) * 100).toFixed(2)) : 0,
        });
        
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        // Show toast
        console.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    }, 500);
  };

  const handleTimeFilterChange = (value: string) => {
    console.log('Event: change_time_filter', { from: timeFilter, to: value });
    
    if (value === 'custom') {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      setTimeFilter(value);
    }
  };

  const applyCustomDateRange = () => {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validation
    if (start > end) {
      alert('Từ ngày phải nhỏ hơn hoặc bằng Đến ngày');
      return;
    }
    
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      alert('Khoảng thời gian không được vượt quá 90 ngày');
      return;
    }
    
    setTimeFilter('custom');
    setShowDatePicker(false);
    loadData();
  };

  const toggleLine = (line: keyof typeof visibleLines) => {
    console.log('Event: toggle_chart_line', { line, visible: !visibleLines[line] });
    setVisibleLines(prev => ({
      ...prev,
      [line]: !prev[line],
    }));
  };

  const handleCouponDetail = (couponId: number) => {
    console.log('Event: click_coupon_detail', { couponId });
    window.open(`/merchant/coupons/${couponId}`, '_blank');
  };

  const handlePlayVideo = () => {
    console.log('Event: video_replay', { videoId });
    setIsPlaying(true);
  };

  if (showPermissionModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-2 text-[#101828]">Không có quyền truy cập</h3>
          <p className="text-[#667085] mb-6">Bạn không có quyền xem video này</p>
          <button
            onClick={onClose}
            className="w-full bg-[#E50914] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-[1400px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#D0D5DD] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-[#101828]">Chi tiết video</h2>
          <button onClick={onClose} className="text-[#667085] hover:text-[#101828] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Video & Info Section */}
          <div className="flex gap-8">
            {/* Video Player */}
            <div className="w-[640px] shrink-0">
              {isLoading ? (
                <div className="w-full aspect-[16/9] bg-[#F9FAFB] rounded-lg animate-pulse" />
              ) : (
                <div className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden group">
                  <ImageWithFallback
                    src="/assets/images/video-thumbnail.png"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  {!isPlaying && (
                    <button
                      onClick={handlePlayVideo}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
                    >
                      <PlayCircle className="w-16 h-16 text-white" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-sm text-[#667085] mb-1">Tiêu đề</p>
                {isLoading ? (
                  <div className="h-6 bg-[#F9FAFB] rounded w-3/4 animate-pulse" />
                ) : (
                  <h3 className="text-lg font-semibold text-[#101828]">Combo xu đặc biệt tháng 12</h3>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#667085] mb-1">Ngày đăng</p>
                  {isLoading ? (
                    <div className="h-5 bg-[#F9FAFB] rounded w-32 animate-pulse" />
                  ) : (
                    <p className="text-sm text-[#101828]">01/01/2025 18:39</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-[#667085] mb-1">Trạng thái</p>
                  {isLoading ? (
                    <div className="h-6 bg-[#F9FAFB] rounded w-20 animate-pulse" />
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded-2xl text-xs font-medium bg-[#D1FADF] text-[#027948]">
                      Đã đăng
                    </span>
                  )}
                </div>
              </div>

              {/* Coupons */}
              {mockCoupons.length > 0 && (
                <div className="space-y-3">
                  {mockCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="border border-[#9CA3AF] rounded-lg p-3 space-y-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 bg-[#F9FAFB] rounded w-3/4 animate-pulse" />
                          <div className="h-4 bg-[#F9FAFB] rounded w-1/2 animate-pulse" />
                        </>
                      ) : (
                        <>
                          <p className="font-medium text-[#101828]">{coupon.title}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-[#667085]">Quá: {coupon.quota}</span>
                              <span className="mx-2">•</span>
                              <span className="text-[#667085]">HSD: {coupon.expiry}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-[#667085]">Còn lại: </span>
                              <span className="text-[#027948]">{coupon.remaining}</span>
                              <span className="mx-2 text-[#667085]">Lượt dùng:</span>
                              <span className="text-[#E50914]">{coupon.used}</span>
                            </div>
                            <button
                              onClick={() => handleCouponDetail(coupon.id)}
                              className="text-[#2563EB] hover:underline text-sm"
                            >
                              Xem chi tiết coupon →
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Metrics Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0A0A0A]">Thống kê hiệu suất</h3>
              
              <div className="relative w-[160px]">
                <select
                  value={timeFilter}
                  onChange={(e) => handleTimeFilterChange(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-lg px-3 py-1.5 pr-10 text-sm text-[#101828] cursor-pointer focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="today">Hôm nay</option>
                  <option value="7days">7 ngày qua</option>
                  <option value="28days">28 ngày qua</option>
                  <option value="all">Toàn thời gian</option>
                  <option value="custom">Tùy chỉnh</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#101828] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Helper text for Today filter */}
            {timeFilter === 'today' && !isLoading && (
              <div className="mb-4 px-3 py-2 bg-[#EFF6FF] border border-[#BEDBFF] rounded-lg">
                <p className="text-sm text-[#1447E6]">Dữ liệu trong ngày, cập nhật liên tục</p>
              </div>
            )}

            {/* Custom Date Picker */}
            {showDatePicker && (
              <div className="mb-4 p-4 bg-[#F9FAFB] rounded-lg">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm text-[#667085] mb-1">Từ ngày</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-[#667085] mb-1">Đến ngày</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <button
                    onClick={applyCustomDateRange}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            )}

            {/* Metrics Cards */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {/* Views */}
              <div className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BEDBFF] rounded-lg p-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/50 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-white/50 rounded w-24 animate-pulse" />
                    <div className="h-4 bg-white/50 rounded w-28 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#1447E6] mb-1">Lượt xem</p>
                    <p className="text-2xl font-bold text-[#1C398E] mb-1">{metrics.views.toLocaleString()}</p>
                    <p className="text-xs text-[#155DFC]">Video phát &gt; 3 giây</p>
                  </>
                )}
              </div>

              {/* Likes */}
              <div className="bg-gradient-to-br from-[#FDF2F8] to-[#FCE7F3] border border-[#FCCEE8] rounded-lg p-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/50 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-white/50 rounded w-24 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#C6005C] mb-1">Lượt thích</p>
                    <p className="text-2xl font-bold text-[#861043]">{metrics.likes.toLocaleString()}</p>
                  </>
                )}
              </div>

              {/* Clicks */}
              <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#A7F3D0] rounded-lg p-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/50 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-white/50 rounded w-24 animate-pulse" />
                    <div className="h-4 bg-white/50 rounded w-16 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#059669] mb-1">Click coupon</p>
                    <p className="text-2xl font-bold text-[#065F46]">{metrics.clicks.toLocaleString()}</p>
                    <p 
                      className="text-xs text-[#10B981] cursor-help" 
                      title="CTR = Số lượt click / Số lượt xem"
                    >
                      CTR: {metrics.ctr}%
                    </p>
                  </>
                )}
              </div>

              {/* Follows */}
              <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] rounded-lg p-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/50 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-white/50 rounded w-24 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#7C3AED] mb-1">Follow shop</p>
                    <p className="text-2xl font-bold text-[#5B21B6]">{metrics.follows.toLocaleString()}</p>
                  </>
                )}
              </div>

              {/* Watch Time */}
              <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-[#FCD34D] rounded-lg p-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/50 rounded w-20 animate-pulse" />
                    <div className="h-8 bg-white/50 rounded w-24 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#D97706] mb-1">Thời gian xem</p>
                    <p className="text-2xl font-bold text-[#92400E]">{metrics.watchTime}</p>
                  </>
                )}
              </div>
            </div>

            {/* Chart */}
            <div className="border border-[#D0D5DD] rounded-lg p-6">
              <h4 className="text-base font-semibold text-[#101828] mb-4">Biểu đồ diễn biến</h4>
              
              {/* Chart Legend/Toggles */}
              <div className="flex flex-wrap gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleLines.views}
                    onChange={() => toggleLine('views')}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#1447E6]">● Lượt xem</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleLines.likes}
                    onChange={() => toggleLine('likes')}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#C6005C]">● Lượt thích</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleLines.clicks}
                    onChange={() => toggleLine('clicks')}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#059669]">● Click coupon</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleLines.follows}
                    onChange={() => toggleLine('follows')}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#7C3AED]">● Follow shop</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleLines.watchTime}
                    onChange={() => toggleLine('watchTime')}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#D97706]">● Thời gian xem</span>
                </label>
              </div>

              {isLoading ? (
                <div className="h-[300px] bg-[#F9FAFB] rounded animate-pulse" />
              ) : hasError ? (
                <div className="h-[300px] flex flex-col items-center justify-center text-center">
                  <p className="text-[#667085] mb-4">Không thể tải dữ liệu, vui lòng thử lại</p>
                  <button
                    onClick={loadData}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:opacity-90"
                  >
                    Thử lại
                  </button>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-[300px] flex flex-col items-center justify-center text-center">
                  <p className="text-[#667085]">Không có dữ liệu trong khoảng thời gian này</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: '#667085', fontSize: 12 }}
                      tickLine={{ stroke: '#D0D5DD' }}
                    />
                    <YAxis
                      tick={{ fill: '#667085', fontSize: 12 }}
                      tickLine={{ stroke: '#D0D5DD' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        padding: '8px',
                      }}
                    />
                    {visibleLines.views && (
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#1447E6"
                        strokeWidth={2}
                        dot={false}
                        name="Lượt xem"
                        animationDuration={300}
                      />
                    )}
                    {visibleLines.likes && (
                      <Line
                        type="monotone"
                        dataKey="likes"
                        stroke="#C6005C"
                        strokeWidth={2}
                        dot={false}
                        name="Lượt thích"
                        animationDuration={300}
                      />
                    )}
                    {visibleLines.clicks && (
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={false}
                        name="Click coupon"
                        animationDuration={300}
                      />
                    )}
                    {visibleLines.follows && (
                      <Line
                        type="monotone"
                        dataKey="follows"
                        stroke="#7C3AED"
                        strokeWidth={2}
                        dot={false}
                        name="Follow shop"
                        animationDuration={300}
                      />
                    )}
                    {visibleLines.watchTime && (
                      <Line
                        type="monotone"
                        dataKey="watchTime"
                        stroke="#D97706"
                        strokeWidth={2}
                        dot={false}
                        name="Thời gian xem"
                        animationDuration={300}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}