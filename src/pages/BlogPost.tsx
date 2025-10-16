import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// Define the BlogPost interface locally
interface BlogPostType {
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPost = useCallback(async () => {
    setLoading(true);
    
    // Simulate loading post without Supabase
    setTimeout(() => {
      // Mock blog posts data
      const mockPosts: BlogPostType[] = [
        {
          id: '1',
          slug: 'business-growth-strategies',
          title: '10 Proven Business Growth Strategies for 2023',
          excerpt: 'Discover the most effective strategies to accelerate your business growth in the current market landscape.',
          content: `# 10 Proven Business Growth Strategies for 2023

In today's competitive business environment, growth is not just an option—it's a necessity. Companies that fail to grow often find themselves falling behind competitors or becoming irrelevant in the market. Here are 10 proven strategies that can help your business thrive in 2023.

## 1. Embrace Digital Transformation

Digital transformation is no longer a luxury but a requirement for businesses looking to stay competitive. This involves integrating digital technology into all areas of your business, fundamentally changing how you operate and deliver value to customers.

Key areas to focus on include:
- Cloud computing solutions
- Automation of repetitive tasks
- Data analytics for informed decision-making
- Enhanced customer experience through digital channels

## 2. Focus on Customer Experience

Customer experience has become a key differentiator in many industries. Companies that prioritize customer satisfaction and create seamless experiences across all touchpoints tend to see higher retention rates and increased customer lifetime value.

Consider implementing:
- Personalized customer interactions
- Omnichannel support systems
- Proactive customer service
- Regular feedback collection and analysis

## 3. Invest in Employee Development

Your employees are your greatest asset. Investing in their development not only improves their skills but also increases engagement and retention. In 2023, focus on:

- Upskilling programs for emerging technologies
- Leadership development initiatives
- Cross-functional training opportunities
- Mentorship and coaching programs

## 4. Expand into New Markets

Market expansion can provide significant growth opportunities. This could mean entering new geographical regions, targeting different customer segments, or launching new product lines.

Before expanding, ensure you:
- Conduct thorough market research
- Understand local regulations and cultural nuances
- Develop a localized marketing strategy
- Establish appropriate distribution channels

## 5. Leverage Data Analytics

Data-driven decision making is crucial for sustainable growth. By leveraging analytics, you can gain insights into customer behavior, market trends, and operational efficiency.

Key areas for analytics implementation:
- Customer behavior tracking
- Sales performance monitoring
- Operational efficiency analysis
- Predictive modeling for future trends

## 6. Build Strategic Partnerships

Strategic partnerships can accelerate growth by providing access to new markets, technologies, or expertise. Look for partners whose strengths complement your weaknesses and vice versa.

Types of partnerships to consider:
- Joint ventures for market expansion
- Technology partnerships for innovation
- Distribution partnerships for market reach
- Supplier partnerships for cost optimization

## 7. Optimize Pricing Strategies

Pricing plays a crucial role in both profitability and market positioning. Regular pricing optimization can help you capture more value while remaining competitive.

Consider implementing:
- Dynamic pricing based on demand
- Value-based pricing models
- Bundle pricing strategies
- Competitive pricing analysis

## 8. Enhance Product/Service Quality

Continuous improvement in product or service quality can lead to increased customer satisfaction, positive word-of-mouth, and premium pricing opportunities.

Focus on:
- Regular quality audits
- Customer feedback integration
- Process improvements
- Innovation in product features

## 9. Implement Agile Methodologies

Agility allows businesses to respond quickly to market changes and customer needs. Implementing agile methodologies can improve efficiency and innovation across your organization.

Key agile practices:
- Iterative development cycles
- Cross-functional team collaboration
- Continuous feedback loops
- Rapid prototyping and testing

## 10. Prioritize Sustainability

Sustainability has become a critical factor for many consumers and investors. Companies that demonstrate environmental and social responsibility often enjoy better brand reputation and customer loyalty.

Ways to incorporate sustainability:
- Reduce environmental impact
- Implement ethical business practices
- Support community initiatives
- Transparent sustainability reporting

## Conclusion

Implementing these strategies requires careful planning and execution. Start with the areas that align best with your current business situation and resources. Remember that growth is a journey, not a destination, and continuous adaptation is key to long-term success.`,
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
          content: `# Digital Transformation: A Complete Guide

Digital transformation is revolutionizing how businesses operate and deliver value to customers. In this comprehensive guide, we'll explore what digital transformation means, why it's crucial for modern businesses, and how to implement it successfully.

## What is Digital Transformation?

Digital transformation involves integrating digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.

## Why Digital Transformation Matters

In today's digital-first world, businesses that don't embrace digital transformation risk becoming obsolete. Here's why it's essential:

- **Customer Expectations**: Modern customers expect seamless digital experiences across all touchpoints.
- **Competitive Advantage**: Digital transformation can provide significant competitive advantages through improved efficiency and innovation.
- **Operational Efficiency**: Automation and digital tools can streamline operations and reduce costs.
- **Data-Driven Insights**: Digital systems generate valuable data that can inform better business decisions.

## Key Components of Digital Transformation

### 1. Technology Infrastructure

Modernize your technology stack to support digital initiatives:
- Cloud computing platforms
- Data analytics tools
- Cybersecurity measures
- Integration platforms

### 2. Process Optimization

Re-engineer business processes to take advantage of digital capabilities:
- Automation of manual tasks
- Streamlined workflows
- Real-time collaboration tools
- Digital documentation systems

### 3. Cultural Shift

Foster a culture that embraces change and innovation:
- Leadership commitment
- Employee training and development
- Change management strategies
- Innovation incentives

### 4. Customer Experience

Transform how you interact with and serve customers:
- Omnichannel engagement
- Personalized experiences
- Self-service options
- Proactive support

## Steps to Successful Digital Transformation

### Step 1: Define Your Vision

Start with a clear vision of what you want to achieve through digital transformation. This should align with your overall business strategy and objectives.

### Step 2: Assess Current State

Conduct a thorough assessment of your current digital maturity, including:
- Technology infrastructure
- Business processes
- Organizational culture
- Customer experience

### Step 3: Develop a Roadmap

Create a detailed roadmap that outlines:
- Priority initiatives
- Timeline and milestones
- Resource requirements
- Success metrics

### Step 4: Execute and Iterate

Begin implementing your transformation initiatives, starting with quick wins to build momentum. Continuously monitor progress and adjust your approach as needed.

### Step 5: Measure and Optimize

Establish key performance indicators (KPIs) to measure the success of your digital transformation efforts and make data-driven optimizations.

## Common Challenges and Solutions

### Challenge 1: Resistance to Change

**Solution**: Implement comprehensive change management strategies, including communication plans, training programs, and leadership support.

### Challenge 2: Budget Constraints

**Solution**: Prioritize initiatives based on ROI potential and consider phased implementation to spread costs over time.

### Challenge 3: Skills Gap

**Solution**: Invest in employee training and consider partnerships with technology vendors or consultants to bridge expertise gaps.

### Challenge 4: Integration Complexity

**Solution**: Choose platforms and tools with strong integration capabilities and consider working with experienced implementation partners.

## Conclusion

Digital transformation is not a one-time project but an ongoing journey. Success requires commitment from leadership, engagement from employees, and a willingness to continuously adapt and innovate. By following the strategies outlined in this guide, you can position your organization for long-term success in the digital age.`,
          author: 'Michael Chen',
          featured_image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
          category: 'Technology',
          tags: ['digital', 'transformation', 'innovation'],
          is_published: true,
          published_at: '2023-06-10'
        }
      ];
      
      // Find the post by slug
      const foundPost = mockPosts.find(p => p.slug === slug) || null;
      setPost(foundPost);
      setLoading(false);
    }, 1000);
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