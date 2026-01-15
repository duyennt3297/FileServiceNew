import { HardDrive, FileText, FileImage, FileVideo, File } from 'lucide-react';

interface StorageData {
  total: number;
  used: number;
  byType: {
    images: number;
    videos: number;
    documents: number;
    others: number;
  };
  fileCount: {
    total: number;
    images: number;
    videos: number;
    documents: number;
    others: number;
  };
}

// Mock data
const storageData: StorageData = {
  total: 107374182400, // 100 GB
  used: 45097156608, // 42 GB
  byType: {
    images: 12884901888, // 12 GB
    videos: 26843545600, // 25 GB
    documents: 4294967296, // 4 GB
    others: 1073741824, // 1 GB
  },
  fileCount: {
    total: 1247,
    images: 523,
    videos: 87,
    documents: 432,
    others: 205,
  },
};

export function StorageStats() {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const usagePercentage = (storageData.used / storageData.total) * 100;

  const fileTypes = [
    {
      label: 'Images',
      icon: FileImage,
      color: '#2563EB',
      bgColor: '#EFF6FF',
      size: storageData.byType.images,
      count: storageData.fileCount.images,
    },
    {
      label: 'Videos',
      icon: FileVideo,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      size: storageData.byType.videos,
      count: storageData.fileCount.videos,
    },
    {
      label: 'Documents',
      icon: FileText,
      color: '#16A34A',
      bgColor: '#F0FDF4',
      size: storageData.byType.documents,
      count: storageData.fileCount.documents,
    },
    {
      label: 'Others',
      icon: File,
      color: '#64748B',
      bgColor: '#F8FAFC',
      size: storageData.byType.others,
      count: storageData.fileCount.others,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] font-bold text-[#101828]">Storage Statistics</h1>
        <p className="text-[14px] text-[#667085] mt-1">
          Overview of your storage usage and file distribution
        </p>
      </div>

      {/* Overall Storage Card */}
      <div className="bg-white rounded-[16px] border border-[#EAECF0] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-[#101828]">Total Storage</h2>
            <p className="text-[14px] text-[#667085]">
              {formatSize(storageData.used)} of {formatSize(storageData.total)} used
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[14px] mb-2">
            <span className="text-[#667085]">Storage Usage</span>
            <span className="font-medium text-[#101828]">{usagePercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#F2F4F7] rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                usagePercentage > 90
                  ? 'bg-[#DC2626]'
                  : usagePercentage > 70
                  ? 'bg-[#EA580C]'
                  : 'bg-[#2563EB]'
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>

        {/* Available Space */}
        <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-[8px]">
          <span className="text-[14px] text-[#667085]">Available Space</span>
          <span className="text-[14px] font-semibold text-[#101828]">
            {formatSize(storageData.total - storageData.used)}
          </span>
        </div>
      </div>

      {/* File Type Distribution */}
      <div className="bg-white rounded-[16px] border border-[#EAECF0] p-6">
        <h2 className="text-[18px] font-semibold text-[#101828] mb-4">
          Storage by File Type
        </h2>
        <div className="space-y-4">
          {fileTypes.map((type) => {
            const percentage = (type.size / storageData.used) * 100;
            const Icon = type.icon;

            return (
              <div key={type.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                      style={{ backgroundColor: type.bgColor }}
                    >
                      <Icon className="w-5 h-5" style={{ color: type.color }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#101828]">{type.label}</p>
                      <p className="text-[12px] text-[#667085]">{type.count} files</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-semibold text-[#101828]">
                      {formatSize(type.size)}
                    </p>
                    <p className="text-[12px] text-[#667085]">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="w-full bg-[#F2F4F7] rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: type.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <p className="text-[12px] text-[#667085] mb-1">Total Files</p>
          <p className="text-[24px] font-bold text-[#101828]">
            {storageData.fileCount.total.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <p className="text-[12px] text-[#667085] mb-1">Largest Category</p>
          <p className="text-[24px] font-bold text-[#101828]">Videos</p>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <p className="text-[12px] text-[#667085] mb-1">Average File Size</p>
          <p className="text-[24px] font-bold text-[#101828]">
            {formatSize(storageData.used / storageData.fileCount.total)}
          </p>
        </div>
      </div>

      {/* Storage Plan */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-[16px] p-6 text-white">
        <h2 className="text-[20px] font-bold mb-2">Current Plan: Business</h2>
        <p className="text-[14px] opacity-90 mb-4">
          {formatSize(storageData.total)} total storage
        </p>
        <button className="px-4 py-2 bg-white text-[#2563EB] rounded-[8px] text-[14px] font-medium hover:bg-gray-50 transition-colors">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
