import React, { useState } from 'react';
import { MessageSquare, Search } from 'lucide-react';
import { analyzeText } from '../services/ai';
import type { Complaint } from '../types';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState({ 
    title: '', 
    description: '', 
    category: '',
    isEmergency: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add type for tracking events
  type TrackingEvent = {
    date: string;
    status: string;
    description: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Analyze sentiment of the complaint using our AI service
      const analysis = await analyzeText(newComplaint.description);
      
      const complaint: Complaint = {
        id: Math.random().toString(36).substr(2, 9),
        ...newComplaint,
        status: newComplaint.isEmergency || analysis.urgency === 'high' ? 'in-progress' : 'pending',
        createdAt: new Date().toISOString(),
        tracking: [{
          date: new Date().toISOString(),
          status: 'submitted',
          description: 'Complaint filed'
        }]
      };
      
      setComplaints([complaint, ...complaints]);
      setNewComplaint({ title: '', description: '', category: '', isEmergency: false });
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="emergency"
              checked={newComplaint.isEmergency}
              onChange={(e) => setNewComplaint({ ...newComplaint, isEmergency: e.target.checked })}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="emergency" className="ml-2 block text-sm text-red-700 font-medium">
              This is an emergency
            </label>
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
                <h3 className="text-lg font-semibold text-gray-900">
                  {complaint.isEmergency && (
                    <span className="inline-flex items-center mr-2 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      EMERGENCY
                    </span>
                  )}
                  {complaint.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{complaint.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">Category: {complaint.category}</span>
                <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
              
              {/* Tracking Timeline */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking History</h4>
                <div className="space-y-3">
                  {complaint.tracking?.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-400 mt-1"></div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}