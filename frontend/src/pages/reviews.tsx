import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Review {
  id: string;
  trucker_name: string;
  company_id: string;
  company_name?: string;
  overall_rating: number;
  title: string;
  content: string;
  payment_rating?: number;
  communication_rating?: number;
  professionalism_rating?: number;
  honesty_rating?: number;
  payment_speed?: string;
  days_to_payment?: number;
  would_work_again?: boolean;
  issues_reported?: string[];
  helpful_count: number;
  created_at: string;
}

interface Company {
  id: string;
  legal_name: string;
  entity_type: string;
  mc_number?: string;
  overall_rating: number;
  review_count: number;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [viewMode, setViewMode] = useState<string>('all'); // 'all', 'positive', 'negative', 'warning'
  
  useEffect(() => {
    fetchReviews();
    fetchCompanies();
  }, []);
  
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reviews?limit=100');
      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Failed to load reviews:', err);
      setLoading(false);
    }
  };
  
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
  
  // Get company name for a review
  const getCompanyName = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    return company?.legal_name || 'Unknown Company';
  };
  
  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => {
      // Filter by company
      if (selectedCompany && review.company_id !== selectedCompany) return false;
      
      // Filter by rating
      if (minRating > 0 && review.overall_rating < minRating) return false;
      
      // Filter by view mode
      if (viewMode === 'positive' && review.overall_rating < 4) return false;
      if (viewMode === 'negative' && review.overall_rating > 2) return false;
      if (viewMode === 'warning' && (review.payment_speed !== 'never_paid' && review.payment_speed !== 'late')) return false;
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'rating_low') {
        return a.overall_rating - b.overall_rating;
      } else if (sortBy === 'rating_high') {
        return b.overall_rating - a.overall_rating;
      } else if (sortBy === 'helpful') {
        return b.helpful_count - a.helpful_count;
      }
      return 0;
    });
  
  // Get worst brokers (lowest ratings with most reviews)
  const worstBrokers = companies
    .filter(c => c.review_count >= 2)
    .sort((a, b) => a.overall_rating - b.overall_rating)
    .slice(0, 3);
  
  // Get best brokers
  const bestBrokers = companies
    .filter(c => c.review_count >= 2)
    .sort((a, b) => b.overall_rating - a.overall_rating)
    .slice(0, 3);
  
  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
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
        <title>Browse Reviews - Carrier Board</title>
        <meta name="description" content="Browse all broker and shipper reviews from truckers" />
      </Head>

      <Navigation transparent={false} />

      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Browse Reviews
              </h1>
              <p className="text-xl text-gray-300">
                See what truckers are saying about brokers and shippers
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-400">{reviews.length}</div>
                <div className="text-gray-400 text-sm">Total Reviews</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{companies.length}</div>
                <div className="text-gray-400 text-sm">Companies Rated</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  {reviews.filter(r => r.would_work_again).length}
                </div>
                <div className="text-gray-400 text-sm">Recommended</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-400">
                  {reviews.filter(r => r.payment_speed === 'never_paid' || r.payment_speed === 'late').length}
                </div>
                <div className="text-gray-400 text-sm">Payment Issues</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Filters</h3>
                
                {/* View Mode */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">View</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setViewMode('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        viewMode === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      All Reviews
                    </button>
                    <button
                      onClick={() => setViewMode('positive')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        viewMode === 'positive' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ⭐ Positive (4-5 stars)
                    </button>
                    <button
                      onClick={() => setViewMode('negative')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        viewMode === 'negative' ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ⚠️ Negative (1-2 stars)
                    </button>
                    <button
                      onClick={() => setViewMode('warning')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        viewMode === 'warning' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      💰 Payment Issues
                    </button>
                  </div>
                </div>

                {/* Company Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Company</label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">All Companies</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.legal_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Minimum Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option value="0">Any Rating</option>
                    <option value="1">1+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars Only</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="rating_low">Lowest Rating</option>
                    <option value="rating_high">Highest Rating</option>
                  </select>
                </div>

                {/* Quick Links */}
                <div className="pt-6 border-t">
                  <h4 className="text-sm font-semibold mb-3 text-gray-600">Quick Links</h4>
                  <div className="space-y-2 text-sm">
                    <a href="#worst-brokers" className="block text-red-600 hover:underline">
                      🚫 Worst Brokers
                    </a>
                    <a href="#best-brokers" className="block text-green-600 hover:underline">
                      ⭐ Best Brokers
                    </a>
                    <a href="#payment-issues" className="block text-orange-600 hover:underline">
                      💰 Payment Problems
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              
              {/* Top Brokers - Best and Worst */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Worst Brokers */}
                <div id="worst-brokers" className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                    <span className="text-3xl mr-2">🚫</span>
                    Brokers to Avoid
                  </h3>
                  {worstBrokers.length === 0 ? (
                    <p className="text-gray-600">Not enough data yet</p>
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
                            <p className="font-semibold mb-1">{company.legal_name}</p>
                            <p className="text-sm text-gray-600">{company.review_count} reviews</p>
                            {company.mc_number && (
                              <p className="text-xs text-gray-500 mt-1">MC# {company.mc_number}</p>
                            )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Best Brokers */}
                <div id="best-brokers" className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-3xl mr-2">⭐</span>
                    Top Rated Brokers
                  </h3>
                  {bestBrokers.length === 0 ? (
                    <p className="text-gray-600">Not enough data yet</p>
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
                            <p className="font-semibold mb-1">{company.legal_name}</p>
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

              {/* Results Header */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {filteredReviews.length} Review{filteredReviews.length !== 1 ? 's' : ''}
                  </h2>
                  <div className="text-sm text-gray-600">
                    {viewMode === 'all' && 'Showing all reviews'}
                    {viewMode === 'positive' && 'Showing positive reviews'}
                    {viewMode === 'negative' && 'Showing negative reviews'}
                    {viewMode === 'warning' && 'Showing payment issues'}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-500 text-lg">No reviews match your filters</p>
                  <button
                    onClick={() => {
                      setSelectedCompany('');
                      setMinRating(0);
                      setViewMode('all');
                    }}
                    className="mt-4 text-cyan-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                      
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {review.trucker_name[0]}
                            </div>
                            <div>
                              <p className="font-bold">{review.trucker_name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-3xl font-bold text-cyan-600">
                              {review.overall_rating}
                            </span>
                            <StarDisplay rating={review.overall_rating} />
                          </div>
                          {review.would_work_again !== undefined && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              review.would_work_again
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {review.would_work_again ? '✓ Would work again' : '✗ Would not work again'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Company Link */}
                      <Link href={`/companies/${review.company_id}`} className="inline-flex items-center space-x-2 mb-3 hover:underline cursor-pointer">
                        <span className="text-lg font-bold text-gray-900">
                          {getCompanyName(review.company_id)}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>

                      {/* Review Content */}
                      <h3 className="text-xl font-bold mb-2">{review.title}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                      {/* Detailed Ratings Grid */}
                      {(review.payment_rating || review.communication_rating || review.professionalism_rating || review.honesty_rating) && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {review.payment_rating && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 rounded-lg border border-blue-200">
                              <span className="text-xs text-blue-700 block mb-1">Payment</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xl font-bold text-blue-900">{review.payment_rating}</span>
                                <span className="text-blue-600">/5</span>
                              </div>
                            </div>
                          )}
                          {review.communication_rating && (
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-3 rounded-lg border border-purple-200">
                              <span className="text-xs text-purple-700 block mb-1">Communication</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xl font-bold text-purple-900">{review.communication_rating}</span>
                                <span className="text-purple-600">/5</span>
                              </div>
                            </div>
                          )}
                          {review.professionalism_rating && (
                            <div className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-3 rounded-lg border border-green-200">
                              <span className="text-xs text-green-700 block mb-1">Professionalism</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xl font-bold text-green-900">{review.professionalism_rating}</span>
                                <span className="text-green-600">/5</span>
                              </div>
                            </div>
                          )}
                          {review.honesty_rating && (
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 px-4 py-3 rounded-lg border border-orange-200">
                              <span className="text-xs text-orange-700 block mb-1">Honesty</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xl font-bold text-orange-900">{review.honesty_rating}</span>
                                <span className="text-orange-600">/5</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Payment Details */}
                      {(review.payment_speed || review.days_to_payment) && (
                        <div id="payment-issues" className={`rounded-lg p-4 mb-4 ${
                          review.payment_speed === 'never_paid' ? 'bg-red-100 border border-red-300' :
                          review.payment_speed === 'late' ? 'bg-orange-100 border border-orange-300' :
                          'bg-green-100 border border-green-300'
                        }`}>
                          <p className="text-sm font-semibold mb-2">💰 Payment Details:</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {review.payment_speed && (
                              <div>
                                <span className="text-gray-700">Speed: </span>
                                <span className={`font-bold ${
                                  review.payment_speed === 'never_paid' ? 'text-red-700' :
                                  review.payment_speed === 'late' ? 'text-orange-700' :
                                  'text-green-700'
                                }`}>
                                  {review.payment_speed.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                            )}
                            {review.days_to_payment && (
                              <div>
                                <span className="text-gray-700">Days to payment: </span>
                                <span className="font-bold">{review.days_to_payment} days</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Issues Reported */}
                      {review.issues_reported && review.issues_reported.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                          <p className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Issues Reported:</p>
                          <div className="flex flex-wrap gap-2">
                            {review.issues_reported.map((issue, idx) => (
                              <span key={idx} className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                                {issue.replace('_', ' ').toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer - Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <button className="text-gray-600 hover:text-cyan-600 flex items-center space-x-2 transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span>Helpful ({review.helpful_count})</span>
                        </button>
                        
                        <Link href={`/companies/${review.company_id}`} className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm">
                          View Full Profile →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Load More Button */}
              {filteredReviews.length >= 10 && (
                <div className="text-center mt-8">
                  <button className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-lg font-semibold transition">
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

