import { useState, useRef } from 'react';
import { ArrowLeft, Save, Eye, Upload, X, Image as ImageIcon, Tag, Calendar } from 'lucide-react';

interface ArticleEditorProps {
  articleId?: string;
  onBack: () => void;
  onSave: (article: ArticleFormData) => void;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  featured_image_id: string | null;
  featured_image_url: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';
  scheduled_at: string | null;
  is_featured: boolean;
  allow_comments: boolean;
}

export function ArticleEditor({ articleId, onBack, onSave }: ArticleEditorProps) {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    featured_image_id: null,
    featured_image_url: null,
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    tags: [],
    status: 'DRAFT',
    scheduled_at: null,
    is_featured: false,
    allow_comments: true,
  });

  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload to file management system
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        featured_image_url: imageUrl,
        featured_image_id: 'file-' + Date.now(), // Mock file ID
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featured_image_url: null,
      featured_image_id: null,
    }));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.meta_keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        meta_keywords: [...prev.meta_keywords, keywordInput.trim()],
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      meta_keywords: prev.meta_keywords.filter(k => k !== keyword),
    }));
  };

  const handleSubmit = (status: 'DRAFT' | 'PUBLISHED') => {
    onSave({
      ...formData,
      status,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#F2F4F7] rounded-[8px] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#344054]" />
          </button>
          <div>
            <h1 className="text-[24px] font-bold text-[#101828]">
              {articleId ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-[14px] text-[#667085] mt-1">
              {articleId ? 'Update your article content' : 'Write and publish your article'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit('DRAFT')}
            className="px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB] transition-colors"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit('PUBLISHED')}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90 transition-opacity"
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-2">
              Title <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title..."
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
            <div className="mt-2 text-[12px] text-[#667085]">
              Slug: <span className="font-mono text-[#2563EB]">{formData.slug || '(auto-generated)'}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-3">
              Featured Image
            </label>
            {formData.featured_image_url ? (
              <div className="relative group">
                <img
                  src={formData.featured_image_url}
                  alt="Featured"
                  className="w-full h-[300px] object-cover rounded-[12px]"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <X className="w-4 h-4 text-[#DC2626]" />
                </button>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 rounded text-[11px] text-[#667085]">
                  ID: {formData.featured_image_id}
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D0D5DD] rounded-[12px] p-8 text-center cursor-pointer hover:border-[#2563EB] hover:bg-[#F9FAFB] transition-all"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#F0F9FF] flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#101828]">
                      Click to upload featured image
                    </p>
                    <p className="text-[14px] text-[#667085] mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-2">
              Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief summary of your article..."
              rows={3}
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-2">
              Content <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your article content here... (HTML/Markdown supported)"
              rows={15}
              className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none font-mono"
            />
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO optimized title..."
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO description for search engines..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#344054] mb-2">
                  Meta Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Add keyword..."
                    className="flex-1 px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.meta_keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] text-[13px] rounded-full flex items-center gap-2"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-[#DC2626]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Tags */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-3">
              <Tag className="w-4 h-4 inline mr-1" />
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                className="flex-1 px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-[#2563EB] text-white rounded-[8px] text-[14px] font-medium hover:opacity-90"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#F0F9FF] text-[#026AA2] text-[13px] rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-[#DC2626]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <h3 className="text-[14px] font-medium text-[#344054] mb-4">Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-[14px] text-[#344054]">Featured Article</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allow_comments}
                  onChange={(e) => setFormData(prev => ({ ...prev, allow_comments: e.target.checked }))}
                  className="w-4 h-4 rounded border-[#D0D5DD] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-[14px] text-[#344054]">Allow Comments</span>
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-[12px] border border-[#EAECF0] p-6">
            <label className="block text-[14px] font-medium text-[#344054] mb-3">
              <Calendar className="w-4 h-4 inline mr-1" />
              Schedule Publish
            </label>
            <input
              type="datetime-local"
              value={formData.scheduled_at || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
              className="w-full px-3 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
            <p className="text-[12px] text-[#667085] mt-2">
              Leave empty to publish immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
