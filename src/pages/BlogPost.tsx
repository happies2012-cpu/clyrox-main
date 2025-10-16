import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { supabase, BlogPost as BlogPostType } from '../lib/supabase';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPost = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    if (data) setPost(data);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug, loadPost]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <EnhancedLoadingSpinner type="bars" size="lg" color="text-white" message="Loading blog post..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Post not found</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <PageHero title={post.title} subtitle={post.excerpt} image={post.featured_image} />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <motion.div 
                className="flex flex-wrap gap-x-8 gap-y-4 text-white/70 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  <span>{post.category}</span>
                </div>
              </motion.div>

              <motion.div 
                className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </motion.div>

              <motion.div 
                className="mt-12 border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.a
                  href="/blog"
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </motion.a>
              </motion.div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}