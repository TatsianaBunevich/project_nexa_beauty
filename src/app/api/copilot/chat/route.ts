import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CopilotAgent } from '@/lib/ai/copilot-agent';
import { CopilotRequest } from '@/types/copilot';
import { conversationRepository } from '@/lib/data/conversations';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const body: CopilotRequest = await req.json();

    console.log('[Copilot API] Request received:', {
      userId,
      message: body.message,
      conversationId: body.conversationId,
    });

    // 1. Load conversation history
    const conversationId = body.conversationId || `conv_${Date.now()}`;
    const history = await conversationRepository.getHistory(conversationId, userId);

    // 2. Run the agent
    const agent = new CopilotAgent();
    const response = await agent.run({
      ...body,
      userId,
      conversationId,
    }, history);

    // 3. Save the exchange to history
    await conversationRepository.saveMessage(conversationId, userId, {
      role: 'user',
      content: body.message,
    });
    await conversationRepository.saveMessage(conversationId, userId, {
      role: 'assistant',
      content: response.message,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('[Copilot API] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
