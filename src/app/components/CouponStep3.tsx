import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
}

const branches: Branch[] = [
  { id: '1', name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q.1, TP.HCM' },
  { id: '2', name: 'Chi nhánh Quận 3', address: '456 Lê Văn Sỹ, Q.3, TP.HCM' },
  { id: '3', name: 'Chi nhánh Quận 5', address: '789 Trần Hưng Đạo, Q.5, TP.HCM' },
  { id: '4', name: 'Chi nhánh Quận 7', address: '321 Nguyễn Văn Linh, Q.7, TP.HCM' },
  { id: '5', name: 'Chi nhánh Bình Thạnh', address: '654 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM' },
  { id: '6', name: 'Chi nhánh Tân Bình', address: '987 Cộng Hòa, Tân Bình, TP.HCM' },
];

const suggestionChips = [
  'Áp dụng cho đơn hàng từ 500.000đ',
  'Giảm tối đa 100.000đ',
  'Không áp dụng cùng chương trình khác',
  'Chỉ áp dụng cho khách hàng mới',
  'Giới hạn 1 lần/người dùng',
  'Áp dụng cho sản phẩm đã chọn',
];

export function CouponStep3() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [applyAllDay, setApplyAllDay] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const handleBranchToggle = (branchId: string) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter(id => id !== branchId));
    } else {
      setSelectedBranches([...selectedBranches, branchId]);
    }
  };

  const handleSelectAllBranches = () => {
    if (selectedBranches.length === branches.length) {
      setSelectedBranches([]);
    } else {
      setSelectedBranches(branches.map(b => b.id));
    }
  };

  const handleChipClick = (chip: string) => {
    if (instructions) {
      setInstructions(instructions + '\n' + chip);
    } else {
      setInstructions(chip);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hạn sử dụng */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Hạn sử dụng</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Từ ngày <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đến ngày <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Khung giờ */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Khung giờ</h3>
        
        {/* Checkbox: Áp dụng cả ngày */}
        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={applyAllDay}
            onChange={(e) => setApplyAllDay(e.target.checked)}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Áp dụng cả ngày</span>
        </label>

        {!applyAllDay && (
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ giờ
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến giờ
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phạm vi */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Phạm vi</h3>
          <button
            onClick={handleSelectAllBranches}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            {selectedBranches.length === branches.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
          </button>
        </div>

        <div className="space-y-3">
          {branches.map((branch) => (
            <label
              key={branch.id}
              className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedBranches.includes(branch.id)}
                onChange={() => handleBranchToggle(branch.id)}
                className="w-4 h-4 mt-0.5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{branch.address}</div>
              </div>
            </label>
          ))}
        </div>

        {selectedBranches.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Đã chọn <span className="font-semibold">{selectedBranches.length}</span> chi nhánh
            </p>
          </div>
        )}
      </div>

      {/* Hướng dẫn sử dụng */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Hướng dẫn sử dụng</h3>
        
        {/* Suggestion Chips */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gợi ý nội dung
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung hướng dẫn
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Nhập hướng dẫn sử dụng coupon hoặc chọn gợi ý bên trên"
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            {instructions.length}/500 ký tự
          </p>
        </div>
      </div>
    </div>
  );
}
