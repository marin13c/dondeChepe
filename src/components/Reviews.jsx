import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

const reviews = [
  {
    name: 'Lorem Ipsum',
    date: 'Dolor 0000',
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Ipsum Dolor',
    date: 'Sit 0000',
    rating: 5,
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
  {
    name: 'Dolor Amet',
    date: 'Amet 0000',
    rating: 5,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    name: 'Consectetur Elit',
    date: 'Lorem 0000',
    rating: 4,
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    name: 'Adipiscing Sed',
    date: 'Ipsum 0000',
    rating: 5,
    text: 'Ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur quis autem vel eum iure.',
    avatar: 'https://i.pravatar.cc/150?img=44',
  },
  {
    name: 'Eiusmod Tempor',
    date: 'Dolor 0000',
    rating: 5,
    text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique.',
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
                Lorem ipsum dolor
              </span>
            </div>
            <h2
              className="font-['Playfair_Display'] font-black text-[#f5f0e8] leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Lorem Ipsum
              <br />
              <span className="italic text-[#d4a853]">Dolor</span>
            </h2>
          </div>

          {/* Overall Rating */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-['Playfair_Display'] font-black text-5xl text-[#d4a853] leading-none">4.9</div>
              <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/40 mt-1 tracking-widest uppercase">Lorem ipsum dolor</div>
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
