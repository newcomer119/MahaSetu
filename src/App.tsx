import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Complaints from './pages/Complaints';
import Documents from './pages/Documents';
import Alerts from './pages/Alerts';
import Dashboard from './pages/Dashboard';
import ApiDocs from './pages/ApiDocs';

const clerkPubKey = 'pk_test_bWFqb3ItY2l2ZXQtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route
                path="/dashboard"
                element={
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/complaints"
                element={
                  <SignedIn>
                    <Complaints />
                  </SignedIn>
                }
              />
              <Route
                path="/documents"
                element={
                  <SignedIn>
                    <Documents />
                  </SignedIn>
                }
              />
              <Route
                path="/alerts"
                element={
                  <SignedIn>
                    <Alerts />
                  </SignedIn>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <SignedOut>
                    <Navigate to="/" replace />
                  </SignedOut>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;