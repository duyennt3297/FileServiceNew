import { useState } from 'react';
import { 
  Upload, 
  Search, 
  Grid3x3, 
  List, 
  FolderPlus,
  MoreVertical,
  Download,
  Trash2,
  Edit2,
  Eye,
  FileText,
  FileImage,
  FileVideo,
  FileArchive,
  File
} from 'lucide-react';

interface FileItem {
  _id: string;
  tenant_id: string;
  folder_id: string | null;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  thumbnail_url: string | null;
  tags: string[];
  is_public: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  deleted_at: string | null;
}

interface FileManagerProps {
  onUploadClick: () => void;
  onCreateFolderClick: () => void;
}

// Mock data
const mockFiles: FileItem[] = [
  {
    _id: '1',
    tenant_id: 'tenant-001',
    folder_id: null,
    file_name: 'Product Catalog 2024.pdf',
    file_url: 'https://storage.example.com/files/product-catalog.pdf',
    file_type: 'document',
    file_size: 2458624,
    mime_type: 'application/pdf',
    thumbnail_url: null,
    tags: ['catalog', 'product', '2024'],
    is_public: false,
    created_at: '2024-01-15T10:30:00Z',
    created_by: 'user-001',
    updated_at: '2024-01-15T10:30:00Z',
    deleted_at: null,
  },
  {
    _id: '2',
    tenant_id: 'tenant-001',
    folder_id: null,
    file_name: 'Banner Homepage.png',
    file_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    file_type: 'image',
    file_size: 1245632,
    mime_type: 'image/png',
    thumbnail_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200',
    tags: ['banner', 'homepage', 'marketing'],
    is_public: true,
    created_at: '2024-01-14T14:20:00Z',
    created_by: 'user-002',
    updated_at: '2024-01-14T14:20:00Z',
    deleted_at: null,
  },
  {
    _id: '3',
    tenant_id: 'tenant-001',
    folder_id: null,
    file_name: 'Tutorial Video.mp4',
    file_url: 'https://storage.example.com/videos/tutorial.mp4',
    file_type: 'video',
    file_size: 15728640,
    mime_type: 'video/mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=200',
    tags: ['tutorial', 'onboarding', 'video'],
    is_public: false,
    created_at: '2024-01-13T09:15:00Z',
    created_by: 'user-003',
    updated_at: '2024-01-13T09:15:00Z',
    deleted_at: null,
  },
  {
    _id: '4',
    tenant_id: 'tenant-001',
    folder_id: null,
    file_name: 'Company Logo.svg',
    file_url: 'https://storage.example.com/images/logo.svg',
    file_type: 'image',
    file_size: 45824,
    mime_type: 'image/svg+xml',
    thumbnail_url: null,
    tags: ['logo', 'brand'],
    is_public: true,
    created_at: '2024-01-12T16:45:00Z',
    created_by: 'user-001',
    updated_at: '2024-01-12T16:45:00Z',
    deleted_at: null,
  },
  {
    _id: '5',
    tenant_id: 'tenant-001',
    folder_id: null,
    file_name: 'Archive 2023.zip',
    file_url: 'https://storage.example.com/archives/2023.zip',
    file_type: 'archive',
    file_size: 52428800,
    mime_type: 'application/zip',
    thumbnail_url: null,
    tags: ['archive', '2023', 'backup'],
    is_public: false,
    created_at: '2024-01-10T08:00:00Z',
    created_by: 'user-002',
    updated_at: '2024-01-10T08:00:00Z',
    deleted_at: null,
  },
];

