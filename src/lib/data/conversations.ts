import { CopilotMessage } from '@/types/copilot';

export interface ConversationRepository {
  getHistory(conversationId: string, userId: string): Promise<CopilotMessage[]>;
  saveMessage(conversationId: string, userId: string, message: CopilotMessage): Promise<void>;
}

// Mock implementation for MVP
export const conversationRepository: ConversationRepository = {
  async getHistory(conversationId, userId) {
    console.log(`[ConvRepo] Fetching history for ${conversationId} (User: ${userId})`);
    return []; // Return empty for now
  },

  async saveMessage(conversationId, userId, message) {
    console.log(`[ConvRepo] Saving message to ${conversationId} (User: ${userId})`);
    // In a real app, this would write to a database table
  },
};
