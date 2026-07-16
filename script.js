// ==========================================
// 1. MENÚ DE NAVEGACIÓN MÓVIL (Hamburguesa)
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Cambia el icono de hamburguesa a una 'X' al estar abierto
    navToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
  });
}

// ==========================================
// 2. LÓGICA DEL CARRUSEL (Página Principal)
// ==========================================
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.hero-dot');

let currentSlide = 0;
const totalSlides = dots.length;

if (track && totalSlides > 0) {
  function updateCarousel(index) {
    // Evita desbordamiento de índices
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;

    // Desplaza el contenedor del carrusel
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Actualiza el indicador visual de los puntitos
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }

  // Eventos para las flechas
  nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));
  prevBtn.addEventListener('click', () => updateCarousel(currentSlide - 1));

  // Eventos para los puntitos selectores
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  // Movimiento automático suave cada 5 segundos
  let autoPlay = setInterval(() => updateCarousel(currentSlide + 1), 5000);

  // Pausa el autoplay si el usuario interactúa con los controles
  const stopAutoPlay = () => clearInterval(autoPlay);
  prevBtn.addEventListener('click', stopAutoPlay);
  nextBtn.addEventListener('click', stopAutoPlay);
  dots.forEach(dot => dot.addEventListener('click', stopAutoPlay));
}

// ==========================================================
// 3. VALIDACIÓN DE FORMULARIO DE CONTACTO & LOCALSTORAGE
// ==========================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Elementos de los inputs
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Elementos para pintar errores y estado
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    // Limpieza inicial de alertas previas
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    let isValid = true;

    // Validar Nombre
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Por favor, introduce tu nombre.';
      isValid = false;
    }

    // Validar Correo Electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Introduce un correo electrónico válido.';
      isValid = false;
    }

    // Validar Mensaje
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Escribe detalladamente tu consulta.';
      isValid = false;
    }

    // Guardado en LocalStorage y confirmación si pasa la validación
    if (isValid) {
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        date: new Date().toLocaleString()
      };

      // Guarda el envío de forma local simulando una base de datos
      localStorage.setItem('lastContactLead', JSON.stringify(formData));

      // Muestra retroalimentación de éxito al usuario
      formStatus.classList.add('visible', 'success');
      formStatus.textContent = `¡Muchas gracias, ${formData.name}! Tus datos se registraron correctamente. Nos pondremos en contacto pronto.`;

      // Resetea los campos del formulario
      contactForm.reset();
    }
  });
}