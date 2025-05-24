const imagenes = ["./Imagenes/20240923_151027-768x576.webp", "/Imagenes/20240923_151119-768x1024.webp", "/Imagenes/20240923_151446-768x867.webp", "/Imagenes/20240923_151716-768x576.webp", "/Imagenes/20240923_151753-768x576.webp", "/Imagenes/20240923_152316-768x838.webp", "/Imagenes/20240923_152445-768x941.webp", "/Imagenes/20240923_152820-768x576.webp", "/Imagenes/20240923_152936-768x1024.webp", "/Imagenes/20240923_153009-734x1024.webp"]

let indice = 0;
  const imagenPrincipal = document.querySelector('.principal');
  const anterior = document.querySelector('.anterior');
  const posterior = document.querySelector('.posterior');

  // Mostrar la primera imagen al cargar
  imagenPrincipal.src = imagenes[indice];

  anterior.addEventListener('click', () => {
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    imagenPrincipal.src = imagenes[indice];
  });

  posterior.addEventListener('click', () => {
    indice = (indice + 1) % imagenes.length;
    imagenPrincipal.src = imagenes[indice];
  });

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
  