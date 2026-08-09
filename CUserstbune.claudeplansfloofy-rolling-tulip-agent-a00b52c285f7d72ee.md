# Implementation Plan: AI Copilot Agent for Nexa Beauty

## Goal
Create an AI agent that provides personalized beauty recommendations based on user context (skin tone, eye color, outfit), the user's existing makeup collection, and product data using vector search.

## Tech Stack
- **Framework**: Next.js Server Actions
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Vector Search**: Supabase Vector (pgvector)
- **AI SDK**: Vercel AI SDK (`ai` package)
- **LLM**: Gemini 1.5 Flash (via `@ai-sdk/google`)

## 1. Data Model Updates

### Changes to `prisma/schema.prisma`
- **`Product` Model**:
  - Add `price` field: `price Decimal @db.Decimal(10, 2)` to enable budget calculations.
- **New `UserProfile` Model**:
  - `id` String @id @db.Uuid
  - `userId` String @db.Uuid @unique (Relation to `users`)
  - `skinTone` String? (e.g., "Fair", "Medium", "Deep")
  - `eyeColor` String?
  - `skinType` String? (e.g., "Oily", "Dry", "Combination")
  - `preferredStyle` String? (e.g., "Natural", "Glam", "Avant-garde")
  - `updatedAt` DateTime @updatedAt

### Migration Steps
1. Update `schema.prisma`.
2. Run `npx prisma migrate dev --name add_user_profile_and_product_price`.

## 2. Tool Implementation

All tools will be implemented as functions and passed to the AI SDK `tools` configuration.

### `search_products(query: string)`
- **Keyword Search**: Use Prisma `findMany` with `contains` on `product_name` and `brand`.
- **Vector Search**: 
  - Create a Supabase RPC function `match_products(query_embedding vector, match_threshold float, match_count int)`.
  - Call this RPC via `supabase.rpc('match_products', { ... })`.
- **Hybrid Approach**: Combine and deduplicate results from both searches.

### `analyze_collection(userId: string)`
- Fetch all products associated with the user via the `user_collection` model.
- Return a structured summary:
  - Count of products by category.
  - List of shades owned.
  - Identify gaps (e.g., "User has no red lipsticks").

### `create_makeup_look(userId: string, context: { outfit: string, occasion: string })`
- This is primarily an agent-logic tool. The tool will:
  - Fetch `UserProfile` for the user.
  - Fetch `analyze_collection` data.
  - Use the LLM to suggest a look, mapping specific products from the collection and recommending new ones via `search_products`.

### `find_dupes(productId: string)`
- Fetch the embedding of the target product.
- Perform a vector search in Supabase for the top 5 most similar products in the same `category`.
- Return a list of similar products with their similarity scores.

### `calculate_budget(productIds: string[])`
- Fetch the `price` of all products with the given IDs.
- Return the total sum and a breakdown per product.

## 3. Agent Logic

### Entry Point: `src/features/ai-copilot/actions/chat.ts`
- Implement a server action `chatWithCopilot`.
- Use `streamText` from the Vercel AI SDK.
- **Model**: `google('gemini-1.5-flash')`.
- **Tools**: Map the 5 tools defined above.

### System Prompt
"You are the Nexa Beauty AI Copilot, a luxury beauty expert. Your goal is to provide hyper-personalized recommendations.
Follow this reasoning chain for every request:
1. **Context Gathering**: Retrieve user profile (skin tone, eye color) and current collection.
2. **Analysis**: Determine what the user already owns and what they need based on the requested look/outfit.
3. **Discovery**: Use `search_products` to find specific products that complement the user's features and current collection.
4. **Recommendation**: Propose a cohesive makeup look. Explain *why* these products work for the user's specific skin tone and eye color.
5. **Closing**: Provide a budget estimate using `calculate_budget` for any recommended new purchases.

Be professional, encouraging, and focused on luxury beauty standards."

## 4. Frontend Integration

### Component: `src/features/ai-copilot/components/CopilotChat.tsx`
- Use `useChat` from `ai/react`.
- **UI Features**:
  - Chat bubble interface.
  - **Tool Call Rendering**: When the agent recommends products, render them as `ProductCard` components instead of plain text.
  - **Context Setup**: A small "My Profile" toggle to let users update their skin tone/eye color before chatting.

## 5. Implementation Steps

1. **Phase 1: Data Layer**
   - Update Prisma schema $\rightarrow$ Migrate database.
   - Implement Supabase RPC `match_products` for vector search.
2. **Phase 2: Tooling**
   - Implement the 5 tool functions in `src/features/ai-copilot/lib/tools.ts`.
   - Verify tools individually with unit tests.
3. **Phase 3: AI Integration**
   - Create `src/features/ai-copilot/actions/chat.ts` with `streamText` and tools.
   - Refine the system prompt through iterative testing.
4. **Phase 4: Frontend**
   - Build `CopilotChat.tsx` and integrate with the server action.
   - Implement product recommendation cards.

## 6. Verification Plan
- **Tool Test**: Verify `find_dupes` returns products of the same category.
- **Context Test**: Verify that asking "What lipstick should I use?" results in the agent checking the user's collection first.
- **Vector Test**: Verify that searching for "nude lipstick" returns products with similar embeddings even if the keyword "nude" isn't in the name.
- **E2E Test**: "I'm wearing a black dress for a gala, I have fair skin and blue eyes. Suggest a look." $\rightarrow$ Expect: Profile check $\rightarrow$ Collection check $\rightarrow$ Product search $\rightarrow$ Reasoned look $\rightarrow$ Budget.

### Critical Files for Implementation
- `prisma/schema.prisma`
- `src/features/ai-copilot/actions/chat.ts`
- `src/features/ai-copilot/lib/tools.ts`
- `src/features/ai-copilot/components/CopilotChat.tsx`
- `src/lib/supabase.ts`
EOF`
