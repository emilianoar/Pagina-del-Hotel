// CARRUSEL DE IMAGENES

const imagenes = [
  "Imagenes/20240923_151027-768x576.webp",
  "Imagenes/20240923_151119-768x1024.webp",
  "Imagenes/20240923_151446-768x867.webp",
  "Imagenes/20240923_151716-768x576.webp",
  "Imagenes/20240923_151753-768x576.webp",
  "Imagenes/20240923_152316-768x838.webp",
  "Imagenes/20240923_152445-768x941.webp",
  "Imagenes/20240923_152820-768x576.webp",
  "Imagenes/20240923_152936-768x1024.webp",
  "Imagenes/20240923_153009-734x1024.webp"
];

const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");
let currentIndex = 0;
let autoplay;

// Variables para swipe/drag
let isDragging = false;
let startX = 0;
let currentX = 0;
let startTransform = 0;
let threshold = 50; // Mínimo de píxeles para cambiar slide

function renderCarrusel() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    imagenes.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.draggable = false; // Evita el drag nativo de las imágenes
        if (i === currentIndex) img.classList.add("active");
        
        // Listener para cambiar al índice clickeado
        img.addEventListener("click", (e) => {
            // Solo cambiar si no estamos arrastrando
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
    
    const imgWidth = track.querySelector("img")?.offsetWidth || 0;
    const gap = 30;
    const containerWidth = track.parentElement.offsetWidth;
    
    // Scroll para centrar la imagen actual dentro del contenedor visible
    const scroll = (imgWidth + gap) * currentIndex - containerWidth / 2 + imgWidth / 2;
    track.style.transform = `translateX(${-scroll}px)`;
    
    [...track.children].forEach((img, i) =>
        img.classList.toggle("active", i === currentIndex)
    );
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
    autoplay = setInterval(nextSlide, 3000);
}

function stopAutoplay() {
    clearInterval(autoplay);
    autoplay = null;
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Funciones para manejar el arrastre/swipe
function getX(e) {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function handleStart(e) {
    isDragging = true;
    startX = getX(e);
    currentX = startX;
    
    // Obtener la transformación actual
    const transform = track.style.transform;
    const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    startTransform = match ? parseFloat(match[1]) : 0;
    
    stopAutoplay();
    track.style.transition = 'none';
    
    // Prevenir selección de texto durante el arrastre
    e.preventDefault();
}

function handleMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = getX(e);
    const deltaX = currentX - startX;
    
    // Aplicar la transformación basada en el movimiento
    track.style.transform = `translateX(${startTransform + deltaX}px)`;
}

function handleEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    const deltaX = currentX - startX;
    
    // Restaurar la transición
    track.style.transition = 'transform 0.3s ease';
    
    // Determinar si cambiar de slide basado en el threshold
    if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
            // Swipe hacia la derecha - slide anterior
            prevSlide();
        } else {
            // Swipe hacia la izquierda - slide siguiente
            nextSlide();
        }
    } else {
        // No hubo suficiente movimiento, volver al slide actual
        updateCarrusel();
    }
    
    resetAutoplay();
}

// Event listeners para mouse (escritorio)
track.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", handleMove);
document.addEventListener("mouseup", handleEnd);

// Event listeners para touch (móvil)
track.addEventListener("touchstart", handleStart, { passive: false });
track.addEventListener("touchmove", handleMove, { passive: false });
track.addEventListener("touchend", handleEnd);

// Event listeners para scroll con rueda del mouse
track.addEventListener("wheel", (e) => {
    e.preventDefault();
    
    // Detectar dirección del scroll
    if (e.deltaY > 0 || e.deltaX > 0) {
        // Scroll hacia abajo/derecha - siguiente slide
        nextSlide();
    } else {
        // Scroll hacia arriba/izquierda - slide anterior
        prevSlide();
    }
    
    resetAutoplay();
});

// Interacción para pausar/reanudar autoplay
track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

// Manejar cuando el usuario sale del área mientras arrastra
document.addEventListener("mouseleave", (e) => {
    if (isDragging && !track.contains(e.relatedTarget)) {
        handleEnd(e);
    }
});

// Init
renderCarrusel();
startAutoplay();

// Para mantener centrado en resize
window.addEventListener("resize", updateCarrusel);



// ICONO DE WHATSAPP

  function mostrarWhatsapp() {
    const icon = document.querySelector('.whatsapp-logo');
    const isSmallScreen = window.innerWidth <= 1300;
    const hasScrolledEnough = window.scrollY >= window.innerHeight * 0.6;
  
    if (isSmallScreen) {
      // Pantallas pequeñas: siempre visible
      icon.classList.add('visible');
    } else {
      // Pantallas grandes: solo mostrar si se ha hecho suficiente scroll
      if (hasScrolledEnough) {
        icon.classList.add('visible');
      } else {
        icon.classList.remove('visible');
      }
    }
  }
  
  // Ejecutar en eventos clave
  window.addEventListener('scroll', mostrarWhatsapp);
  window.addEventListener('resize', mostrarWhatsapp);
  window.addEventListener('load', mostrarWhatsapp);
  

  // TRADUCCION

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
    "titulo-principal": {
      "es": "HOTEL AVENIDA LA PLATA",
      "en": "AVENIDA LA PLATA HOTEL",
      "por": "HOTEL AVENIDA LA PLATA"
    },
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
    "titulo-comodidades": {
      "es": "Comodidades",
      "en": "Amenities",
      "por": "Comodidades"
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
    }
  }
  

  function translate(idioma) {
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(clase => {
        if (traduccion[clase] && traduccion[clase][idioma]) {
          el.innerText = traduccion[clase][idioma];
        }
      });
    });
  }
  
  // Eventos para cambiar idioma
  document.querySelector('.ingles').addEventListener('click', () => translate('en'));
  document.querySelector('.portugues').addEventListener('click', () => translate('por'));
  document.querySelector('.español')?.addEventListener('click', () => translate('es')); 