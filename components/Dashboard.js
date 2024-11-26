import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Dashboard({ user }) {
  const [currentSection, setCurrentSection] = useState('home');
  const profileType = user.user_metadata.profileType;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
        {profileType === 'estudante' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Painel do Estudante</h3>
            <p>Aqui você pode ver seu progresso, cursos recomendados e desafios de IA.</p>
            {/* Adicione mais conteúdo específico para estudantes */}
          </div>
        )}
        {profileType === 'mentor' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Painel do Mentor</h3>
            <p>Aqui você pode ver estatísticas dos alunos, cursos criados e feedback recebido.</p>
            {/* Adicione mais conteúdo específico para mentores */}
          </div>
        )}
        {profileType === 'empresa' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Painel da Empresa</h3>
            <p>Aqui você pode encontrar freelancers, soluções personalizadas e relatórios de projetos.</p>
            {/* Adicione mais conteúdo específico para empresas */}
          </div>
        )}
        {profileType === 'freelancer' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Painel do Freelancer</h3>
            <p>Aqui você pode ver oportunidades de trabalho, projetos em andamento e clientes potenciais.</p>
            {/* Adicione mais conteúdo específico para freelancers */}
          </div>
        )}
      </main>
    </div>
  );
}