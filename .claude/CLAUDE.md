You are a Senior AI Product Engineer and Full-Stack Architect.

Build a production-quality portfolio project called **Nexa Beauty**.

## Goal

Create a modern AI application that demonstrates skills expected from an AI Frontend Engineer / AI Product Engineer in 2026.

The app should showcase:
- AI application engineering
- React architecture
- multimodal AI
- AI agents
- RAG
- embeddings
- structured outputs
- modern UX
- production-ready engineering
- 
The application should feel like a combination of:
- ChatGPT (AI assistant experience)
- Perplexity (AI search + citations)
- Notion (personal knowledge database)
- Linear (clean productivity UI)
- Apple (premium visual design)
- Sephora (beauty ecosystem)
- 
The experience should feel inspired by ChatGPT, Perplexity, Notion, Linear, Vercel, and Apple.

Avoid creating a simple chatbot or virtual try-on clone.

---

## Product Vision

AI Makeup OS is a personal AI assistant that helps users organize, understand, and optimize their makeup collection.

The system should:
- understand what the user owns
- recommend products and looks
- answer beauty questions
- discover duplicates
- build shopping recommendations
- explain every recommendation

---

## Core Features

### AI Makeup Scanner
Users upload photos of cosmetics.

AI should identify:
- product
- brand
- category
- shade
- finish
- estimated expiration
- confidence score

Use multimodal AI with structured JSON output.

---

### Makeup Collection

Users have a searchable inventory with:
- categories
- brands
- shades
- expiration tracking
- favorites
- filters
- analytics

Generate AI insights like:
- duplicate products
- missing categories
- collection statistics
- optimization suggestions

---

### AI Makeup Copilot

Create an AI assistant that understands natural language.

Example:

"I have warm olive skin, brown eyes and I'm wearing a green dress to a wedding."

The assistant should:
- understand context
- search user inventory
- search beauty knowledge
- recommend products
- explain reasoning

Implement tool calling for:
- product search
- collection analysis
- look generation
- dupe search

---

### Outfit → Makeup

Users upload an outfit image.

AI analyzes:
- colors
- style
- season
- occasion

Generate several makeup looks with explanations.

---

### Makeup Dupe Finder

Users search a product.

AI finds similar products using:
- shade
- finish
- formula
- price
- embeddings
- similarity scores

---

## Tech Stack

Frontend
- Next.js
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TanStack Query
- Zustand
- React Hook Form
- Zod

Backend
- Next.js Server Actions
- PostgreSQL
- Prisma
- Supabase
- Supabase Storage

AI
- OpenAI API
- Vision models
- Vercel AI SDK
- Structured Outputs
- Function Calling
- Embeddings
- RAG

Vector Database
- Supabase Vector

---

## Database

Design scalable schemas for:
- Users
- Products
- UserCollection
- Looks
- Conversations
- Embeddings

---

## UI / UX

Create a premium interface inspired by Apple, Linear, Notion, and Vercel.

Include:
- responsive layout
- dark/light mode
- beautiful animations
- loading & skeleton states
- polished empty states
- accessible components

Pages:
- Landing
- Dashboard
- Collection
- AI Assistant
- Looks
- Product Details
- Analytics
- Settings

---

## AI Architecture

Implement:
- multimodal image understanding
- structured outputs with Zod
- RAG pipeline
- embeddings
- vector search
- AI agent with tool calling
- conversation memory
- explainable recommendations

---

## Engineering Standards

Use:
- feature-based architecture
- reusable components
- strict TypeScript
- clean code
- scalable folder structure
- environment variables
- validation
- error handling
- optimistic UI
- production-ready patterns

---

## Deliverables

Before writing code:

1. Design the complete system architecture.
2. Explain technical decisions.
3. Design the database.
4. Design the AI architecture.
5. Design the folder structure.
6. Identify risks and trade-offs.

Then implement the project incrementally, keeping every feature modular, reusable, and production-ready.

Act like a senior engineer performing a real software project rather than generating isolated code snippets.