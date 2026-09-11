document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revealItems = Array.from(document.querySelectorAll('.contact-reveal'));

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-revealed'));
        return;
    }

    document.body.classList.add('contact-motion-ready');

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            currentObserver.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -48px 0px',
        threshold: 0.12
    });

    requestAnimationFrame(() => revealItems.forEach((item) => observer.observe(item)));
});
