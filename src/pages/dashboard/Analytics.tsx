import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, FileText, Briefcase, Calendar } from 'lucide-react';
import EnhancedLoadingSpinner from '../../components/EnhancedLoadingSpinner';
import { notify } from '../../utils/notifications';

interface AnalyticsData {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  recentActivity: Array<{
    id: string;
    action: string;
    target: string;
    timestamp: string;
  }>;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    
    try {
      // Simulate analytics data since we don't have a real analytics system
      const mockData: AnalyticsData = {
        totalProjects: 12,
        completedProjects: 10,
        activeProjects: 2,
        recentActivity: [
          { id: '1', action: 'Created', target: 'Website Redesign Project', timestamp: '2023-06-15T10:30:00Z' },
          { id: '2', action: 'Completed', target: 'Marketing Campaign', timestamp: '2023-06-14T14:20:00Z' },
          { id: '3', action: 'Updated', target: 'Client Presentation', timestamp: '2023-06-13T09:15:00Z' },
          { id: '4', action: 'Started', target: 'New Product Launch', timestamp: '2023-06-12T16:45:00Z' },
          { id: '5', action: 'Commented on', target: 'UI Design Review', timestamp: '2023-06-11T11:30:00Z' }
        ]
      };
      
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
      notify.error.load();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const completionRate = analytics.totalProjects > 0 
    ? Math.round((analytics.completedProjects / analytics.totalProjects) * 100) 
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statCards = [
    { 
      title: 'Total Projects', 
      value: analytics.totalProjects, 
      icon: Briefcase, 
      color: 'from-blue-500 to-cyan-500',
      change: '+2 this month'
    },
    { 
      title: 'Completed', 
      value: analytics.completedProjects, 
      icon: FileText, 
      color: 'from-green-500 to-emerald-500',
      change: '+1 this week'
    },
    { 
      title: 'Active Projects', 
      value: analytics.activeProjects, 
      icon: Users, 
      color: 'from-purple-500 to-pink-500',
      change: 'No change'
    },
    { 
      title: 'Completion Rate', 
      value: `${completionRate}%`, 
      icon: TrendingUp, 
      color: 'from-orange-500 to-red-500',
      change: '+5% from last month'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <EnhancedLoadingSpinner type="dots" size="md" color="text-white" message="Loading analytics..." />
      </div>
    );
  }

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analytics
      </motion.h1>
      
      <>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <motion.span 
                  className="text-sm text-white/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {card.change}
                </motion.span>
              </div>
              <motion.h3 
                className="text-white/70 text-sm font-semibold mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {card.title}
              </motion.h3>
              <motion.p 
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {card.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl"
          >
            <motion.h2 
              className="text-xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Project Progress
            </motion.h2>
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70">Completed Projects</span>
                  <span className="text-white font-semibold">{analytics.completedProjects}/{analytics.totalProjects}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" 
                    style={{ width: `${completionRate}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="p-4 bg-white/5 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-2xl font-bold text-white">{analytics.activeProjects}</div>
                  <div className="text-white/70 text-sm">Active</div>
                </motion.div>
                <motion.div 
                  className="p-4 bg-white/5 rounded-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-2xl font-bold text-white">{analytics.totalProjects - analytics.completedProjects - analytics.activeProjects}</div>
                  <div className="text-white/70 text-sm">Planning</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl"
          >
            <motion.h2 
              className="text-xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Recent Activity
            </motion.h2>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {analytics.recentActivity.map((activity, index) => (
                <motion.div 
                  key={activity.id} 
                  className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-white/70" />
                  </div>
                  <div className="flex-grow">
                    <motion.p 
                      className="text-white"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <span className="font-semibold">{activity.action}</span> {activity.target}
                    </motion.p>
                    <motion.p 
                      className="text-white/60 text-sm"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {formatDate(activity.timestamp)}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </>
    </div>
  );
}