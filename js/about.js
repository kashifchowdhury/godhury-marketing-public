document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tiltEligible = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)');
    const revealItems = Array.from(document.querySelectorAll('.about-reveal'));
    const tiltItems = Array.from(document.querySelectorAll('[data-about-tilt]'));

    function initializeReveals() {
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            revealItems.forEach(item => item.classList.add('is-revealed'));
            return;
        }

        document.body.classList.add('about-motion-ready');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -48px 0px'
        });

        requestAnimationFrame(() => revealItems.forEach(item => observer.observe(item)));
    }

    function resetTilt(item) {
        item.style.setProperty('--tilt-x', '0deg');
        item.style.setProperty('--tilt-y', '0deg');
        item.style.setProperty('--tilt-scale', '1');
        item.style.setProperty('--tilt-lift', '0px');
        item.style.setProperty('--tilt-shadow-x', '0px');
        item.style.setProperty('--tilt-shadow-y', '18px');

        const innerLayer = item.querySelector('[data-tilt-depth]');
        if (innerLayer) {
            innerLayer.style.setProperty('--inner-x', '0px');
            innerLayer.style.setProperty('--inner-y', '0px');
        }
    }

    function initializeTilt() {
        tiltItems.forEach(item => {
            let frame = 0;
            let pointerX = 0;
            let pointerY = 0;

            function renderTilt() {
                frame = 0;
                if (!tiltEligible.matches || reducedMotion.matches) {
                    resetTilt(item);
                    return;
                }

                const rect = item.getBoundingClientRect();
                const normalizedX = Math.max(-0.5, Math.min(0.5, (pointerX - rect.left) / rect.width - 0.5));
                const normalizedY = Math.max(-0.5, Math.min(0.5, (pointerY - rect.top) / rect.height - 0.5));

                item.style.setProperty('--tilt-x', `${(-normalizedY * 8).toFixed(2)}deg`);
                item.style.setProperty('--tilt-y', `${(normalizedX * 8).toFixed(2)}deg`);
                item.style.setProperty('--tilt-scale', '1.015');
                item.style.setProperty('--tilt-lift', '-4px');
                item.style.setProperty('--tilt-shadow-x', `${(normalizedX * 12).toFixed(2)}px`);
                item.style.setProperty('--tilt-shadow-y', `${(18 + normalizedY * 8).toFixed(2)}px`);

                const innerLayer = item.querySelector('[data-tilt-depth]');
                if (innerLayer) {
                    innerLayer.style.setProperty('--inner-x', `${(-normalizedX * 8).toFixed(2)}px`);
                    innerLayer.style.setProperty('--inner-y', `${(-normalizedY * 8).toFixed(2)}px`);
                }
            }

            item.addEventListener('pointermove', event => {
                if (!tiltEligible.matches || reducedMotion.matches) return;
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (!frame) frame = requestAnimationFrame(renderTilt);
            }, { passive: true });

            item.addEventListener('pointerleave', () => {
                if (frame) cancelAnimationFrame(frame);
                frame = 0;
                resetTilt(item);
            });
        });
    }

    function initializeJourney() {
        const journey = document.getElementById('aboutProcessJourney');
        if (!journey) return;

        const stages = Array.from(journey.querySelectorAll('[data-process-stage]'));

        function activateStage(index, moveFocus = false) {
            const safeIndex = Math.max(0, Math.min(index, stages.length - 1));
            const horizontalProgress = (safeIndex / (stages.length - 1)) * 83.333;
            const verticalProgress = (safeIndex / (stages.length - 1)) * 100;

            stages.forEach((stage, stageIndex) => {
                const isActive = stageIndex === safeIndex;
                stage.classList.toggle('is-active', isActive);
                stage.setAttribute('aria-pressed', String(isActive));
            });

            journey.style.setProperty('--journey-progress', `${horizontalProgress}%`);
            journey.style.setProperty('--journey-progress-mobile', `${verticalProgress}%`);

            if (moveFocus) stages[safeIndex].focus();
        }

        stages.forEach((stage, index) => {
            stage.addEventListener('pointerenter', () => activateStage(index));
            stage.addEventListener('focus', () => activateStage(index));
            stage.addEventListener('click', () => activateStage(index));
            stage.addEventListener('keydown', event => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    activateStage((index + 1) % stages.length, true);
                }

                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    activateStage((index - 1 + stages.length) % stages.length, true);
                }

                if (event.key === 'Home') {
                    event.preventDefault();
                    activateStage(0, true);
                }

                if (event.key === 'End') {
                    event.preventDefault();
                    activateStage(stages.length - 1, true);
                }
            });
        });

        activateStage(0);
    }

    function resetMotion() {
        if (!reducedMotion.matches) return;
        document.body.classList.remove('about-motion-ready');
        revealItems.forEach(item => item.classList.add('is-revealed'));
        tiltItems.forEach(resetTilt);
    }

    initializeReveals();
    initializeTilt();
    initializeJourney();

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', resetMotion);
    }
});
