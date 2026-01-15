import { Eye, Copy, Pencil, ChevronDown, ChevronUp, Calendar, Search, ChevronRight, ChevronLeft, Plus, Trash2, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { VideoDetailModal } from './VideoDetailModal';
import { VideoDetail } from './VideoDetail';

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  status: {
    label: string;
    color: string;
    bgColor: string;
    value: string;
  };
  metrics: {
    value1: number;
    value2: number;
    value3: number | string;
    value4: number;
    value5: number;
  };
  date: string;
  userAvatar?: string;
}

const mockVideos: Video[] = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1644370644949-b175294cbceb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY291cG9uJTIwZGVhbHxlbnwxfHx8fDE3NjgyOTQyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Đã đăng', color: '#027948', bgColor: '#D1FADF', value: 'published' },
    metrics: { value1: 15, value2: 30, value3: '20.1k', value4: 155, value5: 50 },
    date: '01/12/2025 16:39',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbWVhbHxlbnwxfHx8fDE3NjgyNDQ5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 11',
    status: { label: 'Đã đăng', color: '#027948', bgColor: '#D1FADF', value: 'published' },
    metrics: { value1: 1565, value2: 3000, value3: '20.1M', value4: 15000, value5: 5000 },
    date: '01/11/2025 16:39',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGRpc2NvdW50fGVufDF8fHx8MTc2ODE4NDg3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 10',
    status: { label: 'Đã ẩn', color: '#667085', bgColor: '#F3F4F6', value: 'hidden' },
    metrics: { value1: 15, value2: 30, value3: 2910, value4: 15, value5: 5 },
    date: '01/10/2025 16:50',
  },
  {
    id: 4,
    thumbnail: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmlua3xlbnwxfHx8fDE3NjgyODI3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 10, đeoi NOT nhỡ vẫn ...',
    status: { label: 'Vi phạm', color: '#D92D20', bgColor: '#FEE4E2', value: 'violation' },
    metrics: { value1: 2, value2: 0, value3: 100, value4: 1, value5: 5 },
    date: '01/10/2025 16:39',
  },
  {
    id: 5,
    thumbnail: 'https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzY4MjYyNDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 9',
    status: { label: 'Từ chối', color: '#C4320A', bgColor: '#FFF6ED', value: 'rejected' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/09/2025 16:39',
  },
  {
    id: 6,
    thumbnail: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NjgyMzYzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Chờ duyệt', color: '#A65F00', bgColor: '#FEF9C2', value: 'pending' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/12/2025 16:30',
  },
  {
    id: 7,
    thumbnail: 'https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjgyMjYyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Chờ duyệt', color: '#A65F00', bgColor: '#FEF9C2', value: 'pending' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/12/2025 16:30',
  },
  {
    id: 8,
    thumbnail: 'https://images.unsplash.com/photo-1730325559618-940c72290ef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlfGVufDF8fHx8MTc2ODE5MjEwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Chờ duyệt', color: '#A65F00', bgColor: '#FEF9C2', value: 'pending' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/12/2025 16:30',
  },
  {
    id: 9,
    thumbnail: 'https://images.unsplash.com/photo-1739138056344-3c852f4efc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZSUyMGp1aWNlfGVufDF8fHx8MTc2ODI5NDI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Chờ duyệt', color: '#A65F00', bgColor: '#FEF9C2', value: 'pending' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/12/2025 16:30',
  },
  {
    id: 10,
    thumbnail: 'https://images.unsplash.com/photo-1753541152133-0972eef71b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG5vb2RsZXN8ZW58MXx8fHwxNzY4MjcwODU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Combo xu đặc biệt tháng 12',
    status: { label: 'Nháp', color: '#175CD3', bgColor: '#EFF8FF', value: 'draft' },
    metrics: { value1: 0, value2: 0, value3: 0, value4: 0, value5: 0 },
    date: '01/12/2025 16:30',
  },
];

