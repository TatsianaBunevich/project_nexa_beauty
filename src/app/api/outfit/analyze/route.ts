import { analyzeOutfit } from '@/features/outfit-analysis/actions/analyze-outfit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const analysis = await analyzeOutfit(image);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Outfit analysis error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
