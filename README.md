# Multi-Tenant Learning Management System (LMS)

A comprehensive, modern Learning Management System built with Next.js, featuring multi-tenant architecture, role-based access control, and a rich learning experience.

## 🚀 Features

### 🏢 Multi-Tenant Architecture

- **Tenant Isolation**: Complete data separation between organizations
- **Custom Branding**: Tenant-specific themes, logos, and color schemes
- **Domain Support**: Custom domain mapping for each tenant
- **Flexible Settings**: Configurable registration policies and user roles

### 👥 Role-Based Access Control

- **Admin Dashboard**: Complete system oversight, user management, analytics
- **Instructor Portal**: Course creation, student progress tracking, analytics
- **Learner Interface**: Course enrollment, progress tracking, achievement system

### 📚 Course Management

- **Rich Course Builder**: Drag-and-drop lesson creation with multimedia support
- **Content Types**: Video lessons, text content, quizzes, downloadable resources
- **Progress Tracking**: Detailed lesson completion and time tracking
- **Pricing Models**: Flexible pricing with multiple currency support

### 🎓 Learning Experience

- **Interactive Video Player**: Custom video controls with progress tracking
- **Note-Taking System**: Lesson-specific notes with timestamps
- **Quiz Engine**: Built-in assessment tools with scoring
- **Achievement System**: Badges and certificates for milestones

### 📊 Analytics & Reporting

- **Student Analytics**: Progress tracking, engagement metrics, performance insights
- **Course Analytics**: Enrollment stats, completion rates, revenue tracking
- **Instructor Dashboard**: Student management, course performance, earnings

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: System-wide theme switching
- **Accessibility**: WCAG compliant with keyboard navigation
- **Modern Components**: Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **Next.js 13.5.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### State Management

- **React Context** - For authentication and tenant management
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Key Libraries

- **@tanstack/react-query** - Data fetching and caching
- **recharts** - Chart and analytics visualization
- **date-fns** - Date manipulation utilities
- **class-variance-authority** - Component variant management
- **sonner** - Toast notifications

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-3
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard routes
│   │   ├── admin/              # Admin-only pages
│   │   ├── courses/            # Course management
│   │   │   ├── [id]/          # Dynamic course routes
│   │   │   │   ├── edit/      # Course editing
│   │   │   │   └── learn/     # Learning interface
│   │   │   └── create/        # Course creation
│   │   ├── messages/          # Messaging system
│   │   ├── profile/           # User profile
│   │   └── ...                # Other dashboard routes
│   ├── login/                  # Authentication
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/                  # Reusable components
│   ├── auth/                   # Authentication components
│   ├── courses/                # Course-related components
│   ├── dashboard/              # Dashboard components
│   ├── layout/                 # Layout components
│   ├── learning/               # Learning interface components
│   ├── shared/                 # Shared utility components
│   └── ui/                     # UI component library
├── hooks/                       # Custom React hooks
├── lib/                        # Utilities and configuration
│   ├── contexts/              # React contexts
│   ├── mock-data/             # Mock data for development
│   ├── types/                 # TypeScript type definitions
│   └── utils.ts               # Utility functions
├── middleware.ts               # Next.js middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎯 Key Features Breakdown

### Authentication & Authorization

- Secure login system with role-based access
- Context-based state management for user sessions
- Protected routes with middleware

### Course Creation & Management

- **Course Builder**: Comprehensive course creation tool
- **Lesson Management**: Add video, text, quizzes, and resources
- **Publishing System**: Draft/published state management
- **Analytics Integration**: Track course performance

### Learning Interface

- **Video Player**: Custom player with progress tracking
- **Lesson Navigation**: Sequential and random access
- **Quiz System**: Interactive assessments with scoring
- **Note Taking**: Persistent lesson notes
- **Resource Downloads**: Supplementary materials

### Multi-Tenant Features

- **Tenant Context**: Organization-specific data isolation
- **Custom Theming**: Per-tenant branding and styling
- **Domain Management**: Subdomain and custom domain support

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Static Export Configuration

The project is configured for static export in `next.config.js`:

```javascript
module.exports = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Optimized layouts with touch-friendly interfaces
- **Mobile**: Single-column layouts with mobile-first design

## 🎨 Theming

### Tailwind CSS Configuration

- Custom color schemes for multi-tenant branding
- Dark/light mode support
- Consistent spacing and typography scales

### Component Variants

- Consistent design system using `class-variance-authority`
- Reusable component patterns
- Accessible color contrasts

## 📊 Mock Data Structure

The application includes comprehensive mock data for:

- **Users**: Admin, instructors, and learners
- **Tenants**: Multiple organizations with different settings
- **Courses**: Various subjects with complete lesson content
- **Enrollments**: Student progress and completion data
- **Analytics**: Performance metrics and statistics

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The project supports static export, making it deployable to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Implement proper error handling

### Component Development

- Use functional components with hooks
- Implement proper prop types with TypeScript
- Follow the established component structure
- Add proper accessibility attributes

### State Management

- Use React Context for global state
- Implement proper loading and error states
- Cache data appropriately with React Query

## 🧪 Testing

The project structure supports testing with:

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for user flows

## 📚 Documentation

- **API Documentation**: Available in `/docs/api`
- **Component Storybook**: Component documentation
- **User Guide**: End-user documentation

## 🐛 Known Issues

- Static export requires `generateStaticParams` for dynamic routes
- Image optimization is disabled for static builds
- Real-time features require additional backend integration

## 🔮 Future Enhancements

- [ ] Real backend API integration
- [ ] WebSocket support for real-time features
- [ ] Advanced analytics with charts
- [ ] Mobile app development
- [ ] AI-powered course recommendations
- [ ] Video streaming optimization
- [ ] Multi-language support
- [ ] Advanced notification system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sonu Kumar**

- GitHub: [@0xsonu](https://github.com/0xsonu)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon library

---

**Built with ❤️ using Next.js and modern web technologies**
