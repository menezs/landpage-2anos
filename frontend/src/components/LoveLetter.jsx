import React, { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from './ui/button';

const LoveLetter = ({ onClose }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start opening animation after a brief delay
    const timer1 = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    // Show content after opening animation
    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // Show text with typing effect
    const timer3 = setTimeout(() => {
      setShowText(true);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const romanticText = `Meu Amor,

Hoje celebramos dois anos de uma história que começou como um conto de fadas e se tornou nossa realidade mais bonita.

Cada dia ao seu lado é um presente que eu desembrulho com gratidão no coração. Você transformou minha vida em algo mágico, cheio de risos, cumplicidade e um amor que cresce a cada segundo.

Obrigado(a) por ser meu porto seguro, minha aventura favorita e meu lar. Que possamos continuar escrevendo nossa história por toda a eternidade.

Com todo meu amor infinito,
Seu coração apaixonado ❤️`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        onClick={onClose}
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 z-60 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full w-12 h-12"
      >
        <X size={24} />
      </Button>

      {/* Letter envelope and content */}
      <div className="relative max-w-2xl w-full">
        {/* Envelope */}
        <div className={`letter-envelope ${isOpening ? 'opening' : ''}`}>
          {/* Envelope back */}
          <div className="envelope-back">
            <div className="envelope-flap"></div>
          </div>
          
          {/* Letter paper */}
          <div className={`letter-paper ${showContent ? 'visible' : ''}`}>
            <div className="letter-header">
              <Heart className="text-red-500 mx-auto mb-4 animate-pulse" size={40} />
              <h2 className="text-2xl font-bold text-red-700 text-center mb-6">
                Carta de Amor - 2 Anos Juntos
              </h2>
            </div>
            
            <div className="letter-content">
              {showText && (
                <div className="typed-text">
                  {romanticText}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skip button */}
        {!showText && (
          <Button
            onClick={onClose}
            variant="outline"
            className="absolute bottom-4 right-4 bg-white/20 border-white/50 text-white hover:bg-white/30"
          >
            Pular Animação
          </Button>
        )}
        
        {/* Continue button */}
        {showText && (
          <div className="text-center mt-8">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-full text-lg shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce"
            >
              <Heart className="mr-2" />
              Entrar na Página do Amor
            </Button>
          </div>
        )}
      </div>

      {/* Floating hearts animation */}
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart text-red-400"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoveLetter;