import React, { useState } from 'react';
import { Heart, Calendar, Gift, Star, Coffee, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const timelineEvents = [
    {
      date: "Janeiro 2023",
      title: "Nosso Primeiro Encontro",
      description: "O dia em que nossos caminhos se cruzaram e descobrimos que o amor verdadeiro existe.",
      details: "Foi um dia mágico onde cada olhar, cada sorriso, cada palavra trocada construiu a base do nosso amor eterno. O mundo parou naquele momento.",
      icon: Heart,
      color: "red"
    },
    {
      date: "Março 2023",
      title: "Primeiro 'Eu Te Amo'",
      description: "As palavras mais especiais foram ditas pela primeira vez, selando nosso amor.",
      details: "Três palavras que mudaram nossas vidas para sempre. O coração bateu mais forte, os olhos brilharam, e soubemos que era para sempre.",
      icon: Star,
      color: "crimson"
    },
    {
      date: "Maio 2023",
      title: "Nossa Primeira Viagem",
      description: "Explorando o mundo juntos e criando memórias que levaremos para sempre.",
      details: "Cada paisagem nova era mais bonita quando vista ao seu lado. Descobrimos que viajar juntos é criar um mundo só nosso.",
      icon: Gift,
      color: "scarlet"
    },
    {
      date: "Agosto 2023",
      title: "6 Meses Juntos",
      description: "Celebrando nosso primeiro marco e percebendo que isto é para a vida toda.",
      details: "Meio ano de cumplicidade, risadas, descobertas e crescimento juntos. Cada dia mais certos de que somos almas gêmeas.",
      icon: Calendar,
      color: "red"
    },
    {
      date: "Dezembro 2023",
      title: "Primeiro Ano",
      description: "365 dias de amor, risadas, cumplicidade e descobertas sobre nós mesmos.",
      details: "Um ano inteiro de aprender a amar, de crescer juntos, de construir sonhos em comum. O primeiro de muitos anos pela frente.",
      icon: Coffee,
      color: "crimson"
    },
    {
      date: "Janeiro 2025",
      title: "Dois Anos de Amor",
      description: "Hoje celebramos 24 meses do amor mais puro e verdadeiro que já existiu.",
      details: "Dois anos que passaram como um sopro, mas que construíram uma base sólida para a eternidade. Nosso amor só cresce a cada dia.",
      icon: Music,
      color: "scarlet"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: "bg-red-100",
        text: "text-red-700",
        gradient: "from-red-500 to-red-700",
        border: "border-red-300",
        hover: "hover:bg-red-50"
      },
      crimson: {
        bg: "bg-red-200",
        text: "text-red-800",
        gradient: "from-red-600 to-red-800",
        border: "border-red-400",
        hover: "hover:bg-red-100"
      },
      scarlet: {
        bg: "bg-red-300",
        text: "text-red-900",
        gradient: "from-red-700 to-red-900",
        border: "border-red-500",
        hover: "hover:bg-red-200"
      }
    };
    return colors[color];
  };

  const toggleExpand = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-red-50/80 via-red-100/50 to-orange-50/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 animate-fade-in">
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
            Nossa Jornada de Amor
          </span>
        </h2>
        
        <div className="relative">
          {/* Enhanced Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-full shadow-lg animate-pulse"></div>
          
          <div className="space-y-20">
            {timelineEvents.map((event, index) => {
              const colorClasses = getColorClasses(event.color);
              const isLeft = index % 2 === 0;
              const isExpanded = expandedEvent === index;
              
              return (
                <div key={index} className="relative flex items-center justify-center">
                  {/* Enhanced Timeline dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r ${colorClasses.gradient} rounded-full border-4 border-white shadow-2xl z-20 animate-pulse hover:scale-125 transition-all duration-300`}>
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                    <div className={`absolute inset-2 bg-gradient-to-r ${colorClasses.gradient} rounded-full`}></div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} ${isLeft ? '' : 'md:text-right'}`}>
                    <Card className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${isLeft ? 'hover:rotate-1' : 'hover:-rotate-1'} bg-white/90 backdrop-blur-sm ${colorClasses.border} border-3 ${colorClasses.hover}`}>
                      <CardContent className="p-8">
                        <div className={`flex items-center ${isLeft ? '' : 'md:flex-row-reverse'} gap-4 mb-6`}>
                          <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses.gradient} rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl animate-pulse`}>
                            <event.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${colorClasses.text} uppercase tracking-widest mb-1 animate-fade-in`}>
                              {event.date}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed text-lg mb-4">
                          {event.description}
                        </p>
                        
                        {isExpanded && (
                          <div className="animate-fade-in">
                            <p className="text-gray-600 leading-relaxed bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200">
                              {event.details}
                            </p>
                          </div>
                        )}
                        
                        <Button
                          onClick={() => toggleExpand(index)}
                          variant="outline"
                          className={`mt-4 ${colorClasses.border} ${colorClasses.text} ${colorClasses.hover} transition-all duration-300 transform hover:scale-105`}
                        >
                          {isExpanded ? (
                            <>
                              Ver Menos <ChevronUp className="ml-2" size={16} />
                            </>
                          ) : (
                            <>
                              Ver Mais <ChevronDown className="ml-2" size={16} />
                            </>
                          )}
                        </Button>
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