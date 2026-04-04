import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.querySelector('#nosotros')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden grain-overlay">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1800&q=80")',
        }}
      />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/30" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/40" />

      {/* Decorative amber line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        className="absolute left-0 w-1 h-64 bg-[#c8621a] origin-top hidden lg:block"
        style={{ top: 'calc(50% - 8rem)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-[#c8621a]" />
            <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#c8621a] font-semibold">
              Lorem Ipsum, Dolor
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-['Playfair_Display'] font-black leading-[0.95] text-[#f5f0e8] mb-2"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
          >
            Lorem Ipsum
          </motion.h1>
          <motion.h1
            variants={itemVariants}
            className="font-['Playfair_Display'] font-black italic leading-[0.95] text-transparent mb-10"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              WebkitTextStroke: '2px #f5f0e8',
            }}
          >
            Dolor Sit.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="font-['DM_Sans'] text-lg lg:text-xl text-[#f5f0e8]/70 mb-12 max-w-md font-light tracking-wide"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToMenu}
              className="font-['DM_Sans'] font-semibold text-sm tracking-widest uppercase bg-[#c8621a] hover:bg-[#e07a30] text-[#f5f0e8] px-10 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#c8621a]/40 hover:-translate-y-0.5"
            >
              Ver Menú
            </button>
            <button
              onClick={scrollToAbout}
              className="font-['DM_Sans'] font-semibold text-sm tracking-widest uppercase border border-[#f5f0e8]/40 hover:border-[#f5f0e8] text-[#f5f0e8]/70 hover:text-[#f5f0e8] px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
            >
              Nuestra Historia
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom info strip — absolute to section so it truly anchors to viewport bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-6 right-6 lg:left-10 lg:right-10 z-10 flex items-end justify-between"
      >
        <div className="hidden md:flex items-center gap-8 text-[#f5f0e8]/40">
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-2xl font-bold text-[#d4a853]">0000</div>
            <div className="font-['DM_Sans'] text-xs tracking-widest uppercase">Lorem</div>
          </div>
          <div className="w-px h-10 bg-[#f5f0e8]/20" />
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-2xl font-bold text-[#d4a853]">00</div>
            <div className="font-['DM_Sans'] text-xs tracking-widest uppercase">Lorem Ipsum</div>
          </div>
          <div className="w-px h-10 bg-[#f5f0e8]/20" />
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-2xl font-bold text-[#d4a853]">0.0</div>
            <div className="font-['DM_Sans'] text-xs tracking-widest uppercase">Dolor Sit</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 text-[#f5f0e8]/30">
          <span className="font-['DM_Sans'] text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#f5f0e8]/30 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
