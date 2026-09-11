/**
 * Godhury Marketing Communication - Premium Corporate & Editorial Motion System
 * Visible, photography-focused cinematic image motion.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Intersection Observer for Visible Scroll Reveals (35px Translate, 0.65s Ease)
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger grid child items smoothly using Anime.js
                if (entry.target.classList.contains('grid') || entry.target.classList.contains('services-grid') || entry.target.classList.contains('portfolio-grid')) {
                    const children = Array.from(entry.target.children);
                    // Ensure children are hidden initially if not already
                    children.forEach(c => c.style.opacity = '0');
                    
                    anime({
                        targets: children,
                        translateY: [window.innerWidth < 768 ? 10 : 20, 0],
                        opacity: [0, 1],
                        easing: 'easeOutCubic',
                        duration: 800,
                        delay: anime.stagger(100)
                    });
                } else {
                    // Single element reveal
                    entry.target.style.opacity = '0';
                    anime({
                        targets: entry.target,
                        translateY: [window.innerWidth < 768 ? 10 : 20, 0],
                        opacity: [0, 1],
                        easing: 'easeOutCubic',
                        duration: 800
                    });
                }

                // Add original class in case CSS depends on it
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Auto-register elements for visible reveal
    const elementsToReveal = document.querySelectorAll(
        '.hero-content, section h2, .image-card, .grid > div, .card, .badge, .service-detail-card, .location-card, .fast-response-card, .enquiry-form-card, .client-logos-showcase'
    );

    elementsToReveal.forEach((el) => {
        if (el.closest('.impact-scroll-section') || el.closest('.collection-surfer-section')) return;

        if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
        }
        revealObserver.observe(el);
    });

    // 2. Featured Projects & Service Image Cards Viewport Registration
    const imageCards = document.querySelectorAll('.image-card, .portfolio-item, .service-detail-card');
    imageCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            const cardObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        img.classList.add('img-loaded');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            
            cardObserver.observe(card);
        }
    });

    // 3. Smooth Hero Background Scroll Parallax (Factor 0.22 via requestAnimationFrame)
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight * 1.2) {
                        heroBg.style.transform = `translateY(${scrolled * 0.22}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 4. Scroll-linked From Idea to Impact showcase
    const impactSection = document.getElementById('impactScrollSection');
    const impactHeader = document.getElementById('impactScrollHeader');
    const impactFrame = document.getElementById('impactScrollFrame');
    const impactImage = document.getElementById('impactScrollImage');
    const impactAction = document.getElementById('impactScrollAction');

    if (impactSection && impactHeader && impactFrame && impactImage && impactAction) {
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let impactTicking = false;

        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        const mix = (start, end, progress) => start + (end - start) * progress;

        function renderImpactShowcase() {
            impactTicking = false;

            if (reducedMotionQuery.matches) {
                impactHeader.style.transform = 'none';
                impactFrame.style.transform = 'none';
                impactFrame.style.boxShadow = '0 42px 90px rgba(0, 0, 0, 0.44), 0 12px 30px rgba(0, 0, 0, 0.24)';
                impactImage.style.transform = 'none';
                impactAction.style.transform = 'none';
                impactAction.style.opacity = '1';
                impactSection.dataset.progress = '1.000';
                return;
            }

            const rect = impactSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isMobile = window.innerWidth <= 768;
            const isTablet = !isMobile && window.innerWidth <= 1024;
            let progress;

            if (isMobile) {
                const mobileTravel = viewportHeight + (rect.height * 0.35);
                progress = clamp((viewportHeight - rect.top) / mobileTravel, 0, 1);
            } else {
                const scrollTravel = Math.max(impactSection.offsetHeight - viewportHeight, 1);
                progress = clamp(-rect.top / scrollTravel, 0, 1);
            }

            const easedProgress = progress * progress * (3 - (2 * progress));
            const startRotation = isMobile ? 0 : (isTablet ? 12 : 22);
            const startScale = isMobile ? 0.985 : (isTablet ? 0.945 : 0.89);
            const startHeaderY = isMobile ? 10 : (isTablet ? 36 : 72);
            const startFrameY = isMobile ? 8 : (isTablet ? 24 : 48);
            const startImageScale = isMobile ? 1.015 : (isTablet ? 1.035 : 1.05);

            impactHeader.style.transform = `translate3d(0, ${mix(startHeaderY, 0, easedProgress).toFixed(2)}px, 0)`;
            impactFrame.style.transform = `translate3d(0, ${mix(startFrameY, 0, easedProgress).toFixed(2)}px, 0) rotateX(${mix(startRotation, 0, easedProgress).toFixed(2)}deg) scale(${mix(startScale, 1, easedProgress).toFixed(4)})`;
            impactFrame.style.boxShadow = isMobile
                ? '0 18px 38px rgba(0, 0, 0, 0.3)'
                : `0 ${mix(14, 42, easedProgress).toFixed(1)}px ${mix(34, 90, easedProgress).toFixed(1)}px rgba(0, 0, 0, ${mix(0.18, 0.44, easedProgress).toFixed(3)}), 0 ${mix(4, 12, easedProgress).toFixed(1)}px ${mix(14, 30, easedProgress).toFixed(1)}px rgba(0, 0, 0, ${mix(0.14, 0.24, easedProgress).toFixed(3)})`;
            impactImage.style.transform = `scale(${mix(startImageScale, 1, easedProgress).toFixed(4)})`;
            impactAction.style.transform = `translate3d(0, ${mix(isMobile ? 10 : 24, 0, easedProgress).toFixed(2)}px, 0)`;
            impactAction.style.opacity = mix(isMobile ? 0.65 : 0.38, 1, easedProgress).toFixed(3);
            impactSection.dataset.progress = progress.toFixed(3);
        }

        function scheduleImpactRender() {
            if (!impactTicking) {
                impactTicking = true;
                window.requestAnimationFrame(renderImpactShowcase);
            }
        }

        window.addEventListener('scroll', scheduleImpactRender, { passive: true });
        window.addEventListener('resize', scheduleImpactRender, { passive: true });

        if (typeof reducedMotionQuery.addEventListener === 'function') {
            reducedMotionQuery.addEventListener('change', scheduleImpactRender);
        } else {
            reducedMotionQuery.addListener(scheduleImpactRender);
        }

        scheduleImpactRender();
    }

    // 5. Statistics Number Counter Animation
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countToText = target.innerText.replace(/[^0-9]/g, '');
                const countTo = parseInt(countToText, 10);
                
                if (!isNaN(countTo)) {
                    let current = 0;
                    const duration = 1600;
                    const stepTime = 20;
                    const increment = Math.ceil(countTo / (duration / stepTime));

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= countTo) {
                            current = countTo;
                            clearInterval(timer);
                        }
                        target.innerText = current.toLocaleString('en-US') + '+';
                    }, stepTime);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });

    // 6. Selected Work scroll-driven collection
    const collectionSection = document.getElementById('selectedWorkSection');
    const collectionProjects = Array.from(document.querySelectorAll('.collection-project'));
    const collectionNumber = document.getElementById('collectionSurferNumber');
    const collectionTitle = document.getElementById('collectionSurferTitle');
    const collectionProgressItems = Array.from(document.querySelectorAll('.collection-surfer-progress li'));

    if (collectionSection && collectionProjects.length > 0) {
        const collectionTitles = collectionProjects.map((project) => project.querySelector('h3').textContent);
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let collectionTicking = false;
        let activeProjectIndex = -1;

        const mobileProjectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -30px 0px' });

        collectionProjects.forEach((project) => mobileProjectObserver.observe(project));

        function resetCollectionStyles() {
            collectionProjects.forEach((project) => {
                project.style.removeProperty('opacity');
                project.style.removeProperty('transform');
                project.style.removeProperty('clip-path');
                project.style.removeProperty('z-index');
                project.style.removeProperty('pointer-events');
            });
        }

        function setActiveProject(index) {
            if (index === activeProjectIndex) return;

            activeProjectIndex = index;
            if (collectionNumber) collectionNumber.textContent = String(index + 1).padStart(2, '0');
            if (collectionTitle) collectionTitle.textContent = collectionTitles[index];
            collectionProgressItems.forEach((item, itemIndex) => {
                item.classList.toggle('is-active', itemIndex === index);
            });
        }

        function renderCollection() {
            collectionTicking = false;
            const isMobile = window.innerWidth <= 768;

            if (isMobile || reducedMotionQuery.matches) {
                resetCollectionStyles();
                setActiveProject(0);
                return;
            }

            const rect = collectionSection.getBoundingClientRect();
            const scrollTravel = Math.max(collectionSection.offsetHeight - window.innerHeight, 1);
            const progress = Math.min(Math.max(-rect.top / scrollTravel, 0), 1);
            const position = progress * (collectionProjects.length - 1);
            const isTablet = window.innerWidth <= 1024;

            collectionProjects.forEach((project, index) => {
                const distance = index - position;
                const isNear = distance > -1.15 && distance < 1.15;

                if (!isNear) {
                    project.style.opacity = '0';
                    project.style.pointerEvents = 'none';
                    return;
                }

                if (distance < 0) {
                    const pastAmount = Math.abs(distance);
                    const translateX = distance * (isTablet ? 8 : 12);
                    const scale = 1 - pastAmount * (isTablet ? 0.025 : 0.04);
                    const rotation = distance * (isTablet ? 0.35 : 0.8);
                    project.style.opacity = Math.max(0, 1 - pastAmount * 0.75).toFixed(3);
                    project.style.transform = `translate3d(${translateX.toFixed(2)}%, 0, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
                    project.style.clipPath = 'inset(0 0 0 0)';
                    project.style.zIndex = String(10 + index);
                } else {
                    const translateX = distance * (isTablet ? 68 : 78);
                    const scale = 1 - distance * (isTablet ? 0.025 : 0.04);
                    const rotation = distance * (isTablet ? 0.35 : 0.8);
                    const clipLeft = distance * (isTablet ? 12 : 18);
                    project.style.opacity = '1';
                    project.style.transform = `translate3d(${translateX.toFixed(2)}%, 0, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
                    project.style.clipPath = `inset(0 0 0 ${clipLeft.toFixed(2)}%)`;
                    project.style.zIndex = String(20 + index);
                }

                project.style.pointerEvents = Math.abs(distance) < 0.45 ? 'auto' : 'none';
            });

            setActiveProject(Math.min(Math.round(position), collectionProjects.length - 1));
            collectionSection.dataset.progress = progress.toFixed(3);
        }

        function scheduleCollectionRender() {
            if (!collectionTicking) {
                collectionTicking = true;
                window.requestAnimationFrame(renderCollection);
            }
        }

        window.addEventListener('scroll', scheduleCollectionRender, { passive: true });
        window.addEventListener('resize', scheduleCollectionRender, { passive: true });

        if (typeof reducedMotionQuery.addEventListener === 'function') {
            reducedMotionQuery.addEventListener('change', scheduleCollectionRender);
        } else {
            reducedMotionQuery.addListener(scheduleCollectionRender);
        }

        scheduleCollectionRender();
    }

    // 7. Primary CTA Hover Effects (Anime.js)
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
        btn.addEventListener('mouseleave', () => {
            if (typeof anime !== 'undefined') {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    });

});
