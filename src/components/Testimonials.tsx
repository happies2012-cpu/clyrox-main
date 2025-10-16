import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';
import { supabase, Testimonial } from '../lib/supabase';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  };

  if (testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real stories from businesses we've helped to succeed.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <GlassCard className="p-8 h-full flex flex-col justify-between" hover={false}>
                      <div>
                        <div className="flex items-center mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating ? 'text-primary-light fill-primary-light' : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-white/80 text-lg italic mb-6">"{testimonial.quote}"</p>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-white/60">{testimonial.title}</p>
                      </div>
                    </GlassCard>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}