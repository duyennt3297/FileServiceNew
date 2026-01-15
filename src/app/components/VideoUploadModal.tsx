import { X, Upload, Hash, ChevronDown, Check, Search, Plus } from 'lucide-react';
import { useState, useRef, ChangeEvent, useEffect } from 'react';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (videoData: VideoFormData) => void;
}

export interface VideoFormData {
  video: File | null;
  title: string;
  description: string;
  coupons: Coupon[];
}

interface Coupon {
  id: string;
  name: string;
  code: string;
  merchantName: string;
  price: string;
  expiryDate: string;
  remainingQuantity: number;
  status: 'active' | 'expired';
}

// Mock coupon data
const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: 'Highlands Coffee 30%',
    code: 'HIGHLAND30',
    merchantName: 'Highlands Coffee',
    price: '50.000đ',
    expiryDate: '31/12/2026',
    remainingQuantity: 100,
    status: 'active',
  },
  {
    id: '2',
    name: 'Katinat Free Size Up',
    code: 'KATINAT2026',
    merchantName: 'Katinat Saigon Kafe',
    price: '30.000đ',
    expiryDate: '25/06/2026',
    remainingQuantity: 50,
    status: 'active',
  },
  {
    id: '3',
    name: 'Pizza 4P\'s - Giảm 100K',
    code: 'PIZZA100',
    merchantName: 'Pizza 4P\'s',
    price: '100.000đ',
    expiryDate: '15/12/2024',
    remainingQuantity: 0,
    status: 'expired',
  },
  {
    id: '4',
    name: 'Combo ưu đãi tháng 12',
    code: 'PHUCLONG12',
    merchantName: 'Phúc Long',
    price: '200.000đ',
    expiryDate: '31/03/2026',
    remainingQuantity: 25,
    status: 'active',
  },
  {
    id: '5',
    name: 'Gongcha Milk Foam',
    code: 'GONGCHA2026',
    merchantName: 'Gongcha Vietnam',
    price: '40.000đ',
    expiryDate: '20/08/2026',
    remainingQuantity: 75,
    status: 'active',
  },
  {
    id: '6',
    name: 'The Coffee House - Freeship',
    code: 'TCHFREESHIP',
    merchantName: 'The Coffee House',
    price: '25.000đ',
    expiryDate: '15/05/2026',
    remainingQuantity: 150,
    status: 'active',
  },
  {
    id: '7',
    name: 'Starbucks Giảm 50%',
    code: 'SBUX50',
    merchantName: 'Starbucks Vietnam',
    price: '80.000đ',
    expiryDate: '10/11/2024',
    remainingQuantity: 0,
    status: 'expired',
  },
  {
    id: '8',
    name: 'Lotteria Combo Burger',
    code: 'LOTTERIA2026',
    merchantName: 'Lotteria',
    price: '60.000đ',
    expiryDate: '30/07/2026',
    remainingQuantity: 200,
    status: 'active',
  },
];

