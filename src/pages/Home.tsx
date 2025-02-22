import { SignUpButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  FileCheck,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Shield,
  Users,
  Zap
} from 'lucide-react';

export default function Home() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Governance for
              <span className="text-indigo-600"> Maharashtra</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Empowering citizens with seamless access to government services, efficient complaint
              resolution, and real-time disaster alerts through advanced AI technology.
            </p>
            <div className="flex justify-center space-x-4">
              {isSignedIn ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <SignUpButton mode="modal">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </SignUpButton>
              )}
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how MahaSetu AI is transforming governance with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Smart Complaint Resolution"
              description="AI-powered system for efficient grievance redressal and tracking"
            />
            <FeatureCard
              icon={<FileCheck className="h-8 w-8" />}
              title="Document Verification"
              description="Automated verification of government documents with high accuracy"
            />
            <FeatureCard
              icon={<AlertTriangle className="h-8 w-8" />}
              title="Disaster Alerts"
              description="Real-time notifications for emergency situations and disasters"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure Platform"
              description="End-to-end encryption and robust security measures"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Fast Processing"
              description="Quick turnaround time for all government services"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Citizen Engagement"
              description="Enhanced interaction between citizens and government"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About MahaSetu AI
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                MahaSetu AI is revolutionizing governance in Maharashtra by leveraging artificial
                intelligence to streamline public services, enhance transparency, and improve citizen
                engagement. Our platform connects citizens directly with government services,
                making governance more accessible and efficient.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">1M+</div>
                  <div className="text-gray-600">Citizens Served</div>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
                  <div className="text-gray-600">Resolution Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?auto=format&fit=crop&q=80"
                alt="Smart city visualization"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">
              Get in touch with our team for any queries or support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Main Office</h3>
              <p className="text-gray-600">
                Mantralaya, Mumbai
                <br />
                Maharashtra, India
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-gray-600">
                support@mahasetu.ai
                <br />
                +91 1800-XXX-XXXX
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                <AlertTriangle className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Emergency</h3>
              <p className="text-gray-600">
                Toll-free: 1800-XXX-XXXX
                <br />
                Available 24/7
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
        <div className="text-indigo-600">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}