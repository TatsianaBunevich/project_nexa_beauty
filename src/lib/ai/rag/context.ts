export async function retrieveBeautyContext(query: string): Promise<string> {
  console.log('[RAG] Retrieving context for:', query);

  // For MVP, we can use a simple map of keywords to expert advice.
  // In a real implementation, this would be a vector search over a knowledge base.
  const knowledgeBase: Record<string, string> = {
    "olive skin": "Warm olive skin typically has a mix of yellow and green undertones. Complementary colors include golds, bronzes, and warm corals. Avoid overly cool pinks.",
    "brown eyes": "Brown eyes are versatile. Rich golds, deep purples, and greens can make them pop. Earth tones are always a safe and elegant choice.",
    "wedding": "Wedding makeup should be timeless and long-wearing. Focus on a luminous base, defined eyes, and a lip color that lasts through eating and drinking.",
    "elegant": "For an elegant look, focus on cohesive color palettes and clean blending. Use a satin finish for a sophisticated glow rather than heavy glitter.",
  };

  const results = Object.entries(knowledgeBase)
    .filter(([key]) => query.toLowerCase().includes(key))
    .map(([_, value]) => value);

  return results.length > 0
    ? `Expert Beauty Tips:\n${results.join('\n')}`
    : "No specific expert tips found for this query, but use general beauty principles for elegant looks.";
}
