# MCKalender Login & Register Forms

Modern glassmorphism-style authentication forms built with Next.js.

## Components

- **Login Form** (`/login`) - Sign in with email/password + social login
- **Register Form** (`/register`) - Sign up with live validation + social login  
- **Background Animation** - Animated gradient background component
- **Alert Component** - Custom validation feedback boxes

## Features

- **Glassmorphism Design** - Transparent blur effects with modern styling
- **Live Password Validation** - Real-time feedback with custom glassmorphism validation boxes
- **Social Login** - Google & Facebook SVG icons ready for integration
- **Responsive Design** - Optimized for all devices with no clipping issues
- **Poppins Font** - Modern typography throughout

## File Structure

```
src/
├── app/
│   ├── login/          # Login page with CSS files
│   ├── register/       # Register page with CSS files  
│   └── globals.css     # Global styles
├── components/ui/
│   ├── background-gradient-animation.jsx
│   ├── alert.jsx       # Custom alert component
│   └── bga.css        # Background animation styles
└── public/
    ├── google.svg     # Social login icons
    └── facebook.svg
```

## Responsive Breakpoints

- **Desktop** (769px+) - Full-size forms with 5rem top margin, hover effects
- **Mobile** (768px-) - Compact layout, 5rem top margin, touch optimizations  
- **Small Mobile** (360px-) - Ultra-compact for small screens
- **Landscape** - Special handling for mobile landscape orientation

## Key Design Features

- **Compact Forms** - Deliberately small and space-efficient design
- **Vertical Centering** - 5rem top margin for better positioning
- **No Clipping** - Forms scroll properly without content cutoff
- **Centered Headers** - All titles and subtitles are center-aligned
- **Touch Optimized** - Mobile hover effects disabled, optimized tap targets
- **Custom Validation** - Glassmorphism-style validation feedback boxes