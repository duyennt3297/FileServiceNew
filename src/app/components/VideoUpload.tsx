import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { X, Upload, ChevronDown, Search, ChevronRight } from 'lucide-react';

interface VideoUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (videoData: VideoFormData) => void;
  isTransitioning?: boolean;
}

export interface VideoFormData {
  video: File | null;
  title: string;
  description: string;
  coupons: Coupon[];
  status: 'draft' | 'pending';
}

interface Coupon {
  id: string;
  name: string;
  price: string;
  expiryDate: string;
  remainingQuantity: number;
  thumbnail: string;
}

// Mock coupon data - Đang phát hành
const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: 'Giảm 30% bộ sưu tập mùa...',
    price: '15.000đ',
    expiryDate: '05/01/2026 - 11/01/2026',
    remainingQuantity: 50,
    thumbnail: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Giảm 30% bộ sưu tập mùa...',
    price: '15.000đ',
    expiryDate: '05/01/2026 - 11/01/2026',
    remainingQuantity: 30,
    thumbnail: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Giảm 30% bộ sưu tập mùa...',
    price: '15.000đ',
    expiryDate: '05/01/2026 - 11/01/2026',
    remainingQuantity: 100,
    thumbnail: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=100&h=100&fit=crop',
  },
];

export function VideoUpload({ isOpen, onClose, onSubmit, isTransitioning }: VideoUploadProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    video: null,
    title: '',
    description: '',
    coupons: [],
    status: 'pending',
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [couponSearchQuery, setCouponSearchQuery] = useState('');
  const [hasPermission] = useState(true); // Mock permission check
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const couponDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (couponDropdownRef.current && !couponDropdownRef.current.contains(event.target as Node)) {
        setShowCouponDropdown(false);
      }
    };

    if (showCouponDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCouponDropdown]);

  if (!isOpen) return null;

  // Access control check (mock)
  if (!hasPermission) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-2 text-[#101828]">Không có quyền truy cập</h3>
          <p className="text-[#667085] mb-6">Bạn không có quyền đăng video</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#F24141] text-white rounded-lg hover:opacity-90"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const validateVideo = (file: File): string | null => {
    const validFormats = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!validFormats.includes(file.type)) {
      return 'File không hợp lệ. Vui lòng chọn MP4/MOV/AVI dưới 500MB';
    }

    if (file.size > maxSize) {
      return 'File không hợp lệ. Vui lòng chọn MP4/MOV/AVI dưới 500MB';
    }

    return null;
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Event: upload_video_start', { fileName: file.name, size: file.size });

    const error = validateVideo(file);
    if (error) {
      setErrors({ ...errors, video: error });
      return;
    }

    // Clear error
    const newErrors = { ...errors };
    delete newErrors.video;
    setErrors(newErrors);

    // Create video element to check duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      
      if (duration < 10 || duration > 600) {
        setErrors({ ...errors, video: 'File không hợp lệ. Vui lòng chọn MP4/MOV/AVI dưới 500MB' });
        return;
      }

      // Simulate upload progress
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setFormData({ ...formData, video: file });
          setVideoPreview(URL.createObjectURL(file));
          console.log('Event: upload_video_success', { fileName: file.name });
        }
      }, 200);
    };
    video.src = URL.createObjectURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as any;
      handleVideoChange(fakeEvent);
    }
  };

  const insertHashtag = () => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.description;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newText = before + '#' + after;
    setFormData({ ...formData, description: newText });
    
    // Set cursor position after hashtag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  const handleOpenCouponModal = () => {
    console.log('Event: open_coupon_selector');
    setSelectedCouponsTemp([...formData.coupons]);
    setShowCouponModal(true);
  };

  const handleConfirmCoupons = () => {
    console.log('Event: attach_coupon', { couponIds: selectedCouponsTemp.map(c => c.id) });
    setFormData({ ...formData, coupons: selectedCouponsTemp });
    setShowCouponModal(false);
    setCouponSearchQuery('');
  };

  const handleCancelCoupons = () => {
    setShowCouponModal(false);
    setCouponSearchQuery('');
  };

  const toggleCoupon = (coupon: Coupon) => {
    const isSelected = formData.coupons.some(c => c.id === coupon.id);
    if (isSelected) {
      setFormData({
        ...formData,
        coupons: formData.coupons.filter(c => c.id !== coupon.id)
      });
    } else {
      setFormData({
        ...formData,
        coupons: [...formData.coupons, coupon]
      });
    }
    console.log('Event: toggle_coupon', { couponId: coupon.id, isSelected: !isSelected });
  };

  const removeCoupon = (couponId: string) => {
    setFormData({
      ...formData,
      coupons: formData.coupons.filter(c => c.id !== couponId)
    });
  };

  const clearAllCoupons = () => {
    setFormData({
      ...formData,
      coupons: []
    });
  };

  const filteredCoupons = mockCoupons.filter(coupon =>
    coupon.name.toLowerCase().includes(couponSearchQuery.toLowerCase()) ||
    coupon.id.toLowerCase().includes(couponSearchQuery.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.video) {
      newErrors.video = 'Vui lòng tải lên video';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề video';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log('Event: submit_video', { 
      title: formData.title, 
      coupons: formData.coupons.length,
      status: formData.status
    });

    onSubmit(formData);
    handleReset();
    onClose();
  };

  const handleCancel = () => {
    console.log('Event: click_cancel_upload');
    // Check if form has data
    if (formData.video || formData.title || formData.description || formData.coupons.length > 0) {
      setShowCancelModal(true);
    } else {
      onClose();
    }
  };

  const handleSaveDraft = () => {
    console.log('Event: save_draft', { title: formData.title });
    formData.status = 'draft';
    onSubmit(formData);
    setShowCancelModal(false);
    handleReset();
    onClose();
    // Show toast: "Đã lưu bản nháp"
  };

  const handleDiscardPost = () => {
    console.log('Event: discard_post');
    setShowCancelModal(false);
    handleReset();
    onClose();
  };

  const handleContinueEditing = () => {
    setShowCancelModal(false);
  };

  const handleReset = () => {
    setFormData({
      video: null,
      title: '',
      description: '',
      coupons: [],
      status: 'pending',
    });
    setUploadProgress(0);
    setIsUploading(false);
    setErrors({});
    setVideoPreview('');
    setCouponSearchQuery('');
  };

  return (
    <>
      {/* Main Upload Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[16px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] w-full max-w-[476px] max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="relative p-6 pb-4">
            <h2 className="text-[20px] font-bold leading-[30px] text-[#101828]">Đăng video mới</h2>
            <button
              onClick={handleCancel}
              className="absolute right-4 top-4 p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
            >
              <X className="w-6 h-6 text-[#344054]" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
            {/* Upload Video */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14px] leading-[20px] text-[#101828]">
                  Video <span className="text-[#F04438] font-medium">*</span>
                </label>
              </div>

              {!formData.video ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border border-dashed rounded-[12px] p-4 text-center cursor-pointer transition-colors ${
                    errors.video ? 'border-[#F04438]' : 'border-[#D0D5DD] hover:border-[#98A2B3]'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-[#101828]" />
                    <p className="text-[14px] font-semibold leading-[20px] text-[#101828]">
                      Tải hoặc kéo thả video
                    </p>
                    <p className="text-[12px] leading-[18px] text-[#667085]">
                      Hỗ trợ file: .mp4, .mov, .avi. Tối đa 500MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/x-msvideo"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-[#D0D5DD] rounded-[12px] p-3">
                  <div className="flex items-center gap-3">
                    <video
                      src={videoPreview}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#101828] truncate">{formData.video.name}</p>
                      <p className="text-xs text-[#667085] mt-0.5">
                        {(formData.video.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, video: null });
                        setVideoPreview('');
                        setUploadProgress(0);
                      }}
                      className="text-[#667085] hover:text-[#344054]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#667085]">Đang tải lên...</span>
                    <span className="text-[#101828] font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-[#F2F4F7] rounded-full h-1.5">
                    <div
                      className="bg-[#F24141] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {errors.video && (
                <p className="text-[12px] text-[#F04438] mt-1">{errors.video}</p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[14px] leading-[20px] text-[#101828]">
                Tiêu đề <span className="text-[#F04438] font-medium">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={100}
                className={`w-full px-3 py-1.5 border rounded-[8px] text-[14px] focus:outline-none focus:border-[#98A2B3] ${
                  errors.title ? 'border-[#F04438]' : 'border-[#D0D5DD]'
                }`}
                placeholder=""
              />
              <div className="flex justify-between items-center">
                {errors.title && <p className="text-[12px] text-[#F04438]">{errors.title}</p>}
                <span className="text-[14px] text-[#667085] ml-auto">{formData.title.length}/100</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[14px] leading-[20px] text-[#101828]">Mô tả</label>
                <span className="text-[14px] text-[#667085]">0/255</span>
              </div>
              <div className="relative">
                <textarea
                  ref={descriptionRef}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={255}
                  rows={5}
                  placeholder="Nhập nội dung..."
                  className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] text-[#667085] focus:outline-none focus:border-[#98A2B3] resize-none"
                />
                <button
                  type="button"
                  onClick={insertHashtag}
                  className="absolute bottom-2.5 right-3.5 px-3 py-0.5 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-[10px] text-[12px] text-[#364153] transition-colors flex items-center gap-1"
                >
                  <span className="text-[#364153]">#</span>
                  Hashtag
                </button>
              </div>
            </div>

            {/* Gắn Coupon */}
            <div className="space-y-1.5">
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-[14px] leading-[20px] text-[#101828]\">Gắn Coupon</label>
                  <p className="text-[12px] text-[#667085] mt-0.5">
                    Chọn một hoặc nhiều coupon để gắn vào video
                  </p>
                </div>
                {formData.coupons.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllCoupons}
                    className="text-[12px] text-[#F24141] hover:text-[#DC2626] font-medium"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Multi-select Dropdown */}
              <div className="relative" ref={couponDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                  className="w-full px-3 py-1.5 border border-[#D0D5DD] rounded-[8px] text-left flex items-center justify-between hover:border-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white transition-colors"
                >
                  {formData.coupons.length === 0 ? (
                    <span className="text-[14px] text-[#667085]\">Nhấn để thêm coupon</span>
                  ) : formData.coupons.length <= 3 ? (
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {formData.coupons.map((coupon) => (
                        <div
                          key={coupon.id}
                          className="bg-[#FEF2F2] border border-[#FCA5A5] rounded px-2 py-0.5 flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs text-[#101828] truncate max-w-[120px]">{coupon.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCoupon(coupon.id);
                            }}
                            className="text-[#F24141] hover:text-[#DC2626]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {formData.coupons.slice(0, 2).map((coupon) => (
                        <div
                          key={coupon.id}
                          className="bg-[#FEF2F2] border border-[#FCA5A5] rounded px-2 py-0.5 flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs text-[#101828] truncate max-w-[100px]">{coupon.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCoupon(coupon.id);
                            }}
                            className="text-[#F24141] hover:text-[#DC2626]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded px-2 py-0.5">
                        <span className="text-xs text-[#0369A1] font-medium">+{formData.coupons.length - 2}</span>
                      </div>
                    </div>
                  )}
                  <ChevronDown className={`w-5 h-5 text-[#667085] flex-shrink-0 ml-2 transition-transform ${showCouponDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showCouponDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-[#EAECF0] rounded-[12px] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)] max-h-80 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-2 border-b border-[#EAECF0]">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
                        <input
                          type="text"
                          value={couponSearchQuery}
                          onChange={(e) => setCouponSearchQuery(e.target.value)}
                          placeholder="Tìm kiếm coupon...."
                          className="w-full pl-8 pr-3 py-1.5 border border-[#D0D5DD] rounded-[8px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB]"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Coupon List */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredCoupons.length === 0 ? (
                        <div className="p-4 text-center">
                          <p className="text-[13px] text-[#667085]">Không tìm thấy coupon phù hợp</p>
                        </div>
                      ) : (
                        filteredCoupons.map((coupon) => {
                          const isSelected = formData.coupons.some(c => c.id === coupon.id);
                          
                          return (
                            <div
                              key={coupon.id}
                              onClick={() => toggleCoupon(coupon)}
                              className={`px-3 py-2 border-b border-[#F2F4F7] last:border-b-0 cursor-pointer transition-colors hover:bg-[#F9FAFB] ${
                                isSelected ? 'bg-[#FEF3F2]' : ''
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                {/* Checkbox */}
                                <div className="mt-0.5">
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                    isSelected ? 'bg-[#F24141] border-[#F24141]' : 'bg-white border-[#D1D5DB]'
                                  }`}>
                                    {isSelected && (
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </div>

                                {/* Thumbnail */}
                                <img
                                  src={coupon.thumbnail}
                                  alt={coupon.name}
                                  className="w-12 h-12 rounded-[8px] object-cover flex-shrink-0"
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-medium leading-[19.5px] text-[#101828] truncate">
                                    {coupon.name}
                                  </p>
                                  <p className="text-[12px] font-bold leading-[18px] text-[#F24141] mt-0.5">
                                    {coupon.price}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-[10px] leading-[15px] text-[#667085]">
                                      HSD: {coupon.expiryDate}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Actions */}
          <div className="px-6 pb-6 flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 border border-[#D0D5DD] rounded-[8px] text-[14px] font-medium text-[#101828] hover:bg-[#F9FAFB] transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUploading || !formData.video || !formData.title.trim()}
              className="px-4 py-2 bg-[#F24141] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đăng
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-[18px] font-semibold mb-2 text-[#101828]">
              Lưu bài đăng này dưới dạng bản nháp?
            </h3>
            <p className="text-[#667085] mb-6">
              Nếu bỏ bây giờ, bạn sẽ mất bài đăng này
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSaveDraft}
                className="w-full px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:opacity-90"
              >
                Lưu bản nháp
              </button>
              <button
                onClick={handleDiscardPost}
                className="w-full px-4 py-2 border border-[#F24141] text-[#F24141] rounded-lg hover:bg-[#FEF2F2]"
              >
                Bỏ bài đăng
              </button>
              <button
                onClick={handleContinueEditing}
                className="w-full px-4 py-2 border border-[#D0D5DD] text-[#101828] rounded-lg hover:bg-[#F9FAFB]"
              >
                Tiếp tục chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}