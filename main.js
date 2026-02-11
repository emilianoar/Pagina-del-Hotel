// ============================================
// CAROUSEL
// ============================================

const imagenes = [
  "Imagenes/carousel-optimized/20240923_151027-768x576.webp",
  "Imagenes/carousel-optimized/20240923_151119-768x1024.webp",
  "Imagenes/carousel-optimized/20240923_151446-768x867.webp",
  "Imagenes/carousel-optimized/20240923_151716-768x576.webp",
  "Imagenes/carousel-optimized/20240923_151753-768x576.webp",
  "Imagenes/carousel-optimized/20240923_152316-768x838.webp",
  "Imagenes/carousel-optimized/20240923_152445-768x941.webp",
  "Imagenes/carousel-optimized/20240923_152820-768x576.webp",
  "Imagenes/carousel-optimized/20240923_152936-768x1024.webp",
  "Imagenes/carousel-optimized/20240923_153009-734x1024.webp",
  "Imagenes/20251216_125312.jpg",
  "Imagenes/20251218_173138.jpg",
  "Imagenes/20251226_095519.jpg",
  "Imagenes/20251226_095840.jpg",
  "Imagenes/20251226_100059.jpg",
  "Imagenes/20251218_173506.jpg"
];

const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");
const prevBtn = document.getElementById("carousel-prev");
const nextBtn = document.getElementById("carousel-next");
let currentIndex = 0;
let autoplay;

// Swipe/drag variables
let isDragging = false;
let startX = 0;
let currentX = 0;
let startTransform = 0;
const threshold = 50;

function renderCarrusel() {
  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  imagenes.forEach((src, i) => {
    const img = document.createElement("img");

    if (Math.abs(i - currentIndex) <= 3) {
      img.src = src;
    } else {
      img.dataset.src = src;
      img.style.backgroundColor = '#e8e8e8';
    }

    img.draggable = false;
    img.loading = "lazy";
    img.alt = `Hotel Avenida - Imagen ${i + 1}`;
    if (i === currentIndex) img.classList.add("active");

    img.addEventListener("click", () => {
      if (!isDragging) {
        currentIndex = i;
        updateCarrusel();
        resetAutoplay();
      }
    });

    track.appendChild(img);

    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarrusel();
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  updateCarrusel();
}

function updateCarrusel() {
  if (isDragging) return;

  const imgEl = track.querySelector("img");
  if (!imgEl) return;
  const imgWidth = imgEl.offsetWidth || 0;
  const gap = 16;
  const containerWidth = track.parentElement.offsetWidth;

  const scroll = (imgWidth + gap) * currentIndex - containerWidth / 2 + imgWidth / 2;
  track.style.transform = `translateX(${-scroll}px)`;

  [...track.children].forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
    if (Math.abs(i - currentIndex) <= 3 && img.dataset.src && !img.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
  });
  [...dotsContainer.children].forEach((dot, i) =>
    dot.classList.toggle("active", i === currentIndex)
  );
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % imagenes.length;
  updateCarrusel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
  updateCarrusel();
}

function startAutoplay() {
  if (autoplay) clearInterval(autoplay);
  autoplay = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
  clearInterval(autoplay);
  autoplay = null;
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Arrow buttons
prevBtn.addEventListener("click", () => { prevSlide(); resetAutoplay(); });
nextBtn.addEventListener("click", () => { nextSlide(); resetAutoplay(); });

// Swipe/drag helpers
function getX(e) {
  return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function handleStart(e) {
  isDragging = true;
  startX = getX(e);
  currentX = startX;
  const transform = track.style.transform;
  const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
  startTransform = match ? parseFloat(match[1]) : 0;
  stopAutoplay();
  track.style.transition = 'none';
  e.preventDefault();
}

function handleMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  currentX = getX(e);
  const deltaX = currentX - startX;
  track.style.transform = `translateX(${startTransform + deltaX}px)`;
}

function handleEnd() {
  if (!isDragging) return;
  isDragging = false;
  const deltaX = currentX - startX;
  track.style.transition = 'transform 0.5s ease-in-out';
  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0) prevSlide(); else nextSlide();
  } else {
    updateCarrusel();
  }
  resetAutoplay();
}

