import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement waitlist functionality
    alert(`Thanks for your interest! We'll contact you at ${email}`)
    setEmail('')
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
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition">Benefits</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
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
                Building <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Transparency</span> in Freight Brokering
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                The first two-way rating platform where carriers and brokers build trust through verified reviews and DOT/MC validation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50">
                  Start Rating Now
                </button>
                <button className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition transform hover:scale-105">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-cyan-400">10K+</div>
                  <div className="text-gray-400 mt-2">Verified Carriers</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400">5K+</div>
                  <div className="text-gray-400 mt-2">Active Brokers</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-purple-400">50K+</div>
                  <div className="text-gray-400 mt-2">Reviews</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400">99.9%</div>
                  <div className="text-gray-400 mt-2">Uptime</div>
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
                Powerful Features for <span className="text-cyan-400">Everyone</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to make informed decisions and build lasting partnerships
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
                  Automatic verification through FMCSA database. Only legitimate carriers and brokers can participate.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Two-Way Ratings</h3>
                <p className="text-gray-400">
                  Both carriers and brokers can rate each other. Build your reputation and find trustworthy partners.
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
                  Track your reputation score, view insights, and monitor your performance over time.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Dispute Resolution</h3>
                <p className="text-gray-400">
                  Fair and transparent process to handle disputes with mediation support and evidence submission.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-red-500 transition transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Real-Time Updates</h3>
                <p className="text-gray-400">
                  Get instant notifications about new reviews, responses, and important account activities.
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
                Get started in minutes with our simple three-step process
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
                <h3 className="text-2xl font-bold mb-4">Rate & Review</h3>
                <p className="text-gray-400">
                  Share your experiences with carriers or brokers. Rate on communication, payment, professionalism, and more.
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
                <h3 className="text-2xl font-bold mb-4">Build Trust</h3>
                <p className="text-gray-400">
                  Build your reputation, find reliable partners, and grow your business with confidence and transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-gray-950">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left Side - For Carriers */}
              <div>
                <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                  <span className="text-green-400 text-sm font-semibold">FOR CARRIERS</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Get Paid Fairly, <span className="text-green-400">Work Better</span>
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

              {/* Right Side - For Brokers */}
              <div>
                <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
                  <span className="text-blue-400 text-sm font-semibold">FOR BROKERS</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Find Reliable Carriers, <span className="text-blue-400">Every Time</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Vet Carriers Instantly</h3>
                      <p className="text-gray-400">Check carrier ratings and reviews before booking to ensure on-time delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Reduce No-Shows</h3>
                      <p className="text-gray-400">Work with carriers who have proven track records of reliability and communication.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Strengthen Your Brand</h3>
                      <p className="text-gray-400">Build trust with carriers by maintaining high ratings and professional conduct.</p>
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
                Ready to Build <span className="text-cyan-400">Trust</span> in Every Load?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of carriers and brokers who are already transforming the freight industry
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

