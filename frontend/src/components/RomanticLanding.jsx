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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [viewerAnimating, setViewerAnimating] = useState(false);

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
    setImageLoaded(false);
    
    // Simulate image loading
    setTimeout(() => {
      setImageLoaded(true);
    }, 300);
  };

  const closeImageViewer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowImageViewer(false);
      setIsTransitioning(false);
    }, 300);
  };

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setImageLoading(true);
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      setIsTransitioning(false);
      setTimeout(() => setImageLoading(false), 200);
    }, 150);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setImageLoading(true);
    
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setIsTransitioning(false);
      setTimeout(() => setImageLoading(false), 200);
    }, 150);
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
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              />
            ))}
          </div>

          {/* Close button - Hidden on mobile */}
          <button
            onClick={closeImageViewer}
            className="absolute top-6 right-6 z-60 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <X size={24} />
          </button>

          {/* Previous button - Hidden on mobile */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
            disabled={isTransitioning}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 border border-red-300/30 text-white rounded-full w-16 h-16 hover:scale-110 transition-all duration-300 items-center justify-center hidden md:flex backdrop-blur-sm disabled:opacity-50"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next button - Hidden on mobile */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
            disabled={isTransitioning}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 border border-red-300/30 text-white rounded-full w-16 h-16 hover:scale-110 transition-all duration-300 items-center justify-center hidden md:flex backdrop-blur-sm disabled:opacity-50"
          >
            <ChevronRight size={32} />
          </button>

          {/* Click outside to close */}
          <div 
            className="absolute inset-0 z-40 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeImageViewer();
            }}
          ></div>

          {/* Touch/Click areas for navigation - Full height on mobile, 1/3 width on desktop */}
          <div 
            className="absolute left-0 top-0 w-1/2 md:w-1/3 h-full z-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prevImage();
            }}
          ></div>
          
          <div 
            className="absolute right-0 top-0 w-1/2 md:w-1/3 h-full z-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nextImage();
            }}
          ></div>

          {/* Main image container with enhanced animations */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20 z-60">
            <div className={`relative max-w-full max-h-full md:max-w-5xl rounded-3xl shadow-2xl border-2 md:border-4 border-red-300/50 overflow-hidden transition-all duration-500 ${
              isTransitioning ? 'scale-95 blur-sm opacity-70' : 'scale-100 blur-0 opacity-100'
            } ${imageLoading ? 'animate-pulse' : ''}`}>
              
              {/* Loading overlay */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg font-semibold">Carregando...</span>
                  </div>
                </div>
              )}
              
              <img 
                src={galleryImages[currentImageIndex].src} 
                alt={galleryImages[currentImageIndex].title}
                className={`w-full h-full object-contain transition-all duration-700 ${
                  imageLoading ? 'scale-110 blur-md opacity-0' : 'scale-100 blur-0 opacity-100'
                }`}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setImageLoading(false)}
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
              
              {/* Image info overlay - Hidden on mobile */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8 text-white hidden md:block transition-all duration-500 ${
                  imageLoading ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                  {galleryImages[currentImageIndex].title}
                </h3>
                <p className="text-xl opacity-90 leading-relaxed">
                  {galleryImages[currentImageIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced image counter and navigation dots - Hidden on mobile */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-6 z-60 hidden md:flex">
            {/* Counter with romantic design */}
            <div 
              className="bg-gradient-to-r from-red-500/30 to-pink-500/30 backdrop-blur-sm rounded-full px-6 py-3 text-white font-bold text-lg border border-red-300/50 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="inline mr-2" size={18} />
              {currentImageIndex + 1} de {galleryImages.length}
              <Heart className="inline ml-2" size={18} />
            </div>
            
            {/* Enhanced navigation dots */}
            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index !== currentImageIndex && !isTransitioning) {
                      setIsTransitioning(true);
                      setImageLoading(true);
                      setTimeout(() => {
                        setCurrentImageIndex(index);
                        setIsTransitioning(false);
                        setTimeout(() => setImageLoading(false), 200);
                      }, 150);
                    }
                  }}
                  disabled={isTransitioning}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === currentImageIndex
                      ? 'bg-red-500 border-red-300 scale-125 shadow-lg'
                      : 'bg-white/30 border-white/50 hover:bg-white/60 hover:scale-110'
                  } disabled:opacity-50`}
                />
              ))}
            </div>
          </div>

          {/* Mobile-only enhanced counter at top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-60 md:hidden">
            <div 
              className="bg-gradient-to-r from-red-500/40 to-pink-500/40 backdrop-blur-sm rounded-full px-6 py-2 text-white font-bold text-sm border border-red-300/50 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart size={14} />
              {currentImageIndex + 1} de {galleryImages.length}
              <Heart size={14} />
            </div>
          </div>

          {/* Enhanced navigation instructions - Updated for mobile */}
          <div 
            className="absolute top-8 left-8 bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-sm rounded-xl p-4 text-white text-sm z-60 hidden md:block border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="font-semibold">Navegação</span>
            </div>
            <p className="mb-1">← → teclas ou clique nas laterais</p>
            <p>ESC ou clique fora para fechar</p>
          </div>

          {/* Enhanced mobile navigation instructions */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm rounded-xl p-4 text-white text-xs z-60 md:hidden text-center border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles size={12} className="text-yellow-400" />
              <span className="font-semibold">Navegação</span>
              <Sparkles size={12} className="text-yellow-400" />
            </div>
            <p>Toque nas laterais para navegar</p>
            <p>Toque no centro para fechar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RomanticLanding;