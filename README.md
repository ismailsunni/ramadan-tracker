# Ramadan Tracker PWA

A Progressive Web App for tracking worship activities during Ramadan. Built with Next.js 14, TypeScript, and IndexedDB for offline-first functionality.

## Features

- ✅ **Daily Prayer Tracking**: Track all 5 daily prayers with mosque and jamaah status
- ✅ **Sunnah Prayer Counter**: Record Dhuha, Tahajjud, Tarawih, and Witir rakaat
- ✅ **Progress Display**: Visual progress ring showing overall completion
- ✅ **30-Day Calendar**: Color-coded calendar view for all days of Ramadan
- ✅ **Customizable Targets**: Set daily targets for prayers and sunnah
- ✅ **Offline-First**: Works completely offline with IndexedDB storage
- ✅ **PWA Installable**: Install on mobile devices for app-like experience
- ✅ **Hijri Calendar**: Automatic Hijri date conversion and display
- ✅ **Dark Mode**: Beautiful dark theme with emerald accents

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: TailwindCSS, ShadCN UI components
- **Storage**: IndexedDB via Dexie.js
- **PWA**: @ducanh2912/next-pwa
- **Date Handling**: dayjs with dayjs-hijri plugin

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- ImageMagick (for generating icons)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ramadan-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Generate PWA icons (optional, already included):
```bash
./scripts/generate-icons.sh
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
ramadan-tracker/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard page
│   ├── calendar/          # Calendar view
│   ├── settings/          # Settings page
│   └── manifest.ts        # PWA manifest
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── calendar/          # Calendar components
│   ├── settings/          # Settings components
│   ├── layout/            # Layout components
│   └── ui/                # ShadCN UI components
├── lib/                   # Core logic
│   ├── db/               # Database layer (Dexie)
│   ├── calculations/     # Business logic
│   ├── hijri/           # Hijri date utilities
│   └── types/           # TypeScript types
└── public/              # Static assets
```

## Architecture

The app follows a clean architecture with strict separation of concerns:

- **UI Layer** (`components/`, `app/`): React components, user interactions
- **Business Logic** (`lib/calculations/`): Pure functions, no side effects
- **Data Layer** (`lib/db/`): IndexedDB operations, data persistence

All database access goes through `lib/db/operations.ts`. All calculations are pure functions in `lib/calculations/`.

## Data Model

### DayRecord
- Daily prayer records (5 prayers × 3 checkboxes)
- Sunnah prayer rakaat counts
- Hijri day (1-30) and Gregorian date

### Target
- Wajib prayer completion percentage target
- Daily sunnah prayer targets (Dhuha, Tahajjud, Tarawih, Witir)

### Progress Calculation
- Wajib progress: (prayers done / 150) × 100
- Sunnah progress: (actual rakaat / target × 30 days) × 100
- Overall: 50% wajib + 50% sunnah

## PWA Features

- **Service Worker**: NetworkFirst caching strategy
- **Offline Support**: All data stored in IndexedDB
- **Installable**: Add to home screen on mobile
- **Icons**: 192×192 and 512×512 PNG icons

## Testing PWA

### Development
```bash
npm run dev
```
Visit http://localhost:3000

### Production
```bash
npm run build
npm start
```

### Mobile Device Testing
1. Find your local IP: `ifconfig` or `ipconfig`
2. Access from phone: `http://[YOUR_IP]:3000`
3. Test installation from browser menu
4. Test offline by disabling network

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with PWA support

## License

MIT

## Credits

Built with ❤️ for Ramadan tracking needs.
