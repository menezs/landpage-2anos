import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 py-16 border-t border-pink-100">
      <div className="container mx-auto px-6 text-center">
        {/* Romantic message */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-rose-400" />
            <Heart className="text-pink-500 animate-pulse" />
            <Sparkles className="text-purple-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              "O amor não é sobre quantos dias, meses ou anos vocês estiveram juntos.
            </span>
          </h3>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-semibold">
              O amor é sobre o quanto vocês amam um ao outro todos os dias."
            </span>
          </p>
        </div>

        {/* Anniversary celebration */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-lg mx-auto shadow-lg border border-pink-100">
          <h4 className="text-xl font-bold text-gray-800 mb-3">
            Celebrando Nosso Amor
          </h4>
          <div className="flex items-center justify-center gap-2 text-3xl mb-3">
            <span>❤️</span>
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent font-bold">
              2 Anos
            </span>
            <span>❤️</span>
          </div>
          <p className="text-gray-600">
            Janeiro 2023 - Janeiro 2025
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((heart) => (
              <Heart
                key={heart}
                className="text-rose-400 fill-current animate-pulse"
                style={{ animationDelay: `${heart * 0.2}s` }}
                size={20}
              />
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-pink-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="text-rose-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Nossa História de Amor
              </span>
            </div>
            
            <div className="text-gray-600">
              <p className="text-sm">
                Feito com 💖 para celebrar nosso amor eterno
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              "Que nosso amor continue crescendo por todos os anos que virão..."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;