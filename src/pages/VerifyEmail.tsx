import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <AnimatedSection>
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-white/80 text-lg">
              We've sent a verification link to your email address. Please click the link to complete your
              registration.
            </p>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}