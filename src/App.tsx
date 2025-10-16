import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Career from './pages/Career';
import CareerDetail from './pages/CareerDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Projects from './pages/dashboard/Projects';
import Analytics from './pages/dashboard/Analytics';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesManager from './pages/admin/ServicesManager';
import ServiceEditor from './pages/admin/ServiceEditor';
import BlogManager from './pages/admin/BlogManager';
import BlogEditor from './pages/admin/BlogEditor';
import CareersManager from './pages/admin/CareersManager';
import CareerEditor from './pages/admin/CareerEditor';
import ContactSubmissions from './pages/admin/ContactSubmissions';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import TestimonialEditor from './pages/admin/TestimonialEditor';
import NewsletterManager from './pages/admin/NewsletterManager';
import UserManagement from './pages/admin/UserManagement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { AuthProvider } from './contexts/AuthContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import ToasterProvider from './components/ToasterProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserPreferencesProvider>
          <div className="min-h-screen bg-slate-900">
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-slate-900 focus:px-4 focus:py-2 focus:rounded-lg"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/career" element={<Career />} />
                <Route path="/career/:id" element={<CareerDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="services" element={<ServicesManager />} />
                  <Route path="services/new" element={<ServiceEditor />} />
                  <Route path="services/edit/:id" element={<ServiceEditor />} />
                  <Route path="blog" element={<BlogManager />} />
                  <Route path="blog/new" element={<BlogEditor />} />
                  <Route path="blog/edit/:id" element={<BlogEditor />} />
                  <Route path="careers" element={<CareersManager />} />
                  <Route path="careers/new" element={<CareerEditor />} />
                  <Route path="careers/edit/:id" element={<CareerEditor />} />
                  <Route path="testimonials" element={<TestimonialsManager />} />
                  <Route path="testimonials/new" element={<TestimonialEditor />} />
                  <Route path="testimonials/edit/:id" element={<TestimonialEditor />} />
                  <Route path="submissions" element={<ContactSubmissions />} />
                  <Route path="newsletter" element={<NewsletterManager />} />
                  <Route path="users" element={<UserManagement />} />
                </Route>

                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<Projects />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </main>
            <Footer />
            <ToasterProvider />
          </div>
        </UserPreferencesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;