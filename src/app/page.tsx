export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-8">
      <main className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          historychatwaibnu
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8">
          Project chat/communication service — scalable & ready for complex features.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
            Next.js 15
          </span>
          <span className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
            TypeScript
          </span>
          <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-800 text-sm font-medium">
            Tailwind CSS
          </span>
        </div>
      </main>
    </div>
  );
}
