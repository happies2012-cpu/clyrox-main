import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FileText, Search } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  size: number;
  uploadedAt: string;
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onMediaSelect: (url: string) => void;
}

const mockMedia: MediaItem[] = [
  {
    id: '1',
    name: 'business-meeting.jpg',
    url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    type: 'image',
    size: 2456789,
    uploadedAt: '2023-06-15',
  },
  {
    id: '2',
    name: 'team-collaboration.png',
    url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    type: 'image',
    size: 1890456,
    uploadedAt: '2023-06-12',
  },
  {
    id: '3',
    name: 'company-profile.pdf',
    url: '#',
    type: 'document',
    size: 3245678,
    uploadedAt: '2023-06-10',
  },
  {
    id: '4',
    name: 'product-showcase.jpg',
    url: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
    type: 'image',
    size: 2123456,
    uploadedAt: '2023-06-08',
  },
];

export default function MediaLibrary({ isOpen, onClose, onMediaSelect }: MediaLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filteredMedia = mockMedia.filter(media => 
    media.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, this would upload to a storage service
      console.log('Uploading files:', files);
      alert('File upload functionality would be implemented in a real application');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl h-[80vh] backdrop-blur-xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Media Library</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-white/10">
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-10 py-2 rounded-lg focus:outline-none focus:border-white/40"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,application/pdf"
            />
          </div>
        </div>

        <div className="flex-grow overflow-hidden flex">
          <div className="w-2/3 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-4">
              {filteredMedia.map((media) => (
                <div
                  key={media.id}
                  onClick={() => setSelectedMedia(media)}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMedia?.id === media.id 
                      ? 'border-primary' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  {media.type === 'image' ? (
                    <img 
                      src={media.url} 
                      alt={media.name} 
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-white/10 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{media.name}</span>
                  </div>
                  <div className="p-2 bg-black/70">
                    <p className="text-white text-xs truncate">{media.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 border-l border-white/10 p-6 flex flex-col">
            {selectedMedia ? (
              <>
                <div className="mb-6">
                  {selectedMedia.type === 'image' ? (
                    <img 
                      src={selectedMedia.url} 
                      alt={selectedMedia.name} 
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-12 h-12 text-white/50" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 flex-grow">
                  <div>
                    <h3 className="text-white font-semibold mb-1">Name</h3>
                    <p className="text-white/70 text-sm">{selectedMedia.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-1">Type</h3>
                    <p className="text-white/70 text-sm capitalize">{selectedMedia.type}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-1">Size</h3>
                    <p className="text-white/70 text-sm">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold mb-1">Uploaded</h3>
                    <p className="text-white/70 text-sm">{selectedMedia.uploadedAt}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => onMediaSelect(selectedMedia.url)}
                      className="w-full backdrop-blur-xl bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-all"
                    >
                      Insert Media
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-white/50">
                <p>Select a media item to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}