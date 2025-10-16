import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, BlogPost } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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
    const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (data) setPost(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id, loadPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      ...post,
      published_at: new Date().toISOString(),
    };

    const { error } = id
      ? await supabase.from('blog_posts').update(postData).eq('id', id)
      : await supabase.from('blog_posts').insert([postData]);

    if (error) {
      toast.error('Error saving post: ' + error.message);
    } else {
      toast.success(`Post ${id ? 'updated' : 'created'} successfully!`);
      navigate('/admin/blog');
    }
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
            <label htmlFor="author" className="block text-white mb-2 font-semibold">Author</label>
            <input 
              type="text" 
              name="author" 
              value={post.author} 
              onChange={handleChange} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <label htmlFor="category" className="block text-white mb-2 font-semibold">Category</label>
            <select 
              name="category" 
              value={post.category} 
              onChange={handleChange} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
            >
              <option value="Business">Business</option>
              <option value="Employment">Employment</option>
              <option value="Immigration">Immigration</option>
              <option value="Technology">Technology</option>
              <option value="Industry News">Industry News</option>
            </select>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <label htmlFor="tags" className="block text-white mb-2 font-semibold">Tags (comma-separated)</label>
          <input 
            type="text" 
            name="tags" 
            value={Array.isArray(post.tags) ? post.tags.join(', ') : ''} 
            onChange={handleChange} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <input 
            type="checkbox" 
            name="is_published" 
            checked={post.is_published} 
            onChange={handleChange} 
            className="h-5 w-5 rounded bg-white/10 border-white/20 focus:ring-primary focus:ring-2" 
          />
          <label htmlFor="is_published" className="text-white font-semibold">Published</label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : 'Save Post'}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}