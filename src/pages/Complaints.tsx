import React, { useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { analyzeSentiment } from '../services/huggingface';
import type { Complaint } from '../types';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '', category: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Analyze sentiment of the complaint
      const sentiment = await analyzeSentiment(newComplaint.description);
      const priority = getPriorityFromSentiment(sentiment.label);
      
      const complaint: Complaint = {
        id: Math.random().toString(36).substr(2, 9),
        ...newComplaint,
        status: priority === 'high' ? 'in-progress' : 'pending',
        createdAt: new Date().toISOString(),
      };
      
      setComplaints([complaint, ...complaints]);
      setNewComplaint({ title: '', description: '', category: '' });
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityFromSentiment = (sentiment: string): 'low' | 'medium' | 'high' => {
    const score = parseInt(sentiment.charAt(0));
    if (score <= 2) return 'high';
    if (score <= 3) return 'medium';
    return 'low';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">File a Complaint</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newComplaint.title}
              onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newComplaint.category}
              onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="public-services">Public Services</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="sanitation">Sanitation</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newComplaint.description}
              onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {isSubmitting ? 'Analyzing...' : 'Submit Complaint'}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Complaints</h2>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{complaint.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">Category: {complaint.category}</span>
                <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}