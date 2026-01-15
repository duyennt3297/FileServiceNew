import { X, ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VideoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  showDetailPage?: boolean;
  isTransitioning?: boolean;
  video: {
    id: number;
    thumbnail: string;
    title: string;
    status: {
      label: string;
      color: string;
      value: string;
    };
    date: string;
  };
}

// Mock data for statistics
const generateMockChartData = (period: string) => {
  if (period === '7days') {
    return [
      { time: '17/12', views: 1200, likes: 85, clicks: 45, follows: 12, watchTime: 180 },
      { time: '18/12', views: 1500, likes: 102, clicks: 58, follows: 15, watchTime: 220 },
      { time: '19/12', views: 1800, likes: 125, clicks: 72, follows: 18, watchTime: 280 },
      { time: '20/12', views: 2100, likes: 145, clicks: 85, follows: 22, watchTime: 320 },
      { time: '21/12', views: 1900, likes: 132, clicks: 68, follows: 19, watchTime: 290 },
      { time: '22/12', views: 2300, likes: 158, clicks: 95, follows: 25, watchTime: 350 },
      { time: '23/12', views: 2600, likes: 175, clicks: 105, follows: 28, watchTime: 390 },
    ];
  } else if (period === '28days') {
    return [
      { time: '26/11', views: 800, likes: 55, clicks: 30, follows: 8, watchTime: 120 },
      { time: '30/11', views: 1000, likes: 68, clicks: 38, follows: 10, watchTime: 150 },
      { time: '04/12', views: 1200, likes: 82, clicks: 45, follows: 12, watchTime: 180 },
      { time: '08/12', views: 1400, likes: 95, clicks: 52, follows: 14, watchTime: 210 },
      { time: '12/12', views: 1700, likes: 115, clicks: 65, follows: 17, watchTime: 260 },
      { time: '16/12', views: 2000, likes: 138, clicks: 78, follows: 20, watchTime: 300 },
      { time: '20/12', views: 2300, likes: 155, clicks: 88, follows: 23, watchTime: 340 },
      { time: '23/12', views: 2600, likes: 175, clicks: 105, follows: 28, watchTime: 390 },
    ];
  } else {
    // all-time
    return [
      { time: '01/11', views: 500, likes: 35, clicks: 18, follows: 5, watchTime: 75 },
      { time: '15/11', views: 800, likes: 55, clicks: 30, follows: 8, watchTime: 120 },
      { time: '01/12', views: 1200, likes: 82, clicks: 45, follows: 12, watchTime: 180 },
      { time: '08/12', views: 1500, likes: 102, clicks: 58, follows: 15, watchTime: 220 },
      { time: '15/12', views: 2000, likes: 138, clicks: 78, follows: 20, watchTime: 300 },
      { time: '20/12', views: 2400, likes: 162, clicks: 95, follows: 25, watchTime: 360 },
      { time: '23/12', views: 2800, likes: 185, clicks: 110, follows: 30, watchTime: 420 },
    ];
  }
};

const mockCoupons = [
  {
    id: 'CP001',
    name: 'Giảm 50K cho đơn từ 200K',
    price: '200,000đ',
    expiryDate: '31/12/2025',
    remaining: 150,
    clicks: 105,
  },
  {
    id: 'CP002',
    name: 'Giảm 30% tối đa 100K',
    price: '100,000đ',
    expiryDate: '25/12/2025',
    remaining: 80,
    clicks: 58,
  },
];

