# 💄 Nexa Beauty: AI Makeup OS

**Nexa Beauty** is a premium, AI-powered personal beauty assistant designed to help users organize, understand, and optimize their makeup collections. It blends the intuitive nature of a personal knowledge base with the power of multimodal AI to transform how we interact with beauty products.

---

## ✨ Core Features

### 📸 AI Makeup Scanner

- **Multimodal Identification**: Upload photos of cosmetics to automatically identify the brand, product name, category, shade, and finish.
- **Smart Tracking**: AI estimates expiration dates and provides confidence scores for identified products.
- **Structured Data**: Uses multimodal AI with structured JSON output for precise inventory management.

### 📦 Intelligent Makeup Collection

- **Dynamic Inventory**: A searchable database of your products with expiration tracking, favorites, and category filters.
- **AI Insights**: Automatically discover duplicate products, identify missing essential categories, and get optimization suggestions for your collection.

### 🤖 AI Makeup Copilot

- **Context-Aware Assistance**: A natural language assistant that understands your skin tone, eye color, and the occasion.
- **Tool-Enabled Intelligence**: The Copilot uses function calling to search your inventory, analyze your collection, and generate curated looks.
- **Explainable Recommendations**: Every suggestion comes with a logical reasoning based on color theory and user preferences.

### 👗 Outfit $\rightarrow$ Makeup

- **Visual Analysis**: Upload an outfit image, and the AI analyzes colors, style, season, and occasion.
- **Curated Looks**: Generates a set of complementary makeup looks with detailed explanations on why they work with the outfit.

### 🔍 Makeup Dupe Finder

- **Similarity Engine**: Find high-quality alternatives to luxury products using shade, finish, formula, and price.
- **Vector Search**: Powered by embeddings and similarity scores to find the closest match in the beauty market.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui, Framer Motion
- **State Management**: Zustand, TanStack Query
- **Forms & Validation**: React Hook Form, Zod

### Backend

- **Runtime**: Next.js Server Actions
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Storage**: Supabase Storage

### AI Architecture

- **Orchestration**: Vercel AI SDK
- **Models**: Openrouter
- **Capabilities**:
  - Multimodal Image Understanding
  - Structured Outputs (Zod)
  - Function Calling (Tool Use)
  - RAG (Retrieval Augmented Generation)
  - Embeddings & Vector Search via **Supabase Vector**

---

## 📐 Engineering Standards

Nexa Beauty is built with production-ready patterns:

- **Feature-Based Architecture**: Logic is organized by feature rather than technical layer.
- **Strict TypeScript**: Zero `any` policy for maximum type safety.
- **Optimistic UI**: Seamless user experience with immediate feedback.
- **Explainable AI**: A focus on transparency in AI-generated recommendations.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL (via Supabase)
- Openrouter API Key
- Supabase Project URL & Anon Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nexa-beauty.git
   cd nexa-beauty
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_SUPABASE_URL="your-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-key"
   DIRECT_URL="your-key"
   OPENROUTER_API_KEY="your-key"
   NEXT_PUBLIC_ADMIN_KEY="your-key"
   ```

4. **Database Migration**

   ```bash
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm test`: Run Vitest suite
- `npm run test:e2e`: Run Playwright end-to-end tests

---

## 📜 License

This project is for portfolio purposes. Please refer to the internal project guidelines for more information.
