# Blackjack Royale – MVP

- Purpose: teach probability, decision-making, risk management
- Core: real Blackjack with persistent coins and results
- Stack: Next.js App Router, PostgreSQL (Neon), Prisma, JS
- Auth: email + password, sessions in DB, HTTP-only cookies

## Why Database (CCC.1.1)

- Saves user coins across refreshes
- Stores game results for accountability
- Enables long-term engagement via persistence
- Without DB: coins reset, wins don’t count

## Why Authentication (CCC.1.1)

- Ties coins and game history to a real user
- Protects sessions with HTTP-only cookies
- Validates access to play and update coins

## Tech Stack (CCC.1.2)

- Frontend: Next.js App Router
- Backend: Next.js API Routes
- Database: PostgreSQL (Neon)
- ORM: Prisma
- Language: JavaScript
- Auth: Email + password, session stored in DB

## Auth Flow (CCC.1.2)

- User submits login/signup form
- Password hashed with bcrypt
- Session record created in `sessions`
- Token stored in `session` cookie (HTTP-only)
- User stays logged in across refreshes

## Database Schema (CCC.1.2)

- `User`: id, email, password, coins, createdAt
- `Session`: id, token, userId, expiresAt, createdAt
- `Game`: id, userId, betAmount, result, coinsChange, createdAt

## Blackjack Rules (CCC.1.3)

- Deck of 52 cards
- Dealer hits until 17
- Face cards = 10
- Ace = 1 or 11
- Blackjack = Ace + 10
- Bust = over 21

## Coin System (CCC.1.3)

- New users start with 100 coins
- Bet before each hand
- Win: coins increase by bet
- Lose: coins decrease by bet
- Push: coins unchanged
- DB updates after every game

## API Responsibilities (CCC.1.2)

- `/api/auth`:
   - Signup: create user
   - Login: verify and create session
   - Logout: delete session and clear cookie
   - Session: validate session, return user
- `/api/game/play`:
   - Validate session and bet
   - Apply Blackjack result (win/lose/push)
   - Update coins and save `Game`

## Pages Mapping (CCC.1.3)

- Home: overview + navigation
- About: persistence problem and why it matters
- Why: architecture and solution
- Features: gameplay, betting, coin updates
- Product: Blackjack UI (Hit, Stand, Bet)
- Rubric Evidence: links to proof pages
- Reflection: lessons and next features

## Quick Start

- Prereqs: Node.js 18+, PostgreSQL/Neon
- Env: `DATABASE_URL` configured
- Migrate:
   - `npx prisma migrate dev --name init_blackjack`
   - `npx prisma generate`
- Dev:
   - `npm run dev`

## Evidence Links (CCC)

- CCC.1.1: About page explains non-persistent games
- CCC.1.2: API, auth, and DB schema implemented
- CCC.1.3: Product page shows live game and coin updates
- `src/app/(auth)/*/page.jsx` - Login and registration forms
- `src/middleware.js` - Route protection

**Key Learning:**
- HTTP-only cookie security
- bcrypt password hashing
- Session validation patterns
- Next.js 16 middleware

### Phase 2: Core API Development 🔗
**Time Estimate: 4-5 days**

**Files to Implement:**
- `src/app/api/donors/route.js` - CRUD operations for donors
- `src/app/api/donations/route.js` - Donation recording with metrics updates
- `src/app/api/campaigns/route.js` - Campaign management
- `src/lib/validation/*-schema.js` - Zod validation schemas
- `src/lib/api/*.js` - Business logic and database operations

**Key Learning:**
- RESTful API design patterns
- Database transactions
- Data validation with Zod
- Error handling strategies

### Phase 3: Dashboard Interface 🎨  
**Time Estimate: 5-6 days**

**Files to Implement:**
- `src/app/(dashboard)/donors/page.jsx` - Donor listing with search/filter
- `src/app/(dashboard)/donors/new/page.jsx` - Donor creation form
- `src/app/(dashboard)/donations/page.jsx` - Donation recording interface
- `src/components/donors/*.jsx` - Donor-specific components
- `src/hooks/use-*.js` - Custom data fetching hooks

**Key Learning:**
- React Hook Form patterns
- Table components with sorting/filtering
- Optimistic UI updates
- Form validation and error states

### Phase 4: Advanced Features 🚀
**Time Estimate: 4-5 days**

**Files to Implement:**
- `src/app/(dashboard)/segments/page.jsx` - Segment builder interface
- `src/app/(dashboard)/workflows/page.jsx` - Workflow automation
- `src/components/segments/*.jsx` - Dynamic criteria builder
- `src/components/workflows/*.jsx` - Workflow step configuration

**Key Learning:**
- Complex form builders
- Dynamic UI generation
- Background job processing
- Advanced database queries

### Phase 5: Testing & Polish 🧪
**Time Estimate: 3-4 days**

**Files to Implement:**
- `tests/lib/*.test.js` - Unit tests for utilities
- `tests/api/*.test.js` - API endpoint testing
- `tests/e2e/*.spec.js` - End-to-end user workflows
- Performance optimization and deployment setup

**Key Learning:**
- Testing strategies and tools
- Performance monitoring
- Production deployment
- Code quality practices

## 💾 Exploring the Seed Data

Understanding the provided data helps you implement realistic features:

### 📈 **Organization Profiles**
```sql
-- Two complete nonprofit organizations
Hope Foundation (75 donors, $145K raised)
Green Earth Alliance (environmental focus)
```

### 👥 **Donor Distribution** (75 total donors)
```sql  
-- Realistic retention risk distribution
40% First-time donors (HIGH risk)    → Need welcome series
30% Two-gift donors (MEDIUM risk)    → Need retention campaign  
20% Loyal donors (LOW risk)          → Need upgrade cultivation
10% Lapsed donors (CRITICAL risk)    → Need reactivation outreach
```

