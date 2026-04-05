import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RiStarFill, RiStarLine, RiCheckLine } from 'react-icons/ri';

const STORAGE_KEY     = 'dondechepe_reviews';
const MIN_CHARS       = 10;
const MAX_CHARS       = 400;
const MIN_RATING_SHOW = 4;

/* ── localStorage helpers ─────────────────────────────────── */
function loadStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveStored(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/* ── Sub-components ───────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= rating
          ? <RiStarFill key={s} className="text-[#d4a853] text-sm" />
          : <RiStarLine key={s} className="text-[#d4a853]/30 text-sm" />
      )}
    </div>
  );
}

function InteractiveStars({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
  const display = hovered || value;

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
            className="text-3xl leading-none transition-transform duration-100 focus:outline-none"
            style={{
              color: star <= display ? '#d4a853' : '#2e2e2e',
              transform: star <= display ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            ★
          </button>
        ))}
      </div>
      <p className="font-['DM_Sans'] text-xs text-[#f5f0e8]/40 h-4">
        {display > 0 ? labels[display] : ''}
      </p>
    </div>
  );
}

function ReviewCard({ review, index, isInView, isNew }) {
  const formattedDate = new Date(review.date).toLocaleDateString('es-CR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView || isNew ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: isNew ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#1a1a1a] p-7 flex flex-col gap-5 hover:bg-[#242424] transition-colors duration-300 relative overflow-hidden"
      style={{
        border: review.rating === 5 ? '1px solid rgba(212,168,83,0.3)' : '1px solid #2e2e2e',
      }}
    >
      {/* 5-star gold accent bar */}
      {review.rating === 5 && (
        <div className="absolute top-0 left-0 w-0.5 h-full bg-[#d4a853]" />
      )}

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Text */}
      <p className="font-['DM_Sans'] text-[#f5f0e8]/65 text-sm leading-relaxed flex-1">
        "{review.comment}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2e2e2e]">
        <time className="font-['DM_Sans'] text-xs text-[#f5f0e8]/35">{formattedDate}</time>
        <div className="font-['Playfair_Display'] text-[#d4a853] text-2xl font-black leading-none opacity-30">
          "
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function Reviews() {
  const ref    = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Form state
  const [rating,      setRating]      = useState(0);
  const [comment,     setComment]     = useState('');
  const [ratingError, setRatingError] = useState('');
  const [commentError,setCommentError]= useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [attempted,   setAttempted]   = useState(false);
  const [newestId,    setNewestId]    = useState(null);

  // Stored reviews
  const [storedReviews, setStoredReviews] = useState([]);

  useEffect(() => {
    setStoredReviews(loadStored());
  }, []);

  // Live validation after first submit attempt
  useEffect(() => {
    if (!attempted) return;
    setRatingError(rating === 0 ? 'Seleccioná una calificación.' : '');
  }, [rating, attempted]);

  useEffect(() => {
    if (!attempted) return;
    if (comment.trim().length === 0) setCommentError('El comentario no puede estar vacío.');
    else if (comment.trim().length < MIN_CHARS) setCommentError(`Mínimo ${MIN_CHARS} caracteres (faltan ${MIN_CHARS - comment.trim().length}).`);
    else setCommentError('');
  }, [comment, attempted]);

  function handleSubmit(e) {
    e.preventDefault();
    setAttempted(true);

    const rErr = rating === 0 ? 'Seleccioná una calificación.' : '';
    const cLen = comment.trim().length;
    const cErr = cLen === 0 ? 'El comentario no puede estar vacío.'
               : cLen < MIN_CHARS ? `Mínimo ${MIN_CHARS} caracteres (faltan ${MIN_CHARS - cLen}).`
               : '';

    setRatingError(rErr);
    setCommentError(cErr);
    if (rErr || cErr) return;

    const entry = {
      id:      crypto.randomUUID(),
      rating,
      comment: comment.trim(),
      date:    new Date().toISOString(),
    };

    const updated = [entry, ...loadStored()];
    saveStored(updated);
    setStoredReviews(updated);
    setNewestId(entry.id);

    // Show confirmation, then reset
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setComment('');
      setAttempted(false);
      setRatingError('');
      setCommentError('');
    }, 3000);

    // Scroll to reviews list
    setTimeout(() => {
      document.getElementById('resenas-lista')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }

  const displayed = storedReviews.filter(r => r.rating >= MIN_RATING_SHOW);
  const charLen   = comment.length;

  return (
    <section id="resenas" className="relative bg-[#0f0f0f] py-28 overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ────────────────────────────────── */}
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

          {displayed.length > 0 && (
            <div className="text-right">
              <div className="font-['Playfair_Display'] font-black text-5xl text-[#d4a853] leading-none">
                {(displayed.reduce((a, r) => a + r.rating, 0) / displayed.length).toFixed(1)}
              </div>
              <div className="font-['DM_Sans'] text-xs text-[#f5f0e8]/40 mt-1 tracking-widest uppercase">Lorem ipsum dolor</div>
              <div className="flex justify-end mt-2 gap-0.5">
                {[1,2,3,4,5].map(s => <RiStarFill key={s} className="text-[#d4a853] text-sm" />)}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Form ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16"
        >
          <div className="max-w-2xl bg-[#1a1a1a] border border-[#2e2e2e] p-8 relative overflow-hidden">
            {/* amber accent bar */}
            <div className="absolute top-0 left-0 w-0.5 h-full bg-[#c8621a]" />

            <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#f5f0e8] mb-6">
              Dejá tu reseña
            </h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Confirmation ──────────────────────────── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4 bg-[#0f0f0f] border border-[#4caf7d]/30 p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4caf7d]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <RiCheckLine className="text-[#4caf7d] text-lg" />
                  </div>
                  <div>
                    <p className="font-['DM_Sans'] font-semibold text-[#4caf7d] text-sm mb-1">
                      ¡Gracias por tu reseña!
                    </p>
                    <p className="font-['DM_Sans'] text-[#f5f0e8]/50 text-sm font-light">
                      Tu opinión fue guardada exitosamente.
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* ── Form fields ───────────────────────────── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Stars */}
                  <div className="mb-6">
                    <label className="block font-['DM_Sans'] text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f0e8]/40 mb-3">
                      Calificación
                    </label>
                    <InteractiveStars value={rating} onChange={setRating} />
                    {ratingError && (
                      <p className="font-['DM_Sans'] text-xs text-red-400 mt-2">{ratingError}</p>
                    )}
                  </div>

                  {/* Textarea */}
                  <div className="mb-6">
                    <label
                      htmlFor="review-comment"
                      className="block font-['DM_Sans'] text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f0e8]/40 mb-3"
                    >
                      Comentario
                    </label>
                    <textarea
                      id="review-comment"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      maxLength={MAX_CHARS}
                      placeholder="Contanos sobre tu experiencia…"
                      rows={4}
                      className="w-full bg-[#0f0f0f] text-[#f5f0e8] font-['DM_Sans'] text-sm font-light placeholder:text-[#f5f0e8]/20 p-4 resize-none outline-none transition-all duration-200"
                      style={{
                        border: commentError ? '1px solid #e05555' : '1px solid #2e2e2e',
                        boxShadow: commentError ? '' : comment.length > 0 ? '0 0 0 1px #c8621a33' : '',
                      }}
                      onFocus={e => { if (!commentError) e.target.style.borderColor = '#c8621a'; }}
                      onBlur={e  => { if (!commentError) e.target.style.borderColor = '#2e2e2e'; }}
                    />
                    <div className="flex justify-between items-start mt-2">
                      <span className="font-['DM_Sans'] text-xs text-red-400 min-h-[1em]">
                        {commentError}
                      </span>
                      <span
                        className="font-['DM_Sans'] text-xs flex-shrink-0"
                        style={{ color: charLen < MIN_CHARS && charLen > 0 ? '#e05555' : 'rgba(245,240,232,0.25)' }}
                      >
                        {charLen} / {MAX_CHARS}
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="font-['DM_Sans'] font-semibold text-xs tracking-widest uppercase bg-[#c8621a] hover:bg-[#e07a30] text-[#f5f0e8] px-8 py-3.5 transition-all duration-300 hover:shadow-lg hover:shadow-[#c8621a]/30 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Enviar Reseña →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Reviews list ──────────────────────────────────── */}
        <div id="resenas-lista">
          {/* List header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-between mb-8 pb-5 border-b border-[#2e2e2e]"
          >
            <p className="font-['DM_Sans'] text-sm text-[#f5f0e8]/40">
              <span className="font-['Playfair_Display'] font-bold text-lg text-[#d4a853] mr-2">
                {displayed.length}
              </span>
              {displayed.length === 1 ? 'reseña destacada' : 'reseñas destacadas'}
              {storedReviews.length > displayed.length && (
                <span className="text-xs ml-2 opacity-60">
                  (de {storedReviews.length} totales)
                </span>
              )}
            </p>
            <span className="font-['DM_Sans'] text-xs font-semibold tracking-wider uppercase text-[#c8621a] border border-[#c8621a]/30 px-3 py-1">
              ★★★★ – ★★★★★
            </span>
          </motion.div>

          {/* Empty state */}
          {displayed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16 border border-dashed border-[#2e2e2e]"
            >
              <div className="font-['Playfair_Display'] text-4xl text-[#d4a853]/20 mb-4">★</div>
              <p className="font-['Playfair_Display'] font-bold text-lg text-[#f5f0e8]/30 mb-2">
                Sin reseñas destacadas aún
              </p>
              <p className="font-['DM_Sans'] text-sm text-[#f5f0e8]/20 font-light">
                Sé el primero en dejar una reseña de 4 o 5 estrellas.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={i}
                  isInView={isInView}
                  isNew={review.id === newestId}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
