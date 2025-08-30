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
  const [liveTimer, setLiveTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Real gallery images from project directory
  const galleryImages = [
    {
      id: 1,
      title: "Momento Íntimo",
      description: "Um momento especial de carinho e cumplicidade",
      src: "/images/gallery/couple1.jpg",
      placeholder: false
    },
    {
      id: 2,
      title: "Pôr do Sol Romântico",
      description: "Silhueta do nosso amor ao entardecer",
      src: "/images/gallery/couple2.jpg",
      placeholder: false
    },
    {
      id: 3,
      title: "Ternura Matinal",
      description: "Momentos de carinho ao amanhecer",
      src: "/images/gallery/couple3.jpg",
      placeholder: false
    },
    {
      id: 4,
      title: "Vista da Cidade",
      description: "Juntos contemplando o mundo",
      src: "/images/gallery/couple4.jpg",
      placeholder: false
    },
    {
      id: 5,
      title: "Símbolo do Nosso Amor",
      description: "Mãos entrelaçadas, corações unidos",
      src: "/images/gallery/couple5.jpg",
      placeholder: false
    },
    {
      id: 6,
      title: "Momentos Felizes",
      description: "Sorrisos que iluminam nossos dias",
      src: "/images/gallery/couple6.jpg",
      placeholder: false
    },
    {
      id: 7,
      title: "Amor Eterno",
      description: "Celebrando nossa jornada juntos",
      src: "/images/gallery/couple7.jpg",
      placeholder: false
    },
    {
      id: 8,
      title: "Cumplicidade",
      description: "Olhares que dizem tudo",
      src: "/images/gallery/couple8.jpg",
      placeholder: false
    }
  ];

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

  // Live timer effect - calculating time since 14-10-2023
  useEffect(() => {
    const startDate = new Date('2023-10-14T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;
      
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      setLiveTimer({ hours, minutes, seconds });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

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
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-md mx-auto shadow-2xl border-2 border-red-200 transform hover:scale-105 transition-all duration-300 mb-8">
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

            {/* Live Timer */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-3xl p-6 max-w-lg mx-auto shadow-2xl border-2 border-red-300 transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-bold text-white mb-4 text-center">⏱️ Cronômetro do Nosso Amor</h4>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 animate-pulse">
                    {String(liveTimer.hours).padStart(2, '0')}:
                    {String(liveTimer.minutes).padStart(2, '0')}:
                    {String(liveTimer.seconds).padStart(2, '0')}
                  </div>
                  <p className="text-red-100 text-sm font-semibold">
                    Desde 14 de Outubro de 2023
                  </p>
                  <p className="text-red-50 text-xs mt-1">
                    Cada segundo ao seu lado é especial ❤️
                  </p>
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
                className="relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 group border-3 border-red-300 cursor-pointer"
                onClick={() => openImageViewer(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="font-bold text-sm">{image.title}</h3>
                  <p className="text-xs opacity-90">{image.description}</p>
                </div>
                
                {/* Click hint */}
                <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Camera className="text-white" size={16} />
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
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="aspect-square rounded-xl overflow-hidden border-2 border-red-300 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => openImageViewer(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Screen Image Viewer */}
      {showImageViewer && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center">
          {/* Close button */}
          <Button
            onClick={closeImageViewer}
            variant="outline"
            size="icon"
            className="absolute top-6 right-6 z-60 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full w-12 h-12"
          >
            <X size={24} />
          </Button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-full w-16 h-16 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-full w-16 h-16 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight size={32} />
          </button>

          {/* Touch/Click areas for mobile navigation */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-full z-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
          ></div>
          
          <div 
            className="absolute right-0 top-0 w-1/3 h-full z-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
          ></div>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 z-40 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeImageViewer();
            }}
          ></div>

          {/* Main image container */}
          <div className="relative w-full h-full flex items-center justify-center p-20 z-60">
            <div className="relative max-w-4xl max-h-full rounded-2xl shadow-2xl border-4 border-red-300 overflow-hidden transform hover:scale-105 transition-all duration-500">
              <img 
                src={galleryImages[currentImageIndex].src} 
                alt={galleryImages[currentImageIndex].title}
                className="w-full h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image info overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-2">{galleryImages[currentImageIndex].title}</h3>
                <p className="text-lg opacity-90">{galleryImages[currentImageIndex].description}</p>
              </div>
            </div>
          </div>

          {/* Image counter and navigation dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-60">
            {/* Counter */}
            <div 
              className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImageIndex + 1} de {galleryImages.length}
            </div>
            
            {/* Navigation dots */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-red-500 scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation instructions */}
          <div 
            className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-sm z-60"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-1">📱 Navegação:</p>
            <p>← → teclas ou clique nas laterais</p>
            <p>ESC ou clique fora para fechar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RomanticLanding;