import React, { useState } from 'react';
import { FileCheck, Search, Upload } from 'lucide-react';
import { detectFraudScore } from '../services/ai';
import type { DocumentVerification } from '../types';

export default function Documents() {
  const [documents, setDocuments] = useState<DocumentVerification[]>([]);
  const [newDocument, setNewDocument] = useState({ documentType: '', content: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      // Analyze document for potential fraud using our AI service
      const fraudAnalysis = await detectFraudScore(newDocument.content);
      
      const document: DocumentVerification = {
        id: Math.random().toString(36).substr(2, 9),
        documentType: newDocument.documentType,
        status: fraudAnalysis.score > 0.7 ? 'rejected' : 'verified',
        submittedAt: new Date().toISOString(),
      };
      
      setDocuments([document, ...documents]);
      setNewDocument({ documentType: '', content: '' });
    } catch (error) {
      console.error('Error submitting document:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      setNewDocument(prev => ({ ...prev, content: text }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Document Verification</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Document Type</label>
            <select
              value={newDocument.documentType}
              onChange={(e) => setNewDocument({ ...newDocument, documentType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a document type</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="voter">Voter ID</option>
              <option value="driving">Driving License</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Document</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input 
                      type="file" 
                      className="sr-only" 
                      onChange={handleFileChange}
                      accept=".txt,.pdf,.doc,.docx"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">TXT, PDF, DOC up to 10MB</p>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isAnalyzing}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <FileCheck className="h-5 w-5 mr-2" />
            {isAnalyzing ? 'Analyzing Document...' : 'Submit for Verification'}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Submissions</h2>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <div key={document.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{document.documentType}</h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  document.status === 'verified' ? 'bg-green-100 text-green-800' :
                  document.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>Submitted: {new Date(document.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}