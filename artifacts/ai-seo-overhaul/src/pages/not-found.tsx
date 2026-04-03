export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#071321]">
      <div className="w-full max-w-md mx-4 p-8 rounded-xl border border-[#7db0e7]/15 bg-[#0c1b2d]/70 backdrop-blur-[14px]">
        <div className="flex mb-4 gap-3 items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-red-400 shrink-0"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>
          <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
        </div>
        <p className="mt-4 text-sm text-[#8aa8c4]">
          Did you forget to add the page to the router?
        </p>
        <a href="/ai-seo-overhaul/" className="inline-flex mt-6 items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#04101c] bg-gradient-to-br from-[#6fe2cf] to-[#78c7ff]">
          Go to Speakly AI-SEO Overhaul
        </a>
      </div>
    </div>
  );
}
