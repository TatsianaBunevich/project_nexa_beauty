'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Palette, ShoppingBag, Calendar, Heart } from 'lucide-react';

interface AnalysisResultsProps {
  data: any;
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  const { analysis, recommendations } = data;

  return (
    <div className="space-y-10">
      {/* Outfit Analysis Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Palette className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Outfit Analysis</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Style & Mood</span>
            </div>
            <p className="font-medium">{analysis.style}</p>
            <p className="text-sm text-muted-foreground">{analysis.mood}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Occasion & Season</span>
            </div>
            <p className="font-medium">{analysis.occasion}</p>
            <p className="text-sm text-muted-foreground">{analysis.season}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Color Palette</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.colors.map((color: string) => (
                <Badge key={color} variant="secondary">{color}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Recommended Makeup Looks</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {recommendations.map((look: any, idx: number) => (
            <Card key={idx} className="overflow-hidden">
              <div className="p-6 border-b bg-muted/30">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{look.lookName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{look.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase text-muted-foreground">Product Guide</h4>
                    <div className="space-y-4">
                      {look.products.map((product: any, pIdx: number) => (
                        <div key={pIdx} className="flex gap-3 group">
                          <div className="w-1 h-auto bg-primary rounded-full group-hover:h-full transition-all" />
                          <div>
                            <p className="text-sm font-medium">{product.category}</p>
                            <p className="text-xs text-primary font-semibold">{product.shade}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {product.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-3">Why it works</h4>
                    <p className="text-sm leading-relaxed italic">
                      &quot;{look.overallReasoning}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
