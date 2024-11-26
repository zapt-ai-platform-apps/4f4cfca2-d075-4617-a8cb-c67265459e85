import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Dashboard({ user }) {

  const [currentSection, setCurrentSection] = useState('home');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen h-full bg-gradient-to-br from-gray-900 to-black text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">CIAA Plataforma</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
          onClick={handleSignOut}
        >
          Sair
        </button>
      </header>
      <main className="p-4">
        <h2 className="text-xl mb-4">Bem-vindo, {user.email}</h2>
        <p>Aqui será o seu dashboard personalizado.</p>
      </main>
    </div>
  )
}