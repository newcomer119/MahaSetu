import { Brain, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <Brain className="h-8 w-8" />
              <span className="text-xl font-bold">MahaSetu AI</span>
            </div>
            <p className="text-gray-500">
              Empowering Maharashtra with AI-driven governance solutions for better service delivery
              and citizen engagement.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  Complaint Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  Document Verification
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  Disaster Alerts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} MahaSetu AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}