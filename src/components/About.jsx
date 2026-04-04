import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiDoubleQuotesL } from 'react-icons/ri';

const owners = [
  {
    name: 'Chef Rodrigo Monge',
    role: 'Chef Ejecutivo & Co-Fundador',
    quote: '"La cocina rápida no tiene por qué ser cocina descuidada."',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Daniela Salas',
    role: 'Directora de Experiencia & Co-Fundadora',
    quote: '"Queremos que cada visita sea un momento que valga la pena recordar."',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="nosotros" className="bg-[#f5f0e8] py-28 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative offset box */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#c8621a] opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Detrás del mostrador en Brass & Bun"
                className="w-full h-[500px] object-cover relative z-10"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-[#c8621a] p-6 hidden sm:block">
                <div className="font-['Playfair_Display'] font-black text-4xl text-white leading-none">6+</div>
                <div className="font-['DM_Sans'] text-xs tracking-widest uppercase text-white/80 mt-1">Años</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-[#c8621a]" />
              <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#c8621a] font-semibold">
                Nuestra historia
              </span>
            </div>

            <h2
              className="font-['Playfair_Display'] font-black text-[#0f0f0f] leading-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Detrás del
              <br />
              <span className="italic text-[#c8621a]">Mostrador</span>
            </h2>

            <div className="space-y-4 font-['DM_Sans'] text-[#0f0f0f]/65 text-lg leading-relaxed font-light">
              <p>
                Brass & Bun nació de una idea simple pero terca: que la comida rápida podía ser
                excelente sin disculparse por ello. Rodrigo venía de cocinas de alto perfil en
                Europa; Daniela, del mundo del diseño y la hospitalidad. Juntos decidieron
                montar algo que se sintiera honesto.
              </p>
              <p>
                Sin trucos de menú, sin ingredientes misteriosos, sin fotos demasiado editadas.
                Solo producto bien trabajado, técnica real y un espacio donde la gente se sienta
                bienvenida — aunque llegue con hambre a las 10 de la noche.
              </p>
              <p>
                Desde 2018, hemos servido miles de burgers en San José. Cada una con el mismo
                nivel de cuidado que la primera. Eso no va a cambiar.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[#0f0f0f]/10">
              {[
                { num: '12K+', label: 'Burgers servidas' },
                { num: '4.9★', label: 'Calificación' },
                { num: '100%', label: 'Ingredientes locales' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-['Playfair_Display'] font-black text-2xl text-[#c8621a]">{stat.num}</div>
                  <div className="font-['DM_Sans'] text-xs text-[#0f0f0f]/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Owner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {owners.map((owner, i) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ border: '1px solid rgba(15,15,15,0.08)' }}
            >
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-[#c8621a]/30"
              />
              <div>
                <div className="font-['Playfair_Display'] font-bold text-xl text-[#0f0f0f] mb-0.5">
                  {owner.name}
                </div>
                <div className="font-['DM_Sans'] text-xs tracking-wider uppercase text-[#c8621a] font-semibold mb-4">
                  {owner.role}
                </div>
                <div className="flex gap-2 items-start">
                  <RiDoubleQuotesL className="text-[#d4a853] text-xl flex-shrink-0 mt-0.5" />
                  <p className="font-['DM_Sans'] text-[#0f0f0f]/60 text-sm leading-relaxed italic">
                    {owner.quote.replace(/^"|"$/g, '')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
