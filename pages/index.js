import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Dashboard from '../components/Dashboard';
import ProfileSetup from '../components/ProfileSetup';

export default function Home() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      if (user.user_metadata && user.user_metadata.profileType) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('profileSetup');
      }
    }
  };

  useEffect(() => {
    checkUserSignedIn();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const { user } = session;
        setUser(user);
        if (user.user_metadata && user.user_metadata.profileType) {
          setCurrentPage('dashboard');
        } else {
          setCurrentPage('profileSetup');
        }
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-gray-900 to-black text-white p-4">
      {currentPage === 'dashboard' ? (
        <Dashboard user={user} />
      ) : currentPage === 'profileSetup' ? (
        <ProfileSetup user={user} onProfileSetup={() => setCurrentPage('dashboard')} />
      ) : (
        <div className="flex items-center justify-center min-h-screen h-full">
          <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline mb-6 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              showLinks={false}
              view="magic_link"
            />
          </div>
        </div>
      )}
      <footer className="fixed bottom-0 w-full text-center p-2 bg-gray-800 text-white">
        Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="underline">ZAPT</a>
      </footer>
    </div>
  );
}