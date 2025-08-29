import React, { useState } from 'react';
import { Heart, Sparkles, Mail, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Footer = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const sendMessage = () => {
    if (message.trim() && email.trim()) {
      // Simulate sending message
      alert(`Mensagem enviada com sucesso! 💖\n\nDe: ${email}\nMensagem: ${message}`);
      setMessage('');
      setEmail('');
      setShowContactModal(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-red-50 via-red-100 to-orange-50 py-20 border-t-4 border-red-200 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-20 h-20 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-16 h-16 bg-red-300 rounded-full opacity-25 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-orange-200 rounded-full opacity-40 animate-pulse delay-300"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Romantic message */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6 animate-bounce">
            <Sparkles className="text-red-500 text-2xl animate-pulse" />
            <Heart className="text-red-600 animate-pulse text-3xl" />
            <Sparkles className="text-orange-500 text-2xl animate-pulse" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
              "O amor não é sobre quantos dias, meses ou anos vocês estiveram juntos.
            </span>
          </h3>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent font-bold">
              O amor é sobre o quanto vocês amam um ao outro todos os dias."
            </span>
          </p>
        </div>

        {/* Anniversary celebration */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 mb-12 max-w-2xl mx-auto shadow-2xl border-3 border-red-200 transform hover:scale-105 transition-all duration-500">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">
            Celebrando Nosso Amor
          </h4>
          <div className="flex items-center justify-center gap-3 text-4xl mb-4 animate-bounce">
            <span>❤️</span>
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent font-bold text-5xl">
              2 Anos
            </span>
            <span>❤️</span>
          </div>
          <p className="text-gray-600 text-lg font-semibold">
            Janeiro 2023 - Janeiro 2025
          </p>
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((heart) => (
              <Heart
                key={heart}
                className="text-red-500 fill-current animate-pulse text-2xl hover:scale-125 transition-all duration-300"
                style={{ animationDelay: `${heart * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        {/* Interactive buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Button
            onClick={() => setShowContactModal(true)}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 rounded-full text-lg shadow-2xl transform hover:scale-110 transition-all duration-500 animate-bounce"
          >
            <MessageCircle className="mr-2" />
            Deixar Mensagem de Amor
          </Button>
          
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="border-red-400 text-red-700 hover:bg-red-100 px-8 py-4 rounded-full text-lg transform hover:scale-110 transition-all duration-500 shadow-xl"
          >
            <Heart className="mr-2" />
            Voltar ao Início
          </Button>
        </div>

        {/* Footer bottom */}
        <div className="border-t-2 border-red-300 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <Heart className="text-red-600 text-2xl animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Nossa História de Amor
              </span>
            </div>
            
            <div className="text-gray-600">
              <p className="text-lg">
                Feito com 💖 para celebrar nosso amor eterno
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg italic animate-pulse">
              "Que nosso amor continue crescendo por todos os anos que virão... ❤️✨"
            </p>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-md border-3 border-red-200 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent text-center">
              💌 Mensagem de Amor
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Seu Email:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="border-red-300 focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Sua Mensagem:</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva uma mensagem romântica..."
                className="border-red-300 focus:border-red-500 min-h-[100px]"
              />
            </div>
            <Button
              onClick={sendMessage}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded-xl text-lg transform hover:scale-105 transition-all duration-300"
            >
              <Mail className="mr-2" />
              Enviar Mensagem 💕
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;