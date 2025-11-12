import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Company {
  id: string;
  legal_name: string;
  dba_name?: string;
  entity_type: string;
  mc_number?: string;
  dot_number?: string;
  phone?: string;
  physical_city?: string;
  physical_state?: string;
  overall_rating: number;
  review_count: number;
  payment_rating?: number;
  communication_rating?: number;
  professionalism_rating?: number;
  honesty_rating?: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [entityFilter, setEntityFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [searchQuery, companies, entityFilter, ratingFilter]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/companies?limit=100');
      const data = await response.json();
      setCompanies(data.companies);
      setFilteredCompanies(data.companies);
    } catch (err) {
      console.error('Failed to load companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterCompanies = () => {
    let results = companies;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(c =>
        c.legal_name.toLowerCase().includes(query) ||
        (c.dba_name && c.dba_name.toLowerCase().includes(query)) ||
        (c.mc_number && c.mc_number.includes(query)) ||
        (c.dot_number && c.dot_number.includes(query))
      );
    }

    // Entity type filter
    if (entityFilter) {
      results = results.filter(c => c.entity_type === entityFilter);
    }

    // Rating filter
    if (ratingFilter === 'high') {
      results = results.filter(c => c.overall_rating >= 4);
    } else if (ratingFilter === 'medium') {
      results = results.filter(c => c.overall_rating >= 2.5 && c.overall_rating < 4);
    } else if (ratingFilter === 'low') {
      results = results.filter(c => c.overall_rating < 2.5);
    }

    // Sort by rating (highest first by default)
    results.sort((a, b) => b.overall_rating - a.overall_rating);

    setFilteredCompanies(results);
  };

  // Get worst brokers (lowest ratings with most reviews)
  const worstBrokers = companies
    .filter(c => c.review_count >= 2)
    .sort((a, b) => a.overall_rating - b.overall_rating)
    .slice(0, 5);
  
  // Get best brokers
  const bestBrokers = companies
    .filter(c => c.review_count >= 2)
    .sort((a, b) => b.overall_rating - a.overall_rating)
    .slice(0, 5);

  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Search Brokers - Carrier Board</title>
        <meta name="description" content="Search and find brokers and shippers. See ratings before you take a load." />
      </Head>

      <Navigation transparent={false} />

      <main className="min-h-screen bg-gray-900 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Hero Search */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 mb-8 shadow-xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Brokers Before You Haul
            </h1>
            <p className="text-xl text-cyan-50 mb-6">
              Search by company name, MC number, or DOT number
            </p>
            
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search... (company name, MC#, DOT#)"
                className="w-full pl-16 pr-32 py-5 rounded-xl text-lg text-white bg-white/10 backdrop-blur-md border-2 border-white/20 placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/40 focus:border-white/40 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-white/80 text-sm mt-3">
                <span className="font-semibold">{filteredCompanies.length}</span> result{filteredCompanies.length !== 1 ? 's' : ''} found for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Filters */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="text-sm font-semibold text-gray-300 mr-2">Entity Type:</label>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">All Types</option>
                  <option value="BROKER">Brokers</option>
                  <option value="SHIPPER">Shippers</option>
                  <option value="FREIGHT_FORWARDER">Freight Forwarders</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-300 mr-2">Rating:</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="high">High (4+ stars)</option>
                  <option value="medium">Medium (2.5-4 stars)</option>
                  <option value="low">Low (&lt;2.5 stars)</option>
                </select>
              </div>

              <div className="ml-auto">
                <span className="text-gray-300">
                  {filteredCompanies.length} result{filteredCompanies.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredCompanies.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">No companies found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setEntityFilter('');
                  setRatingFilter('all');
                }}
                className="text-cyan-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Link href={`/companies/${company.id}`} key={company.id} className="block bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:border-cyan-500 transition transform hover:scale-105 cursor-pointer h-full">
                  {/* Rating Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      company.entity_type === 'BROKER' ? 'bg-blue-100 text-blue-800' :
                      company.entity_type === 'SHIPPER' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.entity_type}
                    </div>
                    
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 ${
                        company.overall_rating >= 4 ? 'text-green-600' :
                        company.overall_rating >= 2.5 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {company.overall_rating.toFixed(1)}
                      </div>
                      <StarDisplay rating={company.overall_rating} />
                    </div>
                  </div>

                  {/* Company Info */}
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {company.legal_name}
                  </h3>
                  {company.dba_name && (
                    <p className="text-sm text-gray-400 mb-2">DBA: {company.dba_name}</p>
                  )}

                  <div className="text-sm text-gray-400 space-y-1 mb-4">
                    {company.mc_number && (
                      <p>MC# {company.mc_number}</p>
                    )}
                    {company.dot_number && (
                      <p>DOT# {company.dot_number}</p>
                    )}
                    {(company.physical_city || company.physical_state) && (
                      <p>📍 {company.physical_city}, {company.physical_state}</p>
                    )}
                    {company.phone && (
                      <p>📞 {company.phone}</p>
                    )}
                  </div>

                  {/* Rating Breakdown */}
                  {company.review_count > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-sm text-gray-400 mb-3">
                        {company.review_count} review{company.review_count !== 1 ? 's' : ''}
                      </p>
                      
                      {(company.payment_rating || company.communication_rating) && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {company.payment_rating && (
                            <div className="bg-blue-50 px-2 py-1 rounded">
                              <span className="text-gray-600">Payment: </span>
                              <span className="font-bold text-blue-700">{company.payment_rating.toFixed(1)}</span>
                            </div>
                          )}
                          {company.communication_rating && (
                            <div className="bg-purple-50 px-2 py-1 rounded">
                              <span className="text-gray-600">Comm: </span>
                              <span className="font-bold text-purple-700">{company.communication_rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* View Button */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center justify-between">
                      <span>View Full Profile</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Good & Bad Brokers Section */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Bad Brokers */}
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-3xl mr-2">🚫</span>
                Brokers to Avoid
              </h3>
              {worstBrokers.length === 0 ? (
                <p className="text-red-700">Not enough data yet</p>
              ) : (
                <div className="space-y-3">
                  {worstBrokers.map((company, idx) => (
                    <Link href={`/companies/${company.id}`} key={company.id} className="block bg-white rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-red-700">#{idx + 1}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">
                            {company.overall_rating.toFixed(1)}
                          </span>
                          <StarDisplay rating={company.overall_rating} />
                        </div>
                      </div>
                      <p className="font-semibold mb-1 text-gray-900">{company.legal_name}</p>
                      <p className="text-sm text-gray-600">{company.review_count} reviews</p>
                      {company.mc_number && (
                        <p className="text-xs text-gray-500 mt-1">MC# {company.mc_number}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Good Brokers */}
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-3xl mr-2">⭐</span>
                Top Rated Brokers
              </h3>
              {bestBrokers.length === 0 ? (
                <p className="text-green-700">Not enough data yet</p>
              ) : (
                <div className="space-y-3">
                  {bestBrokers.map((company, idx) => (
                    <Link href={`/companies/${company.id}`} key={company.id} className="block bg-white rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-green-700">#{idx + 1}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            {company.overall_rating.toFixed(1)}
                          </span>
                          <StarDisplay rating={company.overall_rating} />
                        </div>
                      </div>
                      <p className="font-semibold mb-1 text-gray-900">{company.legal_name}</p>
                      <p className="text-sm text-gray-600">{company.review_count} reviews</p>
                      {company.mc_number && (
                        <p className="text-xs text-gray-500 mt-1">MC# {company.mc_number}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

