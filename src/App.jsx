import { createSignal, onMount, createEffect } from 'solid-js';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('login');

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  });

  return (
    <div class="min-h-screen h-full bg-gradient-to-br from-gray-900 to-black text-white">
      {currentPage() === 'homePage' ? (
        <Dashboard user={user()} />
      ) : (
        <div class="flex items-center justify-center min-h-screen">
          <div class="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-6 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              view="magic_link"
              showLinks={false}
              class="cursor-pointer"
            />
          </div>
        </div>
      )}
      <footer class="fixed bottom-0 w-full text-center p-2 bg-gray-800 text-white">
        Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="underline">ZAPT</a>
      </footer>
    </div>
  );
}

export default App;