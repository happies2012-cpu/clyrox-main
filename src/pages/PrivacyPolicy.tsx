import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { Search } from 'lucide-react';

export default function PrivacyPolicy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [originalContent, setOriginalContent] = useState<any[]>([]);

  useEffect(() => {
    // Extract content sections for filtering
    const contentSections = [
      { id: 1, title: 'Introduction', content: 'Welcome to Clyrox. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@clyrox.com.' },
      { id: 2, title: 'Information We Collect', content: 'We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use.' },
      { id: 3, title: 'How We Use Your Information', content: 'We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.' },
      { id: 4, title: 'Will Your Information Be Shared With Anyone?', content: 'We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.' },
      { id: 5, title: 'How Long Do We Keep Your Information?', content: 'We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.' },
      { id: 6, title: 'How Do We Keep Your Information Safe?', content: 'We aim to protect your personal information through a system of organizational and technical security measures.' },
      { id: 7, title: 'Do We Collect Information From Minors?', content: 'We do not knowingly solicit data from or market to children under 18 years of age.' },
      { id: 8, title: 'What Are Your Privacy Rights?', content: 'In some regions, such as the European Economic Area (EEA) and UK, you have rights that allow you greater access to and control over your personal information.' },
      { id: 9, title: 'How Can You Contact Us About This Policy?', content: 'If you have questions or comments about this policy, you may email us at privacy@clyrox.com or by post to: Clyrox, 123 Business Street, Suite 100, City, State 12345.' }
    ];
    
    setOriginalContent(contentSections);
    setFilteredContent(contentSections);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredContent(originalContent);
      return;
    }

    const filtered = originalContent.filter(section => 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredContent(filtered);
  }, [searchQuery, originalContent]);

  return (
    <div className="min-h-screen">
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
        image="https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search privacy policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40 pl-14"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed space-y-6">
                <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                {filteredContent.length > 0 ? (
                  filteredContent.map((section) => (
                    <div key={section.id}>
                      <h2>{section.title}</h2>
                      <p>{section.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/70">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}