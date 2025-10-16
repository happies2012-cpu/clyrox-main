# Clyrox

A comprehensive business consulting platform with enhanced UI animations and real images.

## Features
- Business Consulting Services
- Employment Consulting
- Visa Consulting
- Design & Development
- Staffing Services
- Blog with Industry Insights
- Career Opportunities
- Contact Management
- Admin Dashboard
- User Authentication

## Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Authentication, Database, Storage)
- **Routing**: React Router
- **Build Tool**: Vite
- **UI Components**: Radix UI, Lucide React Icons
- **State Management**: React Context API
- **Notifications**: React Hot Toast

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Clyrox-main.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Clyrox-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## Project Structure
```
src/
├── components/       # Reusable UI components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Library files and utilities
├── pages/            # Page components
│   ├── admin/        # Admin dashboard pages
│   └── dashboard/    # User dashboard pages
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Available Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checking

## UI Enhancements
This project features:
- Smooth animations using Framer Motion
- Responsive design with Tailwind CSS
- Real images instead of icons in card sections
- Glass morphism UI elements
- Dark mode support
- Loading states with enhanced spinners
- Form validation with error handling
- Notification system with toast messages

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License
This project is proprietary and confidential.
