import React from 'react';
import { Heart, Calendar, Gift, Star, Coffee, Music } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Timeline = () => {
  const timelineEvents = [
    {
      date: "Janeiro 2023",
      title: "Nosso Primeiro Encontro",
      description: "O dia em que nossos caminhos se cruzaram e descobrimos que o amor verdadeiro existe.",
      icon: Heart,
      color: "rose"
    },
    {
      date: "Março 2023",
      title: "Primeiro 'Eu Te Amo'",
      description: "As palavras mais especiais foram ditas pela primeira vez, selando nosso amor.",
      icon: Star,
      color: "pink"
    },
    {
      date: "Maio 2023",
      title: "Nossa Primeira Viagem",
      description: "Explorando o mundo juntos e criando memórias que levaremos para sempre.",
      icon: Gift,
      color: "purple"
    },
    {
      date: "Agosto 2023",
      title: "6 Meses Juntos",
      description: "Celebrando nosso primeiro marco e percebendo que isto é para a vida toda.",
      icon: Calendar,
      color: "rose"
    },
    {
      date: "Dezembro 2023",
      title: "Primeiro Ano",
      description: "365 dias de amor, risadas, cumplicidade e descobertas sobre nós mesmos.",
      icon: Coffee,
      color: "pink"
    },
    {
      date: "Janeiro 2025",
      title: "Dois Anos de Amor",
      description: "Hoje celebramos 24 meses do amor mais puro e verdadeiro que já existiu.",
      icon: Music,
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      rose: {
        bg: "bg-rose-100",
        text: "text-rose-600",
        gradient: "from-rose-400 to-rose-600",
        border: "border-rose-200"
      },
      pink: {
        bg: "bg-pink-100",
        text: "text-pink-600",
        gradient: "from-pink-400 to-pink-600",
        border: "border-pink-200"
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        gradient: "from-purple-400 to-purple-600",
        border: "border-purple-200"
      }
    };
    return colors[color];
  };

  return (
    <section id="timeline" className="py-16 bg-gradient-to-br from-rose-50/50 via-pink-50/50 to-purple-50/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            Nossa Jornada de Amor
          </span>
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-300 via-pink-300 to-purple-300 rounded-full"></div>
          
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const colorClasses = getColorClasses(event.color);
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center justify-center">
                  {/* Timeline dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r ${colorClasses.gradient} rounded-full border-4 border-white shadow-lg z-10`}></div>
                  
                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} ${isLeft ? '' : 'md:text-right'}`}>
                    <Card className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm ${colorClasses.border} border-2`}>
                      <CardContent className="p-6">
                        <div className={`flex items-center ${isLeft ? '' : 'md:flex-row-reverse'} gap-3 mb-4`}>
                          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <event.icon className="text-white" size={20} />
                          </div>
                          <div>
                            <div className={`text-sm font-semibold ${colorClasses.text} uppercase tracking-wider`}>
                              {event.date}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mt-1">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;