interface VideoTableProps {
  onUploadClick: () => void;
  onCommentsClick?: (videoId: number) => void;
}

export function VideoTable({ onUploadClick, onCommentsClick }: VideoTableProps) {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDanger?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if all selected videos have the same status
  const getSelectedVideosStatus = () => {
    const selectedVideos = videos.filter(v => selectedRows.includes(v.id));
    if (selectedVideos.length === 0) return null;
    
    const allPublished = selectedVideos.every(v => v.status.value === 'published');
    const allHidden = selectedVideos.every(v => v.status.value === 'hidden');
    
    return { allPublished, allHidden };
  };

  const selectedStatus = getSelectedVideosStatus();

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === videos.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(videos.map(v => v.id));
    }
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  const handleOpenVideoDetail = (video: Video) => {
    setSelectedVideo(video);
    setIsTransitioning(true);
    // Trigger slide transition
    setTimeout(() => {
      setShowDetailPage(true);
    }, 50);
  };

  const handleCloseVideoDetail = () => {
    setIsTransitioning(false);
    setTimeout(() => {
      setShowDetailPage(false);
      setSelectedVideo(null);
    }, 200);
  };

  // Delete single video
  const handleDeleteSingleVideo = (video: Video) => {
    console.log('Event: delete_video_single', { videoId: video.id });
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận xóa',
      message: 'Bạn chắc chắn muốn xóa video?',
      confirmText: 'Xóa',
      onConfirm: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setVideos(prev => prev.filter(v => v.id !== video.id));
          setConfirmModal(null);
          setIsLoading(false);
          // Show toast
          console.log('Toast: Đã xóa video');
        }, 500);
      },
      onCancel: () => setConfirmModal(null),
      isDanger: true,
    });
  };

  // Delete batch videos
  const handleDeleteBatchVideos = () => {
    console.log('Event: delete_video_batch', { videoIds: selectedRows });
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận xóa',
      message: 'Bạn chắc chắn muốn xóa các video đã chọn?',
      confirmText: 'Xóa',
      onConfirm: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setVideos(prev => prev.filter(v => !selectedRows.includes(v.id)));
          setSelectedRows([]);
          setConfirmModal(null);
          setIsLoading(false);
          // Show toast
          console.log('Toast: Đã xóa video');
        }, 500);
      },
      onCancel: () => setConfirmModal(null),
      isDanger: true,
    });
  };

  // Hide single video
  const handleHideSingleVideo = (video: Video) => {
    console.log('Event: hide_video_single', { videoId: video.id });
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận ẩn',
      message: 'Bạn chắc chắn muốn ẩn video?',
      confirmText: 'Ẩn',
      onConfirm: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setVideos(prev =>
            prev.map(v =>
              v.id === video.id
                ? { ...v, status: { label: 'Đã ẩn', color: '#667085', bgColor: '#F3F4F6', value: 'hidden' } }
                : v
            )
          );
          setConfirmModal(null);
          setIsLoading(false);
          // Show toast
          console.log('Toast: Đã ẩn video');
        }, 500);
      },
      onCancel: () => setConfirmModal(null),
      isDanger: true,
    });
  };

  // Hide batch videos
  const handleHideBatchVideos = () => {
    console.log('Event: hide_video_batch', { videoIds: selectedRows });
    setConfirmModal({
      isOpen: true,
      title: 'Xác nhận ẩn',
      message: 'Bạn chắc chắn muốn ẩn các video đã chọn?',
      confirmText: 'Ẩn',
      onConfirm: () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setVideos(prev =>
            prev.map(v =>
              selectedRows.includes(v.id)
                ? { ...v, status: { label: 'Đã ẩn', color: '#667085', bgColor: '#F3F4F6', value: 'hidden' } }
                : v
            )
          );
          setSelectedRows([]);
          setConfirmModal(null);
          setIsLoading(false);
          // Show toast
          console.log('Toast: Đã ẩn video');
        }, 500);
      },
      onCancel: () => setConfirmModal(null),
      isDanger: true,
    });
  };

  // Show single video
  const handleShowSingleVideo = (video: Video) => {
    console.log('Event: show_video_single', { videoId: video.id });
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVideos(prev =>
        prev.map(v =>
          v.id === video.id
            ? { ...v, status: { label: 'Đã đăng', color: '#027948', bgColor: '#D1FADF', value: 'published' } }
            : v
        )
      );
      setIsLoading(false);
      // Show toast
      console.log('Toast: Video đã được hiển thị');
    }, 500);
  };

  // Show batch videos
  const handleShowBatchVideos = () => {
    console.log('Event: show_video_batch', { videoIds: selectedRows });
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVideos(prev =>
        prev.map(v =>
          selectedRows.includes(v.id)
            ? { ...v, status: { label: 'Đã đăng', color: '#027948', bgColor: '#D1FADF', value: 'published' } }
            : v
        )
      );
      setSelectedRows([]);
      setIsLoading(false);
      // Show toast
      console.log('Toast: Video đã được hiển thị');
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        <span className="text-[#667085]">Trang chủ</span>
        <ChevronRight className="w-4 h-4 text-[#D0D5DD]" />
        <span className="text-[#667085]">Nội dung</span>
        <ChevronRight className="w-4 h-4 text-[#D0D5DD]" />
        <span className="text-[#101828]">Video</span>
      </div>

      {/* Title & Upload Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-[#101828] text-[20px] font-semibold leading-[30px]">
          Video
        </h1>
        <button
          onClick={onUploadClick}
          className="bg-[#E50914] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Đăng video</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white">
        {/* Action Bar - only show when videos are selected */}
        {selectedRows.length > 0 && (
          <div className="bg-white border border-[#D0D5DD] rounded-lg p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[#101828] text-sm">Đã chọn: {selectedRows.length}</p>
              <button
                onClick={clearSelection}
                className="text-[#F27272] text-sm hover:underline"
              >
                Bỏ chọn
              </button>
            </div>
            <div className="flex items-center gap-2">
              {/* Show "Ẩn" button only if all selected are "Đã đăng" */}
              {selectedStatus?.allPublished && (
                <button
                  onClick={handleHideBatchVideos}
                  disabled={isLoading}
                  className="h-[36px] px-3 border border-[#F24141] rounded-lg text-[#F24141] text-sm font-medium hover:bg-[#FEF2F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ẩn
                </button>
              )}
              {/* Show "Hiện" button only if all selected are "Đã ẩn" */}
              {selectedStatus?.allHidden && (
                <button
                  onClick={handleShowBatchVideos}
                  disabled={isLoading}
                  className="h-[36px] px-3 border border-[#F24141] rounded-lg text-[#F24141] text-sm font-medium hover:bg-[#FEF2F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hiện
                </button>
              )}
              {/* Always show "Xóa" button when videos are selected */}
              <button
                onClick={handleDeleteBatchVideos}
                disabled={isLoading}
                className="h-[36px] px-3 border border-[#F24141] rounded-lg text-[#F24141] text-sm font-medium hover:bg-[#FEF2F2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-[#D0D5DD] rounded-lg px-3 py-1.5 pr-10 text-[#667085] text-sm cursor-pointer hover:border-[#98A2B3] focus:outline-none focus:border-[#98A2B3]"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã đăng</option>
                <option value="hidden">Đã ẩn</option>
                <option value="pending">Chờ duyệt</option>
                <option value="violation">Vi phạm</option>
                <option value="draft">Nháp</option>
              </select>
              <ChevronDown className="w-5 h-5 text-[#344054] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Date Picker */}
            <div className="relative w-[145px]">
              <input
                type="text"
                placeholder="Ngày đăng"
                className="w-full px-3 py-1.5 pr-10 bg-white border border-[#D0D5DD] rounded-lg text-[#667085] text-sm focus:outline-none focus:border-[#98A2B3]"
              />
              <Calendar className="w-5 h-5 text-[#101828] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Title Search */}
            <div className="relative w-[400px]">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-white border border-[#D0D5DD] rounded-lg text-[#667085] text-sm focus:outline-none focus:border-[#98A2B3]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-px h-6 bg-[#D0D5DD]" />
                <Search className="w-5 h-5 text-[#344054]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort By */}
            <div className="relative">
              <select className="appearance-none bg-white border border-[#D0D5DD] rounded-lg px-3 py-1.5 pr-10 text-[#667085] text-sm cursor-pointer hover:border-[#98A2B3] focus:outline-none focus:border-[#98A2B3]">
                <option>Sắp xếp theo</option>
                <option>Ngày đăng</option>
                <option>Tiêu đề</option>
                <option>Lượt xem</option>
              </select>
              <ChevronDown className="w-5 h-5 text-[#344054] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Direction */}
            <div className="relative">
              <select className="appearance-none bg-white border border-[#D0D5DD] rounded-lg px-3 py-1.5 pr-10 text-[#667085] text-sm cursor-pointer hover:border-[#98A2B3] focus:outline-none focus:border-[#98A2B3]">
                <option>Chiều sắp xếp</option>
                <option>Tăng dần</option>
                <option>Giảm dần</option>
              </select>
              <ChevronDown className="w-5 h-5 text-[#344054] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#D0D5DD] overflow-hidden relative pb-14">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b border-[#D0D5DD]">
                <th className="px-4 py-2.5 w-[50px]">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === videos.length && videos.length > 0}
                    onChange={toggleAll}
                    className="rounded border-[#D0D5DD] text-[#D0D5DD] focus:ring-0 focus:ring-offset-0"
                  />
                </th>
                <th className="px-4 py-2.5 text-center text-[#101828] text-sm font-medium w-[50px]">STT</th>
                <th className="px-4 py-2.5 text-center text-[#101828] text-sm font-medium w-[117px]">Video</th>
                <th className="px-4 py-2.5 text-left text-[#101828] text-sm font-medium">Tiêu đề</th>
                <th className="px-4 py-2.5 text-center text-[#101828] text-sm font-medium">Trạng thái</th>
                <th className="px-4 py-2.5 text-right text-[#101828] text-sm font-medium">Chỉ số</th>
                <th className="px-4 py-2.5 text-right text-[#101828] text-sm font-medium">Click coupon</th>
                <th className="px-4 py-2.5 text-right text-[#101828] text-sm font-medium">Lượt xem</th>
                <th className="px-4 py-2.5 text-right text-[#101828] text-sm font-medium">Lượt thích</th>
                <th className="px-4 py-2.5 text-right text-[#101828] text-sm font-medium">Bình luận</th>
                <th className="px-4 py-2.5 text-center text-[#101828] text-sm font-medium">Ngày đăng</th>
                <th className="px-4 py-2.5 text-center text-[#101828] text-sm font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => (
                <tr 
                  key={video.id} 
                  className={index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}
                >
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(video.id)}
                        onChange={() => toggleRow(video.id)}
                        className="rounded border-[#D0D5DD] text-[#D0D5DD] focus:ring-0 focus:ring-offset-0"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-[#101828] text-sm">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <img
                        src={video.thumbnail}
                        alt="Video thumbnail"
                        className="w-[70px] h-14 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleOpenVideoDetail(video)}
                      />
                    </div>
                  </td>
                  <td 
                    className="px-4 py-4 text-[#101828] text-sm cursor-pointer hover:text-[#E50914] transition-colors"
                    onClick={() => handleOpenVideoDetail(video)}
                  >
                    {video.title}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <span
                        className="px-2 py-0.5 rounded-2xl text-xs font-medium inline-block"
                        style={{
                          backgroundColor: video.status.bgColor,
                          color: video.status.color,
                        }}
                      >
                        {video.status.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-[#101828] text-sm">
                    {video.metrics.value1}
                  </td>
                  <td className="px-4 py-4 text-right text-[#101828] text-sm">
                    {video.metrics.value2}
                  </td>
                  <td className="px-4 py-4 text-right text-[#101828] text-sm">
                    {video.metrics.value3}
                  </td>
                  <td className="px-4 py-4 text-right text-[#101828] text-sm">
                    {video.metrics.value4}
                  </td>
                  <td 
                    className="px-4 py-4 text-right text-[#101828] text-sm cursor-pointer hover:text-[#E50914] transition-colors"
                    onClick={() => onCommentsClick?.(video.id)}
                    title="Xem bình luận"
                  >
                    {video.metrics.value5}
                  </td>
                  <td className="px-4 py-4 text-center text-[#667085] text-sm whitespace-nowrap">
                    {video.date}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Show Eye icon for published videos, EyeOff for hidden videos */}
                      {video.status.value === 'published' ? (
                        <button
                          className="p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
                          title="Ẩn"
                          onClick={() => handleHideSingleVideo(video)}
                        >
                          <Eye className="w-4 h-4 text-[#667085]" />
                        </button>
                      ) : video.status.value === 'hidden' ? (
                        <button
                          className="p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
                          title="Hiện"
                          onClick={() => handleShowSingleVideo(video)}
                        >
                          <EyeOff className="w-4 h-4 text-[#667085]" />
                        </button>
                      ) : (
                        <div className="w-8 h-8" />
                      )}
                      <button
                        className="p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
                        title="Xóa"
                        onClick={() => handleDeleteSingleVideo(video)}
                      >
                        <Trash2 className="w-4 h-4 text-[#667085]" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="w-4 h-4 text-[#667085]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F2F4F7] px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="bg-white border border-[#D0D5DD] rounded-lg px-3.5 py-2 flex items-center gap-2 text-[#101828] text-sm hover:bg-[#F9FAFB] transition-colors">
              <span className="font-medium">10</span>
              <span>/</span>
              <span>Trang</span>
              <ChevronUp className="w-4 h-4" />
            </button>
            <p className="text-[#101828] text-sm">Tổng số bản ghi: 915</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-white border border-[#D0D5DD] rounded-[18px] p-2 hover:bg-[#F9FAFB] transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#344054]" />
            </button>

            <div className="flex items-center gap-0.5">
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium hover:bg-[#F9FAFB] transition-colors">
                1
              </button>
              <button className="w-10 h-10 rounded-[20px] bg-[#F24141] flex items-center justify-center text-white text-sm font-medium">
                2
              </button>
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium hover:bg-[#F9FAFB] transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium">
                ...
              </button>
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium hover:bg-[#F9FAFB] transition-colors">
                8
              </button>
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium hover:bg-[#F9FAFB] transition-colors">
                9
              </button>
              <button className="w-10 h-10 rounded-[20px] flex items-center justify-center text-[#667085] text-sm font-medium hover:bg-[#F9FAFB] transition-colors">
                10
              </button>
            </div>

            <button className="bg-white border border-[#D0D5DD] rounded-[18px] p-2 hover:bg-[#F9FAFB] transition-colors">
              <ChevronRight className="w-4 h-4 text-[#344054]" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && showDetailPage && (
        <VideoDetail
          videoId={selectedVideo.id}
          onClose={handleCloseVideoDetail}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
          isDanger={confirmModal.isDanger}
        />
      )}
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

function ConfirmModal({ isOpen, title, message, confirmText, onConfirm, onCancel, isDanger = true }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-2 text-[#101828]">{title}</h3>
        <p className="text-[#667085] mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-[#101828] hover:bg-[#F9FAFB] transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDanger
                ? 'bg-[#F24141] text-white hover:opacity-90 border border-[#F24141]'
                : 'bg-[#2563EB] text-white hover:opacity-90'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}