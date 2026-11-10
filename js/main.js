// ============================================
// MENÚ MÓVIL
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ============================================
// MODO OSCURO / CLARO
// ============================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    updateThemeIcon(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
        
        // Efecto mágico al cambiar
        createMagicBurst(themeToggle);
    });
}

function updateThemeIcon(isLight) {
    const icon = themeToggle?.querySelector('i');
    if (icon) {
        if (isLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ============================================
// EFECTO DE PARTÍCULAS MÁGICAS
// ============================================
function createMagicBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        particle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = '1.2rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 0.8s ease-out';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 50 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            particle.style.opacity = '0';
        });
        
        setTimeout(() => particle.remove(), 800);
    }
}

// ============================================
// PARTÍCULAS FLOTANTES EN EL HERO
// ============================================
function createFloatingParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const symbols = ['✨', '⭐', '🌟', '💫', '☽', '✦', '🔮'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('span');
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = (0.5 + Math.random() * 1) + 'rem';
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// Agregar keyframes para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
        25% { transform: translate(20px, -30px) rotate(90deg); opacity: 0.4; }
        50% { transform: translate(-10px, -60px) rotate(180deg); opacity: 0.2; }
        75% { transform: translate(30px, -30px) rotate(270deg); opacity: 0.4; }
    }
`;
document.head.appendChild(style);

createFloatingParticles();

// ============================================
// ANIMACIONES AL SCROLL (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.pilar-card, .chapter-card, .personaje-card, .criatura-card, .profesor-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validación básica
        if (!nombre || !email || !asunto || !mensaje) {
            showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }
        
        // Simular envío
        showFormMessage('¡Mensaje enviado con éxito! Las lechuzas mensajeras lo entregarán pronto. 🦉', 'success');
        contactForm.reset();
        
        // Efecto mágico
        createMagicBurst(contactForm.querySelector('button[type="submit"]'));
        
        // Si quieres enviar realmente a Formspree, descomenta:
        /*
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                showFormMessage('¡Mensaje enviado con éxito!', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Error al enviar. Intenta de nuevo.', 'error');
            }
        }).catch(() => {
            showFormMessage('Error de conexión. Intenta de nuevo.', 'error');
        });
        */
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ============================================
// EFECTO DE ESCRITURA EN EL TÍTULO
// ============================================
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// CURSOR PERSONALIZADO (opcional)
// ============================================
// Descomenta si quieres un cursor personalizado
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
*/

// ============================================
// SMOOTH SCROLL PARA ANCLAS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Lluvia de estrellas
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.textContent = ['✨', '⭐', '🌟', '💫', '🌙'][Math.floor(Math.random() * 5)];
            star.style.position = 'fixed';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = '-50px';
            star.style.fontSize = (1 + Math.random() * 2) + 'rem';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '9999';
            star.style.transition = 'all 3s linear';
            document.body.appendChild(star);
            
            requestAnimationFrame(() => {
                star.style.top = '110%';
                star.style.transform = `rotate(${Math.random() * 720}deg)`;
            });
            
            setTimeout(() => star.remove(), 3000);
        }, i * 50);
    }
    
    // Mensaje secreto
    const secretMsg = document.createElement('div');
    secretMsg.textContent = '🌟 ¡Has descubierto el secreto de Noctiluna! 🌟';
    secretMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #275d46, #569578);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-family: 'Cinzel Decorative', serif;
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(86, 149, 120, 0.8);
        text-align: center;
        animation: pulse 1s ease-in-out infinite;
    `;
    document.body.appendChild(secretMsg);
    
    setTimeout(() => secretMsg.remove(), 4000);
}

// ============================================
// INICIALIZACIÓN
// ============================================
console.log('%c🌙 Bienvenido a Noctiluna 🌙', 'font-size: 20px; color: #569578; font-family: serif;');
console.log('%cLos secretos te esperan...', 'font-size: 14px; color: #a3c4b8; font-style: italic;');
console.log('%cPrueba el Código Konami: ↑↑↓↓←→←→BA', 'font-size: 12px; color: #569578;');