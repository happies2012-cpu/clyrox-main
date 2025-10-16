import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { Search } from 'lucide-react';

export default function TermsOfService() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [originalContent, setOriginalContent] = useState<any[]>([]);

  useEffect(() => {
    // Extract content sections for filtering
    const contentSections = [
      { id: 1, title: 'Agreement to Terms', content: 'By using our Services, you agree to be bound by these Terms. If you don\'t agree to be bound by these Terms, do not use the Services.' },
      { id: 2, title: 'Privacy Policy', content: 'Please refer to our Privacy Policy for information on how we collect, use and disclose information from our users. You acknowledge and agree that your use of the Services is subject to our Privacy Policy.' },
      { id: 3, title: 'Changes to Terms or Services', content: 'We may update the Terms at any time, in our sole discretion. If we do so, we\'ll let you know either by posting the updated Terms on the Site or through other communications.' },
      { id: 4, title: 'Who May Use the Services?', content: 'You may use the Services only if you are 18 years or older and capable of forming a binding contract with Clyrox and are not barred from using the Services under applicable law.' },
      { id: 5, title: 'Content Ownership', content: 'We do not claim any ownership rights in any User Content and nothing in these Terms will be deemed to restrict any rights that you may have to use and exploit your User Content.' },
      { id: 6, title: 'General Prohibitions', content: 'You agree not to do any of the following: Post, upload, publish, submit or transmit any Content that infringes, misappropriates or violates a third party\'s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy.' },
      { id: 7, title: 'Termination', content: 'We may terminate your access to and use of the Services, at our sole discretion, at any time and without notice to you.' },
      { id: 8, title: 'Contact Information', content: 'If you have any questions about these Terms or the Services, please contact us at legal@clyrox.com.' }
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
        title="Terms of Service"
        subtitle="Please read these terms carefully"
        image="https://images.pexels.com/photos/159304/network-notebook-macbook-pro-conference-159304.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />
      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search terms of service..."
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