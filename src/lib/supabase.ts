import { createClient } from '@supabase/supabase-js';

// Use dummy values for open access deployment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key';

// Create client without throwing error for missing environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Service {
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

export interface BlogPost {
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

export interface Career {
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

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  message: string;
}

export interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
  is_active: boolean;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
}