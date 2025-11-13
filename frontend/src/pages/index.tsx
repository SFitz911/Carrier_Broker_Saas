import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [dotNumber, setDotNumber] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement waitlist functionality
    alert(`Thanks for your interest! We'll contact you at ${email}`)
    setEmail('')
  }

  const handleVerifyDOT = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dotNumber) return

    setVerifying(true)
    setVerificationResult(null)

    try {
      // Call backend API for DOT verification
      const response = await fetch(`http://localhost:8000/api/verify/dot/${dotNumber}`)
      const data = await response.json()
      setVerificationResult(data)
    } catch (error) {
      setVerificationResult({
        verified: false,
        message: 'Unable to verify. Backend may not be running. Try DOT# 123456 for demo.'
      })
    } finally {
      setVerifying(false)
    }
  }

  return (
    <>
      <Head>
        <title>Carrier Board - Two-Way Rating Platform for Freight Industry</title>
        <meta name="description" content="Building transparency and trust in freight brokering. Rate carriers and brokers with DOT/MC verification." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚛</span>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Carrier Board
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/reviews" className="text-gray-300 hover:text-white transition font-semibold">Browse Reviews</a>
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition">Benefits</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white transition">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold">🎉 Now in Open Beta</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Finally, <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Truckers</span> Have a Voice
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The only platform where truckers rate brokers and shippers. Know who pays on time, who doesn't, and who to avoid—before you take the load.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a href="/search" className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50 text-center">
                  🔍 Search Brokers
                </a>
                <a href="/rankings" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-lg shadow-purple-500/50 text-center">
                  🏆 Top 25 Rankings
                </a>
                <a href="/reviews" className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg shadow-blue-500/50 text-center">
                  Browse Reviews
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-cyan-400">10K+</div>
                  <div className="text-gray-400 mt-2">Truckers Protected</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400">5K+</div>
                  <div className="text-gray-400 mt-2">Brokers Rated</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-400">50K+</div>
                  <div className="text-gray-400 mt-2">Honest Reviews</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400">$2M+</div>
                  <div className="text-gray-400 mt-2">In Reported Issues</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-950">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for <span className="text-cyan-400">Truckers</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to protect yourself and make informed decisions before taking a load
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-cyan-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">DOT/MC Verification</h3>
                <p className="text-gray-400">
                  Instant verification through FMCSA database. Verify your carrier credentials and look up any broker or shipper.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Trucker-Only Ratings</h3>
                <p className="text-gray-400">
                  You rate brokers and shippers—not the other way around. Finally, truckers have the power to expose bad actors.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-purple-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Secure Platform</h3>
                <p className="text-gray-400">
                  Enterprise-grade security with JWT authentication, encrypted data, and regular security audits.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-green-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Analytics Dashboard</h3>
                <p className="text-gray-400">
                  Track brokers you've worked with, see payment patterns, and get alerts about companies with poor ratings.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Document Everything</h3>
                <p className="text-gray-400">
                  Upload BOLs, rate confirmations, and payment records. Build a paper trail to protect yourself.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-red-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Real-Time Alerts</h3>
                <p className="text-gray-400">
                  Get notified when brokers you work with receive new ratings, or when payment issues are reported.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How It <span className="text-cyan-400">Works</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Three simple steps to protect yourself and hold brokers accountable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-cyan-500/50">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Sign Up & Verify</h3>
                <p className="text-gray-400">
                  Create your account and verify your DOT/MC number through our FMCSA integration. Takes less than 2 minutes.
                </p>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 -right-6 text-cyan-400/30">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-blue-500/50">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Rate Brokers & Shippers</h3>
                <p className="text-gray-400">
                  Share your real experiences. Rate them on payment speed, communication, professionalism, and honesty.
                </p>
                {/* Arrow */}
                <div className="hidden md:block absolute top-10 -right-6 text-cyan-400/30">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-purple-500/50">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Make Better Decisions</h3>
                <p className="text-gray-400">
                  Check ratings before taking loads. Find the good brokers, avoid the bad ones, and protect your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DOT/MC Verification Demo Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Try <span className="text-cyan-400">DOT/MC Verification</span>
                </h2>
                <p className="text-xl text-gray-400">
                  See how fast we verify your company with FMCSA database
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <form onSubmit={handleVerifyDOT} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Enter DOT or MC Number
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        value={dotNumber}
                        onChange={(e) => setDotNumber(e.target.value)}
                        placeholder="e.g., 123456"
                        className="flex-1 px-6 py-4 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:border-cyan-500 transition text-white"
                        disabled={verifying}
                      />
                      <button
                        type="submit"
                        disabled={verifying || !dotNumber}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {verifying ? 'Verifying...' : 'Verify Now'}
                      </button>
                    </div>
                  </div>

                  {verificationResult && (
                    <div className={`p-6 rounded-xl border ${
                      verificationResult.verified 
                        ? 'bg-green-500/10 border-green-500/50' 
                        : 'bg-red-500/10 border-red-500/50'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          verificationResult.verified ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {verificationResult.verified ? (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg mb-2 ${
                            verificationResult.verified ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {verificationResult.verified ? '✓ Verified!' : '✗ Not Found'}
                          </h3>
                          {verificationResult.company_name && (
                            <p className="text-white font-semibold mb-1">
                              {verificationResult.company_name}
                            </p>
                          )}
                          <p className="text-gray-300 text-sm">
                            {verificationResult.message || 'Company verified with FMCSA database'}
                          </p>
                          <div className="mt-3 space-y-1">
                            {verificationResult.status && (
                              <p className="text-gray-400 text-sm">
                                Status: <span className="text-cyan-400 font-medium">{verificationResult.status}</span>
                              </p>
                            )}
                            {verificationResult.safety_rating && (
                              <p className="text-gray-400 text-sm">
                                Safety Rating: <span className={`font-medium ${
                                  verificationResult.safety_rating === 'Satisfactory' ? 'text-green-400' :
                                  verificationResult.safety_rating === 'Unsatisfactory' ? 'text-red-400' :
                                  'text-yellow-400'
                                }`}>{verificationResult.safety_rating}</span>
                              </p>
                            )}
                            {verificationResult.mock && (
                              <p className="text-yellow-400 text-xs mt-2">
                                ⚠️ Mock data - Add FMCSA API key for real verification
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-sm text-gray-400 text-center">
                    💡 <strong>Try it:</strong> Enter any DOT or MC number to see instant verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-gray-950">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side - For Truckers */}
              <div>
                <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                  <span className="text-green-400 text-sm font-semibold">FOR TRUCKERS</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Know Before You Haul, <span className="text-green-400">Work Smarter</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Identify Reliable Brokers</h3>
                      <p className="text-gray-400">See which brokers pay on time and treat carriers fairly before taking a load.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Build Your Reputation</h3>
                      <p className="text-gray-400">Showcase your professionalism and reliability to attract better-paying loads.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Avoid Problem Clients</h3>
                      <p className="text-gray-400">Read real reviews from other carriers about payment delays and unprofessional behavior.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Why This Matters */}
              <div>
                <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
                  <span className="text-orange-400 text-sm font-semibold">WHY THIS MATTERS</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Level the <span className="text-orange-400">Playing Field</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Brokers Rate You—Now Rate Them</h3>
                      <p className="text-gray-400">For years, brokers have tracked your performance. Now it's your turn to hold them accountable.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Protect Your Fellow Truckers</h3>
                      <p className="text-gray-400">When you report a bad broker, you help other truckers avoid the same problems.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Your Voice, Your Power</h3>
                      <p className="text-gray-400">This isn't about getting even—it's about fairness. Good brokers have nothing to fear.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-cyan-400">Take Control</span> of Your Career?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of truckers who are finally holding brokers accountable
              </p>
              
              <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-cyan-500 transition"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>

              <p className="text-sm text-gray-500">
                🔒 Your email is safe with us. No spam, ever.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-950 border-t border-gray-800 py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl">🚛</span>
                  <span className="text-xl font-bold">Carrier Board</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Building transparency and fairness in freight brokering.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#features" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">API</a></li>
                  <li><a href="#" className="hover:text-white transition">Changelog</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Security</a></li>
                  <li><a href="#" className="hover:text-white transition">Compliance</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Carrier Board. All rights reserved. | A Nextwork.org Project
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

