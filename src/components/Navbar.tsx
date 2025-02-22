import { useNavigate } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-500"
            >
              <Brain className="h-8 w-8" />
              <span className="text-xl font-bold">MahaSetu AI</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isSignedIn ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/complaints')}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Complaints
                </button>
                <button
                  onClick={() => navigate('/documents')}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Documents
                </button>
                <button
                  onClick={() => navigate('/alerts')}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Alerts
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <button className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isSignedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/complaints');
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
                >
                  Complaints
                </button>
                <button
                  onClick={() => {
                    navigate('/documents');
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
                >
                  Documents
                </button>
                <button
                  onClick={() => {
                    navigate('/alerts');
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
                >
                  Alerts
                </button>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <SignInButton mode="modal">
                  <button className="w-full text-left text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}