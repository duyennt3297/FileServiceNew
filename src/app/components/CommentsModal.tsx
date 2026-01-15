import { X, ChevronDown, Heart, Pin, Trash2, Edit2, MessageCircle, MoreVertical, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  isPinned: boolean;
  isOwn: boolean;
  hasReplied: boolean;
  replyCount: number;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  initialCommentCount: number;
  onCommentCountChange: (newCount: number) => void;
}

// Mock comments data
const generateMockComments = (): Comment[] => [
  {
    id: 1,
    userId: 101,
    userName: 'Nguyễn Văn A',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    content: 'Sản phẩm rất tốt, mình đã mua và rất hài lòng!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 15,
    isLiked: false,
    isPinned: true,
    isOwn: false,
    hasReplied: true,
    replyCount: 3,
  },
  {
    id: 2,
    userId: 102,
    userName: 'Trần Thị B',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Cho mình hỏi coupon này còn sử dụng được không ạ? Mình muốn mua nhưng không biết hết hạn chưa. Nếu còn thì mình sẽ đặt hàng ngay bây giờ.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 8,
    isLiked: true,
    isPinned: false,
    isOwn: false,
    hasReplied: false,
    replyCount: 0,
  },
  {
    id: 3,
    userId: 0,
    userName: 'Couppa Shop',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    content: 'Cảm ơn bạn đã ủng hộ shop! Chúc bạn mua sắm vui vẻ 😊',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 5,
    isLiked: false,
    isPinned: false,
    isOwn: true,
    hasReplied: false,
    replyCount: 0,
  },
  {
    id: 4,
    userId: 103,
    userName: 'Lê Minh C',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'Video hữu ích quá!',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 12,
    isLiked: false,
    isPinned: false,
    isOwn: false,
    hasReplied: true,
    replyCount: 1,
  },
  {
    id: 5,
    userId: 104,
    userName: 'Phạm Thị D',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Mình đã thử mua theo coupon này và tiết kiệm được nhiều lắm',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    likes: 20,
    isLiked: false,
    isPinned: false,
    isOwn: false,
    hasReplied: false,
    replyCount: 0,
  },
  {
    id: 6,
    userId: 105,
    userName: 'Hoàng Văn E',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Shop có ship tận nhà không?',
    timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    likes: 3,
    isLiked: false,
    isPinned: false,
    isOwn: false,
    hasReplied: true,
    replyCount: 2,
  },
];

const getRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    // TH1: Trong ngày (<24 giờ)
    return `${diffHours} giờ`;
  } else if (diffDays < 7) {
    // TH2: 1-7 ngày
    return `${diffDays} ngày`;
  } else if (diffDays < 30) {
    // TH3: 7-30 ngày
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} tuần`;
  } else {
    // TH4: >= 30 ngày
    return timestamp.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
};

export function CommentsModal({ 
  isOpen, 
  onClose, 
  videoTitle, 
  initialCommentCount,
  onCommentCountChange 
}: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>(generateMockComments());
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Remove the problematic useEffect that was causing infinite loop
  // useEffect(() => {
  //   onCommentCountChange(comments.length);
  // }, [comments.length, onCommentCountChange]);

  if (!isOpen) return null;

  const toggleCommentSelection = (id: number) => {
    setSelectedComments(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleAllComments = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(c => c.id));
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedComments(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleLike = (id: number) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  const handleReply = () => {
    if (!replyText.trim() || !replyingTo) return;

    // Add reply logic here
    setComments(prev => prev.map(c =>
      c.id === replyingTo ? { ...c, hasReplied: true, replyCount: c.replyCount + 1 } : c
    ));

    toast.success('Đã gửi phản hồi');
    setReplyText('');
    setReplyingTo(null);
  };

  const handleEdit = () => {
    if (!editText.trim() || editingComment === null) return;

    setComments(prev => prev.map(c =>
      c.id === editingComment ? { ...c, content: editText } : c
    ));

    toast.success('Đã chỉnh sửa bình luận');
    setEditText('');
    setEditingComment(null);
  };

  const handleDelete = (ids: number[]) => {
    setComments(prev => prev.filter(c => !ids.includes(c.id)));
    setSelectedComments([]);
    toast.success('Đã xóa bình luận');
  };

  const handlePin = (ids: number[]) => {
    const currentPinnedCount = comments.filter(c => c.isPinned).length;
    const newPinnedCount = currentPinnedCount + ids.filter(id => !comments.find(c => c.id === id)?.isPinned).length;

    if (newPinnedCount > 7) {
      toast.error('Mỗi video chỉ được ghim tối đa 7 bình luận');
      return;
    }

    setComments(prev => prev.map(c =>
      ids.includes(c.id) ? { ...c, isPinned: true } : c
    ));
    setSelectedComments([]);
    toast.success('Đã ghim bình luận');
  };

  const handleUnpin = (id: number) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, isPinned: false } : c
    ));
    toast.success('Đã bỏ ghim bình luận');
  };

  const toggleFilter = (value: string) => {
    if (value === 'all') {
      setFilterStatus([]);
    } else {
      setFilterStatus(prev =>
        prev.includes(value)
          ? prev.filter(f => f !== value)
          : [...prev, value]
      );
    }
  };

  const getFilterLabel = () => {
    if (filterStatus.length === 0) return 'Tất cả';
    if (filterStatus.length === 1) {
      return filterStatus[0] === 'replied' ? 'Đã phản hồi' : 'Chưa phản hồi';
    }
    return `${filterStatus.length} trạng thái`;
  };

  // Filter comments
  let filteredComments = comments;
  if (filterStatus.length > 0) {
    filteredComments = comments.filter(c => {
      if (filterStatus.includes('replied') && c.hasReplied) return true;
      if (filterStatus.includes('not-replied') && !c.hasReplied) return true;
      return false;
    });
  }

  // Sort comments
  const sortedComments = [...filteredComments].sort((a, b) => {
    // Pinned comments always first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by time
    if (sortBy === 'newest') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    } else {
      return a.timestamp.getTime() - b.timestamp.getTime();
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold">Bình luận</h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{videoTitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          {/* Filter by status */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <span className="text-gray-700">{getFilterLabel()}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48">
                <div className="p-2">
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterStatus.length === 0}
                      onChange={() => toggleFilter('all')}
                      className="rounded"
                    />
                    <span className="text-gray-700">Tất cả</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterStatus.includes('not-replied')}
                      onChange={() => toggleFilter('not-replied')}
                      className="rounded"
                    />
                    <span className="text-gray-700">Chưa phản hồi</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterStatus.includes('replied')}
                      onChange={() => toggleFilter('replied')}
                      className="rounded"
                    />
                    <span className="text-gray-700">Đã phản hồi</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-10 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer bg-white"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Total comments */}
          <div className="ml-auto text-sm text-gray-600">
            {sortedComments.length} bình luận
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedComments.length > 0 && (
          <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
            <span className="text-blue-700 font-medium">
              Đã chọn {selectedComments.length} bình luận
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => handlePin(selectedComments)}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Pin className="w-4 h-4" />
                Ghim
              </button>
              <button
                onClick={() => handleDelete(selectedComments)}
                className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sortedComments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Chưa có bình luận nào
            </div>
          ) : (
            sortedComments.map((comment) => {
              const isExpanded = expandedComments.includes(comment.id);
              const isEditing = editingComment === comment.id;
              const isReplying = replyingTo === comment.id;
              const shouldTruncate = comment.content.length > 100;

              return (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment.id)}
                      onChange={() => toggleCommentSelection(comment.id)}
                      className="rounded mt-1"
                    />

                    {/* Avatar */}
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{comment.userName}</span>
                            {comment.isPinned && (
                              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Pin className="w-3 h-3" />
                                Đã ghim
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{getRelativeTime(comment.timestamp)}</span>
                        </div>

                        {/* Actions Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === comment.id ? null : comment.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>

                          {activeDropdown === comment.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
                              <button
                                onClick={() => {
                                  if (comment.isPinned) {
                                    handleUnpin(comment.id);
                                  } else {
                                    handlePin([comment.id]);
                                  }
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Pin className="w-4 h-4" />
                                {comment.isPinned ? 'Bỏ ghim' : 'Ghim'}
                              </button>
                              {comment.isOwn && (
                                <button
                                  onClick={() => {
                                    setEditingComment(comment.id);
                                    setEditText(comment.content);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Chỉnh sửa
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  handleDelete([comment.id]);
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Comment Content */}
                      {isEditing ? (
                        <div className="mt-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value.slice(0, 500))}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{editText.length}/500</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingComment(null);
                                  setEditText('');
                                }}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={handleEdit}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                              >
                                Gửi
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2 text-gray-700">
                          {shouldTruncate && !isExpanded
                            ? comment.content.slice(0, 100) + '...'
                            : comment.content}
                          {shouldTruncate && !isExpanded && (
                            <button
                              onClick={() => toggleExpand(comment.id)}
                              className="text-red-600 hover:text-red-700 ml-1"
                            >
                              Xem thêm
                            </button>
                          )}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="mt-3 flex items-center gap-4">
                        <button
                          onClick={() => {
                            setReplyingTo(comment.id);
                            setReplyText('');
                          }}
                          className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Trả lời
                        </button>

                        {comment.replyCount > 0 && (
                          <span className="text-sm text-gray-500">
                            {comment.replyCount} phản hồi
                          </span>
                        )}

                        <button
                          onClick={() => handleLike(comment.id)}
                          className={`text-sm flex items-center gap-1 ${
                            comment.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                          {comment.likes}
                        </button>
                      </div>

                      {/* Reply Input */}
                      {isReplying && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value.slice(0, 500))}
                            placeholder="Nhập phản hồi của bạn..."
                            className="w-full border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{replyText.length}/500</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={handleReply}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                              >
                                <Send className="w-4 h-4" />
                                Gửi
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}