import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

const reviews = [
  {
    name: 'Camila Rodríguez',
    date: 'Marzo 2024',
    rating: 5,
    text: 'Vine con pocas expectativas porque "gourmet" y "rápido" raramente van de la mano. Me equivoqué por completo. The Obsidian es literalmente la mejor burger que he comido en Costa Rica. El brioche tostado al carbón, el aioli de trufa... impecable.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Diego Vargas',
    date: 'Febrero 2024',
    rating: 5,
    text: 'El ambiente es oscuro y elegante, me recordó a un speakeasy. La comida estuvo a la altura: pedí Fuego Amarillo y el picante era justo, sin matarte. Las papas truffle fries son adictivas. Ya volví tres veces este mes.',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    name: 'Sofía Mora',
    date: 'Enero 2024',
    rating: 5,
    text: 'Daniela, la co-fundadora, estaba esa noche y pasó por las mesas. Se nota que el lugar es un proyecto de amor. La tarta negra de postre fue el cierre perfecto. Definitivamente el mejor restaurante de su estilo en San José.',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    name: 'Andrés Jiménez',
    date: 'Diciembre 2023',
    rating: 4,
    text: 'La burger La Bresaola con bresaola italiana es una idea brillante. El servicio fue rápido y el personal conoce el menú a fondo. Le quito una estrella solo porque ese día no había cerveza Stout disponible. Pero volveré pronto.',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    name: 'Valeria Ureña',
    date: 'Noviembre 2023',
    rating: 5,
    text: 'Llevé a mi novio para su cumpleaños y quedó boquiabierto. El lugar tiene una vibra única, ni muy lujosa ni demasiado casual. Los churros de la noche con chocolate oscuro caliente son un MUST. Volvemos en dos semanas.',
    avatar: 'https://i.pravatar.cc/150?img=44',
  },
  {
    name: 'Marco Solano',
    date: 'Octubre 2023',
    rating: 5,
    text: 'Llegué solo con hambre a las 9:30 pm un martes. Me atendieron como si fuera la primera mesa del día. El Clásico es humildemente perfecto: la salsa B&B secreta lo hace. Simple, pero ejecutado a la perfección. Brass & Bun es el estándar.',
    avatar: 'https://i.pravatar.cc/150?img=57',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <RiStarFill key={star} className="text-[#d4a853] text-sm" />
        ) : (
          <RiStarLine key={star} className="text-[#d4a853]/30 text-sm" />
        )
      )}
    </div>
  );
}

function ReviewCard({ review, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#1a1a1a] p-7 flex flex-col gap-5 hover:bg-[#242424] transition-colors duration-300"
      style={{ border: '1px solid #2e2e2e' }}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="font-['DM_Sans'] text-[#f5f0e8]/65 text-sm leading-relaxed flex-1">
        "{review.text}"
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#2e2e2e]">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-[#c8621a]/30"
        />
        <div>
          <div className="font-['DM_Sans'] font-semibold text-[#f5f0e8] text-sm">{review.name}</div>
          <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/35">{review.date}</div>
        </div>
        <div className="ml-auto font-['Playfair_Display'] text-[#d4a853] text-2xl font-black leading-none">
          "
        </div>
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="resenas" className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-[#c8621a]" />
              <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#c8621a] font-semibold">
                Reseñas reales
              </span>
            </div>
            <h2
              className="font-['Playfair_Display'] font-black text-[#f5f0e8] leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Lo Que
              <br />
              <span className="italic text-[#d4a853]">Dicen</span>
            </h2>
          </div>

          {/* Overall Rating */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-['Playfair_Display'] font-black text-5xl text-[#d4a853] leading-none">4.9</div>
              <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/40 mt-1 tracking-widest uppercase">Calificación promedio</div>
              <div className="flex justify-end mt-2 gap-0.5">
                {[1,2,3,4,5].map(s => <RiStarFill key={s} className="text-[#d4a853] text-sm" />)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
