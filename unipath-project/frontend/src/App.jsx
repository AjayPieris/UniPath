import { useState } from 'react'
import axios from 'axios'
import Spline from '@splinetool/react-spline'

function App() {
  const [zScore, setZScore] = useState('')
  const [universities, setUniversities] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const checkEligibility = async () => {
    if (!zScore) {
      alert('Please enter a Z-Score first! 🛑')
      return
    }
    setLoading(true)
    try {
      // NOTE: Ensure your Django backend is running at this URL
      const response = await axios.post('http://127.0.0.1:8000/api/check/', { z_score: zScore })
      setUniversities(response.data)
      setHasSearched(true)
    } catch (error) {
      console.error('Error connecting to backend:', error)
      alert('Something went wrong! Is Django running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-900 text-white font-sans selection:bg-indigo-500/30">
      
      {/* Decorative background overlays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-indigo-600/20 blur-3xl animate-pulse [animation-delay:600ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      {/* Header */}
      <header className="z-10 w-full backdrop-blur-md bg-gray-900/40 border-b border-gray-700/50 sticky top-0">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">UniPath</span>
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">Beta</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button className="text-gray-300 hover:text-indigo-300 transition-colors">Features</button>
            <button className="text-gray-300 hover:text-indigo-300 transition-colors">How it Works</button>
            <button className="text-gray-300 hover:text-indigo-300 transition-colors">About</button>
          </nav>
          <button className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 rounded-lg shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 py-12 items-center">
        
        {/* Left Column: Content & Form */}
        <div className="flex flex-col gap-10 justify-center">
          
          {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Find Your Dream <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">University Path</span>
              </h1>
              <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
                Don't stress about the cutoff handbook. Enter your Z-Score and instantly discover every university course you qualify for in Sri Lanka.
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700 text-xs font-medium flex items-center gap-2 text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" /> Live UGC Data
                </div>
                <div className="px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700 text-xs font-medium text-gray-300">
                  ⚡ Instant Search
                </div>
                <div className="px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700 text-xs font-medium text-gray-300">
                  🎨 Visual Insights
                </div>
              </div>
            </div>

          {/* Interaction Card */}
          <div className="group relative w-full max-w-md">
            {/* Glow Effect */}
            <div className="absolute inset-0 -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-duration-500" />
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
              
              {/* Input Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Enter Z-Score</label>
                  {zScore && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono">
                      VAL: {zScore}
                    </span>
                  )}
                </div>
                <div className="relative">
                    <input
                        type="number"
                        value={zScore}
                        onChange={(e) => { setZScore(e.target.value); setHasSearched(false) }}
                        className="block w-full px-4 py-4 rounded-xl bg-gray-800/50 border border-gray-600/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-white placeholder-gray-500 text-lg transition-all outline-none font-mono"
                        placeholder="e.g. 1.850"
                        step="0.001"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        📊
                    </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={checkEligibility}
                disabled={loading}
                className="relative overflow-hidden w-full group/btn font-bold rounded-xl px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed text-white transform active:scale-[0.98]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                
                <span className={loading ? 'opacity-0' : 'flex items-center justify-center gap-2'}>
                  <span>Check Eligibility</span>
                  <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span className="text-sm">Calculating...</span>
                  </span>
                )}
              </button>

              {/* Results Area */}
              <div className="relative min-h-[60px]">
                {/* Empty State / Initial */}
                {!hasSearched && !loading && (
                    <div className="text-center py-4 border-2 border-dashed border-gray-700/50 rounded-xl">
                        <p className="text-gray-500 text-sm">Results will appear here</p>
                    </div>
                )}

                {/* Loading Skeleton (Optional enhancement logic) */}
                
                {/* Success State */}
                {universities.length > 0 && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    <div className="flex items-center justify-between mb-2 sticky top-0 bg-gray-900/95 backdrop-blur py-2 z-10">
                        <h2 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">
                            Matches Found ({universities.length})
                        </h2>
                    </div>
                    
                    {universities.map((uni) => (
                      <div
                        key={uni.id}
                        className="group/item bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 hover:border-indigo-500/50 rounded-xl p-3 flex items-center justify-between transition-all cursor-default"
                      >
                        <div className="flex items-center gap-4">
                          {/* --- UNIVERSITY LOGO --- */}
                          <div className="relative">
                              {uni.logo ? (
                                <img 
                                  src={`http://127.0.0.1:8000${uni.logo}`} 
                                  alt={uni.name} 
                                  className="w-12 h-12 object-contain bg-white rounded-lg p-1 shadow-sm group-hover/item:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xl shadow-inner">
                                    🎓
                                </div>
                              )}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full" title="Eligible"></div>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-100 text-sm md:text-base">{uni.name}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span className="bg-gray-700/50 px-1.5 py-0.5 rounded text-gray-300">Cutoff: {uni.cutoff_score}</span>
                                {zScore - uni.cutoff_score > 0.2 && (
                                    <span className="text-green-400 font-medium">Safe Match</span>
                                )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity -translate-x-2 group-hover/item:translate-x-0">
                            <svg className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Matches State */}
                {hasSearched && universities.length === 0 && !loading && (
                  <div className="p-6 rounded-xl border border-red-500/30 bg-red-900/10 text-center animate-in zoom-in-95 duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-3">
                        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-red-200 mb-1">No Matches Found</h3>
                    <p className="text-sm text-red-300/80">
                        Unfortunately, no courses match a Z-Score of <span className="font-mono bg-red-900/40 px-1 rounded">{zScore}</span> yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visual */}
        <div className="hidden lg:flex items-center justify-center relative h-full min-h-[600px]">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative w-full h-full z-10 transition-all hover:scale-[1.02] duration-500">
            <Spline scene="https://prod.spline.design/Nmx4Vyeze9wJ-9zm/scene.splinecode" className="w-full h-full min-h-[500px]" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 border-t border-gray-800/60 bg-gray-950/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-medium text-gray-400">© {new Date().getFullYear()} UniPath Inc.</p>
            <p>Made with 💻 & ☕ for Sri Lankan Students.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <button className="hover:text-indigo-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-indigo-400 transition-colors">Terms of Service</button>
            <button className="hover:text-indigo-400 transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App