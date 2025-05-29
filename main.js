const imagenes = [
  "./Imagenes/20240923_151027-768x576.webp",
  "/Imagenes/20240923_151119-768x1024.webp",
  "/Imagenes/20240923_151446-768x867.webp",
  "/Imagenes/20240923_151716-768x576.webp",
  "/Imagenes/20240923_151753-768x576.webp",
  "/Imagenes/20240923_152316-768x838.webp",
  "/Imagenes/20240923_152445-768x941.webp",
  "/Imagenes/20240923_152820-768x576.webp",
  "/Imagenes/20240923_152936-768x1024.webp",
  "/Imagenes/20240923_153009-734x1024.webp"
];

const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");

let currentIndex = 0;
let autoplay;

function renderCarrusel() {
  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  imagenes.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    if (i === currentIndex) img.classList.add("active");

    // Listener para cambiar al índice clickeado
    img.addEventListener("click", () => {
      currentIndex = i;
      updateCarrusel();
      resetAutoplay();
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
  const imgWidth = track.querySelector("img")?.offsetWidth || 0;
  const gap = 80;
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

function startAutoplay() {
  autoplay = setInterval(nextSlide, 3000);
}

function stopAutoplay() {
  clearInterval(autoplay);
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Interacción
track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

// Init
renderCarrusel();
startAutoplay();

// Para mantener centrado en resize
window.addEventListener("resize", updateCarrusel);




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
  