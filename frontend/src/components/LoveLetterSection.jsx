import React, { useState } from 'react';
import { Heart, Sparkles, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const LoveLetterSection = () => {
  const [showFullLetter, setShowFullLetter] = useState(false);

  const romanticText = `Meu Amor,

Hoje celebramos dois anos de uma história que começou como um conto de fadas e se tornou nossa realidade mais bonita.

Cada dia ao seu lado é um presente que eu desembrulho com gratidão no coração. Você transformou minha vida em algo mágico, cheio de risos, cumplicidade e um amor que cresce a cada segundo.

Obrigado(a) por ser meu porto seguro, minha aventura favorita e meu lar. Que possamos continuar escrevendo nossa história por toda a eternidade.

Com todo meu amor infinito,
Seu coração apaixonado ❤️`;

  const shortText = `Meu Amor,

Hoje celebramos dois anos de uma história que começou como um conto de fadas e se tornou nossa realidade mais bonita.

Cada dia ao seu lado é um presente que eu desembrulho com gratidão no coração...`;

  return (
    <section id="carta-amor" className="py-20 bg-gradient-to-br from-red-50/80 via-red-100/50 to-orange-50/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6 animate-bounce">
            <Sparkles className="text-red-500 text-2xl animate-pulse" />
            <Heart className="text-red-600 animate-pulse text-3xl" />
            <Sparkles className="text-orange-500 text-2xl animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
              Nossa Carta de Amor
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma mensagem especial para eternizar este momento único em nossas vidas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-red-200 border-3 relative overflow-hidden">
            {/* Decorative envelope effect */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
            
            <CardContent className="p-12">
              {/* Letter header */}
              <div className="text-center mb-8 border-b-2 border-red-200 pb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Mail className="text-red-500" size={32} />
                  <Calendar className="text-red-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-red-700 mb-2 font-serif">
                  Carta de Amor - 2 Anos Juntos
                </h3>
                <p className="text-red-600 text-sm">
                  Escrita com todo carinho para celebrar nosso amor
                </p>
              </div>

              {/* Letter content */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200 font-serif text-lg leading-relaxed text-gray-800">
                  <div className="whitespace-pre-line">
                    {showFullLetter ? romanticText : shortText}
                  </div>
                  
                  {!showFullLetter && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowFullLetter(true)}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-full text-base shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <Heart className="inline mr-2" size={16} />
                        Ler Carta Completa
                      </button>
                    </div>
                  )}
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-400 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-60"></div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full opacity-70"></div>
              </div>

              {/* Letter signature */}
              {showFullLetter && (
                <div className="mt-8 text-center animate-fade-in">
                  <div className="inline-block bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-full shadow-xl">
                    <div className="flex items-center gap-2">
                      <Heart className="animate-pulse" size={20} />
                      <span className="font-semibold">Para sempre seu/sua</span>
                      <Heart className="animate-pulse" size={20} />
                    </div>
                  </div>
                </div>
              )}

              {/* Special date */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-white/80 border border-red-300 rounded-full px-6 py-2 text-red-700 font-semibold">
                  <Calendar size={16} />
                  <span>14 de Outubro de 2023 - Janeiro de 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating hearts around the letter */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-red-400 opacity-30 animate-pulse"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                fontSize: `${15 + Math.random() * 20}px`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveLetterSection;