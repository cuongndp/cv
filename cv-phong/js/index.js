// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    }, 100);
});

// Create Floating Particles
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particles';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        bgAnimation.appendChild(particle);
    }
}
createParticles();

// Improved Scroll Detection and Active Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling with offset for sticky navbar
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offsetTop = target.offsetTop - (window.innerWidth <= 1024 ? 80 : 0);

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active state immediately
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Enhanced hover effects
document.querySelectorAll('.project-card, .stat-card, .experience-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});

// Form submission with effects
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    btn.style.background = 'linear-gradient(135deg, var(--accent-success), var(--accent-primary))';
    btn.textContent = '✅ SENT!';
    setTimeout(() => {
        btn.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
        btn.textContent = 'SEND';
        this.reset();
    }, 2000);
});

// Interactive skill wheels
document.querySelectorAll('.skill-wheel').forEach(wheel => {
    wheel.addEventListener('click', function () {
        this.style.animationDuration = '0.5s';
        setTimeout(() => {
            this.style.animationDuration = '8s';
        }, 500);
    });
});

// Dynamic background interaction
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
        rgba(0, 212, 255, 0.1) 0%, 
        rgba(15, 15, 35, 1) 30%)`;
});

// Add navbar background on scroll (for mobile)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 58, 0.98)';
    } else {
        navbar.style.background = window.innerWidth <= 1024 ?
            'rgba(26, 26, 58, 0.95)' :
            'linear-gradient(135deg, var(--bg-card), #0a0a2a)';
    }
});


console.log('🎨✨ Nguyễn Văn Phong - Improved Interactive CV loaded! 🚀');