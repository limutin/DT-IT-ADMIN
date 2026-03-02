import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewsManager from './pages/NewsManager';
import TestimonialsManager from './pages/TestimonialsManager';
import AdminLayout from './components/AdminLayout';

function App() {
  const [session] = useState<string | null>(localStorage.getItem('dt_admin_session'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Session is handled via localStorage for hardcoded login
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050C15]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />

        <Route path="/" element={session ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="news" element={<NewsManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
