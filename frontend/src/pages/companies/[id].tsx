import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import ReviewForm from '@/components/ReviewForm';
import CompanyResponseForm from '@/components/CompanyResponseForm';

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

interface Review {
  id: string;
  trucker_name: string;
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
  company_response?: {
    content: string;
    responder_name: string;
    responder_title?: string;
    created_at: string;
  };
}

export default function CompanyProfile() {
  const router = useRouter();
  const { id } = router.query;
  
  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Mock user type for testing - will be replaced with real auth
  const [userType, setUserType] = useState<'trucker' | 'broker' | null>('trucker');
  
  useEffect(() => {
    if (!id) return;
    
    fetchCompanyData();
    fetchReviews();
  }, [id]);
  
  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/companies/${id}`);
      if (!response.ok) throw new Error('Company not found');
      
      const data = await response.json();
      setCompany(data.company);
    } catch (err) {
      setError('Failed to load company data');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reviews?company_id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };
  
  const handleReviewSuccess = () => {
    fetchReviews();
    fetchCompanyData();
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error || 'Company not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="text-cyan-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1">
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
      <span className="ml-2 text-gray-600 font-semibold">{rating.toFixed(1)}</span>
    </div>
  );

  return (
    <>
      <Head>
        <title>{company.legal_name} - Carrier Board</title>
        <meta name="description" content={`Reviews and ratings for ${company.legal_name}`} />
      </Head>

      <Navigation transparent={false} />

      <main className="min-h-screen bg-gray-50 pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Mock User Type Switcher (for testing) */}
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-yellow-800 mb-2">🧪 Testing Mode - Switch User Type:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setUserType('trucker')}
                className={`px-4 py-2 rounded font-semibold ${userType === 'trucker' ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Trucker
              </button>
              <button
                onClick={() => setUserType('broker')}
                className={`px-4 py-2 rounded font-semibold ${userType === 'broker' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Broker
              </button>
              <button
                onClick={() => setUserType(null)}
                className={`px-4 py-2 rounded font-semibold ${userType === null ? 'bg-gray-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Not Logged In
              </button>
            </div>
          </div>

          {/* Company Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{company.legal_name}</h1>
                {company.dba_name && (
                  <p className="text-xl text-gray-600 mb-4">DBA: {company.dba_name}</p>
                )}
                
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {company.entity_type}
                  </span>
                  {company.mc_number && (
                    <span>MC# {company.mc_number}</span>
                  )}
                  {company.dot_number && (
                    <span>DOT# {company.dot_number}</span>
                  )}
                </div>
                
                {(company.physical_city || company.physical_state) && (
                  <p className="text-gray-600">
                    📍 {company.physical_city}, {company.physical_state}
                  </p>
                )}
                
                {company.phone && (
                  <p className="text-gray-600">
                    📞 {company.phone}
                  </p>
                )}
              </div>
              
              {/* Rating Summary */}
              <div className="text-center bg-gray-50 rounded-xl p-6 ml-6">
                <div className="text-5xl font-bold text-cyan-600 mb-2">
                  {company.overall_rating.toFixed(1)}
                </div>
                <StarDisplay rating={company.overall_rating} />
                <p className="text-gray-600 mt-2">{company.review_count} reviews</p>
              </div>
            </div>
            
            {/* Detailed Ratings */}
            {(company.payment_rating || company.communication_rating || company.professionalism_rating || company.honesty_rating) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                {company.payment_rating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-cyan-600 mr-2">{company.payment_rating.toFixed(1)}</span>
                      <span className="text-gray-400">/5</span>
                    </div>
                  </div>
                )}
                {company.communication_rating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Communication</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-cyan-600 mr-2">{company.communication_rating.toFixed(1)}</span>
                      <span className="text-gray-400">/5</span>
                    </div>
                  </div>
                )}
                {company.professionalism_rating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Professionalism</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-cyan-600 mr-2">{company.professionalism_rating.toFixed(1)}</span>
                      <span className="text-gray-400">/5</span>
                    </div>
                  </div>
                )}
                {company.honesty_rating && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Honesty</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-cyan-600 mr-2">{company.honesty_rating.toFixed(1)}</span>
                      <span className="text-gray-400">/5</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Review Form (Trucker Only) */}
          <div className="mb-8">
            <ReviewForm
              companyId={company.id}
              companyName={company.legal_name}
              userType={userType}
              onSuccess={handleReviewSuccess}
            />
          </div>

          {/* Reviews List */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Reviews ({reviews.length})
            </h2>
            
            {reviews.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
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
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <StarDisplay rating={review.overall_rating} />
                      </div>
                      
                      {review.would_work_again !== undefined && (
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          review.would_work_again
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {review.would_work_again ? '✓ Would work again' : '✗ Would not work again'}
                        </div>
                      )}
                    </div>

                    {/* Review Content */}
                    <h3 className="text-xl font-bold mb-2">{review.title}</h3>
                    <p className="text-gray-700 mb-4">{review.content}</p>

                    {/* Detailed Ratings */}
                    {(review.payment_rating || review.communication_rating || review.professionalism_rating || review.honesty_rating) && (
                      <div className="flex flex-wrap gap-4 mb-4">
                        {review.payment_rating && (
                          <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-600">Payment: </span>
                            <span className="font-bold text-cyan-600">{review.payment_rating}/5</span>
                          </div>
                        )}
                        {review.communication_rating && (
                          <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-600">Communication: </span>
                            <span className="font-bold text-cyan-600">{review.communication_rating}/5</span>
                          </div>
                        )}
                        {review.professionalism_rating && (
                          <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-600">Professionalism: </span>
                            <span className="font-bold text-cyan-600">{review.professionalism_rating}/5</span>
                          </div>
                        )}
                        {review.honesty_rating && (
                          <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="text-sm text-gray-600">Honesty: </span>
                            <span className="font-bold text-cyan-600">{review.honesty_rating}/5</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Payment Details */}
                    {(review.payment_speed || review.days_to_payment) && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Payment Details:</p>
                        {review.payment_speed && (
                          <p className="text-sm text-blue-800">
                            Speed: <span className="font-semibold capitalize">{review.payment_speed.replace('_', ' ')}</span>
                          </p>
                        )}
                        {review.days_to_payment && (
                          <p className="text-sm text-blue-800">
                            Days to payment: <span className="font-semibold">{review.days_to_payment} days</span>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Issues Reported */}
                    {review.issues_reported && review.issues_reported.length > 0 && (
                      <div className="bg-red-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-red-900 mb-2">Issues Reported:</p>
                        <div className="flex flex-wrap gap-2">
                          {review.issues_reported.map((issue, idx) => (
                            <span key={idx} className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm">
                              {issue.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Helpful Button */}
                    <div className="flex items-center space-x-4 pt-4 border-t">
                      <button className="text-gray-600 hover:text-cyan-600 flex items-center space-x-2">
                        <span>👍</span>
                        <span>Helpful ({review.helpful_count})</span>
                      </button>
                    </div>

                    {/* Company Response */}
                    {review.company_response ? (
                      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                        <div className="flex items-start space-x-3 mb-2">
                          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <div className="flex-1">
                            <p className="font-bold text-blue-900">
                              Response from {review.company_response.responder_name}
                              {review.company_response.responder_title && (
                                <span className="text-sm font-normal text-blue-700">
                                  {' '}({review.company_response.responder_title})
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-blue-700 mb-3">
                              {new Date(review.company_response.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-blue-900">{review.company_response.content}</p>
                          </div>
                        </div>
                      </div>
                    ) : userType === 'broker' && (
                      <CompanyResponseForm
                        reviewId={review.id}
                        companyId={company.id}
                        userType={userType}
                        onSuccess={handleReviewSuccess}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

