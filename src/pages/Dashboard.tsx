import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileCheck, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to MahaAI Governance Suite
        </h1>
        <p className="text-gray-600 mb-6">
          Empowering Maharashtra with AI-driven governance solutions for better service delivery and citizen engagement.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Complaints Resolved"
            value="1,234"
            icon={<MessageSquare className="h-6 w-6" />}
            change="+12%"
          />
          <StatCard
            title="Documents Verified"
            value="5,678"
            icon={<FileCheck className="h-6 w-6" />}
            change="+8%"
          />
          <StatCard
            title="Active Alerts"
            value="42"
            icon={<AlertTriangle className="h-6 w-6" />}
            change="-5%"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard
          title="File a Complaint"
          description="Submit and track your grievances"
          icon={<MessageSquare className="h-8 w-8" />}
          link="/complaints"
        />
        <QuickActionCard
          title="Verify Documents"
          description="Quick document verification service"
          icon={<FileCheck className="h-8 w-8" />}
          link="/documents"
        />
        <QuickActionCard
          title="Disaster Alerts"
          description="Stay updated with emergency notifications"
          icon={<AlertTriangle className="h-8 w-8" />}
          link="/alerts"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-indigo-600">{icon}</div>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="h-4 w-4 mr-1" />
          {change}
        </div>
      </div>
      <h3 className="text-gray-900 text-2xl font-bold">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}

function QuickActionCard({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
        <div className="text-indigo-600 mb-4">{icon}</div>
        <h3 className="text-gray-900 text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}