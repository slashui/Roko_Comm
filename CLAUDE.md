# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Start development server**: `npm run dev`
- **Build application**: `npm run build` (includes Prisma generation)
- **Production start**: `npm start`
- **Lint code**: `npm run lint`

### Database
- **Generate Prisma client**: `npx prisma generate`
- **Push database changes**: `npx prisma db push`
- **Reset database**: `npx prisma db reset`
- **View database**: `npx prisma studio`

## Architecture Overview

This is a Next.js 14 SaaS platform with internationalization, featuring a course/learning management system with AI integration.

### Key Technologies
- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, next-themes
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with Google, GitHub, and credentials providers
- **Payments**: Stripe integration with checkout sessions
- **AI Integration**: OpenAI, Claude, Gemini, Groq APIs
- **Internationalization**: next-intl with English/Chinese support
- **Video**: Alibaba Cloud Video on Demand (VOD) integration

### Application Structure

#### App Router Structure (`app/[locale]/`)
- **Site routes** (`(site)/`): Public pages (pricing, auth, checkout)
- **Dashboard routes** (`(dashboard)/(route)/`): Protected user areas
  - `/course/` - Course content with MDX lessons organized by chapters
  - `/demo/` - Demo content structure
  - `/dashboard/` - User dashboard
  - `/setting/` - User settings
  - `/agentui/` - AI agent interface components

#### API Architecture (`app/api/`)
- **AI endpoints**: Multiple AI provider integrations (OpenAI, Claude, Gemini, Groq)
- **Authentication**: NextAuth configuration with multiple providers
- **Payments**: Stripe checkout, webhooks, product management
- **User management**: User CRUD operations, role updates
- **Video**: VOD integration for course videos
- **Course management**: Lesson and course content APIs

#### Database Schema (PostgreSQL via Prisma)
- **User**: Authentication, roles (FREE/PRIME/VIP), profile information
- **Account**: NextAuth account linking
- **Waitlist**: Pre-launch user collection
- **orderlist**: Purchase tracking and transaction history
- **Course/Chapter/Lesson**: Hierarchical course content structure with role-based access

### Key Components
- **Course system**: MDX-based lessons organized by chapters with video integration
- **Multi-language**: Configured for English (`en`) and Chinese (`cn`) with next-intl
- **Theme system**: Dark/light mode with custom color configuration via `config.js`
- **Payment flow**: Stripe checkout with success/cancel handling and webhook processing
- **AI chat**: Multi-provider AI integration with streaming responses
- **Authentication**: Social login + credentials with role-based access

### Configuration Files
- **config.js**: Application settings (name, theme, colors, i18n, contact info)
- **next.config.js**: Next.js configuration with intl and video plugins
- **middleware.js**: Internationalization routing middleware
- **prisma/schema.prisma**: Database schema definition

### Content Structure
- Course content stored as MDX files in nested chapter/lesson structure
- Static assets in `public/` including course images, icons, videos
- Internationalization messages in `libs/i18n/messages/`

The platform is designed as a comprehensive SaaS boilerplate with course delivery capabilities, AI integration, and multi-language support.