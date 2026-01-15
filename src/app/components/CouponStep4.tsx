import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

type CodeGenerationMethod = 'manual' | 'auto';

interface PriceRange {
  id: string;
  min: number;
  max: number;
  price: number;
}

interface CommissionRange {
  id: string;
  percentMin: number;
  percentMax: number;
  commission: number;
}

export function CouponStep4() {
  const [generationMethod, setGenerationMethod] = useState<CodeGenerationMethod>('auto');
  const [quantity, setQuantity] = useState('10');
  const [codeLength, setCodeLength] = useState('8');
  const [startChar, setStartChar] = useState('COUP');
  const [endChar, setEndChar] = useState('');
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  
  // Price ranges
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([
    { id: '1', min: 0, max: 500000, price: 10000 },
  ]);

  // Distributor settings
  const [enableDistributor, setEnableDistributor] = useState(false);
  const [distributorPriceRanges, setDistributorPriceRanges] = useState<PriceRange[]>([
    { id: '1', min: 0, max: 500000, price: 8000 },
  ]);
  const [commissionRanges, setCommissionRanges] = useState<CommissionRange[]>([
    { id: '1', percentMin: 0, percentMax: 10, commission: 5 },
  ]);

  // Generate codes automatically
  useEffect(() => {
    if (generationMethod === 'auto' && quantity && codeLength) {
      const codes: string[] = [];
      const numCodes = parseInt(quantity);
      const length = parseInt(codeLength);
      
      for (let i = 0; i < numCodes; i++) {
        let code = startChar || '';
        const remainingLength = length - code.length - (endChar?.length || 0);
        
        for (let j = 0; j < remainingLength; j++) {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        code += endChar || '';
        codes.push(code);
      }
      
      setGeneratedCodes(codes);
    } else if (generationMethod === 'manual' && quantity) {
      const numCodes = parseInt(quantity);
      const codes = Array(numCodes).fill('').map((_, i) => `CODE${String(i + 1).padStart(3, '0')}`);
      setGeneratedCodes(codes);
    }
  }, [generationMethod, quantity, codeLength, startChar, endChar]);

  // Price range functions
  const addPriceRange = () => {
    const newRange: PriceRange = {
      id: Date.now().toString(),
      min: 0,
      max: 0,
      price: 0,
    };
    setPriceRanges([...priceRanges, newRange]);
  };

  const removePriceRange = (id: string) => {
    setPriceRanges(priceRanges.filter(r => r.id !== id));
  };

  const updatePriceRange = (id: string, field: keyof PriceRange, value: number) => {
    setPriceRanges(priceRanges.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  // Distributor price range functions
  const addDistributorPriceRange = () => {
    const newRange: PriceRange = {
      id: Date.now().toString(),
      min: 0,
      max: 0,
      price: 0,
    };
    setDistributorPriceRanges([...distributorPriceRanges, newRange]);
  };

  const removeDistributorPriceRange = (id: string) => {
    setDistributorPriceRanges(distributorPriceRanges.filter(r => r.id !== id));
  };

  const updateDistributorPriceRange = (id: string, field: keyof PriceRange, value: number) => {
    setDistributorPriceRanges(distributorPriceRanges.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  // Commission range functions
  const addCommissionRange = () => {
    const newRange: CommissionRange = {
      id: Date.now().toString(),
      percentMin: 0,
      percentMax: 0,
      commission: 0,
    };
    setCommissionRanges([...commissionRanges, newRange]);
  };

  const removeCommissionRange = (id: string) => {
    setCommissionRanges(commissionRanges.filter(r => r.id !== id));
  };

  const updateCommissionRange = (id: string, field: keyof CommissionRange, value: number) => {
    setCommissionRanges(commissionRanges.map(r => 
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  // Edit code inline
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(generatedCodes[index]);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newCodes = [...generatedCodes];
      newCodes[editingIndex] = editValue;
      setGeneratedCodes(newCodes);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="space-y-6">
      {/* Section 1 - Code Generation */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Tạo danh sách mã</h3>

        {/* Radio Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setGenerationMethod('manual')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              generationMethod === 'manual'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                generationMethod === 'manual'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {generationMethod === 'manual' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium text-gray-900">Tự nhập</span>
            </div>
          </button>

          <button
            onClick={() => setGenerationMethod('auto')}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              generationMethod === 'auto'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                generationMethod === 'auto'
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {generationMethod === 'auto' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium text-gray-900">Tự sinh</span>
            </div>
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Độ dài mã <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={codeLength}
              onChange={(e) => setCodeLength(e.target.value)}
              min="4"
              max="20"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {generationMethod === 'auto' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ký tự bắt đầu
                </label>
                <input
                  type="text"
                  value={startChar}
                  onChange={(e) => setStartChar(e.target.value.toUpperCase())}
                  placeholder="VD: COUP"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ký tự kết thúc
                </label>
                <input
                  type="text"
                  value={endChar}
                  onChange={(e) => setEndChar(e.target.value.toUpperCase())}
                  placeholder="VD: 2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>

        {/* Preview List */}
        {generatedCodes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Danh sách mã ({generatedCodes.length} mã)
            </h4>
            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2 p-4">
                {generatedCodes.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border border-gray-200"
                  >
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                          className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm font-mono">{code}</span>
                        <button
                          onClick={() => startEdit(index)}
                          className="p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 2 - Pricing */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Giá bán</h3>

        {/* User Price */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Giá User</h4>
            <button
              onClick={addPriceRange}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              <Plus className="w-4 h-4" />
              Thêm khoảng
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tối thiểu (VNĐ)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tối đa (VNĐ)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Giá (VNĐ)</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {priceRanges.map((range) => (
                  <tr key={range.id}>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={range.min}
                        onChange={(e) => updatePriceRange(range.id, 'min', Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={range.max}
                        onChange={(e) => updatePriceRange(range.id, 'max', Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={range.price}
                        onChange={(e) => updatePriceRange(range.id, 'price', Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {priceRanges.length > 1 && (
                        <button
                          onClick={() => removePriceRange(range.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distributor Toggle */}
        <div className="border-t border-gray-200 pt-6">
          <label className="flex items-center justify-between cursor-pointer mb-4">
            <span className="text-sm font-medium text-gray-700">Đại lý phân phối</span>
            <div
              onClick={() => setEnableDistributor(!enableDistributor)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                enableDistributor ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  enableDistributor ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>

          {enableDistributor && (
            <div className="space-y-6">
              {/* Distributor Price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Giá đại lý</h4>
                  <button
                    onClick={addDistributorPriceRange}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm khoảng
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tối thiểu (VNĐ)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tối đa (VNĐ)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Giá (VNĐ)</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {distributorPriceRanges.map((range) => (
                        <tr key={range.id}>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.min}
                              onChange={(e) => updateDistributorPriceRange(range.id, 'min', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.max}
                              onChange={(e) => updateDistributorPriceRange(range.id, 'max', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.price}
                              onChange={(e) => updateDistributorPriceRange(range.id, 'price', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            {distributorPriceRanges.length > 1 && (
                              <button
                                onClick={() => removeDistributorPriceRange(range.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Commission */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Thưởng doanh số</h4>
                  <button
                    onClick={addCommissionRange}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm khoảng
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">% tối thiểu</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">% tối đa</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">% thưởng</th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {commissionRanges.map((range) => (
                        <tr key={range.id}>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.percentMin}
                              onChange={(e) => updateCommissionRange(range.id, 'percentMin', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.percentMax}
                              onChange={(e) => updateCommissionRange(range.id, 'percentMax', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={range.commission}
                              onChange={(e) => updateCommissionRange(range.id, 'commission', Number(e.target.value))}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-4 py-3">
                            {commissionRanges.length > 1 && (
                              <button
                                onClick={() => removeCommissionRange(range.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
