import { supabase } from '../supabaseClient';

function Dashboard(props) {
  const user = props.user;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div class="min-h-screen h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <header class="flex justify-between items-center p-4 bg-gray-800">
        <h1 class="text-2xl font-bold">CIAA Plataforma</h1>
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
          onClick={handleSignOut}
        >
          Sair
        </button>
      </header>
      <main class="p-4">
        <h2 class="text-xl mb-4">Bem-vindo, {user.email}</h2>
        <p>Aqui será o seu dashboard personalizado.</p>
      </main>
    </div>
  );
}

export default Dashboard;