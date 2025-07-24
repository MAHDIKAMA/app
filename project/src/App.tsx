import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Homepage from './components/Homepage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import CoursePage from './components/CoursePage';

function App() {
  const [currentView, setCurrentView] = useState<'homepage' | 'login' | 'register' | 'dashboard' | 'course'>('homepage');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setCurrentView('dashboard');
      }
      
      setLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('homepage');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return <Dashboard />;
  }
  
  if (currentView === 'course' && selectedCourseId) {
    return <CoursePage courseId={selectedCourseId} onBack={() => setCurrentView('homepage')} />;
  }

  if (currentView === 'homepage') {
    return (
      <Homepage 
        onLogin={() => setCurrentView('login')} 
        onRegister={() => setCurrentView('register')}
        onCourseClick={(courseId) => {
          setSelectedCourseId(courseId);
          setCurrentView('course');
        }}
      />
    );
  }

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleBackToHome = () => {
    setCurrentView('homepage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            {currentView === 'login' ? (
              <LoginForm onSwitchToRegister={handleSwitchToRegister} onBackToHome={handleBackToHome} />
            ) : (
              <RegistrationForm onSwitchToLogin={handleSwitchToLogin} onBackToHome={handleBackToHome} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;