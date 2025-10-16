/*
  # CMS Platform Database Schema

  ## Overview
  Creates complete database structure for business consulting CMS platform with services, pages, blog, careers, and contact management.

  ## New Tables
  
  ### 1. services
    - `id` (uuid, primary key) - Unique service identifier
    - `slug` (text, unique) - URL-friendly service name
    - `title` (text) - Service display name
    - `subtitle` (text) - Short tagline
    - `description` (text) - Full service description
    - `icon` (text) - Icon identifier for UI
    - `hero_image` (text) - Hero section background image URL
    - `features` (jsonb) - Array of service features
    - `order_index` (int) - Display order
    - `is_active` (boolean) - Publication status
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 2. pages
    - `id` (uuid, primary key) - Unique page identifier
    - `slug` (text, unique) - URL-friendly page name
    - `title` (text) - Page display title
    - `meta_description` (text) - SEO description
    - `hero_title` (text) - Hero section title
    - `hero_subtitle` (text) - Hero section subtitle
    - `hero_image` (text) - Hero background image URL
    - `sections` (jsonb) - Array of page sections with content
    - `is_active` (boolean) - Publication status
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 3. blog_posts
    - `id` (uuid, primary key) - Unique post identifier
    - `slug` (text, unique) - URL-friendly post name
    - `title` (text) - Post title
    - `excerpt` (text) - Short summary
    - `content` (text) - Full post content
    - `author` (text) - Author name
    - `featured_image` (text) - Post thumbnail URL
    - `category` (text) - Post category
    - `tags` (text[]) - Post tags array
    - `is_published` (boolean) - Publication status
    - `published_at` (timestamptz) - Publication date
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 4. careers
    - `id` (uuid, primary key) - Unique job identifier
    - `title` (text) - Job title
    - `department` (text) - Department/service area
    - `location` (text) - Job location
    - `employment_type` (text) - Full-time, Part-time, Contract, etc.
    - `description` (text) - Full job description
    - `requirements` (jsonb) - Array of job requirements
    - `responsibilities` (jsonb) - Array of responsibilities
    - `salary_range` (text) - Optional salary information
    - `is_active` (boolean) - Whether job is open
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ### 5. contact_submissions
    - `id` (uuid, primary key) - Unique submission identifier
    - `name` (text) - Sender name
    - `email` (text) - Sender email
    - `phone` (text) - Optional phone number
    - `service_interest` (text) - Service they're interested in
    - `message` (text) - Contact message
    - `status` (text) - New, In Progress, Resolved
    - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for published content
  - Authenticated users (admins) can manage all content
  - Contact submissions readable only by authenticated users

  ## Indexes
  - Slug indexes for fast lookups
  - Active/published status indexes for filtering
  - Timestamp indexes for sorting
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  icon text,
  hero_image text,
  features jsonb DEFAULT '[]'::jsonb,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  hero_title text,
  hero_subtitle text,
  hero_image text,
  sections jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  author text DEFAULT 'Admin',
  featured_image text,
  category text,
  tags text[] DEFAULT '{}'::text[],
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create careers table
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text,
  location text,
  employment_type text DEFAULT 'Full-time',
  description text,
  requirements jsonb DEFAULT '[]'::jsonb,
  responsibilities jsonb DEFAULT '[]'::jsonb,
  salary_range text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_interest text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_careers_active ON careers(is_active);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for pages
CREATE POLICY "Public can view active pages"
  ON pages FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage pages"
  ON pages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for blog_posts
CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for careers
CREATE POLICY "Public can view active jobs"
  ON careers FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage careers"
  ON careers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);