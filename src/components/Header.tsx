import React from 'react';
import { Link } from 'react-router-dom';
import { Clover as Government, AlertTriangle, FileCheck, MessageSquare } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Government className="h-8 w-8" />
              <span className="text-xl font-bold">MahaAI Governance Suite</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/complaints" className="flex items-center space-x-1 hover:text-indigo-200">
              <MessageSquare className="h-5 w-5" />
              <span>Complaints</span>
            </Link>
            <Link to="/documents" className="flex items-center space-x-1 hover:text-indigo-200">
              <FileCheck className="h-5 w-5" />
              <span>Documents</span>
            </Link>
            <Link to="/alerts" className="flex items-center space-x-1 hover:text-indigo-200">
              <AlertTriangle className="h-5 w-5" />
              <span>Alerts</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}