export function VideoDetailModal({ isOpen, onClose, showDetailPage, isTransitioning, video }: VideoDetailModalProps) {
  const [timePeriod, setTimePeriod] = useState('all-time');
  const [visibleLines, setVisibleLines] = useState({
    views: true,
    likes: true,
    clicks: true,
    follows: true,
    watchTime: false,
  });

  if (!isOpen) return null;

  const chartData = generateMockChartData(timePeriod);
  
  // Calculate totals based on period
  const latestData = chartData[chartData.length - 1];
  const totalViews = latestData.views;
  const totalLikes = latestData.likes;
  const totalClicks = latestData.clicks;
  const totalFollows = latestData.follows;
  const totalWatchTime = latestData.watchTime; // in minutes
  const ctr = ((totalClicks / totalViews) * 100).toFixed(2);

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Chi tiết video</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Video Player and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Player */}
            <div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  src={video.thumbnail}
                  poster={video.thumbnail}
                  controls
                  className="w-full h-full object-contain"
                >
                  <source src={video.thumbnail} type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Tiêu đề</label>
                <p className="text-lg font-medium text-gray-900 mt-1">{video.title}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Ngày đăng</label>
                  <p className="text-gray-900 mt-1">{video.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Trạng thái</label>
                  <div className="mt-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${video.status.color}`}>
                      {video.status.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupons */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Coupon đang gắn</label>
                <div className="space-y-2">
                  {mockCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="border border-gray-200 rounded-lg p-3 hover:border-red-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{coupon.name}</h4>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            <span>Giá: {coupon.price}</span>
                            <span className="mx-2">•</span>
                            <span>HSD: {coupon.expiryDate}</span>
                          </div>
                          <div className="mt-1 text-sm">
                            <span className="text-gray-600">Còn lại: </span>
                            <span className="text-green-600 font-medium">{coupon.remaining}</span>
                            <span className="mx-2 text-gray-400">|</span>
                            <span className="text-gray-600">Lượt click: </span>
                            <span className="text-red-600 font-medium">{coupon.clicks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Time Period Filter */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold">Thống kê hiệu suất</h3>
            <div className="relative">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer bg-white"
              >
                <option value="7days">7 ngày qua</option>
                <option value="28days">28 ngày qua</option>
                <option value="all-time">Toàn thời gian</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Views */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-blue-700 mb-1">Lượt xem</div>
              <div className="text-2xl font-bold text-blue-900">{totalViews.toLocaleString()}</div>
              <div className="text-xs text-blue-600 mt-1">Video phát &gt; 3 giây</div>
            </div>

            {/* Likes */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
              <div className="text-sm text-pink-700 mb-1">Lượt thích</div>
              <div className="text-2xl font-bold text-pink-900">{totalLikes.toLocaleString()}</div>
              <div className="text-xs text-pink-600 mt-1">Tổng số tim nhận được</div>
            </div>

            {/* Click Coupon */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="text-sm text-green-700 mb-1">Click coupon</div>
              <div className="text-2xl font-bold text-green-900">{totalClicks.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">CTR: {ctr}%</div>
            </div>

            {/* Follows */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="text-sm text-purple-700 mb-1">Follow shop</div>
              <div className="text-2xl font-bold text-purple-900">{totalFollows.toLocaleString()}</div>
              <div className="text-xs text-purple-600 mt-1">Từ video này</div>
            </div>

            {/* Watch Time */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <div className="text-sm text-orange-700 mb-1">Thời gian xem</div>
              <div className="text-2xl font-bold text-orange-900">
                {Math.floor(totalWatchTime / 60)}:{(totalWatchTime % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-orange-600 mt-1">Tổng tất cả user</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-semibold mb-4">Biểu đồ diễn biến</h4>
            
            {/* Legend with toggles */}
            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={() => toggleLine('views')}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  visibleLines.views ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Lượt xem
              </button>
              <button
                onClick={() => toggleLine('likes')}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  visibleLines.likes ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                Lượt thích
              </button>
              <button
                onClick={() => toggleLine('clicks')}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  visibleLines.clicks ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Click coupon
              </button>
              <button
                onClick={() => toggleLine('follows')}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  visibleLines.follows ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                Follow shop
              </button>
              <button
                onClick={() => toggleLine('watchTime')}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  visibleLines.watchTime ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                Thời gian xem
              </button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                {visibleLines.views && <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="Lượt xem" />}
                {visibleLines.likes && <Line type="monotone" dataKey="likes" stroke="#ec4899" strokeWidth={2} name="Lượt thích" />}
                {visibleLines.clicks && <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} name="Click coupon" />}
                {visibleLines.follows && <Line type="monotone" dataKey="follows" stroke="#8b5cf6" strokeWidth={2} name="Follow shop" />}
                {visibleLines.watchTime && <Line type="monotone" dataKey="watchTime" stroke="#f59e0b" strokeWidth={2} name="Thời gian xem (phút)" />}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Coupon Performance Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h4 className="font-semibold">Hiệu quả bán hàng theo Coupon</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tên Coupon</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Mã Coupon</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Giá trị đơn</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Hạn sử dụng</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Còn lại</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Số lượt click</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockCoupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{coupon.name}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono">{coupon.id}</td>
                      <td className="px-6 py-4 text-gray-600">{coupon.price}</td>
                      <td className="px-6 py-4 text-gray-600">{coupon.expiryDate}</td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-medium">{coupon.remaining}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-red-600 font-medium">{coupon.clicks}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}