track.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", handleMove);
document.addEventListener("mouseup", handleEnd);
track.addEventListener("touchstart", handleStart, { passive: false });
track.addEventListener("touchmove", handleMove, { passive: false });
track.addEventListener("touchend", handleEnd);

track.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (e.deltaY > 0 || e.deltaX > 0) nextSlide(); else prevSlide();
  resetAutoplay();
}, { passive: false });

track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

document.addEventListener("mouseleave", (e) => {
  if (isDragging && !track.contains(e.relatedTarget)) handleEnd();
});

renderCarrusel();
startAutoplay();
window.addEventListener("resize", updateCarrusel);


// ============================================
// WHATSAPP ICON
// ============================================

function mostrarWhatsapp() {
  const icon = document.querySelector('.whatsapp-logo');
  if (!icon) return;
  const isSmallScreen = window.innerWidth <= 1024;
  const hasScrolledEnough = window.scrollY >= window.innerHeight * 0.5;

  if (isSmallScreen || hasScrolledEnough) {
    icon.classList.add('visible');
  } else {
    icon.classList.remove('visible');
  }
}

window.addEventListener('scroll', mostrarWhatsapp);
window.addEventListener('resize', mostrarWhatsapp);
window.addEventListener('load', mostrarWhatsapp);


// ============================================
// HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


// ============================================
// LIGHTBOX
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');

const galleryItems = document.querySelectorAll('.gallery-item');
const gallerySrcs = [];
let lightboxIndex = 0;

galleryItems.forEach((item) => {
  const img = item.querySelector('img');
  gallerySrcs.push(img.src);
  item.addEventListener('click', () => {
    lightboxIndex = parseInt(item.dataset.index);
    openLightbox();
  });
});

function openLightbox() {
  lightboxImg.src = gallerySrcs[lightboxIndex];
  lightboxImg.alt = galleryItems[lightboxIndex].querySelector('img').alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex - 1 + gallerySrcs.length) % gallerySrcs.length;
  lightboxImg.src = gallerySrcs[lightboxIndex];
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex + 1) % gallerySrcs.length;
  lightboxImg.src = gallerySrcs[lightboxIndex];
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { lightboxIndex = (lightboxIndex - 1 + gallerySrcs.length) % gallerySrcs.length; lightboxImg.src = gallerySrcs[lightboxIndex]; }
  if (e.key === 'ArrowRight') { lightboxIndex = (lightboxIndex + 1) % gallerySrcs.length; lightboxImg.src = gallerySrcs[lightboxIndex]; }
});


// ============================================
// TRANSLATIONS
// ============================================

