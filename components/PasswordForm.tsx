'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface PasswordFormProps {
  onValidPassword: () => void;
}

export default function PasswordForm({ onValidPassword }: PasswordFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        onValidPassword();
      } else {
        setError('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setError('Error al validar la contraseña. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center section-padding">
      
        <div className="text-center mb-8">
        
            <h1 className="text-4xl text-gray-700">AC & AB</h1>
          <h1 className="text-3xl font-script text-gray-700 mb-2">
            Nuestra Boda
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            <strong className="font-semibold">Introduce la contraseña para acceder a nuestra invitación.</strong>
            <br />
            Podrás encontrarla resolviendo este 
            <a href="https://sudokupad.app/james-sinclair/peppermint" className="text-pink-600 hover:underline"> sudoku</a>.
            <br />
            La contraseña corresponde al <strong>cuadro central</strong>, leyéndolo de <strong>izquierda a derecha</strong> y de <strong>arriba a abajo</strong>.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-gray-50 border border-red-200 rounded-lg text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Validando...' : 'Entrar'}
          </button>
        </form>
    </div>
  );
}