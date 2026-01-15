import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, File, FileText, FileImage, FileVideo, Check } from 'lucide-react';

interface FileUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: UploadedFile[]) => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export function FileUpload({ isOpen, onClose, onSubmit }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      progress: 0,
      status: 'pending',
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // Simulate upload progress
    const updatedFiles = files.map(f => ({ ...f, status: 'uploading' as const }));
    setFiles(updatedFiles);

    files.forEach((_, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], progress: 100, status: 'success' };
            return updated;
          });
        } else {
          setFiles(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], progress };
            return updated;
          });
        }
      }, 200);
    });

    setTimeout(() => {
      onSubmit(files);
      handleClose();
    }, 2500);
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="w-5 h-5 text-[#2563EB]" />;
    if (file.type.startsWith('video/')) return <FileVideo className="w-5 h-5 text-[#DC2626]" />;
    if (file.type.startsWith('text/') || file.type.includes('pdf')) 
      return <FileText className="w-5 h-5 text-[#16A34A]" />;
    return <File className="w-5 h-5 text-[#64748B]" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] w-full max-w-[640px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-[#EAECF0]">
          <h2 className="text-[20px] font-bold leading-[30px] text-[#101828]">Upload Files</h2>
          <p className="text-[14px] text-[#667085] mt-1">
            Upload one or multiple files to your storage
          </p>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1.5 hover:bg-[#F2F4F7] rounded transition-colors"
          >
            <X className="w-6 h-6 text-[#344054]" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-[12px] p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#2563EB] bg-[#F0F9FF]'
                : 'border-[#D0D5DD] hover:border-[#98A2B3] hover:bg-[#F9FAFB]'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#101828]">
                  Click to upload or drag and drop
                </p>
                <p className="text-[14px] text-[#667085] mt-1">
                  Support for images, videos, documents, and more
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[14px] font-medium text-[#101828]">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-2">
                {files.map((uploadedFile, index) => (
                  <div
                    key={index}
                    className="border border-[#EAECF0] rounded-[8px] p-3 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      {/* Preview/Icon */}
                      <div className="flex-shrink-0">
                        {uploadedFile.preview ? (
                          <img
                            src={uploadedFile.preview}
                            alt={uploadedFile.file.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-[#F9FAFB] flex items-center justify-center">
                            {getFileIcon(uploadedFile.file)}
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[14px] font-medium text-[#101828] truncate">
                            {uploadedFile.file.name}
                          </p>
                          {uploadedFile.status === 'success' ? (
                            <Check className="w-4 h-4 text-[#16A34A]" />
                          ) : uploadedFile.status !== 'uploading' ? (
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-[#667085] hover:text-[#DC2626]"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2 text-[12px] text-[#667085]">
                          <span>{formatFileSize(uploadedFile.file.size)}</span>
                          {uploadedFile.status === 'uploading' && (
                            <span className="text-[#2563EB]">{uploadedFile.progress}%</span>
                          )}
                          {uploadedFile.status === 'success' && (
                            <span className="text-[#16A34A]">Uploaded</span>
                          )}
                        </div>

                        {/* Progress Bar */}
                        {uploadedFile.status === 'uploading' && (
                          <div className="mt-2 w-full bg-[#F2F4F7] rounded-full h-1.5">
                            <div
                              className="bg-[#2563EB] h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${uploadedFile.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-end gap-3 border-t border-[#EAECF0] pt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] font-medium text-[#101828] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || files.some(f => f.status === 'uploading')}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload {files.length > 0 && `(${files.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
