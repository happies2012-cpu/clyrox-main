import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

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

export default function BlogManager() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
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
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove the post from state
    setPosts(posts.filter(post => post.id !== id));
    toast.success('Post deleted successfully');
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog Posts
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => navigate('/admin/blog/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Plus className="w-5 h-5" />
            Add New Post
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No blog posts found.</p>
            <button
              onClick={() => navigate('/admin/blog/new')}
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Create Your First Post
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{post.title}</h2>
                        {!post.is_published && (
                          <span className="bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-2 py-1 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-white/70 mb-3">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-primary/20 text-primary-light text-xs font-semibold px-2 py-1 rounded">
                          {post.category}
                        </span>
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-white/10 text-white/70 text-xs font-semibold px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-white/50">
                        By {post.author} • {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}