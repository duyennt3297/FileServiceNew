import { useState } from 'react';
import { Calendar, Heart, Store, User, CheckCircle2 } from 'lucide-react';

type BuybackPolicy = 'none' | 'optional' | 'committed';
type PreviewTab = 'user' | 'agent';

export function CouponStep5() {
  const [buybackPolicy, setBuybackPolicy] = useState<BuybackPolicy>('none');
  const [buybackPrice, setBuybackPrice] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [buybackStartDate, setBuybackStartDate] = useState('');
  const [buybackEndDate, setBuybackEndDate] = useState('');
  const [buybackDescription, setBuybackDescription] = useState('');
  
  const [activeTab, setActiveTab] = useState<PreviewTab>('user');
  
  const [checklist, setChecklist] = useState({
    infoAccurate: false,
    conditionsClear: false,
    policiesComplete: false,
  });

  const allChecked = Object.values(checklist).every(v => v);

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleSaveDraft = () => {
    // Logic to save draft
    console.log('Saving draft...');
  };

  const handlePublish = () => {
    if (allChecked) {
      // Logic to publish
      console.log('Publishing...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Section 1 - Buyback Policy */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Chính sách nhận lại</h3>

        {/* Radio Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Option 1 - None */}
          <button
            onClick={() => setBuybackPolicy('none')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              buybackPolicy === 'none'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                buybackPolicy === 'none'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {buybackPolicy === 'none' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">Không hỗ trợ</div>
                <div className="text-xs text-gray-500 mt-1">Không nhận lại coupon</div>
              </div>
            </div>
          </button>

          {/* Option 2 - Optional */}
          <button
            onClick={() => setBuybackPolicy('optional')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              buybackPolicy === 'optional'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                buybackPolicy === 'optional'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {buybackPolicy === 'optional' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">Có thể hỗ trợ</div>
                <div className="text-xs text-gray-500 mt-1">Nhận lại theo điều kiện</div>
              </div>
            </div>
          </button>

          {/* Option 3 - Committed */}
          <button
            onClick={() => setBuybackPolicy('committed')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              buybackPolicy === 'committed'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                buybackPolicy === 'committed'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {buybackPolicy === 'committed' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">Cam kết hỗ trợ</div>
                <div className="text-xs text-gray-500 mt-1">Cam kết nhận lại 100%</div>
              </div>
            </div>
          </button>
        </div>

        {/* Buyback Details - Show when option 2 or 3 selected */}
        {(buybackPolicy === 'optional' || buybackPolicy === 'committed') && (
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Buyback Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá nhận lại (VNĐ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={buybackPrice}
                  onChange={(e) => setBuybackPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Max Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng tối đa <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={maxQuantity}
                  onChange={(e) => setMaxQuantity(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian từ ngày <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={buybackStartDate}
                    onChange={(e) => setBuybackStartDate(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đến ngày <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={buybackEndDate}
                    onChange={(e) => setBuybackEndDate(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chính sách nhận lại
              </label>
              <textarea
                value={buybackDescription}
                onChange={(e) => setBuybackDescription(e.target.value)}
                placeholder="Nhập mô tả chi tiết về chính sách nhận lại coupon..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {buybackDescription.length}/500 ký tự
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 2 - Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Xem trước</h3>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('user')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'user'
                ? 'text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Preview User
            </div>
            {activeTab === 'user' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('agent')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'agent'
                ? 'text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Preview Agent
            </div>
            {activeTab === 'agent' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
            )}
          </button>
        </div>

        {/* Preview Content */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          {activeTab === 'user' ? (
            <div className="max-w-md mx-auto">
              {/* User Coupon Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                      </div>
                      <span className="font-semibold">Couppa</span>
                    </div>
                    <div className="text-xs bg-white/20 px-2 py-1 rounded">
                      Giảm 20%
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Giảm giá 20% cho đơn hàng đầu tiên</h3>
                  <p className="text-sm opacity-90">Áp dụng cho tất cả sản phẩm</p>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mã coupon</span>
                    <span className="font-mono font-semibold text-gray-900">COUP1A2B3C4D</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Giá trị</span>
                    <span className="font-semibold text-gray-900">50.000 VNĐ</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Hạn sử dụng</span>
                    <span className="text-gray-900">31/12/2024</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                      Sử dụng ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {/* Agent Coupon Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Store className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="font-semibold">Đại lý</span>
                    </div>
                    <div className="text-xs bg-white/20 px-2 py-1 rounded">
                      Giá sỉ
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Giảm giá 20% cho đơn hàng đầu tiên</h3>
                  <p className="text-sm opacity-90">Gói đại lý - 100 coupon</p>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Giá mua vào</span>
                    <span className="font-semibold text-gray-900">40.000 VNĐ/coupon</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Giá bán ra</span>
                    <span className="font-semibold text-gray-900">50.000 VNĐ/coupon</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Lợi nhuận</span>
                    <span className="font-semibold text-green-600">+10.000 VNĐ</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Hoa hồng</span>
                    <span className="font-semibold text-green-600">+5%</span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Đặt mua coupon
                    </button>
                    <div className="text-xs text-center text-gray-500">
                      Số lượng tối thiểu: 100 coupon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 3 - Checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Checklist phát hành</h3>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={checklist.infoAccurate}
              onChange={() => handleChecklistChange('infoAccurate')}
              className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex items-center gap-2 flex-1">
              {checklist.infoAccurate && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              <span className={`font-medium ${checklist.infoAccurate ? 'text-gray-900' : 'text-gray-700'}`}>
                Thông tin chương trình chính xác
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={checklist.conditionsClear}
              onChange={() => handleChecklistChange('conditionsClear')}
              className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex items-center gap-2 flex-1">
              {checklist.conditionsClear && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              <span className={`font-medium ${checklist.conditionsClear ? 'text-gray-900' : 'text-gray-700'}`}>
                Điều kiện sử dụng rõ ràng
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={checklist.policiesComplete}
              onChange={() => handleChecklistChange('policiesComplete')}
              className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
            />
            <div className="flex items-center gap-2 flex-1">
              {checklist.policiesComplete && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              <span className={`font-medium ${checklist.policiesComplete ? 'text-gray-900' : 'text-gray-700'}`}>
                Chính sách đầy đủ và hợp lệ
              </span>
            </div>
          </label>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Lưu nháp
          </button>
          
          <button
            onClick={handlePublish}
            disabled={!allChecked}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              allChecked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Phát hành
          </button>
        </div>

        {!allChecked && (
          <p className="text-sm text-gray-500 text-center mt-3">
            Vui lòng hoàn thành checklist để phát hành chương trình
          </p>
        )}
      </div>
    </div>
  );
}
