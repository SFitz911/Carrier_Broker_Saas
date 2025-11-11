import { useState } from 'react';

interface ReviewFormProps {
  companyId: string;
  companyName: string;
  userType?: 'trucker' | 'broker' | null;
  onSuccess?: () => void;
}

export default function ReviewForm({ companyId, companyName, userType, onSuccess }: ReviewFormProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Detailed ratings
  const [paymentRating, setPaymentRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [professionalismRating, setProfessionalismRating] = useState(0);
  const [honestyRating, setHonestyRating] = useState(0);
  
  // Additional fields
  const [paymentSpeed, setPaymentSpeed] = useState('');
  const [daysToPayment, setDaysToPayment] = useState('');
  const [wouldWorkAgain, setWouldWorkAgain] = useState<boolean | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // CRITICAL: Only show form to truckers
  if (userType === 'broker') {
    return (
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <svg className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              ⚠️ Brokers Cannot Leave Ratings
            </h3>
            <p className="text-yellow-700 mb-4">
              This is a <strong>trucker-only rating platform</strong>. Brokers can respond to 
              reviews but cannot rate truckers. This protects truckers from retaliation and 
              ensures honest feedback.
            </p>
            <div className="bg-yellow-100 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 font-semibold mb-2">What you CAN do:</p>
              <ul className="list-disc ml-5 text-yellow-700 space-y-1">
                <li>Respond professionally to reviews about your company</li>
                <li>File a dispute if a review is false</li>
                <li>Provide evidence and documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if not logged in
  if (!userType) {
    return (
      <div className="bg-cyan-50 border-2 border-cyan-400 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-cyan-900 mb-2">
          Want to Rate {companyName}?
        </h3>
        <p className="text-gray-700 mb-6">
          Sign up as a trucker to leave honest reviews and help protect your fellow drivers.
        </p>
        <button className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-cyan-700 transition">
          Sign Up as Trucker
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (overallRating === 0) {
      setError('Please select an overall rating');
      return;
    }
    
    if (!title.trim() || !content.trim()) {
      setError('Please fill in title and review content');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId,
          overall_rating: overallRating,
          title: title.trim(),
          content: content.trim(),
          payment_rating: paymentRating || null,
          communication_rating: communicationRating || null,
          professionalism_rating: professionalismRating || null,
          honesty_rating: honestyRating || null,
          payment_speed: paymentSpeed || null,
          days_to_payment: daysToPayment ? parseInt(daysToPayment) : null,
          would_work_again: wouldWorkAgain,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Success!
      alert('Review submitted successfully!');
      
      // Reset form
      setOverallRating(0);
      setTitle('');
      setContent('');
      setPaymentRating(0);
      setCommunicationRating(0);
      setProfessionalismRating(0);
      setHonestyRating(0);
      setPaymentSpeed('');
      setDaysToPayment('');
      setWouldWorkAgain(null);
      
      if (onSuccess) onSuccess();
      
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition transform hover:scale-110"
          >
            <svg
              className={`w-10 h-10 ${value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-4 text-gray-600 self-center">
          {value > 0 ? `${value}/5` : 'Not rated'}
        </span>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Rate {companyName}</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Overall Rating */}
      <div className="mb-8 pb-6 border-b">
        <StarRating
          value={overallRating}
          onChange={setOverallRating}
          label="Overall Rating *"
        />
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Review Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Great broker, paid on time"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
          maxLength={255}
          required
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Your Review *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your experience with this broker..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 h-32"
          required
        />
      </div>

      {/* Detailed Ratings */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Detailed Ratings (Optional)</h3>
        
        <StarRating
          value={paymentRating}
          onChange={setPaymentRating}
          label="Payment"
        />
        
        <StarRating
          value={communicationRating}
          onChange={setCommunicationRating}
          label="Communication"
        />
        
        <StarRating
          value={professionalismRating}
          onChange={setProfessionalismRating}
          label="Professionalism"
        />
        
        <StarRating
          value={honestyRating}
          onChange={setHonestyRating}
          label="Honesty"
        />
      </div>

      {/* Payment Details */}
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Payment Details (Optional)</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Payment Speed
            </label>
            <select
              value={paymentSpeed}
              onChange={(e) => setPaymentSpeed(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
            >
              <option value="">Select...</option>
              <option value="on_time">On Time</option>
              <option value="late">Late</option>
              <option value="never_paid">Never Paid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Days to Payment
            </label>
            <input
              type="number"
              value={daysToPayment}
              onChange={(e) => setDaysToPayment(e.target.value)}
              placeholder="e.g., 30"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Would Work Again */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          Would you work with this broker again?
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setWouldWorkAgain(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              wouldWorkAgain === true
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✓ Yes
          </button>
          <button
            type="button"
            onClick={() => setWouldWorkAgain(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              wouldWorkAgain === false
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✗ No
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          disabled={isSubmitting || overallRating === 0}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        
        <p className="text-sm text-gray-500">
          * Required fields
        </p>
      </div>
    </form>
  );
}

