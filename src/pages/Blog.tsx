import { useEffect, useState, useMemo } from 'react';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import EnhancedBlogCard from '../components/EnhancedBlogCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';

// Define the BlogPost interface locally
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
    
    // Simulate loading posts without Supabase
    setTimeout(() => {
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          slug: 'business-growth-strategies',
          title: '10 Proven Business Growth Strategies for 2023',
          excerpt: 'Discover the most effective strategies to accelerate your business growth in the current market landscape.',
          content: '',
          author: 'Sarah Johnson',
          featured_image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Business',
          tags: ['growth', 'strategy', 'business'],
          is_published: true,
          published_at: '2023-06-15'
        },
        {
          id: '2',
          slug: 'digital-transformation',
          title: 'Digital Transformation: A Complete Guide',
          excerpt: 'Learn how to successfully navigate your organization through digital transformation with our comprehensive guide.',
          content: '',
          author: 'Michael Chen',
          featured_image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Technology',
          tags: ['digital', 'transformation', 'innovation'],
          is_published: true,
          published_at: '2023-06-10'
        },
        {
          id: '3',
          slug: 'effective-leadership',
          title: 'The 7 Habits of Highly Effective Leaders',
          excerpt: 'Explore the key habits that distinguish exceptional leaders from the rest and how you can develop them.',
          content: '',
          author: 'Emma Rodriguez',
          featured_image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Leadership',
          tags: ['leadership', 'management', 'development'],
          is_published: true,
          published_at: '2023-06-05'
        },
        {
          id: '4',
          slug: 'market-trends-2023',
          title: 'Top Market Trends to Watch in 2023',
          excerpt: 'Stay ahead of the competition by understanding the key market trends that will shape your industry this year.',
          content: '',
          author: 'David Wilson',
          featured_image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Market Analysis',
          tags: ['trends', 'market', 'analysis'],
          is_published: true,
          published_at: '2023-05-28'
        },
        {
          id: '5',
          slug: 'remote-work-productivity',
          title: 'Maximizing Productivity in Remote Work Environments',
          excerpt: 'Discover practical tips and tools to boost productivity while working remotely or in hybrid environments.',
          content: '',
          author: 'Lisa Thompson',
          featured_image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Workplace',
          tags: ['remote', 'productivity', 'work'],
          is_published: true,
          published_at: '2023-05-20'
        },
        {
          id: '6',
          slug: 'customer-retention',
          title: 'The Ultimate Guide to Customer Retention',
          excerpt: 'Learn proven techniques to keep your customers engaged and loyal to your brand for the long term.',
          content: '',
          author: 'Robert Kim',
          featured_image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Marketing',
          tags: ['customer', 'retention', 'marketing'],
          is_published: true,
          published_at: '2023-05-12'
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
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
