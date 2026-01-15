import { 
  LayoutDashboard, 
  ChevronDown,
  FolderOpen,
  HardDrive,
  Tags,
  Package,
  Settings
} from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export function Sidebar({ activeMenu, onMenuClick }: SidebarProps) {
  const [filesExpanded, setFilesExpanded] = useState(true);
  const [productsExpanded, setProductsExpanded] = useState(true);
  const [settingExpanded, setSettingExpanded] = useState(false);

  const isFilesActive = ['files', 'folders', 'storage'].includes(activeMenu);
  const isProductsActive = ['products-list', 'products-create'].includes(activeMenu);
  const isSettingActive = ['account', 'settings'].includes(activeMenu);

  return (
    <div className="w-[200px] bg-card border-r border-sidebar-border h-screen flex flex-col">
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-2" style={{ fontSize: 'var(--text-sm)' }}>
        <button
          key="dashboard"
          onClick={() => onMenuClick('dashboard')}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition-colors ${
            activeMenu === 'dashboard' 
              ? 'bg-destructive text-destructive-foreground' 
              : 'text-sidebar-foreground hover:bg-muted'
          }`}
          style={{
            fontWeight: activeMenu === 'dashboard' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
          }}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        {/* Report Menu */}
        <div className="mb-1">
          <button
            onClick={() => setProductsExpanded(!productsExpanded)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isProductsActive
                ? 'bg-destructive text-destructive-foreground'
                : 'text-sidebar-foreground hover:bg-muted'
            }`}
            style={{
              fontWeight: isProductsActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
            }}
          >
            <Package className="w-4 h-4" />
            <span className="flex-1 text-left">Products</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${productsExpanded ? 'rotate-180' : ''}`} />
          </button>
          {productsExpanded && (
            <div className="ml-6 mt-1">
              <button
                onClick={() => onMenuClick('products-list')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'products-list' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'products-list' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                List
              </button>
              <button
                onClick={() => onMenuClick('products-create')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'products-create' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'products-create' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Create
              </button>
            </div>
          )}
        </div>

        {/* Setting Menu */}
        <div className="mb-1">
          <button
            onClick={() => setSettingExpanded(!settingExpanded)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isSettingActive 
                ? 'bg-destructive text-destructive-foreground' 
                : 'text-sidebar-foreground hover:bg-muted'
            }`}
            style={{
              fontWeight: isSettingActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
            }}
          >
            <Settings className="w-4 h-4" />
            <span className="flex-1 text-left">Setting</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${settingExpanded ? 'rotate-180' : ''}`} />
          </button>
          {settingExpanded && (
            <div className="ml-6 mt-1">
              <button
                onClick={() => onMenuClick('account')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'account' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'account' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Account
              </button>
              <button
                onClick={() => onMenuClick('settings')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'settings' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'settings' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Settings
              </button>
            </div>
          )}
        </div>

        {/* Files Menu - ACTIVE */}
        <div className="mb-1">
          <button
            onClick={() => setFilesExpanded(!filesExpanded)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isFilesActive
                ? 'bg-destructive text-destructive-foreground'
                : 'text-sidebar-foreground hover:bg-muted'
            }`}
            style={{
              fontWeight: isFilesActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
            }}
          >
            <FolderOpen className="w-4 h-4" />
            <span className="flex-1 text-left">Files</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${filesExpanded ? 'rotate-180' : ''}`} />
          </button>
          {filesExpanded && (
            <div className="ml-6 mt-1">
              <button
                onClick={() => onMenuClick('files')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'files' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'files' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Files
              </button>
              <button
                onClick={() => onMenuClick('folders')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'folders' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'folders' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Folders
              </button>
              <button
                onClick={() => onMenuClick('storage')}
                className={`w-full text-left px-3 py-1.5 rounded-lg ${
                  activeMenu === 'storage' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: activeMenu === 'storage' ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
              >
                Storage
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}