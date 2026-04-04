import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = ['Burgers', 'Sides', 'Bebidas', 'Postres'];

const menuData = {
  Burgers: [
    {
      name: 'The Obsidian',
      description: 'Doble smash de res, queso ahumado, cebolla caramelizada, aioli de trufa negra y pan brioche tostado al carbón.',
      price: '₡8,900',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
    },
    {
      name: 'Fuego Amarillo',
      description: 'Res 150g, jalapeños en escabeche, queso pepper jack fundido, mayo de mango y habanero, lechuga crocante.',
      price: '₡7,500',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
    },
    {
      name: 'La Bresaola',
      description: 'Presa wagyu, bresaola italiana, rúcula silvestre, queso parmesano rallado, reducción de balsámico añejo.',
      price: '₡9,500',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80',
    },
    {
      name: 'The Midnight',
      description: 'Bun de carbón activado, res 180g, queso azul, tocino crujiente, cebolla morada encurtida, mostaza dijon.',
      price: '₡8,200',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    },
    {
      name: 'Crispy Blanca',
      description: 'Muslo de pollo frito en suero de leche, salsa ranch casera, ensalada de col morada, pepinillos artesanales.',
      price: '₡7,200',
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    },
    {
      name: 'El Clásico',
      description: 'La burger que empezó todo. Res 130g, queso cheddar americano, lechuga, tomate, cebolla y nuestra salsa B&B secreta.',
      price: '₡6,500',
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    },
  ],
  Sides: [
    {
      name: 'Truffle Fries',
      description: 'Papas fritas en aceite de girasol, aceite de trufa blanca, parmesano rallado y cebollín fresco.',
      price: '₡3,800',
      image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80',
    },
    {
      name: 'Onion Rings Brass',
      description: 'Aros de cebolla dulce en masa de cerveza artesanal, tempura crujiente, salsa chipotle ahumada.',
      price: '₡3,500',
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    },
    {
      name: 'Mac & Smoke',
      description: 'Macarrones cremosos con queso gouda ahumado y cheddar, cubiertos con breadcrumbs de pan sourdough.',
      price: '₡4,200',
      image: 'https://images.unsplash.com/photo-1612182258635-6897d0dbe78c?w=600&q=80',
    },
    {
      name: 'Slaw de la Casa',
      description: 'Ensalada de repollo morado y verde, zanahoria rallada, cilantro, aderezo de limón y jengibre fresco.',
      price: '₡2,800',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    },
  ],
  Bebidas: [
    {
      name: 'Amber Lemonade',
      description: 'Limonada prensada en frío, miel de abeja del campo, jengibre fresco, soda artesanal y twist de naranja.',
      price: '₡3,500',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    },
    {
      name: 'Cold Brew Noir',
      description: 'Cold brew de 24 horas, leche de avena, jarabe de vainilla bourbon, hielo negro activado.',
      price: '₡4,000',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    },
    {
      name: 'Tamarindo Fuerte',
      description: 'Pulpa de tamarindo natural, piloncillo, chile piquín en el borde, hielo granizado y limón costarricense.',
      price: '₡3,200',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    },
    {
      name: 'Cerveza Artesanal',
      description: 'Selección rotativa de la semana: IPA, Stout o Amber Ale de microbreweries locales costarricenses.',
      price: '₡4,500',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80',
    },
  ],
  Postres: [
    {
      name: 'Tarta Negra',
      description: 'Tarta de chocolate belga 72%, base de galleta de carbón, crema chantilly de vainilla de Tahití y polvo de cacao.',
      price: '₡4,500',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    },
    {
      name: 'Dulce de Leche Shake',
      description: 'Milkshake espeso de helado artesanal, dulce de leche hondureño, crema batida y caramelo salado.',
      price: '₡4,800',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    },
    {
      name: 'Churros de la Noche',
      description: 'Churros recién fritos en aceite de coco, canela y azúcar morena, con dip de chocolate oscuro caliente.',
      price: '₡3,900',
      image: 'https://images.unsplash.com/photo-1624371414361-6b26e97cc4ee?w=600&q=80',
    },
    {
      name: 'Helado Ahumado',
      description: 'Helado de caramelo ahumado con sal de Guanacaste, granola de avena y nueces tostadas, miel de flores.',
      price: '₡3,700',
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80',
    },
  ],
};

function MenuCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#1a1a1a] overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#c8621a]/20 transition-all duration-500"
      style={{ border: '1px solid #2e2e2e' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid #c8621a66';
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid #2e2e2e';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
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
              Lo que servimos
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-black text-[#f5f0e8] leading-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}>
            El Menú
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
