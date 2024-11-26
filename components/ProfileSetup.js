import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function ProfileSetup({ user, onProfileSetup }) {
  const [profileType, setProfileType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileSetup = async () => {
    if (!profileType) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { profileType },
      });
      if (error) throw error;
      onProfileSetup();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-full">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Selecione seu Perfil</h2>
        <p className="mb-4 text-center">Por favor, selecione o tipo de perfil que melhor descreve você.</p>
        <div className="space-y-4">
          <div>
            <input
              type="radio"
              id="estudante"
              name="profileType"
              value="estudante"
              checked={profileType === 'estudante'}
              onChange={(e) => setProfileType(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="estudante" className="ml-2 cursor-pointer">Estudante</label>
          </div>
          <div>
            <input
              type="radio"
              id="mentor"
              name="profileType"
              value="mentor"
              checked={profileType === 'mentor'}
              onChange={(e) => setProfileType(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="mentor" className="ml-2 cursor-pointer">Mentor</label>
          </div>
          <div>
            <input
              type="radio"
              id="empresa"
              name="profileType"
              value="empresa"
              checked={profileType === 'empresa'}
              onChange={(e) => setProfileType(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="empresa" className="ml-2 cursor-pointer">Empresa</label>
          </div>
          <div>
            <input
              type="radio"
              id="freelancer"
              name="profileType"
              value="freelancer"
              checked={profileType === 'freelancer'}
              onChange={(e) => setProfileType(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="freelancer" className="ml-2 cursor-pointer">Freelancer</label>
          </div>
        </div>
        <button
          onClick={handleProfileSetup}
          disabled={loading}
          className={`w-full mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Salvando...' : 'Salvar Perfil'}
        </button>
      </div>
    </div>
  );
}