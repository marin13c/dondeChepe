import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  RiInstagramLine,
  RiTiktokLine,
  RiFacebookCircleLine,
  RiWhatsappLine,
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
} from 'react-icons/ri';

const socials = [
  {
    icon: RiInstagramLine,
    label: 'Instagram',
    href: '#',
    hoverColor: 'hover:text-pink-400',
  },
  {
    icon: RiTiktokLine,
    label: 'TikTok',
    href: '#',
    hoverColor: 'hover:text-white',
  },
  {
    icon: RiFacebookCircleLine,
    label: 'Facebook',
    href: '#',
    hoverColor: 'hover:text-blue-400',
  },
  {
    icon: RiWhatsappLine,
    label: 'WhatsApp',
    href: '#',
    hoverColor: 'hover:text-green-400',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="contacto" className="relative bg-[#0f0f0f] overflow-hidden">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c8621a]/50 to-transparent" />

      {/* Main footer content */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left: Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="font-['Playfair_Display'] text-3xl font-black tracking-widest text-[#f5f0e8] mb-3">
              Donde Chere
            </div>
            <p className="font-['DM_Sans'] text-[#f5f0e8]/45 text-sm leading-relaxed font-light max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <span className="w-8 h-px bg-[#c8621a]" />
              <span className="font-['DM_Sans'] text-xs tracking-[0.2em] uppercase text-[#c8621a]/70">
                Lorem Ipsum, LR
              </span>
            </div>
          </motion.div>

          {/* Center: Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-start md:items-center"
          >
            <div className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#f5f0e8]/30 font-semibold mb-6">
              Lorem Ipsum
            </div>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className={`w-11 h-11 border border-[#2e2e2e] flex items-center justify-center text-[#f5f0e8]/40 ${social.hoverColor} hover:border-[#f5f0e8]/20 transition-colors duration-300 text-xl`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-8 w-full h-px bg-[#2e2e2e] hidden md:block" />

            <div className="mt-6 font-['DM_Sans'] text-xs text-[#f5f0e8]/25 tracking-wider text-center hidden md:block">
              Lorem ipsum dolor sit amet
            </div>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#f5f0e8]/30 font-semibold mb-6">
              Lorem Ipsum
            </div>

            <div className="flex items-start gap-3">
              <RiPhoneLine className="text-[#c8621a] text-lg mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/35 mb-0.5 tracking-wider uppercase">Lorem Dolor</div>
                <a href="tel:+50600000000" className="font-['DM_Sans'] text-sm text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors duration-300">
                  +506 0000 – 0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RiMailLine className="text-[#c8621a] text-lg mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/35 mb-0.5 tracking-wider uppercase">Ipsum Sit</div>
                <a href="mailto:lorem@ipsum.com" className="font-['DM_Sans'] text-sm text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors duration-300">
                  lorem@ipsum.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RiMapPinLine className="text-[#c8621a] text-lg mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/35 mb-0.5 tracking-wider uppercase">Dolor Amet</div>
                <span className="font-['DM_Sans'] text-sm text-[#f5f0e8]/70 leading-relaxed">
                  Lorem Ipsum 000, Dolor Sit
                  <br />
                  Amet Consectetur Adipiscing
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['DM_Sans'] text-xs text-[#f5f0e8]/20 tracking-wider">
            © 0000 Lorem &amp; Ipsum. Lorem ipsum dolor sit amet.
          </p>
          <div className="flex gap-6">
            {['Lorem Ipsum', 'Dolor Sit'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-['DM_Sans'] text-xs text-[#f5f0e8]/20 hover:text-[#f5f0e8]/50 transition-colors duration-300 tracking-wider"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
