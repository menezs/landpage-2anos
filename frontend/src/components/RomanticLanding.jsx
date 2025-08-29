import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Camera, Sparkles, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const RomanticLanding = () => {
  const [hearts, setHearts] = useState([]);

  // Generate falling hearts effect
  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      };
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 6000);
    };

    const interval = setInterval(generateHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Falling Hearts */}
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          className="absolute text-pink-400 opacity-70 animate-bounce pointer-events-none z-10"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            top: '-20px',
            fontSize: '1.5rem'
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="text-rose-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                Nossa História
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#inicio" className="text-gray-700 hover:text-rose-500 transition-colors">Início</a>
              <a href="#momentos" className="text-gray-700 hover:text-rose-500 transition-colors">Momentos</a>
              <a href="#galeria" className="text-gray-700 hover:text-rose-500 transition-colors">Galeria</a>
              <a href="#timeline" className="text-gray-700 hover:text-rose-500 transition-colors">Nossa Jornada</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative py-20 text-center">
        <div className="container mx-auto px-6">
          {/* Sparkle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Sparkles className="absolute top-20 left-1/4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute top-32 right-1/3 text-pink-400 animate-pulse delay-700" />
            <Sparkles className="absolute top-40 left-2/3 text-purple-400 animate-pulse delay-1000" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Dois Anos de
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                Amor Infinito
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Celebrando 24 meses de sorrisos, aventuras, cumplicidade e um amor que cresce a cada dia. 
              Esta é a nossa história de amor ❤️
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <Calendar className="mr-2" />
                Ver Nossa Jornada
              </Button>
              <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3 rounded-full text-lg transform hover:scale-105 transition-all duration-300">
                <Camera className="mr-2" />
                Galeria de Momentos
              </Button>
            </div>

            {/* Anniversary Counter */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-xl border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossos 2 Anos Juntos</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-rose-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-rose-600">24</div>
                  <div className="text-sm text-rose-600">Meses</div>
                </div>
                <div className="bg-pink-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-pink-600">730</div>
                  <div className="text-sm text-pink-600">Dias</div>
                </div>
                <div className="bg-purple-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-purple-600">Sorrisos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Moments Section */}
      <section id="momentos" className="py-16 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Nossos Momentos Especiais
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primeiro Encontro</h3>
                <p className="text-gray-600 leading-relaxed">
                  O dia em que nossos corações se encontraram e descobrimos que éramos perfeitos um para o outro.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primeira Viagem</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explorando novos lugares juntos e criando memórias inesquecíveis pelo caminho.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Momentos Especiais</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cada abraço, cada risada, cada "eu te amo" que torna nossa história única e especial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="galeria" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Galeria de Momentos
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative aspect-square bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border-2 border-pink-200"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="text-rose-400 mx-auto mb-2" size={24} />
                    <p className="text-rose-600 text-sm font-medium">Foto {item}</p>
                    <p className="text-rose-500 text-xs">Adicionar Imagem</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-pink-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              Ver Mais Fotos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RomanticLanding;