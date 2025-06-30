# MCKalender Login & Register

Moderne Auth-Forms mit Glassmorphism-Design, Next.js & animiertem Verlauf.

## Features
- Login & Register mit Live-Validation
- Social Login (Google/Facebook, Icons vorbereitet)
- Animierter Gradient-Hintergrund (auch als Fallback mit subtiler Animation)
- Responsive & Mobile-optimiert
- 4K-Support: Layout speziell für große Bildschirme getestet

## Komponenten
- **Login-Form**: Anmeldung mit E-Mail/Passwort & Social Login
- **Register-Form**: Registrierung mit Live-Validierung & Social Login
- **BackgroundGradientAnimation**: Animierter Farbverlauf, Fallback mit CSS-Animation
- **Alert**: Glassmorphism-Validierungsboxen

## Struktur
- `src/app/login` & `src/app/signup`: Seiten & CSS
- `src/components/ui/`: Animation, Alerts, UI
- `public/`: SVG-Icons

## Start
1. `npm install`
2. `npm run dev`

Fertig!

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