import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FileManager } from './components/FileManager';
import { FileUpload } from './components/FileUpload';
import { StorageStats } from './components/StorageStats';
import { ProductsList } from './components/ProductsList';
import { ProductEditor } from './components/ProductEditor';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

interface UploadedFile {
  file: File;
  category: string;
}

export default function App() {
  const [activeMenu, setActiveMenu] = useState('products-list');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleFileUpload = (files: UploadedFile[]) => {
    console.log('Uploading files:', files);
    
    toast.success('Files uploaded successfully', {
      description: `${files.length} file(s) have been uploaded to your storage.`,
    });
    
    setShowUploadModal(false);
  };

  const handleOpenUploadModal = () => {
    console.log('Event: open_file_upload');
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleCreateFolder = () => {
    console.log('Event: create_folder');
    toast.info('Create Folder', {
      description: 'Folder creation feature coming soon!',
    });
  };

  const handleProductSave = () => {
    setActiveMenu('products-list');
    setEditingProductId(null);
  };

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setActiveMenu('products-create');
  };

  const handleCreateProduct = () => {
    setEditingProductId(null);
    setActiveMenu('products-create');
  };

  const handleBackToList = () => {
    setEditingProductId(null);
    setActiveMenu('products-list');
  };

  return (
    <div className="flex h-screen bg-background">
      <Toaster position="top-right" />
      <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {/* Page Content */}
          <div className="p-6">
            {activeMenu === 'files' && (
              <FileManager 
                onUploadClick={handleOpenUploadModal}
                onCreateFolderClick={handleCreateFolder}
              />
            )}
            {activeMenu === 'storage' && (
              <StorageStats />
            )}
            {activeMenu === 'folders' && (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Folder management coming soon...
              </div>
            )}
            {activeMenu === 'products-list' && (
              <ProductsList 
                onCreateClick={handleCreateProduct}
                onEditClick={handleEditProduct}
              />
            )}
            {activeMenu === 'products-create' && (
              <ProductEditor 
                productId={editingProductId || undefined}
                onBack={handleBackToList}
                onSave={handleProductSave}
              />
            )}
            {activeMenu === 'dashboard' && (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Dashboard coming soon...
              </div>
            )}
            {!['files', 'storage', 'folders', 'products-list', 'products-create', 'dashboard'].includes(activeMenu) && (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)} section
              </div>
            )}
          </div>
        </main>
      </div>

      {/* File Upload Modal */}
      <FileUpload
        isOpen={showUploadModal}
        onClose={handleCloseUploadModal}
        onSubmit={handleFileUpload}
      />
    </div>
  );
}