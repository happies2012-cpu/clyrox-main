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
import { Link } from 'react-router-dom';

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  message: string;
}

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

interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  hero_image: string;
  features: Array<{ title: string; description: string }>;
  order_index: number;
  is_active: boolean;
}

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range?: string;
  is_active: boolean;
}

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

      // Mock data for the dashboard
      const recentSubmissions: ContactSubmission[] = [
        { id: '1', created_at: '2023-06-15', name: 'John Doe', email: 'john@example.com', message: 'Interested in services' },
        { id: '2', created_at: '2023-06-14', name: 'Jane Smith', email: 'jane@example.com', message: 'Job inquiry' },
        { id: '3', created_at: '2023-06-13', name: 'Bob Johnson', email: 'bob@example.com', message: 'General question' },
        { id: '4', created_at: '2023-06-12', name: 'Alice Brown', email: 'alice@example.com', message: 'Service consultation' },
        { id: '5', created_at: '2023-06-11', name: 'Charlie Wilson', email: 'charlie@example.com', message: 'Career opportunity' },
      ];

      const recentPosts: BlogPost[] = [
        { id: '1', slug: 'business-growth-strategies', title: 'Business Growth Strategies', excerpt: 'Learn how to grow your business effectively', content: '', author: 'Admin', featured_image: '', category: 'Business', tags: [], is_published: true, published_at: '2023-06-10' },
        { id: '2', slug: 'employment-trends', title: 'Employment Trends', excerpt: 'Latest trends in the job market', content: '', author: 'Admin', featured_image: '', category: 'Employment', tags: [], is_published: true, published_at: '2023-06-09' },
        { id: '3', slug: 'visa-updates', title: 'Visa Updates', excerpt: 'Recent changes in visa regulations', content: '', author: 'Admin', featured_image: '', category: 'Visa', tags: [], is_published: true, published_at: '2023-06-08' },
        { id: '4', slug: 'digital-innovation', title: 'Digital Innovation', excerpt: 'How technology is changing business', content: '', author: 'Admin', featured_image: '', category: 'Technology', tags: [], is_published: true, published_at: '2023-06-07' },
        { id: '5', slug: 'market-analysis', title: 'Market Analysis', excerpt: 'Analysis of current market conditions', content: '', author: 'Admin', featured_image: '', category: 'Analysis', tags: [], is_published: true, published_at: '2023-06-06' },
      ];

      const activeServices: Service[] = [
        { id: '1', slug: 'business-consulting', title: 'Business Consulting', subtitle: 'Strategic business solutions', description: 'Comprehensive business consulting services', icon: '', hero_image: '', features: [], order_index: 1, is_active: true },
        { id: '2', slug: 'employment-consulting', title: 'Employment Consulting', subtitle: 'Career and job placement', description: 'Expert employment consulting services', icon: '', hero_image: '', features: [], order_index: 2, is_active: true },
        { id: '3', slug: 'visa-consulting', title: 'Visa Consulting', subtitle: 'Immigration and visa assistance', description: 'Professional visa consulting services', icon: '', hero_image: '', features: [], order_index: 3, is_active: true },
        { id: '4', slug: 'design-development', title: 'Design & Development', subtitle: 'Creative and technical solutions', description: 'Innovative design and development services', icon: '', hero_image: '', features: [], order_index: 4, is_active: true },
        { id: '5', slug: 'staffing-services', title: 'Staffing Services', subtitle: 'Talent acquisition and management', description: 'Comprehensive staffing solutions', icon: '', hero_image: '', features: [], order_index: 5, is_active: true },
      ];

      const activeCareers: Career[] = [
        { id: '1', title: 'Business Consultant', department: 'Consulting', location: 'New York', employment_type: 'Full-time', description: 'Provide business consulting services', requirements: [], responsibilities: [], is_active: true },
        { id: '2', title: 'HR Specialist', department: 'Human Resources', location: 'Los Angeles', employment_type: 'Full-time', description: 'Manage human resources operations', requirements: [], responsibilities: [], is_active: true },
        { id: '3', title: 'Software Developer', department: 'Technology', location: 'San Francisco', employment_type: 'Full-time', description: 'Develop software solutions', requirements: [], responsibilities: [], is_active: true },
        { id: '4', title: 'Marketing Manager', department: 'Marketing', location: 'Chicago', employment_type: 'Full-time', description: 'Lead marketing campaigns', requirements: [], responsibilities: [], is_active: true },
        { id: '5', title: 'Visa Specialist', department: 'Immigration', location: 'Washington DC', employment_type: 'Full-time', description: 'Assist with visa applications', requirements: [], responsibilities: [], is_active: true },
      ];

      setAnalytics({
        totalServices: 12,
        totalBlogPosts: 24,
        totalCareers: 8,
        totalContactSubmissions: 42,
        monthlySubmissions,
        serviceDistribution,
        recentSubmissions,
        recentPosts,
        activeServices,
        activeCareers,
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