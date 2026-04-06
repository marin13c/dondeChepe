import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const owners = [
  {
    name: 'Lorem Ipsum Dolor',
    role: 'Ipsum Consectetur & Lorem Sit',
    photo: 'https://i.pravatar.cc/400?img=12',
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.',
    ],
  },
  {
    name: 'Amet Consectetur',
    role: 'Dolor Adipiscing & Ipsum Elit',
    photo: 'https://i.pravatar.cc/400?img=47',
    descriptions: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat cupidatat non proident.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa.',
    ],
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="nosotros" className="bg-[#f2e4c8] py-14 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-[#4e7535]" />
            <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#4e7535] font-semibold">
              Nosotros
            </span>
          </div>
          <h2
            className="font-['Playfair_Display'] font-black text-[#140b05] leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Nuestra
            <br />
            <span className="italic text-[#c8621a]">Historia</span>
          </h2>
        </motion.div>

        {/* Owner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {owners.map((owner, i) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#f5e8cc] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ border: '1px solid rgba(15,15,15,0.08)' }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={owner.photo}
                  alt={owner.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5e8cc] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <div className="font-['Playfair_Display'] font-bold text-2xl text-[#140b05] mb-1">
                    {owner.name}
                  </div>
                  <div className="font-['DM_Sans'] text-xs tracking-wider uppercase text-[#c8621a] font-semibold">
                    {owner.role}
                  </div>
                </div>

                <div className="space-y-2">
                  {owner.descriptions.map((desc, j) => (
                    <p key={j} className="font-['DM_Sans'] text-sm leading-relaxed text-[#140b05]/65">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="mt-4 w-8 h-0.5 bg-[#4e7535]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
