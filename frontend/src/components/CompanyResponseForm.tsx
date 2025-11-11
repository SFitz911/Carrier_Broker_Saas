import { useState } from 'react';

interface CompanyResponseFormProps {
  reviewId: string;
  companyId: string;
  userType?: 'trucker' | 'broker' | null;
  onSuccess?: () => void;
}

export default function CompanyResponseForm({ reviewId, companyId, userType, onSuccess }: CompanyResponseFormProps) {
  const [content, setContent] = useState('');
  const [responderName, setResponderName] = useState('');
  const [responderTitle, setResponderTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');
  const [error, setError] = useState('');

  // Only brokers/companies can respond
  if (userType !== 'broker') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim() || !responderName.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:8000/api/reviews/${reviewId}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          responder_name: responderName.trim(),
          responder_title: responderTitle.trim() || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to submit response');
      }

      // Success!
      alert('Response posted successfully!');
      
      // Reset form
      setContent('');
      setResponderName('');
      setResponderTitle('');
      
      if (onSuccess) onSuccess();
      
    } catch (err: any) {
      setError(err.message || 'Failed to submit response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mt-6">
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-blue-900 mb-1">
            📢 Official Company Response
          </h4>
          <p className="text-sm text-blue-700">
            Respond professionally to this review. Your response is public and you can only post one response per review.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Response Content - NO RATING STARS */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Your Response *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Respond professionally to this review. Focus on facts and provide context if needed."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows={6}
            maxLength={2000}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {content.length}/2000 characters
          </p>
        </div>

        {/* Responder Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Name *
            </label>
            <input
              type="text"
              value={responderName}
              onChange={(e) => setResponderName(e.target.value)}
              placeholder="e.g., John Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Title (Optional)
            </label>
            <input
              type="text"
              value={responderTitle}
              onChange={(e) => setResponderTitle(e.target.value)}
              placeholder="e.g., Operations Manager"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">⚠️ Response Guidelines:</p>
          <ul className="list-disc ml-5 text-sm text-blue-800 space-y-1">
            <li><strong>NO ratings allowed</strong> - You cannot rate the trucker back</li>
            <li>Keep responses professional and factual</li>
            <li>Provide evidence or documentation if disputing claims</li>
            <li>Avoid personal attacks or defensive language</li>
            <li>Only ONE response per review</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Response'}
          </button>
          
          <p className="text-xs text-gray-600">
            This response will be public and visible to all users
          </p>
        </div>
      </form>
    </div>
  );
}

