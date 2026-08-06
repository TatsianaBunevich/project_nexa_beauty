import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar placeholder */}
      <aside className="w-64 border-r bg-muted/30 hidden md:block">
        <div className="p-4 font-bold text-xl">Nexa Beauty</div>
        <nav className="p-4 space-y-2">
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">Dashboard</div>
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">Collection</div>
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">AI Assistant</div>
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">Looks</div>
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">Analytics</div>
          <div className="p-2 hover:bg-accent rounded-md cursor-pointer">Settings</div>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="font-medium">Nexa OS</div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary" />
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
