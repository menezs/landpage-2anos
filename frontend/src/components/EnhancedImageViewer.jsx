import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';

const EnhancedImageViewer = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onIndexChange 
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [slideDirection, setSlideDirection] = useState('none'); // 'left', 'right', 'none'

  // Reset states when opening
  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      setSlideDirection('none');
      setShowControls(true);
      
      // Hide controls after 3 seconds
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex]);

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(window.controlsTimer);
    window.controlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Touch start/end handlers for mobile
  const handleTouchStart = () => {
    setShowControls(true);
  };

  const handleTouchEnd = () => {
    clearTimeout(window.controlsTimer);
    window.controlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const closeViewer = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onClose();
      setIsTransitioning(false);
    }, 300);
  };

  const navigateImage = (direction) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setImageLoaded(false);
    
    setTimeout(() => {
      const newIndex = direction === 'next' 
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;
      
      onIndexChange(newIndex);
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
      setIsTransitioning(false);
      
      setTimeout(() => setImageLoaded(true), 100);
    }, 200);
  };

  const handleZoom = (direction) => {
    const newZoom = direction === 'in' 
      ? Math.min(zoomLevel * 1.5, 3)
      : Math.max(zoomLevel / 1.5, 0.5);
    setZoomLevel(newZoom);
    
    if (newZoom === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove_Drag = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={`fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex items-center justify-center transition-all duration-500 ${
        isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      onMouseMove={handleMouseMove}
      onMouseMove={handleMouseMove_Drag}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Top Controls Bar */}
      <div className={`absolute top-0 left-0 right-0 z-60 p-6 transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
        <div className="flex items-center justify-between">
          {/* Image Info */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
            <div className="flex items-center gap-3 text-white">
              <Heart className="text-red-400" size={20} />
              <div>
                <h3 className="font-bold text-lg">{currentImage.title}</h3>
                <p className="text-sm opacity-80">{currentIndex + 1} de {images.length}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleZoom('out')}
              disabled={zoomLevel <= 0.5}
              className="bg-black/60 hover:bg-black/80 border border-white/20 text-white rounded-xl backdrop-blur-sm"
            >
              <ZoomOut size={20} />
            </Button>
            
            <Button
              onClick={() => handleZoom('in')}
              disabled={zoomLevel >= 3}
              className="bg-black/60 hover:bg-black/80 border border-white/20 text-white rounded-xl backdrop-blur-sm"
            >
              <ZoomIn size={20} />
            </Button>
            
            <Button
              onClick={closeViewer}
              className="bg-red-600/80 hover:bg-red-700 text-white rounded-xl backdrop-blur-sm"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={() => navigateImage('prev')}
        disabled={isTransitioning}
        className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-60 bg-gradient-to-r from-red-600/30 to-red-800/30 hover:from-red-600/60 hover:to-red-800/60 border border-red-400/50 text-white rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 hidden md:flex ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        }`}
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => navigateImage('next')}
        disabled={isTransitioning}
        className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-60 bg-gradient-to-r from-red-600/30 to-red-800/30 hover:from-red-600/60 hover:to-red-800/60 border border-red-400/50 text-white rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 hidden md:flex ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
      >
        <ChevronRight size={28} />
      </button>

      {/* Touch Areas for Mobile and Desktop Navigation */}
      <div 
        className="absolute left-0 top-0 w-1/3 h-full z-50 cursor-pointer flex items-center justify-center"
        onClick={() => navigateImage('prev')}
      >
        {/* Visual hint for navigation - shows on hover/touch */}
        <div className="opacity-0 hover:opacity-100 md:opacity-0 md:hover:opacity-70 transition-all duration-300 bg-black/40 backdrop-blur-sm rounded-full p-4">
          <ChevronLeft size={32} className="text-white" />
        </div>
      </div>
      
      <div 
        className="absolute right-0 top-0 w-1/3 h-full z-50 cursor-pointer flex items-center justify-center"
        onClick={() => navigateImage('next')}
      >
        {/* Visual hint for navigation - shows on hover/touch */}
        <div className="opacity-0 hover:opacity-100 md:opacity-0 md:hover:opacity-70 transition-all duration-300 bg-black/40 backdrop-blur-sm rounded-full p-4">
          <ChevronRight size={32} className="text-white" />
        </div>
      </div>

      {/* Center area for closing - Both Mobile and Desktop */}
      <div 
        className="absolute center top-0 w-1/3 h-full z-40 cursor-pointer flex items-center justify-center"
        onClick={closeViewer}
        style={{ left: '33.33%' }}
      >
        {/* Visual hint for closing - shows on hover/touch */}
        <div className="opacity-0 hover:opacity-100 md:opacity-0 md:hover:opacity-50 transition-all duration-300 bg-black/40 backdrop-blur-sm rounded-full p-4">
          <X size={32} className="text-white" />
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
        <div 
          className={`relative max-w-[95vw] max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ${
            isTransitioning ? 'scale-90 blur-sm opacity-60' : 'scale-100 blur-0 opacity-100'
          } ${!imageLoaded ? 'animate-pulse' : ''}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          onMouseDown={handleMouseDown}
        >
          
          {/* Loading Overlay */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
              <div className="flex flex-col items-center gap-4 text-white">
                <div className="relative">
                  <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 animate-pulse" size={20} />
                </div>
                <span className="text-lg font-semibold animate-pulse">Carregando momento especial...</span>
              </div>
            </div>
          )}
          
          {/* Main Image */}
          <img 
            src={currentImage.src} 
            alt={currentImage.title}
            className={`w-full h-full object-contain transition-all duration-1000 rounded-3xl ${
              !imageLoaded ? 'scale-110 blur-lg opacity-0' : 'scale-100 blur-0 opacity-100'
            }`}
            onLoad={() => setImageLoaded(true)}
            draggable={false}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          />
          
          {/* Romantic Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 via-transparent to-pink-600/10 pointer-events-none rounded-3xl"></div>
          
          {/* Image Description Overlay - Desktop Only */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 text-white transition-all duration-700 hidden md:block rounded-b-3xl ${
              !imageLoaded || !showControls ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-yellow-400" size={24} />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                {currentImage.title}
              </h3>
            </div>
            <p className="text-xl opacity-90 leading-relaxed">
              {currentImage.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dots - Desktop Only */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-60 hidden md:block transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}>
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentIndex && !isTransitioning) {
                    setIsTransitioning(true);
                    setImageLoaded(false);
                    setTimeout(() => {
                      onIndexChange(index);
                      setZoomLevel(1);
                      setImagePosition({ x: 0, y: 0 });
                      setIsTransitioning(false);
                      setTimeout(() => setImageLoaded(true), 100);
                    }, 200);
                  }
                }}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                  index === currentIndex
                    ? 'bg-red-500 border-red-300 scale-125 shadow-lg'
                    : 'bg-white/20 border-white/40 hover:bg-white/40 hover:scale-110'
                } disabled:opacity-50`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced mobile navigation instructions */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-60 md:hidden transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}>
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-1 text-white text-sm">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="font-semibold">Navegação Touch</span>
            <Sparkles size={16} className="text-yellow-400" />
          </div>
          <p className="text-white text-xs opacity-80">Laterais: navegar • Centro: fechar</p>
        </div>
      </div>

      {/* Enhanced desktop navigation instructions */}
      <div className={`absolute bottom-8 right-8 z-60 hidden md:block transition-all duration-500 ${
        showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}>
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 text-center">
          <div className="flex items-center gap-2 mb-1 text-white text-sm">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="font-semibold">Navegação</span>
          </div>
          <p className="text-white text-xs opacity-80">Clique nas laterais ou use ← →</p>
          <p className="text-white text-xs opacity-80">Centro ou ESC para fechar</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedImageViewer;