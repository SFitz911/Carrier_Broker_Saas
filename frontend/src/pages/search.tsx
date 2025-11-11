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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600"></div>
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

      <main className="min-h-screen bg-gray-50 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Hero Search */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 mb-8 shadow-xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Brokers Before You Haul
            </h1>
            <p className="text-xl text-cyan-50 mb-6">
              Search by company name, MC number, or DOT number
            </p>
            
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brokers... (e.g., Swift, MC# 12345, DOT# 123456)"
                className="flex-1 px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-cyan-300"
              />
              <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
                Search
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="text-sm font-semibold text-gray-700 mr-2">Entity Type:</label>
                <select
                  value={entityFilter}
                  onChange={(e) => setEntityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="">All Types</option>
                  <option value="BROKER">Brokers</option>
                  <option value="SHIPPER">Shippers</option>
                  <option value="FREIGHT_FORWARDER">Freight Forwarders</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mr-2">Rating:</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="high">High (4+ stars)</option>
                  <option value="medium">Medium (2.5-4 stars)</option>
                  <option value="low">Low (&lt;2.5 stars)</option>
                </select>
              </div>

              <div className="ml-auto">
                <span className="text-gray-600">
                  {filteredCompanies.length} result{filteredCompanies.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No companies found</p>
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
                <Link href={`/companies/${company.id}`} key={company.id} className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:scale-105 cursor-pointer h-full">
                    
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
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {company.legal_name}
                    </h3>
                    {company.dba_name && (
                      <p className="text-sm text-gray-600 mb-2">DBA: {company.dba_name}</p>
                    )}

                    <div className="text-sm text-gray-600 space-y-1 mb-4">
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
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-3">
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
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm flex items-center justify-between">
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
        </div>
      </main>
    </>
  );
}

