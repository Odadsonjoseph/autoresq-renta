export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Join the Waitlist</h1>
        <p className="text-xl text-slate-300 mb-8">
          Be among the first to experience the future of rental car management.
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-lg"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-lg"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition text-lg"
          >
            Request Access
          </button>
        </form>

        <div className="mt-8">
          <a href="/" className="text-amber-400 hover:text-amber-300 transition">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
