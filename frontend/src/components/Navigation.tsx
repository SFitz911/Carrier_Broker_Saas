import Link from 'next/link';

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  return (
    <nav className={`fixed w-full z-50 border-b ${
      transparent 
        ? 'bg-gray-900/80 backdrop-blur-md border-gray-800' 
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl">🚛</span>
            <span className={`text-xl font-bold ${
              transparent 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'
                : 'text-gray-900'
            }`}>
              Carrier Board
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/search" className={`hover:text-cyan-600 transition font-semibold ${
              transparent ? 'text-gray-300' : 'text-gray-700'
            }`}>
              🔍 Search Brokers
            </Link>
            <Link href="/reviews" className={`hover:text-cyan-600 transition ${
              transparent ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Browse Reviews
            </Link>
            <Link href="/#features" className={`transition ${
              transparent ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-cyan-600'
            }`}>
              Features
            </Link>
            <Link href="/#how-it-works" className={`transition ${
              transparent ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-cyan-600'
            }`}>
              How It Works
            </Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className={`transition ${
              transparent ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-cyan-600'
            }`}>
              Sign In
            </button>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

