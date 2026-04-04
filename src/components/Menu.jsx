import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = ['Burgers', 'Sides', 'Bebidas', 'Postres'];

const menuData = {
  Burgers: [
    {
      name: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
    },
    {
      name: 'Dolor Sit Amet',
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
    },
    {
      name: 'Consectetur Adipiscing',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80',
    },
    {
      name: 'Ipsum Eiusmod',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    },
    {
      name: 'Tempor Incididunt',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    },
    {
      name: 'Magna Aliqua',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    },
  ],
  Sides: [
    {
      name: 'Lorem Veniam',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80',
    },
    {
      name: 'Ipsum Nostrud',
      description: 'Ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    },
    {
      name: 'Dolor Exercitation',
      description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1612182258635-6897d0dbe78c?w=600&q=80',
    },
    {
      name: 'Amet Ullamco',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    },
  ],
  Bebidas: [
    {
      name: 'Lorem Laboris',
      description: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    },
    {
      name: 'Ipsum Fugiat',
      description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    },
    {
      name: 'Dolor Repudiandae',
      description: 'Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    },
    {
      name: 'Sit Voluptatem',
      description: 'Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga harum quidem rerum.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80',
    },
  ],
  Postres: [
    {
      name: 'Lorem Accusantium',
      description: 'Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis eligendi optio.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    },
    {
      name: 'Ipsum Laudantium',
      description: 'Nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit qui voluptate velit esse quam.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    },
    {
      name: 'Dolor Perspiciatis',
      description: 'Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid commodi.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1624371414361-6b26e97cc4ee?w=600&q=80',
    },
    {
      name: 'Amet Architecto',
      description: 'Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas.',
      price: '₡0,000',
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
    },
  ],
};

function MenuCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2, ease: 'easeOut' } }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#1a1a1a] overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#c8621a]/20 transition-shadow duration-500 border border-[#2e2e2e] hover:border-[#c8621a]/40"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-[#c8621a] font-['DM_Sans'] font-bold text-sm text-white px-3 py-1">
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#f5f0e8] mb-2 group-hover:text-[#d4a853] transition-colors duration-300">
          {item.name}
        </h3>
        <p className="font-['DM_Sans'] text-sm text-[#f5f0e8]/55 leading-relaxed">
          {item.description}
        </p>
        {/* Bottom amber accent */}
        <div className="mt-4 w-0 h-0.5 bg-[#c8621a] transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('Burgers');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="menu" className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, #c8621a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4a853 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-[#c8621a]" />
            <span className="font-['DM_Sans'] text-xs tracking-[0.3em] uppercase text-[#c8621a] font-semibold">
              Lorem ipsum dolor
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-black text-[#f5f0e8] leading-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
            Lorem Ipsum
          </h2>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-1 mb-12 border-b border-[#2e2e2e]"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative font-['DM_Sans'] font-semibold text-sm tracking-wider uppercase px-6 py-4 transition-all duration-300 ${
                activeTab === cat
                  ? 'text-[#c8621a]'
                  : 'text-[#f5f0e8]/40 hover:text-[#f5f0e8]/80'
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8621a]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuData[activeTab].map((item, i) => (
              <MenuCard key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
