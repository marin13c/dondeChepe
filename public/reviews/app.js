/* ============================================================
   DONDE CHEPE — Sistema de Reseñas
   JavaScript Vanilla — sin librerías
   ============================================================ */

'use strict';

/* ── Constantes ─────────────────────────────────────────── */
const STORAGE_KEY  = 'dondechepe_reviews';
const MIN_CHARS    = 10;
const MAX_CHARS    = 400;
const MIN_RATING_SHOW = 4; // solo mostrar 4-5 estrellas

/* ── Referencias al DOM ──────────────────────────────────── */
const form          = document.getElementById('review-form');
const starsInputs   = document.querySelectorAll('input[name="rating"]');
const starLabels    = document.querySelectorAll('.stars-interactive label');
const starHint      = document.getElementById('star-hint');
const textarea      = document.getElementById('comment');
const charCounter   = document.getElementById('char-counter');
const commentError  = document.getElementById('comment-error');
const submitBtn     = document.getElementById('btn-submit');
const toast         = document.getElementById('toast');
const reviewsList   = document.getElementById('reviews-list');
const reviewsCount  = document.getElementById('reviews-count');

/* ── Estado ──────────────────────────────────────────────── */
let hasAttemptedSubmit = false;

/* ============================================================
   localStorage helpers
   ============================================================ */
function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function addReview(rating, comment) {
  const reviews = loadReviews();
  const entry = {
    id:      crypto.randomUUID(),
    rating:  Number(rating),
    comment: comment.trim(),
    date:    new Date().toISOString(),
  };
  reviews.unshift(entry); // más reciente primero
  saveReviews(reviews);
  return entry;
}

/* ============================================================
   Utilidades
   ============================================================ */
function getSelectedRating() {
  const checked = document.querySelector('input[name="rating"]:checked');
  return checked ? Number(checked.value) : 0;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('es-CR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function buildStars(rating, total = 5) {
  return Array.from({ length: total }, (_, i) => {
    const filled = i < rating;
    return `<span class="star ${filled ? 'filled' : 'empty'}" aria-hidden="true">${filled ? '★' : '☆'}</span>`;
  }).join('');
}

function getHighRatedReviews() {
  return loadReviews().filter(r => r.rating >= MIN_RATING_SHOW);
}

/* ============================================================
   Validación
   ============================================================ */
function validateRating() {
  const rating = getSelectedRating();
  if (rating === 0) {
    starHint.textContent = 'Seleccioná una calificación para continuar.';
    starHint.classList.add('error');
    return false;
  }
  starHint.textContent = ratingLabel(rating);
  starHint.classList.remove('error');
  return true;
}

function validateComment() {
  const val = textarea.value.trim();
  const len = val.length;

  charCounter.textContent = `${len} / ${MAX_CHARS}`;
  charCounter.classList.toggle('under-min', len > 0 && len < MIN_CHARS);
  charCounter.classList.toggle('at-max',    len === MAX_CHARS);

  if (!hasAttemptedSubmit) return true; // validar silencioso hasta primer submit

  if (len === 0) {
    setCommentError('El comentario no puede estar vacío.');
    return false;
  }
  if (len < MIN_CHARS) {
    setCommentError(`Mínimo ${MIN_CHARS} caracteres (faltan ${MIN_CHARS - len}).`);
    return false;
  }
  clearCommentError();
  return true;
}

function setCommentError(msg) {
  commentError.textContent = msg;
  textarea.classList.add('input-error');
}

function clearCommentError() {
  commentError.textContent = '';
  textarea.classList.remove('input-error');
}

function ratingLabel(n) {
  const labels = ['', '★ Muy malo', '★★ Malo', '★★★ Regular', '★★★★ Bueno', '★★★★★ Excelente'];
  return labels[n] || '';
}

/* ============================================================
   Render de reseñas
   ============================================================ */
function renderReviews() {
  const reviews = getHighRatedReviews();

  // actualizar contador
  const total = loadReviews().length;
  reviewsCount.innerHTML =
    `<span>${reviews.length}</span> ${reviews.length === 1 ? 'reseña' : 'reseñas'} destacada${reviews.length !== 1 ? 's' : ''}` +
    (total > reviews.length ? ` <span style="font-size:0.75rem;color:var(--cream-muted)">(de ${total} totales)</span>` : '');

  if (reviews.length === 0) {
    reviewsList.innerHTML = `
      <li>
        <div class="empty-state">
          <div class="empty-icon">★</div>
          <p class="empty-title">Sin reseñas destacadas aún</p>
          <p class="empty-sub">Sé el primero en dejar una reseña de 4 o 5 estrellas.</p>
        </div>
      </li>`;
    return;
  }

  reviewsList.innerHTML = reviews.map((r, idx) => `
    <li>
      <article
        class="review-card${r.rating === 5 ? ' five-star' : ''}"
        style="animation-delay: ${idx * 0.06}s"
        role="article"
        aria-label="Reseña de ${r.rating} estrellas"
      >
        <div class="card-header">
          <div class="card-stars" aria-label="${r.rating} de 5 estrellas">
            ${buildStars(r.rating)}
          </div>
          <time class="card-date" datetime="${r.date}">${formatDate(r.date)}</time>
        </div>
        <p class="card-comment">${escapeHtml(r.comment)}</p>
      </article>
    </li>
  `).join('');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ============================================================
   Toast
   ============================================================ */
function showToast() {
  toast.classList.add('visible');
  toast.setAttribute('aria-live', 'polite');
  setTimeout(() => toast.classList.remove('visible'), 4000);
}

/* ============================================================
   Event Listeners
   ============================================================ */

// Estrellas — hover label
starLabels.forEach(label => {
  const val = Number(label.getAttribute('for').replace('star-', ''));
  label.addEventListener('mouseenter', () => {
    if (getSelectedRating() === 0) {
      starHint.textContent = ratingLabel(val);
      starHint.classList.remove('error');
    }
  });
  label.addEventListener('mouseleave', () => {
    const sel = getSelectedRating();
    starHint.textContent = sel > 0 ? ratingLabel(sel) : '';
    starHint.classList.remove('error');
  });
});

// Estrellas — cambio de valor
starsInputs.forEach(input => {
  input.addEventListener('change', () => {
    starHint.textContent = ratingLabel(Number(input.value));
    starHint.classList.remove('error');
  });
});

// Textarea — validación en tiempo real + contador
textarea.addEventListener('input', () => {
  validateComment();
  submitBtn.disabled = false; // re-habilitar para que intente de nuevo
});

// Submit
form.addEventListener('submit', e => {
  e.preventDefault();
  hasAttemptedSubmit = true;

  const ratingOk  = validateRating();
  const commentOk = validateComment();

  if (!ratingOk || !commentOk) {
    submitBtn.disabled = false;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Enviando…</span>';

  // pequeño delay para feedback visual
  setTimeout(() => {
    addReview(getSelectedRating(), textarea.value);
    renderReviews();
    showToast();

    // reset form
    form.reset();
    hasAttemptedSubmit = false;
    clearCommentError();
    charCounter.textContent = `0 / ${MAX_CHARS}`;
    charCounter.classList.remove('under-min', 'at-max');
    starHint.textContent = '';
    starHint.classList.remove('error');

    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Enviar Reseña <span aria-hidden="true">→</span>';

    // scroll suave hacia las reseñas
    document.getElementById('reviews-section')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
});

/* ============================================================
   Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  charCounter.textContent = `0 / ${MAX_CHARS}`;
  renderReviews();
});
