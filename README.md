# Resume Online with Next.js and Supabase

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3.x-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwind-css)

</div>

<p align="center">
  A personal resume/portfolio website built with Next.js 15, Supabase, and Tailwind CSS. Features a complete admin panel for managing all resume content with authentication.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#database-setup"><strong>Database Setup</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a>
</p>

---

## Features

### Public Pages

| Page            | Description                               |
| --------------- | ----------------------------------------- |
| **Home**        | Main landing page with profile overview   |
| **Experiences** | Work experience timeline                  |
| **Studies**     | Educational background and qualifications |
| **Courses**     | Trainings and certifications              |
| **Portfolio**   | Projects and work showcase                |
| **Contact**     | Contact form with email integration       |

### Admin Panel

| Module          | Operations                               |
| --------------- | ---------------------------------------- |
| **Profile**     | Manage personal information, bio, avatar |
| **Experiences** | CRUD for work experiences                |
| **Studies**     | CRUD for educational background          |
| **Trainings**   | CRUD for courses and certifications      |
| **Portfolio**   | CRUD for portfolio projects              |
| **Institutes**  | Manage educational institutions          |
| **Contact**     | Manage contact information               |
| **Pages**       | Page visibility settings                 |

### Technical Features

- **Next.js 15** with App Router and React 19
- **Server-Side Rendering** with React Server Components
- **Supabase Authentication** with cookies-based sessions
- **Middleware Protection** for admin routes
- **Image Upload** support for profile and portfolio
- **Responsive Design** with Tailwind CSS
- **State Management** with Zustand
- **Type Safety** with TypeScript
- **Code Quality** with ESLint and Prettier
- **SEO Optimized** with sitemap and robots.txt

---

## Tech Stack

| Category           | Technology                         |
| ------------------ | ---------------------------------- |
| Framework          | Next.js 15.3.2                     |
| Language           | TypeScript 5.8.3                   |
| UI Library         | React 19.1.0                       |
| Styling            | Tailwind CSS 3.4.1                 |
| Backend            | Supabase (Auth, Database, Storage) |
| State Management   | Zustand 5.0.4                      |
| Package Manager    | pnpm                               |
| Code Quality       | ESLint, Prettier                   |
| Image Optimization | Sharp                              |
| Font               | Geist                              |

---

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin panel routes
│   │   ├── experiences/         # Experience management
│   │   ├── studies/             # Studies management
│   │   ├── trainings/           # Training management
│   │   ├── portfolio/           # Portfolio management
│   │   ├── institutes/          # Institute management
│   │   ├── profile/             # Profile management
│   │   ├── contact/             # Contact management
│   │   └── pages/               # Page settings
│   ├── experiences/             # Public experiences page
│   ├── studies/                 # Public studies page
│   ├── courses/                 # Public courses page
│   ├── portfolio/               # Public portfolio page
│   ├── contact/                 # Public contact page
│   ├── login/                   # Authentication
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── sitemap.ts               # SEO sitemap
│   └── robots.ts                # SEO robots
├── components/                   # React components
│   ├── admin/                   # Admin-specific components
│   │   ├── forms/              # Form components
│   │   └── tables/             # Table components
│   ├── shared/                  # Shared components
│   │   ├── admin/              # Admin shared components
│   │   └── buttons/            # Button components
│   ├── ui/                      # UI primitives
│   │   ├── form/               # Form elements
│   │   └── svglogos/           # SVG icons
│   └── *.tsx                   # Public page components
├── core/                        # Core business logic
│   ├── data/                   # Static data
│   ├── dtos/                   # Data transfer objects
│   ├── models/                 # TypeScript interfaces
│   ├── services/               # Business services
│   ├── types/                  # TypeScript types
│   └── validators/             # Input validators
├── store/                      # Zustand stores
├── helpers/                    # Utility functions
├── styles/                     # Global styles
├── middleware.ts               # Route protection
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/alexcoronell/resume-online-next-supabase.git
cd resume-online-next-supabase

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_COOKIE=your_cookie_name
```

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in your [Supabase project's API settings](https://app.supabase.com/project/_/settings/api).

### Run Development Server

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000/)

- Admin panel: `/admin`
- Login: `/login`

---

## Database Setup

### Supabase Tables

Create the following tables in your Supabase project:

| Table                | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `profile`            | User profile information (name, bio, avatar, email)                |
| `experiences`        | Work experiences (company, position, dates, description)           |
| `studies`            | Educational background (institution, degree, field, dates)         |
| `trainings`          | Courses and certifications (title, institution, date, description) |
| `institutes`         | Educational/training institutions                                  |
| `portfolio`          | Portfolio projects (title, description, image, link, tags)         |
| `contact`            | Contact information (email, phone, address, social media)          |
| `messages`           | Contact form submissions                                           |
| `skills`             | Skills and technologies                                            |
| `social_media_icons` | Social media profile links                                         |
| `works`              | Additional work items                                              |

### Row Level Security (RLS)

Enable RLS policies for:

- Public read access for resume data
- Authenticated write access for admin operations

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fresume-online-next-supabase&project-name=resume-online-next-supabase&repository-name=resume-online-next-supabase&demo-title=Resume%20Online&demo-description=A%20personal%20resume%2Fportfolio%20website%20with%20admin%20panel%20built%20with%20Next.js%20and%20Supabase.&demo-url=https%3A%2F%2Fyour-demo-url.com&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

Vercel will automatically configure the Supabase integration and environment variables.

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

---

## Available Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start development server with Turbopack |
| `pnpm build`        | Build for production                    |
| `pnpm start`        | Start production server                 |
| `pnpm lint`         | Run ESLint                              |
| `pnpm lint:fix`     | Fix linting issues                      |
| `pnpm format`       | Format code with Prettier               |
| `pnpm format:check` | Check code formatting                   |

---

## Authentication

The application uses Supabase Auth with cookie-based sessions:

- **Login**: `/login` page
- **Protected Routes**: All `/admin/*` routes require authentication
- **Middleware**: Automatically redirects unauthenticated users to home

---

## SEO

The application includes:

- `sitemap.xml` generated at `/sitemap.xml`
- `robots.txt` generated at `/robots.txt`
- Proper meta tags for social sharing
- Semantic HTML structure

---

## License

Private - All rights reserved
