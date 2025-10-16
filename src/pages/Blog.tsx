import { useEffect, useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, BlogPost } from '../lib/supabase';
import { motion } from 'framer-motion';
import EnhancedBlogCard from '../components/EnhancedBlogCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';

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
            <div className="flex justify-center items-center h-64">
              <EnhancedLoadingSpinner type="pulse" size="md" color="text-white" message="Loading blog posts..." />
            </div>
          ) : filteredPosts.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-xl text-white/70">
                {searchQuery 
                  ? 'No posts found matching your search. Try different keywords.' 
                  : 'No blog posts available at the moment.'}
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <EnhancedBlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  published_at={post.published_at}
                  category={post.category}
                  featured_image={post.featured_image}
                  slug={post.slug}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}