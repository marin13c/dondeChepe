import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';

const navLinks = [
  { label: 'Menú', href: '#menu' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Horario', href: '#horario' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-[#2e2e2e] shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-['Playfair_Display'] text-2xl font-black tracking-widest text-[#f5f0e8] hover:text-[#d4a853] transition-colors duration-300"
          >
            DONDE CHEPE
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-['DM_Sans'] text-sm font-medium tracking-wider text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}
              className="font-['DM_Sans'] text-sm font-semibold tracking-wider uppercase bg-[#c8621a] hover:bg-[#e07a30] text-[#f5f0e8] px-6 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-[#c8621a]/30"
            >
              Ordenar Ahora
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#f5f0e8] text-2xl p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#0f0f0f] flex flex-col items-center justify-center gap-8"
          >
            <div className="font-['Playfair_Display'] text-3xl font-black tracking-widest text-[#f5f0e8] mb-8">
              DONDE CHEPE
            </div>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="font-['Playfair_Display'] text-4xl font-bold text-[#f5f0e8] hover:text-[#c8621a] transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}
              className="mt-4 font-['DM_Sans'] text-sm font-semibold tracking-widest uppercase bg-[#c8621a] hover:bg-[#e07a30] text-[#f5f0e8] px-10 py-4 transition-all duration-300"
            >
              Ordenar Ahora
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
