import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export function StyleGuideDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAIGenerate = () => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const validateInput = (value: string) => {
    if (value && value.length < 3) {
      setError('Tối thiểu 3 ký tự');
    } else {
      setError('');
    }
  };

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Style Guide - Couppa</h1>
        <p className="text-sm text-gray-500">SaaS Clean Design System</p>
      </div>

      {/* Colors */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Colors</h2>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <div className="w-full h-20 bg-blue-600 rounded-xl mb-2"></div>
            <p className="text-xs font-medium text-gray-700">Primary</p>
            <p className="text-xs text-gray-500">#2563EB</p>
          </div>
          <div>
            <div className="w-full h-20 bg-red-500 rounded-xl mb-2"></div>
            <p className="text-xs font-medium text-gray-700">Red Accent</p>
            <p className="text-xs text-gray-500">#EF4444</p>
          </div>
          <div>
            <div className="w-full h-20 bg-gray-900 rounded-xl mb-2"></div>
            <p className="text-xs font-medium text-gray-700">Text Primary</p>
            <p className="text-xs text-gray-500">#111827</p>
          </div>
          <div>
            <div className="w-full h-20 bg-gray-500 rounded-xl mb-2"></div>
            <p className="text-xs font-medium text-gray-700">Text Secondary</p>
            <p className="text-xs text-gray-500">#6B7280</p>
          </div>
          <div>
            <div className="w-full h-20 bg-gray-100 rounded-xl mb-2 border border-gray-200"></div>
            <p className="text-xs font-medium text-gray-700">Background</p>
            <p className="text-xs text-gray-500">#F9FAFB</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-gray-900">Heading 1 - 24px Medium</h1>
            <p className="text-xs text-gray-500 mt-1">font-size: 24px, font-weight: 500</p>
          </div>
          <div>
            <h2 className="text-gray-900">Heading 2 - 20px Medium</h2>
            <p className="text-xs text-gray-500 mt-1">font-size: 20px, font-weight: 500</p>
          </div>
          <div>
            <h3 className="text-gray-900">Heading 3 - 16px Medium</h3>
            <p className="text-xs text-gray-500 mt-1">font-size: 16px, font-weight: 500</p>
          </div>
          <div>
            <p className="text-sm text-gray-700">Body text - 14px Regular</p>
            <p className="text-xs text-gray-500 mt-1">font-size: 14px, font-weight: 400</p>
          </div>
          <div>
            <label className="text-gray-700">Label - 12px Medium</label>
            <p className="text-xs text-gray-500 mt-1">font-size: 12px, font-weight: 500</p>
          </div>
        </div>
      </section>

      {/* Buttons - All States */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Buttons</h2>
        
        <div className="space-y-6">
          {/* Primary Button */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Primary Button</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm hover:shadow">
                Default
              </button>
              <button className="px-6 py-2.5 bg-blue-700 text-white rounded-xl font-medium shadow">
                Hover State
              </button>
              <button className="px-6 py-2.5 bg-blue-800 text-white rounded-xl font-medium shadow">
                Active State
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading
              </button>
              <button className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-xl font-medium cursor-not-allowed" disabled>
                Disabled
              </button>
            </div>
          </div>

          {/* Secondary Button */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Secondary Button</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all">
                Default
              </button>
              <button className="px-6 py-2.5 bg-gray-50 border-2 border-gray-400 text-gray-700 rounded-xl font-medium">
                Hover State
              </button>
              <button className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-500 rounded-xl font-medium cursor-not-allowed opacity-50" disabled>
                Disabled
              </button>
            </div>
          </div>

          {/* Destructive Button */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Destructive Button</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all shadow-sm">
                Delete
              </button>
              <button className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium shadow-sm">
                Hover State
              </button>
              <button className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-xl font-medium cursor-not-allowed" disabled>
                Disabled
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs - All States */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Input Fields</h2>
        
        <div className="space-y-6 max-w-2xl">
          {/* Default Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Default Input
            </label>
            <input
              type="text"
              placeholder="Nhập nội dung..."
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Focused Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Focused Input
            </label>
            <input
              type="text"
              value="Focused state"
              readOnly
              className="w-full px-4 py-2.5 text-sm border border-transparent rounded-xl ring-2 ring-blue-600"
            />
          </div>

          {/* Error Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Error State
            </label>
            <div className="relative">
              <input
                type="text"
                onChange={(e) => validateInput(e.target.value)}
                placeholder="Nhập ít nhất 3 ký tự"
                className="w-full px-4 py-2.5 text-sm border-2 border-red-500 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              {error && (
                <div className="flex items-center gap-2 mt-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-xs">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Success Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Success State
            </label>
            <div className="relative">
              <input
                type="text"
                value="Valid input"
                readOnly
                className="w-full px-4 py-2.5 text-sm border-2 border-green-500 rounded-xl"
              />
              <div className="flex items-center gap-2 mt-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <p className="text-xs">Hợp lệ</p>
              </div>
            </div>
          </div>

          {/* Disabled Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Disabled State
            </label>
            <input
              type="text"
              value="Disabled input"
              disabled
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* Cards & Shadows */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Cards & Shadows</h2>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <h3 className="font-medium text-gray-900 mb-2">Border Only</h3>
            <p className="text-sm text-gray-500">No shadow, just border</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-medium text-gray-900 mb-2">Small Shadow</h3>
            <p className="text-sm text-gray-500">Subtle elevation</p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-medium text-gray-900 mb-2">Medium Shadow</h3>
            <p className="text-sm text-gray-500">More prominent</p>
          </div>
        </div>
      </section>

      {/* Loading State Demo */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Generate - Loading State</h2>
        
        <div className="space-y-4">
          <button
            onClick={handleAIGenerate}
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tạo bằng AI...
              </>
            ) : (
              'Tạo bằng AI'
            )}
          </button>

          {isLoading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Đang xử lý...</p>
                  <p className="text-xs text-blue-600">AI đang phân tích và tạo nội dung</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Spacing */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Spacing System</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl"></div>
            <p className="text-sm text-gray-700">16px (1rem) - Small spacing</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-24 h-16 bg-blue-600 rounded-xl"></div>
            <p className="text-sm text-gray-700">24px (1.5rem) - Medium spacing</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-32 h-16 bg-blue-600 rounded-xl"></div>
            <p className="text-sm text-gray-700">32px (2rem) - Large spacing</p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Border Radius</h2>
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
            8px
          </div>
          <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">
            12px
          </div>
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs">
            16px
          </div>
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
            Full
          </div>
        </div>
      </section>
    </div>
  );
}
