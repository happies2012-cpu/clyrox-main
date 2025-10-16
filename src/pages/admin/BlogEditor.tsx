import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// Define the BlogPost interface
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featured_image: string;
  category: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
}

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Clyrox Team',
    featured_image: '',
    category: 'Industry News',
    tags: [],
    is_published: false,
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  const loadPost = useCallback(async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data for editing
    if (id) {
      const mockPost: BlogPost = {
        id: id,
        slug: 'getting-started-with-web-development',
        title: 'Getting Started with Web Development',
        excerpt: 'Learn the basics of web development and how to get started in this exciting field.',
        content: '# Getting Started with Web Development\n\nWeb development is an exciting field...',
        author: 'Clyrox Team',
        featured_image: '/placeholder-image.jpg',
        category: 'Tutorial',
        tags: ['web development', 'beginner', 'tutorial'],
        is_published: true,
        published_at: new Date().toISOString()
      };
      setPost(mockPost);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id, loadPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success(`Post ${id ? 'updated' : 'created'} successfully!`);
    navigate('/admin/blog');
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setPost({
      ...post,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : name === 'tags' ? value.split(',').map(tag => tag.trim()) : value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {id ? 'Edit Post' : 'Add New Post'}
      </motion.h1>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="title" className="block text-white mb-2 font-semibold">Title</label>
            <input 
              type="text" 
              name="title" 
              value={post.title} 
              onChange={handleChange} 
              required 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="slug" className="block text-white mb-2 font-semibold">Slug</label>
            <input 
              type="text" 
              name="slug" 
              value={post.slug} 
              onChange={handleChange} 
              required 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="excerpt" className="block text-white mb-2 font-semibold">Excerpt</label>
          <textarea 
            name="excerpt" 
            value={post.excerpt} 
            onChange={handleChange} 
            rows={3} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label className="block text-white mb-2 font-semibold">Content</label>
          <div className="flex border-b border-white/20 mb-2">
            <motion.button 
              type="button" 
              onClick={() => setActiveTab('write')} 
              className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'write' ? 'text-white border-b-2 border-primary' : 'text-white/60 hover:text-white/80'}`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              Write
            </motion.button>
            <motion.button 
              type="button" 
              onClick={() => setActiveTab('preview')} 
              className={`px-4 py-2 font-semibold transition-colors ${activeTab === 'preview' ? 'text-white border-b-2 border-primary' : 'text-white/60 hover:text-white/80'}`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              Preview
            </motion.button>
          </div>
          {activeTab === 'write' ? (
            <textarea 
              name="content" 
              value={post.content} 
              onChange={handleChange} 
              rows={15} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg font-mono focus:outline-none focus:border-white/40 transition-all" 
            />
          ) : (
            <motion.div 
              className="prose prose-invert max-w-none text-white/80 p-4 rounded-lg bg-white/5 border border-white/20 min-h-[400px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ReactMarkdown>{post.content || "Nothing to preview yet."}</ReactMarkdown>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor="featured_image" className="block text-white mb-2 font-semibold">Featured Image URL</label>
          <input 
            type="text" 
            name="featured_image" 
            value={post.featured_image} 
            onChange={handleChange} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label htmlFor="category" className="block text-white mb-2 font-semibold">Category</label>
            <select 
              name="category" 
              value={post.category} 
              onChange={handleChange} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
            >
              <option value="Industry News">Industry News</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Case Study">Case Study</option>
              <option value="Announcement">Announcement</option>
            </select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <label htmlFor="tags" className="block text-white mb-2 font-semibold">Tags (comma separated)</label>
            <input 
              type="text" 
              name="tags" 
              value={Array.isArray(post.tags) ? post.tags.join(', ') : ''} 
              onChange={handleChange} 
              placeholder="web development, react, tutorial"
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <label className="flex items-center gap-2 text-white font-semibold">
            <input 
              type="checkbox" 
              name="is_published" 
              checked={post.is_published} 
              onChange={handleChange} 
              className="w-4 h-4 rounded focus:ring-primary focus:border-primary" 
            />
            Published
          </label>
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/admin/blog')}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
          >
            Cancel
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}