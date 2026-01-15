import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CouponStep1 } from './CouponStep1';
import { CouponStep2 } from './CouponStep2';
import { CouponStep3 } from './CouponStep3';
import { CouponStep4 } from './CouponStep4';
import { CouponStep5 } from './CouponStep5';

interface CouponCreationProps {
  onBack?: () => void;
}

const steps = [
  { id: 1, title: 'Thông tin chương trình' },
  { id: 2, title: 'Thiết lập coupon' },
  { id: 3, title: 'Thời gian & phạm vi' },
  { id: 4, title: 'Giá & mã coupon' },
  { id: 5, title: 'Chính sách & phát hành' },
];

export function CouponCreation({ onBack }: CouponCreationProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleSaveDraft = () => {
    toast.success('Đã lưu bản nháp');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Tạo chương trình Coupon</h1>
        <p className="text-sm text-gray-500 mt-1">Thiết lập & phát hành chương trình</p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" style={{ width: 'calc(100% - 40px)', marginLeft: '20px' }}>
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const isUpcoming = currentStep < step.id;

              return (
                <div key={step.id} className="flex flex-col items-center" style={{ zIndex: 1 }}>
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                      isCompleted
                        ? 'bg-blue-600 border-blue-600'
                        : isCurrent
                        ? 'bg-white border-blue-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          isCurrent ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-3 text-center max-w-[140px]">
                    <p
                      className={`text-xs font-medium ${
                        isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        {currentStep === 1 && <CouponStep1 />}
        {currentStep === 2 && <CouponStep2 />}
        {currentStep === 3 && <CouponStep3 />}
        {currentStep === 4 && <CouponStep4 />}
        {currentStep === 5 && <CouponStep5 />}
        {currentStep !== 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-500">
              Nội dung của bước {currentStep} sẽ được hiển thị ở đây
            </p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-6 py-2.5 text-sm border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2.5 text-sm border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Lưu nháp
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className={`px-6 py-2.5 text-sm rounded-xl transition-all shadow-sm ${
              currentStep === steps.length
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow'
            }`}
          >
            {currentStep === steps.length ? 'Hoàn thành' : 'Tiếp tục'}
          </button>
        </div>
      </div>
    </div>
  );
}