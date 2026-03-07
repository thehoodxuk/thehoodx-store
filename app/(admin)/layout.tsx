export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <span className="font-bold tracking-tight">The-Hoodx Admin</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