### 💰 **Donation Patterns** (200+ donations)
```sql
-- Gift size distribution mirrors real nonprofits
- $10-50: Online/monthly donors (65%)
- $51-250: Event/mail donors (25%)  
- $251-1000: Major gift prospects (8%)
- $1000+: Major donors (2%)
```

### 📊 **Campaign Performance**
```sql
Annual Fund 2024        → $67,500 raised (ongoing)
Emergency Response      → $23,400 raised (completed)  
Holiday Campaign        → $18,900 raised (completed)
Major Gifts Initiative  → $35,200 raised (active)
```

### 🎯 **Pre-built Segments**
- **First-Time Donors**: Welcome series candidates
- **Lapsed Donors**: Reactivation targets  
- **Major Gift Prospects**: High-capacity individuals
- **Monthly Sustainers**: Recurring gift donors
- **Event Participants**: Engagement-based segment

> **💡 Development Tip**: Use `npx prisma studio` to explore this data visually while building features!

## 🏗 Technology Stack

### **Core Framework**
- **Next.js 16** (App Router) - React meta-framework with file-based routing
- **React 19.2.3** - UI library with modern hooks and server components
- **JavaScript** (no TypeScript) - Faster development for learning/MVP

### **Database & ORM**
- **PostgreSQL** - Production-ready relational database
- **Prisma 7.1.0** - Type-safe ORM with migrations and client generation
- **@prisma/adapter-pg** - Neon PostgreSQL adapter for cloud deployment

### **UI & Styling**
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **shadcn/ui** - Copy-paste React components built on Radix UI
- **Lucide React 0.561.0** - Beautiful, customizable icons

### **Forms & Validation**
- **React Hook Form 7.68.0** - Performant forms with minimal re-renders
- **Zod 4.2.0** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration layer for form validation

### **Authentication & Security**
- **bcrypt** - Password hashing with configurable salt rounds
- **HTTP-only cookies** - Secure session storage (no localStorage)
- **Database sessions** - Server-side session management

### **Testing & Quality**
- **Vitest 4.0.15** - Lightning-fast unit test runner
- **Playwright** - Cross-browser end-to-end testing
- **MSW (Mock Service Worker)** - API mocking for testing
- **ESLint** - Code quality and consistency

### **Development Tools**
- **pnpm 10.18.1** - Fast, space-efficient package manager  
- **Prisma Studio** - Visual database browser
- **Hot reloading** - Instant feedback during development

### **Architecture Decisions**

#### Why No TypeScript?
- **Faster learning curve** for beginners
- **Reduced complexity** during MVP development  
- **JavaScript + Zod** provides runtime validation
- **Easy migration path** to TypeScript later

#### Why Session-Based Auth?
- **Simpler than JWT** for learning projects
- **Better security** with HTTP-only cookies
- **Server-side control** over session lifecycle
- **No client-side token management**

#### Why Prisma 7?
- **Excellent developer experience** with type safety
- **Built-in migrations** for version control
- **Client generation** eliminates manual SQL
- **Rich relationship handling** for complex domains

## 📖 Additional Resources

### **Project Documentation**
- **[CLAUDE.md](CLAUDE.md)** - Comprehensive architecture and development patterns
- **[business-context.md](resource-docs/business-context.md)** - Nonprofit domain knowledge
- **[component-architecture.md](resource-docs/component-architecture.md)** - System design overview
- **[testing-architecture.md](resource-docs/testing-architecture.md)** - Testing strategy and tools

### **Learning Resources**
- **[Next.js 16 Documentation](https://nextjs.org/docs)** - Framework fundamentals
- **[Prisma Documentation](https://www.prisma.io/docs)** - Database ORM guide
- **[React Hook Form](https://react-hook-form.com/)** - Advanced form patterns
- **[Zod Documentation](https://zod.dev/)** - Schema validation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first styling

### **Development Community**
- **[Next.js Discord](https://discord.gg/bUG2bvbtHy)** - Framework community
- **[Prisma Discord](https://pris.ly/discord)** - Database help and discussions
- **[shadcn/ui GitHub](https://github.com/shadcn/ui)** - Component library issues

## 🚀 Deployment Options

### **Development Database**
```bash
# Local PostgreSQL (recommended for learning)
brew install postgresql
createdb donor_connect

# Or use Docker
docker run --name postgres -e POSTGRES_DB=donor_connect -p 5432:5432 -d postgres
```

### **Cloud Database (Production)**
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL (free tier)
- **[Supabase](https://supabase.com/)** - Firebase alternative with PostgreSQL
- **[PlanetScale](https://planetscale.com/)** - MySQL-compatible serverless database

### **Application Deployment**
- **[Vercel](https://vercel.com/)** - Next.js optimized (recommended)
- **[Netlify](https://netlify.com/)** - JAMstack deployment
- **[Railway](https://railway.app/)** - Full-stack deployment with database

## 🔐 Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Database URL for Prisma 7 with driver adapters
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=disable"

# For production/Neon (with SSL):
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=require"

# Application URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Add email service config for future features
# SENDGRID_API_KEY="your_sendgrid_key"
# EMAIL_FROM="noreply@yournonprofit.org"
```

## 📄 License

This educational project is released under the **ISC License** - feel free to use it for learning, teaching, or building your own nonprofit tools!

---

## 🎉 Ready to Start?

1. **Set up your development environment** (database, dependencies)
2. **Explore the seed data** with `npx prisma studio`  
3. **Start with authentication** - implement login/logout first
4. **Build incrementally** - one feature at a time
5. **Test frequently** - write tests as you build features
6. **Ask questions** - use GitHub Issues for help

**Happy coding! 🚀** Build something amazing for the nonprofit sector!
