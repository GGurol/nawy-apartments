# Nawy Apartments Frontend

A modern Next.js 15 application for browsing and managing apartment listings with a clean, responsive interface.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 20
- **Package Manager**: npm

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # App Router pages and layouts
│   │   ├── apartments/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Individual apartment detail page
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page with apartment listings
│   ├── services/               # API service layer
│   │   └── apartmentService.ts # Apartment CRUD operations
│   └── types/                  # TypeScript type definitions
│       └── apartment.ts        # Apartment interface definitions
├── public/                     # Static assets
├── .next/                      # Next.js build output (auto-generated)
├── Dockerfile                  # Container configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🏗️ Architecture

### App Router Structure

- **Root Layout** (`layout.tsx`): Provides global HTML structure and metadata
- **Home Page** (`page.tsx`): Main listing page with apartment grid and create dialog
- **Dynamic Route** (`apartments/[id]/page.tsx`): Individual apartment detail pages

### Component Architecture

- **Client Components**: Interactive components using `'use client'` directive
- **Server Components**: Static components for better performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🎨 UI Components

### Home Page Features

- **Hero Section**: Welcome message with call-to-action
- **Apartment Grid**: Responsive card layout (1/2/3 columns)
- **Create Dialog**: Modal form for adding new apartments
- **Interactive Cards**: Hover effects and smooth transitions

### Apartment Detail Page

- **Full-width Image**: Hero image with fallback icon
- **Property Details**: Title, description, price, and location
- **Responsive Layout**: Optimized for all screen sizes

### Visual Elements

- **Color Scheme**: Blue primary (#2563eb) with gray neutrals
- **Typography**: System fonts with proper hierarchy
- **Icons**: SVG icons for consistent rendering
- **Shadows**: Subtle elevation with hover states

## 🔧 Key Features

### State Management

```typescript
// Local state for apartment listings
const [apartments, setApartments] = useState<Apartment[]>([]);

// Dialog state management
const [isDialogOpen, setIsDialogOpen] = useState(false);

// Form data handling
const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: "",
  city: "",
  imageUrl: "",
});
```

### Form Handling

- **Validation**: Required fields with HTML5 validation
- **State Updates**: Controlled components with React hooks
- **Submission**: Async form handling with error management
- **Reset**: Form clearing after successful submission

### Responsive Design

```css
/* Grid system */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* Spacing */
space-y-8, gap-8, p-6

/* Typography */
text-4xl font-bold, text-lg text-gray-600
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🎯 User Experience

### Navigation

- **Home to Detail**: Click any apartment card
- **Back Navigation**: Browser back button
- **Modal Interaction**: Click outside or cancel to close

### Accessibility

- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Image descriptions for screen readers
- **Focus States**: Keyboard navigation support
- **Color Contrast**: WCAG compliant color ratios

### Performance

- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered pages where possible
- **Lazy Loading**: Images loaded on demand

## 🔌 API Integration

### Service Layer

```typescript
// apartmentService.ts
export default {
  getAll: () => Promise<Apartment[]>,
  getById: (id: number) => Promise<Apartment>,
  create: (data: CreateApartmentDto) => Promise<Apartment>,
};
```

### Error Handling

- **Graceful Degradation**: Fallback to mock data
- **User Feedback**: Loading states and error messages
- **Retry Logic**: Automatic retry for failed requests

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

```bash
# Development
http://localhost:3000

# Production
PORT=3000 npm start
```

## 🐳 Docker Support

### Development

```bash
# Build image
docker build -t nawy-frontend .

# Run container
docker run -p 3000:3000 nawy-frontend
```

### Production

```dockerfile
# Multi-stage build
FROM node:20-alpine AS deps
FROM node:20-alpine AS builder
FROM node:20-alpine AS runner
```

## 🧪 Development Workflow

### Code Structure

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Tailwind**: Utility-first CSS approach

### Best Practices

- **Component Composition**: Reusable, single-responsibility components
- **Type Safety**: Comprehensive TypeScript interfaces
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG 2.1 compliance

## 📊 Performance Metrics

### Core Web Vitals

- **LCP**: < 2.5s (Large Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Bundle Size

- **Initial Load**: ~200KB (gzipped)
- **Runtime**: React 19 + Next.js 15
- **Styles**: Tailwind CSS (purged)

## 🔍 Debugging

### Development Tools

```bash
# Enable debug mode
DEBUG=* npm run dev

# Type checking
npx tsc --noEmit

# Build analysis
npm run build -- --analyze
```

### Common Issues

- **Hydration Errors**: Check client/server state consistency
- **Image Loading**: Verify image URLs and CORS settings
- **Route Issues**: Ensure proper file naming in app directory

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker Production

```bash
# Build and run
docker compose up --build
```

### Environment Variables

```env
# Next.js configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
NODE_ENV=production
```

## 🔮 Future Enhancements

### Planned Features

- [ ] Search and filtering functionality
- [ ] Image upload with preview
- [ ] User authentication
- [ ] Favorites system
- [ ] Map integration
- [ ] Advanced filtering (price range, amenities)

### Technical Improvements

- [ ] Unit testing with Jest
- [ ] E2E testing with Playwright
- [ ] Storybook component documentation
- [ ] PWA capabilities
- [ ] Internationalization (i18n)

## 📝 Contributing

### Development Setup

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

### Code Standards

- Follow TypeScript strict mode
- Use Tailwind for styling
- Maintain responsive design
- Add proper TypeScript types
- Write descriptive commit messages

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Nawy Development Team