export function FileManager({ onUploadClick, onCreateFolderClick }: FileManagerProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (file: FileItem) => {
    switch (file.file_type) {
      case 'image':
        return <FileImage className="w-5 h-5 text-[#2563EB]" />;
      case 'video':
        return <FileVideo className="w-5 h-5 text-[#DC2626]" />;
      case 'document':
        return <FileText className="w-5 h-5 text-[#16A34A]" />;
      case 'archive':
        return <FileArchive className="w-5 h-5 text-[#EA580C]" />;
      default:
        return <File className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const filteredFiles = mockFiles.filter(file =>
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#101828]">File Management</h1>
          <p className="text-[14px] text-[#667085] mt-1">Manage your files and folders</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateFolderClick}
            className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="text-[14px] font-medium">New Folder</span>
          </button>
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-[8px] hover:opacity-90 transition-opacity"
          >
            <Upload className="w-4 h-4" />
            <span className="text-[14px] font-medium">Upload Files</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-[12px] border border-[#EAECF0]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667085]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 w-[320px] border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>
          {selectedFiles.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-[#667085]">
                {selectedFiles.length} selected
              </span>
              <button className="p-2 text-[#667085] hover:text-[#344054] rounded-[6px] hover:bg-[#F9FAFB]">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-[#DC2626] hover:text-[#B91C1C] rounded-[6px] hover:bg-[#FEF2F2]">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-[6px] ${
              viewMode === 'grid'
                ? 'bg-[#F0F9FF] text-[#2563EB]'
                : 'text-[#667085] hover:bg-[#F9FAFB]'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-[6px] ${
              viewMode === 'list'
                ? 'bg-[#F0F9FF] text-[#2563EB]'
                : 'text-[#667085] hover:bg-[#F9FAFB]'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredFiles.map(file => (
            <div
              key={file._id}
              onClick={() => toggleFileSelection(file._id)}
              className={`bg-white rounded-[12px] border p-4 cursor-pointer transition-all ${
                selectedFiles.includes(file._id)
                  ? 'border-[#2563EB] bg-[#F0F9FF] ring-2 ring-[#2563EB]/20'
                  : 'border-[#EAECF0] hover:border-[#D0D5DD] hover:shadow-sm'
              }`}
            >
              {/* Thumbnail */}
              <div className="aspect-square rounded-[8px] bg-[#F9FAFB] flex items-center justify-center overflow-hidden mb-3">
                {file.thumbnail_url ? (
                  <img
                    src={file.thumbnail_url}
                    alt={file.file_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {getFileIcon(file)}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div>
                <h3 className="text-[14px] font-medium text-[#101828] truncate mb-1">
                  {file.file_name}
                </h3>
                <div className="flex items-center justify-between text-[12px] text-[#667085]">
                  <span>{formatFileSize(file.file_size)}</span>
                  <button className="p-1 hover:bg-[#F2F4F7] rounded">
                    <MoreVertical className="w-3 h-3" />
                  </button>
                </div>
                {file.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {file.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#F0F9FF] text-[#026AA2] text-[10px] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {file.tags.length > 2 && (
                      <span className="px-2 py-0.5 bg-[#F2F4F7] text-[#667085] text-[10px] rounded-full">
                        +{file.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[12px] border border-[#EAECF0] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-[#D0D5DD]" />
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Modified
                </th>
                <th className="px-4 py-3 text-right text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {filteredFiles.map(file => (
                <tr
                  key={file._id}
                  className={`hover:bg-[#F9FAFB] transition-colors ${
                    selectedFiles.includes(file._id) ? 'bg-[#F0F9FF]' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file._id)}
                      onChange={() => toggleFileSelection(file._id)}
                      className="rounded border-[#D0D5DD]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file)}
                      <div>
                        <div className="text-[14px] font-medium text-[#101828]">
                          {file.file_name}
                        </div>
                        {file.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {file.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-[#F0F9FF] text-[#026AA2] text-[10px] rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#667085] capitalize">
                    {file.file_type}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#667085]">
                    {formatFileSize(file.file_size)}
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#667085]">
                    {formatDate(file.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#DC2626] hover:text-[#B91C1C] hover:bg-[#FEF2F2] rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-12 text-center">
          <File className="w-12 h-12 text-[#D0D5DD] mx-auto mb-3" />
          <h3 className="text-[16px] font-medium text-[#101828] mb-1">No files found</h3>
          <p className="text-[14px] text-[#667085]">
            {searchQuery ? 'Try adjusting your search' : 'Upload your first file to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
