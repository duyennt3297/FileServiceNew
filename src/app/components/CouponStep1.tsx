import { useState, useRef } from 'react';
import { Check, Upload, X, Sparkles, Video, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ProgramType {
  id: string;
  name: string;
  icon: string;
  disabled?: boolean;
}

const programTypes: ProgramType[] = [
  { id: 'deals', name: 'Couppa Deals', icon: '🎯' },
  { id: 'auto', name: 'Couppa Auto', icon: '⚡', disabled: true },
  { id: 'club', name: 'Couppa Club', icon: '👥', disabled: true },
  { id: 'book', name: 'Couppa Book', icon: '📚' },
  { id: 'pass', name: 'Couppa Pass', icon: '🎫', disabled: true },
  { id: 'share', name: 'Couppa Share', icon: '🔗' },
  { id: 'multi', name: 'Couppa Multi', icon: '🎁', disabled: true },
];

export function CouponStep1() {
  const [selectedProgram, setSelectedProgram] = useState('deals');
  const [programName, setProgramName] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [usageLimit, setUsageLimit] = useState('1');
  const [customUsageLimit, setCustomUsageLimit] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleAIImageSelect = (imageUrl: string) => {
    setCoverImage(imageUrl);
    setShowAIModal(false);
    toast.success('Đã chọn ảnh đề xuất từ AI');
  };

  const aiSuggestedImages = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=200&fit=crop',
    'https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=400&h=200&fit=crop',
  ];

  return (
    <div className="space-y-8">
      {/* Section 1 - Program Type Selection */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn loại chương trình</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {programTypes.map((program) => (
            <button
              key={program.id}
              onClick={() => !program.disabled && setSelectedProgram(program.id)}
              disabled={program.disabled}
              className={`relative p-6 rounded-lg border-2 transition-all ${
                selectedProgram === program.id
                  ? 'border-blue-500 bg-blue-50'
                  : program.disabled
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Check Icon */}
              {selectedProgram === program.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Badge */}
              {program.disabled && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded">
                    Sắp mở
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-4xl">{program.icon}</div>
                <div className="text-sm font-medium text-gray-900">{program.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section 2 - General Information */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chung</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Program Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên chương trình <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                placeholder="Nhập tên chương trình"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Usage Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lượt sử dụng
              </label>
              <div className="relative">
                <select
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="1">1 lượt</option>
                  <option value="custom">Khác</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Custom Usage Limit Input */}
            {usageLimit === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượt sử dụng
                </label>
                <input
                  type="number"
                  value={customUsageLimit}
                  onChange={(e) => setCustomUsageLimit(e.target.value)}
                  placeholder="Nhập số lượt sử dụng"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload ảnh
              </label>

              {!coverImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">
                    Kéo thả ảnh vào đây hoặc
                  </p>
                  <p className="text-sm text-blue-500 font-medium">Chọn ảnh từ thiết bị</p>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG (tối đa 5MB)
                  </p>
                </div>
              ) : (
                <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                  {/* Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-1 text-xs font-medium bg-black/60 text-white rounded">
                      Ảnh bìa
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                  />

                  {/* Actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Đổi ảnh bìa
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCoverImage(null);
                      }}
                      className="p-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* AI Suggestion Button */}
            <button
              onClick={() => setShowAIModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Tạo ảnh đề xuất bằng AI
            </button>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload video
              </label>
              <button
                onClick={() => toast.info('Chức năng đang phát triển')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Video className="w-4 h-4" />
                Chọn video từ thiết bị
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Image Suggestion Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Ảnh đề xuất từ AI
              </h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aiSuggestedImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleAIImageSelect(image)}
                  className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
                >
                  <img
                    src={image}
                    alt={`AI suggestion ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                        Chọn ảnh này
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
