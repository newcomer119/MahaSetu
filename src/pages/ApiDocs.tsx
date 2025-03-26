import React from 'react';
import { Code, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ApiDocs() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/complaints/analyze',
      description: 'Analyzes complaint text for sentiment, urgency, and category',
      request: `{
  "text": "Urgent: The road in front of City Hall has large potholes causing accidents"
}`,
      response: `{
  "sentiment": 0.2,
  "urgency": "high",
  "category": "infrastructure",
  "timestamp": "2024-03-15T10:30:00Z"
}`
    },
    {
      method: 'POST',
      path: '/api/documents/verify',
      description: 'Verifies document authenticity and detects potential fraud',
      request: `{
  "document_type": "aadhar",
  "content": "Document content here..."
}`,
      response: `{
  "score": 0.92,
  "confidence": 0.89,
  "status": "verified",
  "timestamp": "2024-03-15T10:30:00Z"
}`
    },
    {
      method: 'POST',
      path: '/api/alerts/create',
      description: 'Creates a new disaster alert for a specific region',
      request: `{
  "type": "flood",
  "severity": "high",
  "location": "Mumbai Suburbs",
  "description": "Heavy rainfall expected in next 24 hours"
}`,
      response: `{
  "alert_id": "alert_123",
  "status": "active",
  "created_at": "2024-03-15T10:30:00Z",
  "expires_at": "2024-03-16T10:30:00Z"
}`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MahaSetu AI API Documentation</h1>
          <p className="text-xl text-gray-600 mb-8">
            Integrate AI-powered governance solutions into your applications with our comprehensive API suite.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-4">
              All API requests require an API key to be included in the request headers.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                <button
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limits</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Free tier: 1000 requests per day</li>
              <li>Premium tier: 10,000 requests per day</li>
              <li>Enterprise tier: Custom limits available</li>
            </ul>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Endpoints</h2>
            
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-white shadow-sm rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono">{endpoint.path}</code>
                </div>
                
                <p className="text-gray-600 mb-6">{endpoint.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Code className="h-4 w-4 mr-1" />
                      Request
                    </h4>
                    <SyntaxHighlighter
                      language="json"
                      style={tomorrow}
                      className="rounded-lg"
                    >
                      {endpoint.request}
                    </SyntaxHighlighter>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Code className="h-4 w-4 mr-1" />
                      Response
                    </h4>
                    <SyntaxHighlighter
                      language="json"
                      style={tomorrow}
                      className="rounded-lg"
                    >
                      {endpoint.response}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
            <p className="text-gray-600 mb-4">
              The API uses conventional HTTP response codes to indicate the success or failure of requests.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-500 w-16">200</span>
                <span className="text-gray-600">Success</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-500 w-16">400</span>
                <span className="text-gray-600">Bad Request - Invalid parameters</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-500 w-16">401</span>
                <span className="text-gray-600">Unauthorized - Invalid API key</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-500 w-16">429</span>
                <span className="text-gray-600">Too Many Requests - Rate limit exceeded</span>
              </div>
              <div className="flex items-start">
                <span className="font-mono text-sm text-gray-500 w-16">500</span>
                <span className="text-gray-600">Internal Server Error</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}