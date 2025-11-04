# CareBuild SMA - Site Management Platform

A comprehensive site management and client reporting platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🔐 Authentication
- Client and Supervisor roles
- Supabase Authentication
- Secure login/signup system

### 📊 Dashboard
- **Client View**: Active projects, updates, payments
- **Supervisor View**: Assigned sites, report uploads, schedule tracking
- **Admin View**: Project management, user oversight, analytics

### 💳 Subscription Plans
- Basic, Professional, and Executive tiers
- Flutterwave payment integration
- Automatic plan activation

### 📝 Site Reporting
- Daily/weekly logs with photos and videos
- Auto-notifications to clients
- Progress tracking and issue reporting

### 💰 Budget & Expense Tracking
- Real-time budget monitoring
- Expense breakdowns
- In-app wallet for payments

### 📈 Analytics & Summary
- Work progress visualization
- Budget usage charts
- Site visits tracking
- Monthly reports

### 👨‍💼 Admin Panel
- Assign supervisors to projects
- Approve updates and manage payments
- Comprehensive analytics overview

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Payments**: Flutterwave
- **UI/UX**: Framer Motion, Lucide React
- **Charts**: Recharts
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase project
- Flutterwave account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carebuild-sma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Flutterwave Configuration
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
   FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Supabase Setup**
   - Create a new Supabase project
   - Enable Authentication (Email/Password)
   - Create the required database tables (see Database Schema section)
   - Enable Storage for file uploads
   - Add your domain to authorized domains

5. **Flutterwave Setup**
   - Create a Flutterwave account
   - Get your API keys from the dashboard
   - Configure webhook URLs

6. **Run the development server**
```bash
npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

Create the following tables in your Supabase database:

### Users Table
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('client', 'supervisor', 'admin')) DEFAULT 'client',
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES users(id) NOT NULL,
  supervisor_id UUID REFERENCES users(id),
  status TEXT CHECK (status IN ('active', 'completed', 'on-hold', 'cancelled')) DEFAULT 'active',
  budget DECIMAL(15,2) NOT NULL,
  spent DECIMAL(15,2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Site Reports Table
```sql
CREATE TABLE site_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) NOT NULL,
  supervisor_id UUID REFERENCES users(id) NOT NULL,
  type TEXT CHECK (type IN ('daily', 'weekly', 'milestone')) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[],
  videos TEXT[],
  notes TEXT,
  weather TEXT,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100) DEFAULT 0,
  issues TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  plan TEXT CHECK (plan IN ('basic', 'professional', 'executive')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired')) DEFAULT 'active',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id UUID REFERENCES projects(id),
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  type TEXT CHECK (type IN ('subscription', 'project', 'wallet')) NOT NULL,
  flutterwave_ref TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)
Enable RLS on all tables and create appropriate policies for your use case.

## Project Structure

```
carebuild-sma/
├── app/                    # Next.js app directory
├── apps/                   # Feature-specific pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── admin/             # Admin panel
│   ├── reports/           # Site reporting
│   ├── payments/          # Subscription management
│   └── analytics/         # Analytics dashboard
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── admin/            # Admin components
│   ├── reports/          # Reporting components
│   ├── payments/         # Payment components
│   └── analytics/        # Analytics components
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── store/                # State management
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## User Roles

### Client
- View project progress and updates
- Make payments and manage subscriptions
- Access analytics and reports
- Receive notifications

### Supervisor
- Submit site reports with media
- Track assigned projects
- Schedule site visits
- View project analytics

### Admin
- Manage all projects and users
- Assign supervisors to projects
- Oversee payments and subscriptions
- Access comprehensive analytics

## Key Features

### Authentication System
- Role-based access control
- Secure Firebase authentication
- User profile management

### Dashboard
- Real-time project updates
- Interactive charts and analytics
- Quick action buttons
- Responsive design

### Site Reporting
- Rich media uploads (photos/videos)
- Progress tracking
- Issue and recommendation logging
- Weather condition tracking

### Payment Integration
- Multiple subscription tiers
- Secure Flutterwave integration
- Automatic plan activation
- Payment history tracking

### Analytics
- Visual progress tracking
- Budget utilization charts
- Site visit analytics
- Performance metrics

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Mobile app development
- [ ] Advanced reporting features
- [ ] API integration
- [ ] White-label options
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Team collaboration tools