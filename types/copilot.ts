import { Product } from './product';
import { MakeupLook } from './makeup-look';

export type CopilotRole = 'user' | 'assistant' | 'tool';

export interface CopilotMessage {
  role: CopilotRole;
  content: string;
  toolCallId?: string;
  toolName?: string;
}

export interface CopilotRequest {
  message: string;
  conversationId?: string;
  userId: string;
}

export interface CopilotResponse {
  message: string;
  recommendations: Product[];
  look: MakeupLook | null;
  products: Product[];
  toolsUsed: string[];
  conversationId: string;
}

export interface UserContext {
  userId: string;
  skinTone?: string;
  eyeColor?: string;
  skinType?: string;
  preferredStyle?: string;
}
