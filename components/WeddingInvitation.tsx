import { motion } from 'framer-motion';
import { Heart, MapPin, Utensils } from 'lucide-react';
import { useState, useEffect } from 'react';
import RSVPForm from './RSVPForm';

// Countdown Component
function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-8 max-w-md mx-auto">
      {[
        { value: timeLeft.days, label: 'DÍAS' },
        { value: timeLeft.hours, label: 'HORAS' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEG' }
      ].map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-light text-white mb-2">
            {item.value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-300 font-medium tracking-widest">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ElegantWeddingInvitation() {
  const [activeSection, setActiveSection] = useState('hero');
  const weddingDate = '2025-11-15T17:30:00';
  const venueName = 'Hotel Grand Hyatt';
  const venueAddress = 'Pl. de Pius XII, 4, Les Corts, 08028 Barcelona';

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  // Callbacks para el formulario
  const handleFormSuccess = () => {
    console.log('Formulario enviado exitosamente');
    // Aquí puedes agregar lógica adicional como analytics, notificaciones, etc.
  };

  const handleFormError = (error: string) => {
    console.error('Error en el formulario:', error);
    // Aquí puedes agregar lógica de manejo de errores más sofisticada
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="hidden md:visible w-8 h-8 border border-black rounded-full md:flex items-center justify-center">
                <Heart className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-light tracking-wider">AC & AB</span>
            </div>
            <div className="hidden md:flex space-x-12">
              {['INICIO', 'NUESTRA HISTORIA', 'CEREMONIA', 'PROGRAMA', 'FORMULARIO'].map((item, index) => {
                const sectionId = index === 0 ? 'hero' : item.toLowerCase().replace(' ', '-');
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-sm font-medium tracking-wider transition-colors ${
                      activeSection === sectionId ? 'text-black font-bold' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <a
              href="#formulario"
              className="border border-black px-6 py-2 text-sm font-medium tracking-wider hover:bg-black hover:text-white transition-all duration-300 flex justify-center items-center text-center"
            >
              CONFIRMA TU ASISTENCIA
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="/img/52.webp"
            alt="Wedding couple"
            className="w-full h-full object-cover object-bottom filter grayscale"
          />
        </div>

        {/* Content */}
        <div className="relative z-30 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Names */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-6xl md:text-8xl font-thin text-white tracking-[0.3em] leading-none"
              >
                ANDREU
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center justify-center"
              >
                <div className="w-16 h-px bg-white/60" />
                <span className="mx-8 text-2xl text-white font-light tracking-[0.5em]">&</span>
                <div className="w-16 h-px bg-white/60" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="text-6xl md:text-8xl font-thin text-white tracking-[0.3em] leading-none"
              >
                ARIADNA
              </motion.h1>
            </div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="space-y-4"
            >
              <p className="text-white/90 text-lg tracking-[0.2em] font-light">
                {formatDate(weddingDate).toUpperCase()}
              </p>
              <p className="text-white/70 text-sm tracking-[0.3em]">
                {venueName.toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Love Story Section */}
      <section id="nuestra-historia" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-5xl md:text-6xl font-thin tracking-wider mb-8 text-black">
                  NUESTRA<br />
                  HISTORIA<br />
                  DE AMOR
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Allá por 2019, en la gran metrópolis del Segrià, comenzaba una historia curiosa entre una fotógrafa fragatina de rizos indomables y un ingeniero Lleidatà de piel pálida.
                </p>
                <p>
                  En estos seis años hemos lanzado hachas, disparado carabinas, recorrido las Españas en un Seat Ibiza del 2003, sobrevivido a pulmonías y rescatado gatas en apuros.
                </p>
                <p>
                  Si, como decía Santo Tomás de Aquino, amar es querer el bienestar del otro… ¡qué bien hemos estado y qué bien nos hemos querido!
                </p>
                <p>
                  Este 15 de noviembre no marca el final de nuestra historia, sino celebra el inicio de una nueva etapa: con más risas, más felicidad, más amor… y, con suerte, menos pulmonías. 
                </p>
                <p>
                  Queremos compartir esta celebración tan especial con vosotros en el Hotel Grand Hyatt, rodeados de quienes forman parte de nuestra historia.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-none">
                <img
                  src="/img/2.webp"
                  alt="Couple portrait"
                  className="w-full h-full object-cover filter grayscale"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ceremony Details */}
      <section id="ceremonia" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-thin tracking-wider text-black mb-8">
              LA CEREMONIA
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* Ceremony Venue */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mx-auto mb-8">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium tracking-wider text-black mb-4">
                LUGAR DE LA CEREMONIA
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">{venueName}</p>
                <p className="text-sm">{venueAddress}</p>
              </div>
            </motion.div>

            {/* Dress Code */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mx-auto mb-8">
                <Utensils className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium tracking-wider text-black mb-4">
                CÓDIGO DE VESTIMENTA
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">Elegante / Formal</p>
                <p className="text-sm">Evita colores muy claros o blancos. Bienvenidos colores oscuros y negro.</p>
              </div>
            </motion.div>

            {/* Post Ceremony */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-medium tracking-wider text-black mb-4">
                POST CEREMONIA
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">Celebración</p>
                <p className="text-sm">Cóctel y fiesta</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="programa" className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-thin tracking-wider text-white">
                PROGRAMA<br />
                DE EVENTOS
              </h2>

              <div className="space-y-8">
                {[
                  { time: '17:00', event: 'Llegada & Bienvenida', desc: '' },
                  { time: '17:30', event: 'Ceremonia', desc: '' },
                  { time: '18:00', event: 'Cóctel & Fotos', desc: '' },
                  { time: '21:00', event: 'Fiesta', desc: '' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex items-start space-x-6"
                  >
                    <div className="text-2xl font-light text-white/60 min-w-[80px]">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-white mb-1 tracking-wide">
                        {item.event}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center"
            >
              <div className="border-white p-16 rounded-none">
                <h3 className="text-2xl font-light text-white mb-12 tracking-wider">
                  FALTAN
                </h3>
                <div className="mb-12">
                  <Countdown targetDate={weddingDate} />
                </div>
                <p className="text-gray-300 text-sm tracking-wider">
                  PARA NUESTRO DÍA ESPECIAL
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="formulario" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-thin tracking-wider text-black mb-8">
              CONFIRMA TU<br />
              ASISTENCIA
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Tu presencia es verdaderamente el mejor regalo que podemos recibir.
            </p>
            <div className="mt-8">
              <p className="text-sm text-gray-500 tracking-wider">
                CONFIRMA ANTES DEL 1 DE NOVIEMBRE
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-gray-50 py-12 px-6 md:p-16"
          >
            <RSVPForm 
              onSubmitSuccess={handleFormSuccess}
              onSubmitError={handleFormError}
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-thin tracking-wider text-black mb-8">
              PREGUNTAS<br />
              FRECUENTES
            </h2>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                q: "¿A qué hora debería llegar?",
                a: "Te recomendamos llegar 30 minutos antes de que comience la ceremonia para tener tiempo de acomodarte."
              },
              {
                q: "¿Esta invitación solo para adultos?",
                a: "En esta ocasión la celebración será en una discoteca tipo cabaret y no es un espacio adecuado para niños."
              },
              {
                q: "¿Hay algún código de vestimenta?",
                a: "Nos encantará veros elegantes y con ganas de fiesta. No es necesario traje largo ni etiqueta estricta, pero sí un look arreglado de noche. Son bienvenidos los colores oscuros y el negro, sin embargo, el blanco o colores muy cercanos es preferible evitarlos."
              },
              {
                q: "¿Habrá comida o solo cóctel?",
                a: "Será un cóctel largo con diferentes estaciones de comida, acompañado de barra libre y música para disfrutar todo el día."
              },
              {
                q: "¿A qué hora termina la fiesta?",
                a: "La discoteca estará reservada para nosotros, así que preparaos para bailar mucho. 💃🕺"
              },
              {
                q: "¿Puedo hacer fotos durante la boda?",
                a: "¡Claro! Eso sí, os pedimos que durante la ceremonia disfrutéis del momento sin móviles, y luego podréis hacer todas las fotos y vídeos que queráis en la fiesta."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="border-b border-gray-200 pb-8"
              >
                <h3 className="text-xl font-medium text-black mb-4 tracking-wide">
                  {String(index + 1).padStart(2, '0')} {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center">
            <div className="w-16 h-px bg-gray-400" />
            <div className="mx-6 w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-gray-300" />
            </div>
            <div className="w-16 h-px bg-gray-400" />
          </div>
          
          <p className="text-2xl font-thin tracking-[0.3em] text-white">
            ANDREU & ARIADNA
          </p>
          
          <p className="text-gray-300 text-sm tracking-wider">
            CON AMOR, ESPERAMOS VERTE EN NUESTRO DÍA ESPECIAL
          </p>
          
          <p className="text-xs text-gray-300 tracking-wider">
            {formatDate(weddingDate).toUpperCase()} • {venueName.toUpperCase()}
          </p>
        </motion.div>
      </footer>
    </div>
  );
}