export function VideoUploadModal({ isOpen, onClose, onSubmit }: VideoUploadModalProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    video: null,
    title: '',
    description: '',
    coupons: [],
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [couponSearchQuery, setCouponSearchQuery] = useState('');
  
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

  const validateVideo = (file: File): string | null => {
    const validFormats = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (!validFormats.includes(file.type)) {
      return 'Định dạng không hợp lệ. Vui lòng chọn file MP4, MOV hoặc AVI';
    }

    if (file.size > maxSize) {
      return 'File vượt quá 500MB. Vui lòng chọn file nhỏ hơn';
    }

    return null;
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setErrors({ ...errors, video: 'Video phải có thời lượng từ 10 giây đến 10 phút' });
        return;
      }

      setVideoDuration(duration);
      
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
    
    const newText = before + '#hashtag ' + after;
    setFormData({ ...formData, description: newText });
    
    // Set cursor position after hashtag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 9, start + 9);
    }, 0);
  };

  const toggleCoupon = (coupon: Coupon) => {
    if (coupon.status === 'expired') return;
    
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
  };

  const removeCoupon = (couponId: string) => {
    setFormData({
      ...formData,
      coupons: formData.coupons.filter(c => c.id !== couponId)
    });
    // Clear coupon error when user removes a coupon
    if (errors.coupons) {
      const newErrors = { ...errors };
      delete newErrors.coupons;
      setErrors(newErrors);
    }
  };

  const clearAllCoupons = () => {
    setFormData({
      ...formData,
      coupons: []
    });
  };

  const filteredCoupons = mockCoupons.filter(coupon =>
    coupon.name.toLowerCase().includes(couponSearchQuery.toLowerCase()) ||
    coupon.code.toLowerCase().includes(couponSearchQuery.toLowerCase()) ||
    coupon.merchantName.toLowerCase().includes(couponSearchQuery.toLowerCase())
  );

  const availableCoupons = mockCoupons.filter(c => c.status === 'active');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.video) {
      newErrors.video = 'Vui lòng tải lên video';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Vui lòng nhập tiêu đề video';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Tiêu đề không được vượt quá 100 ký tự';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      video: null,
      title: '',
      description: '',
      coupons: [],
    });
    setUploadProgress(0);
    setIsUploading(false);
    setErrors({});
    setVideoPreview('');
    setVideoDuration(0);
    setCouponSearchQuery('');
    onClose();
  };

  const isFormValid = formData.video && formData.title.trim().length > 0 && !isUploading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Đăng video mới</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Upload Video Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video <span className="text-red-500">*</span>
            </label>
            
            {!formData.video ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  errors.video 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Tải lên video</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Định dạng: MP4, MOV, AVI | Tối đa 500MB | 10s – 10 phút | Tỷ lệ khuyến nghị: 16:9, 9:16
                    </p>
                  </div>
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
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <video
                    src={videoPreview}
                    className="w-32 h-20 object-cover rounded"
                    controls
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{formData.video.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(formData.video.size / (1024 * 1024)).toFixed(2)} MB • {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, '0')}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, video: null });
                      setVideoPreview('');
                      setVideoDuration(0);
                      setUploadProgress(0);
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Đang tải lên...</span>
                  <span className="text-gray-900 font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {errors.video && (
              <p className="mt-2 text-sm text-red-600">{errors.video}</p>
            )}
          </div>

          {/* 2. Video Information Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nhập tiêu đề video (tối đa 100 ký tự)"
              maxLength={100}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.title ? (
                <p className="text-sm text-red-600">{errors.title}</p>
              ) : (
                <span></span>
              )}
              <span className="text-sm text-gray-500">{formData.title.length}/100</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <div className="relative">
              <textarea
                ref={descriptionRef}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Nhập mô tả video (tối đa 500 ký tự)"
                maxLength={500}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={insertHashtag}
                className="absolute bottom-3 right-3 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1 text-sm text-gray-700 transition-colors"
              >
                <Hash className="w-4 h-4" />
                Hashtag
              </button>
            </div>
            <div className="flex items-center justify-between mt-1">
              {errors.description ? (
                <p className="text-sm text-red-600">{errors.description}</p>
              ) : (
                <span></span>
              )}
              <span className="text-sm text-gray-500">{formData.description.length}/500</span>
            </div>
          </div>

          {/* 3. Coupon Attachment Section */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <label className="block text-sm font-medium text-[#344054]">
                  Coupon đính kèm
                </label>
                <p className="text-sm text-[#667085] mt-0.5">
                  Chọn một hoặc nhiều coupon để gắn vào video
                </p>
              </div>
              {formData.coupons.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllCoupons}
                  className="text-sm text-[#EF4444] hover:text-[#DC2626] font-medium"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {availableCoupons.length === 0 ? (
              <div className="border border-[#EAECF0] rounded-[12px] p-4 text-center bg-[#F9FAFB]">
                <p className="text-[#667085]">Bạn chưa có Coupon nào đang phát hành</p>
                <button className="mt-2 text-[#EF4444] hover:text-[#DC2626] font-medium flex items-center gap-1 mx-auto">
                  <Plus className="w-4 h-4" />
                  Tạo Coupon ngay
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Multi-select Dropdown Input */}
                <div className="relative" ref={couponDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCouponDropdown(!showCouponDropdown)}
                    className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-left flex items-center justify-between hover:border-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] bg-white transition-colors"
                  >
                    {formData.coupons.length === 0 ? (
                      <span className="text-[#667085]">Nhấn để thêm coupon</span>
                    ) : formData.coupons.length <= 5 ? (
                      <div className="flex flex-wrap gap-2 flex-1">
                        {formData.coupons.map((coupon) => (
                          <div
                            key={coupon.id}
                            className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[6px] px-2 py-1 flex items-center gap-1.5 group"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <span className="text-sm text-[#344054]">{coupon.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCoupon(coupon.id);
                              }}
                              className="text-[#667085] hover:text-[#EF4444] transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 flex-1">
                        {formData.coupons.slice(0, 3).map((coupon) => (
                          <div
                            key={coupon.id}
                            className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[6px] px-2 py-1 flex items-center gap-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <span className="text-sm text-[#344054]">{coupon.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCoupon(coupon.id);
                              }}
                              className="text-[#667085] hover:text-[#EF4444] transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-[6px] px-2 py-1">
                          <span className="text-sm text-[#0369A1] font-medium">+{formData.coupons.length - 3} coupon</span>
                        </div>
                      </div>
                    )}
                    <ChevronDown className={`w-5 h-5 text-[#667085] flex-shrink-0 ml-2 transition-transform ${showCouponDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCouponDropdown && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-[#EAECF0] rounded-[12px] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08)] max-h-96 overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-[#EAECF0]">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
                          <input
                            type="text"
                            value={couponSearchQuery}
                            onChange={(e) => setCouponSearchQuery(e.target.value)}
                            placeholder="Nhập tên coupon / merchant"
                            className="w-full pl-9 pr-4 py-2 border border-[#D0D5DD] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Coupon List */}
                      <div className="max-h-72 overflow-y-auto">
                        {filteredCoupons.length === 0 ? (
                          <div className="p-6 text-center">
                            <p className="text-[#667085]">Không tìm thấy coupon phù hợp</p>
                          </div>
                        ) : (
                          filteredCoupons.map((coupon) => {
                            const isSelected = formData.coupons.some(c => c.id === coupon.id);
                            const isDisabled = coupon.status === 'expired';

                            return (
                              <div
                                key={coupon.id}
                                onClick={() => !isDisabled && toggleCoupon(coupon)}
                                className={`px-4 py-3 border-b border-[#F2F4F7] last:border-b-0 cursor-pointer transition-colors ${
                                  isDisabled ? 'opacity-50 cursor-not-allowed bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'
                                } ${isSelected && !isDisabled ? 'bg-[#FEF3F2]' : ''}`}
                              >
                                <div className="flex items-start gap-3">
                                  {/* Checkbox */}
                                  <div className="mt-0.5">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      disabled={isDisabled}
                                      onChange={() => {}}
                                      className="w-4 h-4 rounded border-[#D0D5DD] text-[#EF4444] focus:ring-[#EF4444]"
                                      style={{ accentColor: '#EF4444' }}
                                    />
                                  </div>

                                  {/* Coupon Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-[#101828] text-sm">{coupon.name}</h4>
                                        <p className="text-sm text-[#667085] mt-0.5">{coupon.merchantName}</p>
                                      </div>
                                      {isDisabled ? (
                                        <span className="px-2 py-0.5 bg-[#FEF3F2] text-[#B42318] text-xs rounded-full font-medium flex-shrink-0">
                                          Hết hạn
                                        </span>
                                      ) : (
                                        <span className="px-2 py-0.5 bg-[#ECFDF3] text-[#027A48] text-xs rounded-full font-medium flex-shrink-0">
                                          Đang bán
                                        </span>
                                      )}
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-3 text-xs text-[#667085]">
                                      <span className="font-medium text-[#101828]">{coupon.price}</span>
                                      <span>HSD: {coupon.expiryDate}</span>
                                      <span>Còn {coupon.remainingQuantity}</span>
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

                {errors.coupons && (
                  <p className="text-sm text-[#EF4444] mt-1">{errors.coupons}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4. Actions Section (Sticky Bottom) */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isFormValid
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Đăng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}