const traduccion = {
  "nav-titulo": {
    "es": "Hotel Avenida La Plata",
    "en": "Avenida La Plata Hotel",
    "por": "Hotel Avenida La Plata"
  },
  "link1": {
    "es": "Sobre Nosotros",
    "en": "About Us",
    "por": "Sobre Nós"
  },
  "link-habitaciones": {
    "es": "Habitaciones",
    "en": "Rooms",
    "por": "Quartos"
  },
  "link2": {
    "es": "Comodidades",
    "en": "Amenities",
    "por": "Comodidades"
  },
  "link3": {
    "es": "Donde Encontrarnos",
    "en": "Find Us",
    "por": "Onde Estamos"
  },
  // Mobile nav mirrors
  "link1-mobile": {
    "es": "Sobre Nosotros",
    "en": "About Us",
    "por": "Sobre Nós"
  },
  "link-habitaciones-mobile": {
    "es": "Habitaciones",
    "en": "Rooms",
    "por": "Quartos"
  },
  "link2-mobile": {
    "es": "Comodidades",
    "en": "Amenities",
    "por": "Comodidades"
  },
  "link3-mobile": {
    "es": "Donde Encontrarnos",
    "en": "Find Us",
    "por": "Onde Estamos"
  },
  // Hero
  "titulo-principal": {
    "es": "HOTEL AVENIDA LA PLATA",
    "en": "HOTEL AVENIDA LA PLATA",
    "por": "HOTEL AVENIDA LA PLATA"
  },
  "hero-subtitle-text": {
    "es": "Patrimonio Histórico",
    "en": "Historical Heritage",
    "por": "Patrimônio Histórico"
  },
  "hero-cta-text": {
    "es": "Reservar ahora",
    "en": "Book now",
    "por": "Reservar agora"
  },
  // Sobre Nosotros
  "titulo-sobre-nosotros": {
    "es": "Sobre Nosotros",
    "en": "About Us",
    "por": "Sobre Nós"
  },
  "texto1-sobre-nosotros": {
    "es": "Este lugar ofrece una ubicación ideal, a pocos metros del centro comercial y a unos 700 metros del centro geográfico de la ciudad, donde se encuentra Plaza Moreno. Frente a esta se halla la Catedral y, a pocas cuadras, el Teatro Argentino. También nos encontramos cerca del Hospital de Niños y de otros centros especializados en niños.",
    "en": "This place offers an ideal location, just a few meters from the shopping center and about 700 meters from the city's geographical center, where Plaza Moreno is located. Opposite is the Cathedral, and a few blocks away, the Argentinian Theater. We are also near the Children's Hospital and other pediatric centers.",
    "por": "Este local oferece uma localização ideal, a poucos metros do centro comercial e cerca de 700 metros do centro geográfico da cidade, onde está a Praça Moreno. Em frente está a Catedral e, a poucas quadras, o Teatro Argentino. Também estamos perto do Hospital Infantil e de outros centros especializados em crianças."
  },
  "texto2-sobre-nosotros": {
    "es": "Nos enorgullece brindar una atención personalizada, ágil y constante, siempre enfocada en anticipar y satisfacer las necesidades de nuestros huéspedes.",
    "en": "We are proud to provide personalized, efficient, and continuous service, always focused on anticipating and meeting our guests' needs.",
    "por": "Temos orgulho em oferecer um atendimento personalizado, ágil e constante, sempre focado em antecipar e satisfazer as necessidades dos nossos hóspedes."
  },
  "texto3-sobre-nosotros": {
    "es": "Gracias al valor arquitectónico del edificio, ha sido reconocido como Patrimonio Histórico de la Gran Ciudad de La Plata.",
    "en": "Thanks to the architectural value of the building, it has been recognized as a Historical Heritage of the Great City of La Plata.",
    "por": "Devido ao valor arquitetônico do edifício, ele foi reconhecido como Patrimônio Histórico da Grande Cidade de La Plata."
  },
  // Habitaciones (Gallery)
  "titulo-habitaciones": {
    "es": "Nuestras Habitaciones",
    "en": "Our Rooms",
    "por": "Nossos Quartos"
  },
  "label-hab1": {
    "es": "Habitación Doble Superior",
    "en": "Superior Double Room",
    "por": "Quarto Duplo Superior"
  },
  "label-hab2": {
    "es": "Baño Privado",
    "en": "Private Bathroom",
    "por": "Banheiro Privativo"
  },
  "label-hab3": {
    "es": "Habitación Clásica",
    "en": "Classic Room",
    "por": "Quarto Clássico"
  },
  "label-hab4": {
    "es": "Habitación Familiar",
    "en": "Family Room",
    "por": "Quarto Familiar"
  },
  "label-hab5": {
    "es": "Habitación Doble",
    "en": "Double Room",
    "por": "Quarto Duplo"
  },
  "label-hab6": {
    "es": "Habitación Twin",
    "en": "Twin Room",
    "por": "Quarto Twin"
  },
  "label-hab7": {
    "es": "Habitación Vista Amplia",
    "en": "Wide View Room",
    "por": "Quarto com Vista Ampla"
  },
  // Desayuno
  "titulo-desayuno": {
    "es": "Desayuno Incluido",
    "en": "Breakfast Included",
    "por": "Café da Manhã Incluído"
  },
  "texto1-desayuno": {
    "es": "Comenzá cada mañana con nuestro desayuno buffet incluido en la estadía. Ofrecemos una variedad de opciones para que empieces el día con energía.",
    "en": "Start each morning with our buffet breakfast included in your stay. We offer a variety of options so you can begin the day with energy.",
    "por": "Comece cada manhã com nosso café da manhã buffet incluído na estadia. Oferecemos uma variedade de opções para que você comece o dia com energia."
  },
  "texto2-desayuno": {
    "es": "Café, té, mate cocido, jugos, tostadas, medialunas, mermeladas caseras y más, servidos en nuestro cálido comedor.",
    "en": "Coffee, tea, mate, juices, toast, croissants, homemade jams, and more, served in our warm dining room.",
    "por": "Café, chá, mate, sucos, torradas, croissants, geleias caseiras e mais, servidos no nosso aconchegante salão."
  },
  // Comodidades
  "titulo-comodidades": {
    "es": "Comodidades",
    "en": "Amenities",
    "por": "Comodidades"
  },
  "amenity-wifi": {
    "es": "WiFi",
    "en": "WiFi",
    "por": "WiFi"
  },
  "amenity-tv": {
    "es": "TV Cable",
    "en": "Cable TV",
    "por": "TV a Cabo"
  },
  "amenity-desayuno": {
    "es": "Desayuno",
    "en": "Breakfast",
    "por": "Café da Manhã"
  },
  "amenity-baño": {
    "es": "Baño Privado",
    "en": "Private Bathroom",
    "por": "Banheiro Privativo"
  },
  "amenity-ac": {
    "es": "Aire Acondicionado",
    "en": "Air Conditioning",
    "por": "Ar Condicionado"
  },
  "amenity-cochera": {
    "es": "Cochera",
    "en": "Parking",
    "por": "Estacionamento"
  },
  "texto1-comodidades": {
    "es": "Habitaciones equipadas con baños privados, television por cable, wifi y ventiladores (algunas con aire acondicionado con costo adicional).",
    "en": "Rooms equipped with private bathrooms, cable TV, Wi-Fi, and fans (some with air conditioning at an extra cost).",
    "por": "Quartos equipados com banheiros privativos, TV a cabo, Wi-Fi e ventiladores (alguns com ar-condicionado com custo adicional)."
  },
  "texto2-comodidades": {
    "es": "Contamos con espacios de uso comun, como comedor, sala de estar con televisor y patio.",
    "en": "We offer common areas such as a dining room, a lounge with a TV, and a patio.",
    "por": "Dispomos de áreas comuns, como sala de jantar, sala de estar com TV e pátio."
  },
  "texto3-comodidades": {
    "es": "En el servicio esta incluido el desayuno y las emergencias médicas.",
    "en": "The service includes breakfast and medical emergencies.",
    "por": "O serviço inclui café da manhã e emergências médicas."
  },
  "texto4-comodidades": {
    "es": "La cochera se encuentra a una cuadra del establecimiento(sujeto a disponibilidad con costo adicional).",
    "en": "Parking is located one block from the property (subject to availability and extra charge).",
    "por": "A garagem está localizada a uma quadra do estabelecimento (sujeita a disponibilidade e com custo adicional)."
  },
  // Horarios
  "titulo-horarios": {
    "es": "Horarios",
    "en": "Hours",
    "por": "Horários"
  },
  "texto1-horarios": {
    "es": "Check-In: 11:00AM",
    "en": "Check-In: 11:00AM",
    "por": "Check-In: 11:00AM"
  },
  "texto2-horarios": {
    "es": "Check-Out: 10:00AM",
    "en": "Check-Out: 10:00AM",
    "por": "Check-Out: 10:00AM"
  },
  "texto3-horarios": {
    "es": "Abierto las 24hs todos los días del año",
    "en": "Open 24 hours, every day of the year",
    "por": "Aberto 24 horas, todos os dias do ano"
  },
  // Contacto
  "titulo-contacto": {
    "es": "Contacto",
    "en": "Contact",
    "por": "Contato"
  },
  "texto1-contacto": {
    "es": "Enviar un email",
    "en": "Send an email",
    "por": "Enviar um e-mail"
  },
  "texto2-contacto": {
    "es": "Llamar ahora",
    "en": "Call now",
    "por": "Ligar agora"
  },
  "texto3-contacto": {
    "es": "Enviar mensaje por WhatsApp",
    "en": "Send message via WhatsApp",
    "por": "Enviar mensagem pelo WhatsApp"
  },
  "texto4-contacto": {
    "es": "Ver en Google Maps",
    "en": "View on Google Maps",
    "por": "Ver no Google Maps"
  },
  // Condiciones
  "titulo-condiciones": {
    "es": "Condiciones",
    "en": "Conditions",
    "por": "Condições"
  },
  "texto1-condiciones": {
    "es": "Se encuentra absolutamente prohibido fumar en las instalaciones. En el caso de infringir con dicha normativa, se cobrará un adicional del 50% del valor de la estadía, reservándose la casa el derecho de admisión.",
    "en": "Smoking is strictly prohibited on the premises. If this rule is broken, an additional 50% of the stay will be charged, and the house reserves the right of admission.",
    "por": "É absolutamente proibido fumar nas instalações. Em caso de descumprimento desta norma, será cobrado um adicional de 50% do valor da estadia, e a casa reserva-se o direito de admissão."
  },
  "texto2-condiciones": {
    "es": "El establecimiento tiene planta baja y planta alta, pero no cuenta con ascensor. En el caso de contar con movilidad reducida, consulte por disponibilidad de habitaciones en la planta baja.",
    "en": "The establishment has a ground floor and an upper floor, but does not have an elevator. If you have reduced mobility, ask about availability of rooms on the ground floor.",
    "por": "O estabelecimento possui térreo e andar superior, mas não possui elevador. Em caso de mobilidade reduzida, consulte a disponibilidade de quartos no térreo."
  },
  // Footer
  "footer-patrimonio": {
    "es": "Patrimonio Histórico",
    "en": "Historical Heritage",
    "por": "Patrimônio Histórico"
  },
  "footer-contacto-title": {
    "es": "Contacto",
    "en": "Contact",
    "por": "Contato"
  },
  "footer-nav-title": {
    "es": "Navegación",
    "en": "Navigation",
    "por": "Navegação"
  },
  "footer-link1": {
    "es": "Sobre Nosotros",
    "en": "About Us",
    "por": "Sobre Nós"
  },
  "footer-link-hab": {
    "es": "Habitaciones",
    "en": "Rooms",
    "por": "Quartos"
  },
  "footer-link2": {
    "es": "Comodidades",
    "en": "Amenities",
    "por": "Comodidades"
  },
  "footer-link3": {
    "es": "Contacto",
    "en": "Contact",
    "por": "Contato"
  }
};

function translate(idioma) {
  document.querySelectorAll('*').forEach(el => {
    el.classList.forEach(clase => {
      if (traduccion[clase] && traduccion[clase][idioma]) {
        el.innerText = traduccion[clase][idioma];
      }
    });
  });
}

// Language event listeners - select all instances (nav + mobile nav)
document.querySelectorAll('.ingles').forEach(el => el.addEventListener('click', () => translate('en')));
document.querySelectorAll('.portugues').forEach(el => el.addEventListener('click', () => translate('por')));
document.querySelectorAll('.español').forEach(el => el.addEventListener('click', () => translate('es')));
