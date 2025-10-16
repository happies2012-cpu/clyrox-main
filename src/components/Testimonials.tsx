import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';

// Define the Testimonial interface locally
interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  is_active: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    // Simulate loading testimonials without Supabase
    const mockTestimonials: Testimonial[] = [
      {
        id: '1',
        created_at: '2023-06-15',
        name: 'John Smith',
        title: 'CEO, TechCorp',
        quote: 'Working with Clyrox transformed our business operations. Their strategic insights helped us increase revenue by 40% in just six months.',
        rating: 5,
        is_active: true
      },
      {
        id: '2',
        created_at: '2023-05-20',
        name: 'Sarah Johnson',
        title: 'HR Director, Global Solutions',
        quote: 'The employment consulting services were exceptional. They helped us build a world-class team that drives innovation daily.',
        rating: 5,
        is_active: true
      },
      {
        id: '3',
        created_at: '2023-04-10',
        name: 'Michael Chen',
        title: 'Founder, StartupX',
        quote: 'Their visa consulting expertise made our international expansion seamless. Highly recommended for any business going global.',
        rating: 4,
        is_active: true
      },
      {
        id: '4',
        created_at: '2023-03-05',
        name: 'Emily Rodriguez',
        title: 'Marketing VP, BrandCorp',
        quote: 'The digital marketing strategies implemented by Clyrox increased our online visibility and customer engagement significantly.',
        rating: 5,
        is_active: true
      },
      {
        id: '5',
        created_at: '2023-02-18',
        name: 'David Wilson',
        title: 'Operations Manager, LogisticsPlus',
        quote: 'Their staffing services provided us with top-tier talent that perfectly matched our company culture and requirements.',
        rating: 4,
        is_active: true
      },
      {
        id: '6',
        created_at: '2023-01-30',
        name: 'Lisa Thompson',
        title: 'CTO, InnovateTech',
        quote: 'The design and development team delivered beyond our expectations. Our new platform has received outstanding user feedback.',
        rating: 5,
        is_active: true
      }
    ];
    
    setTestimonials(mockTestimonials);
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
                    <GlassCard className="p-8 h-full flex flex-col justify-between">
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