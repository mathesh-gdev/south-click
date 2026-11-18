# South Click OS

> Digital Marketing Agency Team Management & Performance Operations Platform.

Built for **Responsive Web (Desktop & Tablet)** and **Native Android (Capacitor)** with Next.js 16 (App Router), Tailwind CSS v4, `motion/react`, shadcn UI primitives, and a FastAPI performance engine.

---

## Features

- **Executive Cockpit & Live Dispatch**: Realtime KPI tracking, pipeline volume, active squads, and deliverable throughput.
- **Turnaround Speed Bonus Engine**: Automatic speed bonuses for sub-2h deliveries calculated down to the second.
- **QC Review Gate & Player**: Dual-column 9:16 vertical video review console with frame scrubber, version switching ($V_1 \rightarrow V_n$), and shareable client review links.
- **Payouts & RazorpayX UPI Ledger**: Instant 1-tap UPI disbursals with UTR generation and itemized speed bonuses.
- **1-Tap Demo Switcher**: Switch live context between **Dhushyandh S.** (Founder), **Arun Vignesh** (Senior Video Editor), **Priya Sharma** (Lead Designer), and **Karthik N.** (Social Media).
- **Web Audio Micro-Chimes**: Pleasant synthesized audio feedback on UPI payout disbursals, QC approvals, and role switching (with `M` keyboard shortcut toggle).
- **Desktop Keyboard Shortcuts**: `1`-`4` for instant persona switching, `D` for Dashboard, `P` for Payouts, `T` for Tasks, `C` for Chat, `M` for audio toggle.
- **LocalStorage Persistence**: Test actions persist across page reloads with a 1-tap "Reset State" button.

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React
- **Animations**: `motion/react` (GPU-accelerated spring physics)
- **Mobile Native**: Capacitor 8 (Android)
- **Backend**: FastAPI (Python), REST APIs, Pytest (12/12 passing)
- **Database / Auth**: Supabase schema & Row Level Security (RLS)

---

## Quick Start

### 1. Web App (Development)
```bash
npm run dev
# Open http://localhost:3000
```

### 2. Production Build
```bash
npm run build
```

### 3. Sync to Android Capacitor
```bash
npm run cap:sync
```

### 4. Run Backend Tests
```bash
npm run api:test
```

---

## License
Private & Proprietary - South Click Digital Marketing Agency.
