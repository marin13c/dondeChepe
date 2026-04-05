import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiTimeLine, RiMapPinLine, RiPhoneLine } from 'react-icons/ri';

const hours = [
  { days: 'Lorem — Ipsum', time: '00:00 am – 00:00 pm' },
  { days: 'Dolor Sit', time: '00:00 am – 00:00 pm' },
  { days: 'Amet Consectetur', time: '00:00 pm – 00:00 pm' },
];

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="horario" className="relative bg-[#1e1008] py-28 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8621a]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8621a]/40 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-[#4e7535]" />
            <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#4e7535] font-semibold">
              Lorem ipsum dolor
            </span>
          </div>
          <h2
            className="font-['Playfair_Display'] font-black text-[#f2e4c8] leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Lorem Ipsum &amp;
            <br />
            <span className="italic text-[#c47830]">Dolor Sit</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <RiTimeLine className="text-[#c8621a] text-2xl" />
                <span className="font-['DM_Sans'] font-semibold tracking-widest text-xs uppercase text-[#f2e4c8]/60">
                  Lorem Ipsum Dolor
                </span>
              </div>
              <div className="space-y-0 divide-y divide-[#3d2512]">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between gap-6 py-4">
                    <span className="font-['DM_Sans'] text-[#f2e4c8]/60 text-sm">{h.days}</span>
                    <span className="font-['Playfair_Display'] font-bold text-[#c47830] text-sm whitespace-nowrap shrink-0">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#3d2512]" />

            {/* Address */}
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#4e7535]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <RiMapPinLine className="text-[#4e7535] text-lg" />
                </div>
                <div>
                  <div className="font-['DM_Sans'] font-semibold text-[#f2e4c8] mb-1">Lorem Ipsum</div>
                  <div className="font-['DM_Sans'] text-[#f2e4c8]/55 text-sm leading-relaxed">
                    Lorem Ipsum 000, Dolor Sit
                    <br />
                    Amet Consectetur Adipiscing
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#c8621a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <RiPhoneLine className="text-[#c8621a] text-lg" />
                </div>
                <div>
                  <div className="font-['DM_Sans'] font-semibold text-[#f2e4c8] mb-1">Lorem Dolor</div>
                  <div className="font-['DM_Sans'] text-[#f2e4c8]/55 text-sm">
                    +506 0000 – 0000
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-['DM_Sans'] font-semibold text-xs tracking-widest uppercase text-[#4e7535] hover:text-[#3d5a28] transition-colors duration-300 border-b border-[#4e7535]/40 hover:border-[#3d5a28] pb-1"
            >
              <RiMapPinLine />
              Ver en Google Maps
            </a>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-2 -left-2 w-full h-full border border-[#c8621a]/20" />
            <div className="relative overflow-hidden" style={{ height: '420px' }}>
              <iframe
                title="Donde Chere Location"
                src="https://maps.google.com/maps?q=9.9281,-84.0907&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
