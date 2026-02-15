# Ramadan Tracker – Product Requirements Document (PRD)

## 1. Vision

Build a modern Progressive Web App (PWA) to track Ramadan worship activities.
The app must work offline-first and be installable on mobile via Chrome.

Primary goal:
Help users track prayer consistency and spiritual progress during Ramadan.

---

## 2. Core Principles

- Offline-first
- Local-first storage
- Installable PWA
- Mobile-first UI
- Clean separation between UI and business logic
- Simple but extensible architecture

---

## 3. Tech Stack

Frontend:
- Next.js 14 (App Router)
- TypeScript (strict mode)
- TailwindCSS
- ShadCN UI

Storage:
- IndexedDB (Dexie.js)

Utilities:
- dayjs + hijri plugin

PWA:
- next-pwa

Cloud Sync (optional):
- Supabase
- JSON Export
- Optional Google Drive API

---

## 4. Feature Scope

### 4.1 Worship Tracking

Track daily (Hijri 1–30):

Wajib:
- Fajr
- Dhuhr
- Asr
- Maghrib
- Isha

Each prayer includes:
- done (boolean)
- in_mosque (boolean)
- jamaah (boolean)

Sunnah:
- Dhuha (rakaat number)
- Tahajjud (rakaat number)
- Tarawih (rakaat number)
- Witir (rakaat number)

---

### 4.2 Target System

User can set:
- Wajib completion %
- Dhuha target rakaat
- Tahajjud target rakaat
- Tarawih target rakaat

System calculates:
- Wajib progress %
- Sunnah progress %
- Overall %

---

### 4.3 Calendar View

- Hijri day 1–30
- Color-coded:
    - Green = complete
    - Yellow = partial
    - Red = empty

---

### 4.4 Sync

Modes:
- Offline only
- Manual JSON export/import
- Optional Supabase sync

Conflict resolution:
- last_write_wins (based on updated_at)

---

## 5. Data Model

DayRecord:
- id: string
- hijri_day: number (1–30)
- gregorian_date: string
- prayers: object
- sunnah: object
- updated_at: number

Target:
- wajib_percentage_target
- dhuha_target_rakaat
- tahajjud_target_rakaat
- tarawih_target_rakaat

---

## 6. Architecture Rules

- All calculations must be inside /lib
- No storage logic inside UI components
- Use pure functions for progress calculation
- IndexedDB must be abstracted

---

## 7. UX Specification

Design:
- Emerald primary color
- Dark mode default
- Large tap targets (min 44px)
- Rounded 2xl
- Clean Islamic aesthetic

Dashboard must include:
- Current Hijri day
- Progress ring
- Prayer checklist
- Sunnah counter
- Save button

---

## 8. PWA Specification

- Installable on Android Chrome
- Standalone display mode
- Offline caching
- Manifest file
- Custom app icon

---

## 9. Non-Goals

- No prayer time API
- No social sharing
- No complex gamification (optional future)
- No ads

---

## 10. Milestones

Phase 1:
- Core tracker
- IndexedDB
- Dashboard

Phase 2:
- Calendar
- Target system
- Progress engine

Phase 3:
- PWA support

Phase 4:
- Cloud sync

---

## 11. Definition of Done

Project is complete when:
- Works offline
- Installable
- All 30 days usable
- Progress calculation accurate
- No UI contains business logic

