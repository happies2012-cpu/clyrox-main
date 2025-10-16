import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SearchResult {
  id: string;
  title: string;
  type: 'service' | 'blog' | 'career';
  url: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Close search with Escape key
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const searchContent = useCallback(async () => {
    setLoading(true);
    
    try {
      // Search services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('id, title, slug')
        .ilike('title', `%${query}%`)
        .eq('is_active', true)
        .limit(3);

      // Search blog posts
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('id, title, slug')
        .ilike('title', `%${query}%`)
        .eq('is_published', true)
        .limit(3);

      // Search careers
      const { data: careersData, error: careersError } = await supabase
        .from('careers')
        .select('id, title')
        .ilike('title', `%${query}%`)
        .eq('is_active', true)
        .limit(3);

      if (!servicesError && !blogError && !careersError) {
        const serviceResults = servicesData?.map(item => ({
          id: item.id,
          title: item.title,
          type: 'service' as const,
          url: `/services/${item.slug}`
        })) || [];

        const blogResults = blogData?.map(item => ({
          id: item.id,
          title: item.title,
          type: 'blog' as const,
          url: `/blog/${item.slug}`
        })) || [];

        const careerResults = careersData?.map(item => ({
          id: item.id,
          title: item.title,
          type: 'career' as const,
          url: `/career/${item.id}`
        })) || [];

        setResults([...serviceResults, ...blogResults, ...careerResults]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 2) {
      searchContent();
    } else {
      setResults([]);
    }
  }, [query, searchContent]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'service': return 'Service';
      case 'blog': return 'Blog Post';
      case 'career': return 'Career';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-500/20 text-blue-400';
      case 'blog': return 'bg-purple-500/20 text-purple-400';
      case 'career': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (isOpen && searchContainer && !searchContainer.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative search-container">
      <div 
        className="flex items-center gap-2 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-white/50"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Open search"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Search className="w-4 h-4 text-white/70" />
        <span className="text-white/70 text-sm hidden sm:block">Search...</span>
        <span className="text-white/50 text-xs ml-auto hidden sm:block">Ctrl+K</span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" role="dialog" aria-modal="true" aria-label="Search dialog">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div className="relative w-full max-w-2xl backdrop-blur-xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-10">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-white/70" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, blog posts, careers..."
                  className="flex-grow bg-transparent text-white placeholder-white/50 focus:outline-none"
                  autoFocus
                  aria-label="Search input"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto" role="listbox">
              {loading ? (
                <div className="p-8 text-center text-white/70" aria-live="polite">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((result) => (
                    <a
                      key={`${result.type}-${result.id}`}
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all group focus:outline-none focus:ring-2 focus:ring-white/50"
                      role="option"
                    >
                      <div>
                        <div className="font-medium text-white group-hover:text-primary-light group-focus:text-primary-light">
                          {result.title}
                        </div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getTypeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </div>
                      </div>
                      <div className="text-white/50 text-sm">
                        ↵
                      </div>
                    </a>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="p-8 text-center text-white/70" aria-live="polite">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="p-8 text-center text-white/70" aria-live="polite">
                  Type at least 3 characters to search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}