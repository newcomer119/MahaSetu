import React, { useState } from 'react';
import { AlertTriangle, Bell, MapPin } from 'lucide-react';
import type { DisasterAlert } from '../types';

export default function Alerts() {
  const [alerts] = useState<DisasterAlert[]>([
    {
      id: '1',
      type: 'Flood Warning',
      severity: 'high',
      location: 'Mumbai Suburbs',
      description: 'Heavy rainfall expected in the next 24 hours. Risk of flooding in low-lying areas.',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'Heat Wave Alert',
      severity: 'medium',
      location: 'Nagpur Region',
      description: 'Temperature expected to rise above 45°C. Take necessary precautions.',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Disaster Alerts</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <Bell className="h-5 w-5 mr-2" />
            Subscribe to Alerts
          </button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-4 ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50' :
                alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${
                  alert.severity === 'high' ? 'bg-red-200' :
                  alert.severity === 'medium' ? 'bg-yellow-200' :
                  'bg-blue-200'
                } mr-4`}>
                  <AlertTriangle className={`h-6 w-6 ${
                    alert.severity === 'high' ? 'text-red-600' :
                    alert.severity === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      alert.severity === 'high' ? 'bg-red-200 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Priority
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{alert.description}</p>
                  <div className="flex items-center mt-4 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="mr-4">{alert.location}</span>
                    <span>Issued: {new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Disaster Management Cell</h3>
            <p className="text-gray-600">1234-567890</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Fire Emergency</h3>
            <p className="text-gray-600">101</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Medical Emergency</h3>
            <p className="text-gray-600">102</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-900">Police Control Room</h3>
            <p className="text-gray-600">100</p>
          </div>
        </div>
      </div>
    </div>
  );
}