import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Company {
  id: string;
  legal_name: string;
  entity_type: string;
  mc_number?: string;
  dot_number?: string;
  overall_rating: number;
  review_count: number;
}

export default function RankingsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bad' | 'good' | 'reviewed'>('bad');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/companies?limit=100');
      const data = await response.json();
      setCompanies(data.companies);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load companies:', err);
      setLoading(false);
    }
  };

  // Filter companies with at least 2 reviews
  const companiesWithReviews = companies.filter(c => c.review_count >= 2);

  // Get worst brokers (lowest ratings)
  const worstBrokers = [...companiesWithReviews]
    .sort((a, b) => a.overall_rating - b.overall_rating)
    .slice(0, 25);

  // Get best brokers (highest ratings)
  const bestBrokers = [...companiesWithReviews]
    .sort((a, b) => b.overall_rating - a.overall_rating)
    .slice(0, 25);

  // Get most reviewed brokers
  const mostReviewed = [...companiesWithReviews]
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 25);

  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const BrokerCard = ({ company, rank, isBad }: { company: Company; rank: number; isBad?: boolean }) => (
    <Link href={`/companies/${company.id}`}>
      <div className={`bg-gray-800 border-2 rounded-xl p-5 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer ${
        isBad === true
          ? 'border-red-500 hover:border-red-400'
          : isBad === false
          ? 'border-green-500 hover:border-green-400'
          : 'border-gray-600 hover:border-cyan-400'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`text-4xl font-bold ${
            rank === 1 ? 'text-yellow-400' :
            rank === 2 ? 'text-gray-300' :
            rank === 3 ? 'text-orange-400' :
            'text-gray-500'
          }`}>
            #{rank}
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-3xl font-bold ${
                isBad === true ? 'text-red-400' :
                isBad === false ? 'text-green-400' :
                'text-cyan-400'
              }`}>
                {company.overall_rating.toFixed(1)}
              </span>
            </div>
            <StarDisplay rating={company.overall_rating} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {company.legal_name}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>{company.entity_type}</span>
          <span className="font-semibold text-cyan-400">{company.review_count} reviews</span>
        </div>

        {(company.mc_number || company.dot_number) && (
          <div className="text-xs text-gray-500 space-x-3">
            {company.mc_number && <span>MC# {company.mc_number}</span>}
            {company.dot_number && <span>DOT# {company.dot_number}</span>}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-700">
          <span className="text-cyan-400 text-sm font-semibold flex items-center">
            View Full Profile
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Broker Rankings - Top 25 Good & Bad Brokers | Carrier Board</title>
        <meta name="description" content="See the top 25 best and worst brokers ranked by trucker reviews" />
      </Head>

      <Navigation transparent={false} />

      <main className="min-h-screen bg-gray-900 pt-16">
        {/* Header */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
              <span className="text-cyan-400 text-sm font-semibold">🏆 BROKER RANKINGS</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Top <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">25</span> Good & 
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"> Bad</span> Brokers
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Know who to work with and who to avoid. Rankings based on real trucker reviews and ratings.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-cyan-400">{companiesWithReviews.length}</div>
                <div className="text-gray-400 mt-2">Ranked Brokers</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400">{bestBrokers.length}</div>
                <div className="text-gray-400 mt-2">Top Performers</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-red-400">{worstBrokers.length}</div>
                <div className="text-gray-400 mt-2">Brokers to Avoid</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-7xl py-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('bad')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === 'bad'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              🚫 Worst 25 Brokers
            </button>
            <button
              onClick={() => setActiveTab('good')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === 'good'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              ⭐ Best 25 Brokers
            </button>
            <button
              onClick={() => setActiveTab('reviewed')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                activeTab === 'reviewed'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              📊 Most Reviewed
            </button>
          </div>

          {/* Tab Content - Worst Brokers */}
          {activeTab === 'bad' && (
            <div>
              <div className="bg-red-900/20 border-2 border-red-500 rounded-2xl p-6 mb-8">
                <h2 className="text-3xl font-bold text-red-400 mb-3 flex items-center">
                  <span className="text-4xl mr-3">🚫</span>
                  Top 25 Worst Brokers - AVOID THESE
                </h2>
                <p className="text-gray-300">
                  These brokers have the lowest ratings from truckers. Read reviews carefully before working with them.
                </p>
              </div>

              {worstBrokers.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                  <p className="text-gray-400 text-lg">Not enough data yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {worstBrokers.map((company, idx) => (
                    <BrokerCard key={company.id} company={company} rank={idx + 1} isBad={true} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Content - Best Brokers */}
          {activeTab === 'good' && (
            <div>
              <div className="bg-green-900/20 border-2 border-green-500 rounded-2xl p-6 mb-8">
                <h2 className="text-3xl font-bold text-green-400 mb-3 flex items-center">
                  <span className="text-4xl mr-3">⭐</span>
                  Top 25 Best Brokers - HIGHLY RECOMMENDED
                </h2>
                <p className="text-gray-300">
                  These brokers have the highest ratings from truckers. Great choices for reliable partnerships.
                </p>
              </div>

              {bestBrokers.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                  <p className="text-gray-400 text-lg">Not enough data yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bestBrokers.map((company, idx) => (
                    <BrokerCard key={company.id} company={company} rank={idx + 1} isBad={false} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Content - Most Reviewed */}
          {activeTab === 'reviewed' && (
            <div>
              <div className="bg-cyan-900/20 border-2 border-cyan-500 rounded-2xl p-6 mb-8">
                <h2 className="text-3xl font-bold text-cyan-400 mb-3 flex items-center">
                  <span className="text-4xl mr-3">📊</span>
                  Top 25 Most Reviewed Brokers
                </h2>
                <p className="text-gray-300">
                  These brokers have the most reviews from truckers. More reviews mean more reliable data.
                </p>
              </div>

              {mostReviewed.length === 0 ? (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                  <p className="text-gray-400 text-lg">Not enough data yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mostReviewed.map((company, idx) => (
                    <BrokerCard key={company.id} company={company} rank={idx + 1} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Don't See Your Broker?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Help the trucking community by sharing your experience. Your review could save another trucker from a bad situation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/reviews">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 shadow-lg shadow-cyan-500/50">
                  Write a Review
                </button>
              </Link>
              <Link href="/search">
                <button className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105">
                  Search Brokers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

