import { useEffect, useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  Users, 
  MessageSquare, 
  ArrowRight, 
  Edit3,
  TrendingUp,
  Calendar,
  BarChart2,
  PieChart,
  Activity
} from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';
import GlassCard from '../../components/GlassCard';
import { supabase, ContactSubmission, BlogPost, Service, Career } from '../../lib/supabase';
import { Link } from 'react-router-dom';

interface AnalyticsData {
  totalServices: number;
  totalBlogPosts: number;
  totalCareers: number;
  totalContactSubmissions: number;
  monthlySubmissions: Array<{ month: string; count: number }>;
  serviceDistribution: Array<{ service: string; count: number }>;
  recentSubmissions: ContactSubmission[];
  recentPosts: BlogPost[];
  activeServices: Service[];
  activeCareers: Career[];
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalServices: 0,
    totalBlogPosts: 0,
    totalCareers: 0,
    totalContactSubmissions: 0,
    monthlySubmissions: [],
    serviceDistribution: [],
    recentSubmissions: [],
    recentPosts: [],
    activeServices: [],
    activeCareers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    
    try {
      // Load all data in parallel
      const [
        services, 
        blogPosts, 
        careers, 
        contactSubmissions, 
        recentSubmissionsData, 
        recentPostsData,
        activeServicesData,
        activeCareersData
      ] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('careers').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('blog_posts').select('*').order('published_at', { ascending: false }).limit(5),
        supabase.from('services').select('*').eq('is_active', true).limit(5),
        supabase.from('careers').select('*').eq('is_active', true).limit(5),
      ]);

      // Simulate analytics data
      const monthlySubmissions = [
        { month: 'Jan', count: 12 },
        { month: 'Feb', count: 19 },
        { month: 'Mar', count: 8 },
        { month: 'Apr', count: 15 },
        { month: 'May', count: 11 },
        { month: 'Jun', count: 22 },
      ];

      const serviceDistribution = [
        { service: 'Business Consulting', count: 25 },
        { service: 'Employment Consulting', count: 30 },
        { service: 'Visa Consulting', count: 15 },
        { service: 'Design & Development', count: 20 },
        { service: 'Staffing Services', count: 10 },
      ];

      setAnalytics({
        totalServices: services.count || 0,
        totalBlogPosts: blogPosts.count || 0,
        totalCareers: careers.count || 0,
        totalContactSubmissions: contactSubmissions.count || 0,
        monthlySubmissions,
        serviceDistribution,
        recentSubmissions: recentSubmissionsData.data || [],
        recentPosts: recentPostsData.data || [],
        activeServices: activeServicesData.data || [],
        activeCareers: activeCareersData.data || [],
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      icon: Briefcase, 
      title: 'Services', 
      value: analytics.totalServices, 
      color: 'from-blue-500 to-cyan-500', 
      link: '/admin/services' 
    },
    { 
      icon: FileText, 
      title: 'Blog Posts', 
      value: analytics.totalBlogPosts, 
      color: 'from-purple-500 to-pink-500', 
      link: '/admin/blog' 
    },
    { 
      icon: Users, 
      title: 'Job Openings', 
      value: analytics.totalCareers, 
      color: 'from-green-500 to-emerald-500', 
      link: '/admin/careers' 
    },
    {
      icon: MessageSquare,
      title: 'Contact Submissions',
      value: analytics.totalContactSubmissions,
      color: 'from-orange-500 to-red-500',
      link: '/admin/submissions'
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/70 mb-8">An overview of your platform's activity.</p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <AnimatedSection key={index} delay={index * 0.1}>
            <Link to={card.link} className="block">
              <GlassCard className="p-6 hover:bg-white/15 transition-all">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white/70 text-sm font-semibold mb-1">{card.title}</h3>
                <p className="text-4xl font-bold text-white">{card.value}</p>
              </GlassCard>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <AnimatedSection delay={0.4} className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-6 h-6" />
                Submissions Trend
              </h2>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.monthlySubmissions.map((item, index) => {
                const maxHeight = 200;
                const height = (item.count / Math.max(...analytics.monthlySubmissions.map(m => m.count))) * maxHeight;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t transition-all hover:from-blue-400 hover:to-cyan-400"
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-white/70 text-xs mt-2">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <PieChart className="w-6 h-6" />
                Service Distribution
              </h2>
            </div>
            <div className="space-y-4">
              {analytics.serviceDistribution.map((item, index) => {
                const percentage = Math.round((item.count / analytics.serviceDistribution.reduce((sum, s) => sum + s.count, 0)) * 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{item.service}</span>
                      <span className="text-white/70">{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <AnimatedSection delay={0.6}>
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Active Services
              </h2>
              <Link to="/admin/services" className="text-primary-light hover:text-white text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {analytics.activeServices.length > 0 ? (
                analytics.activeServices.map((service) => (
                  <div key={service.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{service.title}</p>
                      <p className="text-xs text-white/60">{service.subtitle}</p>
                    </div>
                    <Link to={`/admin/services/edit/${service.id}`} className="text-sm text-primary-light hover:text-white flex items-center gap-1">
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No active services.</p>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="w-6 h-6" />
                Active Job Openings
              </h2>
              <Link to="/admin/careers" className="text-primary-light hover:text-white text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {analytics.activeCareers.length > 0 ? (
                analytics.activeCareers.map((career) => (
                  <div key={career.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{career.title}</p>
                      <p className="text-xs text-white/60">{career.department} • {career.location}</p>
                    </div>
                    <Link to={`/admin/careers/edit/${career.id}`} className="text-sm text-primary-light hover:text-white flex items-center gap-1">
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No active job openings.</p>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <AnimatedSection delay={0.8}>
          <GlassCard className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Latest Submissions
              </h2>
              <Link to="/admin/submissions" className="text-primary-light hover:text-white text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {analytics.recentSubmissions.length > 0 ? (
                analytics.recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-white">{submission.name}</p>
                      <p className="text-xs text-white/60">{submission.email}</p>
                    </div>
                    <span className="text-sm text-white/70">{formatDate(submission.created_at)}</span>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No new submissions.</p>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>
        
        <AnimatedSection delay={0.9}>
          <GlassCard className="p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Recent Blog Posts
              </h2>
              <Link to="/admin/blog" className="text-primary-light hover:text-white text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {analytics.recentPosts.length > 0 ? (
                analytics.recentPosts.map((post) => (
                  <div key={post.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-white truncate max-w-xs">{post.title}</p>
                      <p className="text-xs text-white/60">{post.category}</p>
                    </div>
                    <Link to={`/admin/blog/edit/${post.id}`} className="text-sm text-primary-light hover:text-white flex items-center gap-1">
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-white/60">No recent posts.</p>
              )}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </>
  );
}