import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Camera, Sparkles, MapPin, X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const RomanticLanding = () => {
  const [hearts, setHearts] = useState([]);
  const [fireworks, setFireworks] = useState([]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Mock gallery images (placeholders for now)
  const galleryImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Momento Especial ${i + 1}`,
    description: `Uma memória inesquecível do nosso amor - Foto ${i + 1}`,
    placeholder: true
  }));

  // Generate falling hearts effect
  useEffect(() => {
    const generateHeart = () => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: Math.random() * 20 + 15,
      };
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 6000);
    };

    const interval = setInterval(generateHeart, 600);
    return () => clearInterval(interval);
  }, []);

  // Generate fireworks effect
  useEffect(() => {
    const generateFirework = () => {
      const newFirework = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 50 + 10,
        color: ['red', 'crimson', 'orange', 'gold'][Math.floor(Math.random() * 4)],
      };
      setFireworks(prev => [...prev, newFirework]);
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(firework => firework.id !== newFirework.id));
      }, 2000);
    };

    const interval = setInterval(generateFirework, 1500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleAnimations = () => {
    setIsPlaying(!isPlaying);
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setShowImageViewer(true);
    setShowGalleryModal(false);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = (e) => {
    if (showImageViewer) {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeImageViewer();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageViewer]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 overflow-hidden relative">
      {/* Falling Hearts */}
      {isPlaying && hearts.map(heart => (
        <Heart
          key={heart.id}
          className="absolute text-red-500 opacity-80 pointer-events-none z-10 animate-bounce"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            top: '-20px',
            fontSize: `${heart.size}px`,
            transform: 'rotate(15deg)',
          }}
        />
      ))}

      {/* Fireworks Effects */}
      {isPlaying && fireworks.map(firework => (
        <div
          key={firework.id}
          className="absolute pointer-events-none z-10"
          style={{
            left: `${firework.left}%`,
            top: `${firework.top}%`,
          }}
        >
          <div className={`w-4 h-4 rounded-full bg-${firework.color}-500 animate-ping`}></div>
          <div className={`w-2 h-2 rounded-full bg-${firework.color}-400 animate-pulse absolute top-1 left-1`}></div>
        </div>
      ))}

      {/* Header */}
      <header className="relative z-20 bg-white/90 backdrop-blur-md shadow-lg border-b-2 border-red-200">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="text-red-600 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Nossa História
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-700 hover:text-red-600 transition-all duration-300 hover:scale-110 font-medium"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('momentos')}
                className="text-gray-700 hover:text-red-600 transition-all duration-300 hover:scale-110 font-medium"
              >
                Momentos
              </button>
              <button 
                onClick={() => scrollToSection('galeria')}
                className="text-gray-700 hover:text-red-600 transition-all duration-300 hover:scale-110 font-medium"
              >
                Galeria
              </button>
              <button 
                onClick={() => scrollToSection('timeline')}
                className="text-gray-700 hover:text-red-600 transition-all duration-300 hover:scale-110 font-medium"
              >
                Nossa Jornada
              </button>
            </div>
            <Button
              onClick={toggleAnimations}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative py-20 text-center">
        <div className="container mx-auto px-6">
          {/* Sparkle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Sparkles className="absolute top-20 left-1/4 text-yellow-500 animate-pulse text-3xl" />
            <Sparkles className="absolute top-32 right-1/3 text-red-500 animate-pulse delay-700 text-2xl" />
            <Sparkles className="absolute top-40 left-2/3 text-orange-500 animate-pulse delay-1000 text-4xl" />
            <Sparkles className="absolute top-60 right-1/4 text-red-400 animate-pulse delay-500 text-2xl" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-pulse">
              <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
                Dois Anos de
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-800 via-red-600 to-red-900 bg-clip-text text-transparent drop-shadow-lg">
                Amor Infinito
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Celebrando 24 meses de sorrisos, aventuras, cumplicidade e um amor que cresce a cada dia. 
              Esta é a nossa história de amor ❤️
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => scrollToSection('timeline')}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-full text-lg shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce"
              >
                <Calendar className="mr-2" />
                Ver Nossa Jornada
              </Button>
              <Button 
                onClick={() => setShowGalleryModal(true)}
                variant="outline" 
                className="border-red-400 text-red-700 hover:bg-red-100 px-8 py-4 rounded-full text-lg transform hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <Camera className="mr-2" />
                Galeria de Momentos
              </Button>
            </div>

            {/* Anniversary Counter */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl border-2 border-red-200 transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Nossos 2 Anos Juntos</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
                  <div className="text-3xl font-bold text-red-700 animate-pulse">24</div>
                  <div className="text-sm text-red-600 font-semibold">Meses</div>
                </div>
                <div className="bg-gradient-to-br from-red-200 to-red-300 rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
                  <div className="text-3xl font-bold text-red-800 animate-pulse">730</div>
                  <div className="text-sm text-red-700 font-semibold">Dias</div>
                </div>
                <div className="bg-gradient-to-br from-red-300 to-red-400 rounded-2xl p-6 transform hover:scale-110 transition-all duration-300">
                  <div className="text-3xl font-bold text-red-900 animate-pulse">∞</div>
                  <div className="text-sm text-red-800 font-semibold">Sorrisos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Moments Section */}
      <section id="momentos" className="py-16 bg-white/60 backdrop-blur-sm border-t-2 border-red-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Nossos Momentos Especiais
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 bg-white/90 backdrop-blur-sm border-red-200 border-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Heart className="text-white text-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primeiro Encontro</h3>
                <p className="text-gray-600 leading-relaxed">
                  O dia em que nossos corações se encontraram e descobrimos que éramos perfeitos um para o outro.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 bg-white/90 backdrop-blur-sm border-red-200 border-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <MapPin className="text-white text-2xl animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Primeira Viagem</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explorando novos lugares juntos e criando memórias inesquecíveis pelo caminho.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 bg-white/90 backdrop-blur-sm border-red-200 border-2">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-red-700 to-red-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Sparkles className="text-white text-2xl animate-pulse" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Galeria de Momentos
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.slice(0, 8).map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 group border-3 border-red-300 cursor-pointer"
                onClick={() => openImageViewer(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="text-red-600 mx-auto mb-2 animate-pulse" size={28} />
                    <p className="text-red-700 text-sm font-bold">Foto {image.id}</p>
                    <p className="text-red-600 text-xs">Clique para Expandir</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                
                {/* Image expansion hint */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/20 backdrop-blur-sm rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs text-center font-semibold">Clique para ver em tela cheia</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => setShowGalleryModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-full text-lg shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce"
            >
              Ver Mais Fotos
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <Dialog open={showGalleryModal} onOpenChange={setShowGalleryModal}>
        <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-md border-2 border-red-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Nossa Galeria de Momentos Especiais
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center border-2 border-red-300 hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <Camera className="text-red-600 mx-auto mb-1" size={20} />
                  <p className="text-red-700 text-xs font-semibold">Foto {item}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RomanticLanding;