// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
});

window.lenis = lenis; // Expose globally for syncing if needed

if (typeof gsap !== 'undefined' && gsap.ticker && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
} else {
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const header = document.getElementById('header');
const closeMenuBtn = document.getElementById('closeMenuBtn');

function setMobileMenu(open) {
    if (!navLinks || !overlay || !hamburger) return;

    navLinks.classList.toggle('active', open);
    overlay.classList.toggle('active', open);
    document.body.classList.toggle('nav-open', open);
    hamburger.setAttribute('aria-expanded', String(open));

    if (open && closeMenuBtn) {
        closeMenuBtn.focus();
    }
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        setMobileMenu(!navLinks.classList.contains('active'));
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        setMobileMenu(false);
        hamburger.focus();
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        setMobileMenu(false);
        hamburger.focus();
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        setMobileMenu(false);
        hamburger.focus();
    }
});

// Close menu when clicking a link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            setMobileMenu(false);
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = Number(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const frameRate = 30;
                const totalFrames = Math.round((duration / 1000) * frameRate);
                let currentFrame = 0;
                
                const counter = setInterval(() => {
                    currentFrame++;
                    const progress = currentFrame / totalFrames;
                    const currentCount = Math.round(endValue * progress);

                    target.innerText = currentCount.toLocaleString('en-US') + "+";
                    
                    if (currentFrame >= totalFrames) {
                        clearInterval(counter);
                        target.innerText = endValue.toLocaleString('en-US') + "+";
                    }
                }, 1000 / frameRate);
                
                observer.unobserve(target);
            }
        });
    }, counterObserverOptions);

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}
