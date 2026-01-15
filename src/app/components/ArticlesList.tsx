import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye,
  Edit2,
  Trash2,
  Calendar,
  User,
  Tag,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

interface Article {
  _id: string;
  tenant_id: string;
  title: string;
  slug: string;
  summary: string;
  featured_image_url: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
  published_at: string | null;
  author_id: string;
  author_name: string;
  tags: string[];
  view_count: number;
  like_count: number;
  comment_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ArticlesListProps {
  onCreateClick: () => void;
  onEditClick: (articleId: string) => void;
}

// Mock data
const mockArticles: Article[] = [
  {
    _id: 'article-001',
    tenant_id: 'tenant-001',
    title: 'Xu hướng AI 2024: Những điều cần biết',
    slug: 'xu-huong-ai-2024',
    summary: 'Tổng hợp những xu hướng AI nổi bật năm 2024 mà doanh nghiệp cần quan tâm.',
    featured_image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    status: 'PUBLISHED',
    published_at: '2024-01-15T10:00:00Z',
    author_id: 'user-001',
    author_name: 'Nguyễn Văn A',
    tags: ['AI', 'công nghệ', 'xu hướng'],
    view_count: 1247,
    like_count: 89,
    comment_count: 23,
    is_featured: true,
    created_at: '2024-01-14T08:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    _id: 'article-002',
    tenant_id: 'tenant-001',
    title: 'Hướng dẫn xây dựng SaaS từ A-Z',
    slug: 'huong-dan-xay-dung-saas',
    summary: 'Bài viết chi tiết về cách xây dựng một hệ thống SaaS quy mô lớn từ đầu.',
    featured_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    status: 'PUBLISHED',
    published_at: '2024-01-12T14:30:00Z',
    author_id: 'user-002',
    author_name: 'Trần Thị B',
    tags: ['SaaS', 'startup', 'kiến trúc'],
    view_count: 856,
    like_count: 67,
    comment_count: 15,
    is_featured: false,
    created_at: '2024-01-11T09:00:00Z',
    updated_at: '2024-01-12T14:30:00Z',
  },
  {
    _id: 'article-003',
    tenant_id: 'tenant-001',
    title: 'Database Design Best Practices',
    slug: 'database-design-best-practices',
    summary: 'Các nguyên tắc thiết kế database cho hệ thống phân tán quy mô lớn.',
    featured_image_url: null,
    status: 'DRAFT',
    published_at: null,
    author_id: 'user-001',
    author_name: 'Nguyễn Văn A',
    tags: ['database', 'architecture', 'best practices'],
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    is_featured: false,
    created_at: '2024-01-16T11:20:00Z',
    updated_at: '2024-01-16T15:45:00Z',
  },
  {
    _id: 'article-004',
    tenant_id: 'tenant-001',
    title: 'React Performance Optimization',
    slug: 'react-performance-optimization',
    summary: 'Kỹ thuật tối ưu hiệu năng cho ứng dụng React lớn.',
    featured_image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    status: 'SCHEDULED',
    published_at: '2024-01-20T08:00:00Z',
    author_id: 'user-002',
    author_name: 'Trần Thị B',
    tags: ['React', 'performance', 'frontend'],
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    is_featured: false,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T12:00:00Z',
  },
];

export function ArticlesList({ onCreateClick, onEditClick }: ArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Article['status']) => {
    const styles = {
      PUBLISHED: 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]',
      DRAFT: 'bg-[#F3F4F6] text-[#6B7280] border-[#D1D5DB]',
      ARCHIVED: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
      SCHEDULED: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    };

    const labels = {
      PUBLISHED: 'Published',
      DRAFT: 'Draft',
      ARCHIVED: 'Archived',
      SCHEDULED: 'Scheduled',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-[11px] font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-[#101828]">Articles Management</h1>
          <p className="text-[14px] text-[#667085] mt-1">
            Manage your news articles and publications
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-[8px] hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[14px] font-medium">Create Article</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Total Articles</p>
              <p className="text-[24px] font-bold text-[#101828]">{mockArticles.length}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#2563EB]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Published</p>
              <p className="text-[24px] font-bold text-[#101828]">
                {mockArticles.filter(a => a.status === 'PUBLISHED').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#047857]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Drafts</p>
              <p className="text-[24px] font-bold text-[#101828]">
                {mockArticles.filter(a => a.status === 'DRAFT').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-[#6B7280]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#667085] mb-1">Total Views</p>
              <p className="text-[24px] font-bold text-[#101828]">
                {mockArticles.reduce((sum, a) => sum + a.view_count, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#DC2626]" />
            </div>
          </div>
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
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 w-[320px] border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#D0D5DD] rounded-[8px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          >
            <option value="all">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-[12px] border border-[#EAECF0] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
            <tr>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Article
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Author
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Stats
              </th>
              <th className="px-4 py-3 text-left text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Published
              </th>
              <th className="px-4 py-3 text-right text-[12px] font-medium text-[#667085] uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAECF0]">
            {filteredArticles.map(article => (
              <tr key={article._id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {article.featured_image_url ? (
                      <img
                        src={article.featured_image_url}
                        alt={article.title}
                        className="w-16 h-16 rounded-[8px] object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-[8px] bg-[#F9FAFB] flex items-center justify-center flex-shrink-0">
                        <Eye className="w-6 h-6 text-[#D0D5DD]" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[14px] font-medium text-[#101828] truncate">
                          {article.title}
                        </h3>
                        {article.is_featured && (
                          <span className="px-1.5 py-0.5 bg-[#FEF3C7] text-[#92400E] text-[10px] rounded font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#667085] truncate mt-0.5">
                        {article.summary}
                      </p>
                      {article.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {article.tags.slice(0, 3).map(tag => (
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
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#667085]" />
                    <span className="text-[14px] text-[#344054]">{article.author_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(article.status)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 text-[12px] text-[#667085]">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{article.view_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{article.like_count}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[14px] text-[#667085]">
                  {formatDate(article.published_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEditClick(article._id)}
                      className="p-1.5 text-[#667085] hover:text-[#344054] hover:bg-[#F2F4F7] rounded"
                    >
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

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-[12px] border border-[#EAECF0] p-12 text-center">
          <Eye className="w-12 h-12 text-[#D0D5DD] mx-auto mb-3" />
          <h3 className="text-[16px] font-medium text-[#101828] mb-1">No articles found</h3>
          <p className="text-[14px] text-[#667085]">
            {searchQuery ? 'Try adjusting your search' : 'Create your first article to get started'}
          </p>
        </div>
      )}
    </div>
  );
}
