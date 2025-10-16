import { useEffect, useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, BlogPost } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = ['all', ...new Set(posts.map(post => post.category).filter(Boolean))] as string[];
    return uniqueCategories;
  }, [posts]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error loading posts:', error);
    } else if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Blog"
        subtitle="Insights, tips, and industry news from our experts"
        image="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <AnimatedSection className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40 pl-14"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-4 rounded-full focus:outline-none focus:border-white/40 min-w-[200px]"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </AnimatedSection>
          </div>

          {loading ? (
            <AnimatedSection>
              <div className="flex justify-center items-center h-64">
                <div className="text-white">Loading blog posts...</div>
              </div>
            </AnimatedSection>
          ) : filteredPosts.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-white/70">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'No blog posts found matching your criteria. Try adjusting your search or filters.' 
                    : 'No blog posts available at the moment.'}
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <GlassCard className="overflow-hidden h-full flex flex-col">
                      {post.featured_image && (
                        <div className="h-48 overflow-hidden">
                          <motion.img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      )}
                      <div className="p-6 flex-grow flex flex-col">
                        {post.category && (
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white/60">{post.category}</span>
                          </div>
                        )}
                        <motion.h3 
                          className="text-2xl font-bold text-white mb-3 line-clamp-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          {post.title}
                        </motion.h3>
                        {post.excerpt && (
                          <motion.p 
                            className="text-white/70 mb-4 flex-grow line-clamp-3"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            {post.excerpt}
                          </motion.p>
                        )}
                        <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        </div>
                        <motion.a
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all font-semibold"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </GlassCard>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}