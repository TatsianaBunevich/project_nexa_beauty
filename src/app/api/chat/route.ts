import { copilotChat } from '@/features/ai-copilot/actions/chat';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('Copilot API hit');
    const body = await req.json();
    const result = await copilotChat({ messages: body.messages });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Copilot API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
