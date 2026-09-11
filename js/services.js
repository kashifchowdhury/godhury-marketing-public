(function () {
    "use strict";

    const groups = window.GODHURY_SERVICE_GROUPS || [];
    const icons = {
        creative: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18h1.4a2 2 0 0 0 0-4H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0 7-7 4 4 0 0 0-4-4h-5Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10" cy="6.5" r="1"/><circle cx="15" cy="6.5" r="1"/></svg>',
        outdoor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H4zM8 15v5m8-5v5M2 20h20M8 9h8"/></svg>',
        digital: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
        technical: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 7h.01M7 17h.01M11 7h7M11 17h7"/></svg>',
        activation: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M8 3v4M16 3v4M3 10h18M8 14h3M8 17h7"/></svg>'
    };

    function iconMarkup(name) { return icons[name] || icons.creative; }

    function translationKey(groupIndex, suffix, serviceIndex) {
        const servicePart = Number.isInteger(serviceIndex) ? `_service_${serviceIndex + 1}` : "";
        return `services_group_${groupIndex + 1}${servicePart}_${suffix}`;
    }

    function renderHomepageCards(container) {
        container.innerHTML = groups.map((group, index) => {
            const examples = group.services.slice(0, 4).map(service => `<li>${service.title}</li>`).join("");
            return `<article class="service-category-card">
                <div class="service-category-card__topline"><span class="service-category-icon">${iconMarkup(group.icon)}</span><span class="service-category-index">0${index + 1}</span></div>
                <h3>${group.title}</h3><p>${group.summary}</p>
                <ul class="service-category-examples" aria-label="Example capabilities">${examples}</ul>
                <a href="services.html#${group.id}" class="service-category-link">Explore Services <span aria-hidden="true">&rarr;</span></a>
            </article>`;
        }).join("");
    }

    function renderServicesPage(container) {
        container.innerHTML = groups.map((group, groupIndex) => {
            const serviceCards = group.services.map((service, serviceIndex) => `<article class="service-item-card">
                <span class="service-item-card__index" aria-hidden="true">${String(serviceIndex + 1).padStart(2, "0")}</span>
                <div class="service-item-card__content"><h3 data-i18n="${translationKey(groupIndex, "title", serviceIndex)}">${service.title}</h3><p data-i18n="${translationKey(groupIndex, "description", serviceIndex)}">${service.description}</p></div>
                <span class="service-item-card__rule" aria-hidden="true"></span>
            </article>`).join("");
            const surfaceClass = ["tone-one", "tone-two", "tone-three", "tone-four", "tone-five"][groupIndex];
            const tiltAttribute = [0, 3].includes(groupIndex) ? " data-services-tilt" : "";
            return `<details class="service-group service-group--${surfaceClass} services-reveal" id="${group.id}" data-reveal-delay="${groupIndex % 3}"${tiltAttribute} ${groupIndex === 0 ? "open" : ""}>
                <summary class="service-group__summary">
                    <span class="service-group__number" aria-hidden="true">0${groupIndex + 1}</span>
                    <span class="service-group__heading"><span class="service-group__title" data-i18n="${translationKey(groupIndex, "title")}">${group.title}</span><span class="service-group__description" data-i18n="${translationKey(groupIndex, "summary")}">${group.summary}</span></span>
                    <span class="service-group__controls" aria-hidden="true"><span class="service-group__count" data-i18n="${translationKey(groupIndex, "count")}">${group.services.length} ${group.services.length === 1 ? "service" : "services"}</span><span class="service-group__toggle"></span></span>
                </summary>
                <div class="service-group__body"><div class="service-items-grid">${serviceCards}</div></div>
            </details>`;
        }).join("");
        const activeGroup = window.location.hash ? container.querySelector(window.location.hash) : null;
        if (activeGroup && activeGroup.tagName === "DETAILS") activeGroup.open = true;
        initializeServicesPageMotion(container);
    }

    function initializeServicesPageMotion(container) {
        const revealItems = Array.from(document.querySelectorAll(".services-reveal"));
        const tiltItems = Array.from(container.querySelectorAll("[data-services-tilt]"));
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const tiltEligible = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");

        if (reducedMotion.matches || !("IntersectionObserver" in window)) {
            revealItems.forEach(item => item.classList.add("is-visible"));
        } else {
            document.body.classList.add("services-page-motion-ready");
            const observer = new IntersectionObserver((entries, revealObserver) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -48px 0px" });

            requestAnimationFrame(() => revealItems.forEach(item => observer.observe(item)));
        }

        function resetTilt(item) {
            item.style.setProperty("--tilt-x", "0deg");
            item.style.setProperty("--tilt-y", "0deg");
            item.style.setProperty("--tilt-scale", "1");
            item.style.setProperty("--tilt-lift", "0px");
            item.style.setProperty("--tilt-shadow-x", "0px");
            item.style.setProperty("--tilt-shadow-y", "12px");
        }

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

                item.style.setProperty("--tilt-x", `${(-normalizedY * 3).toFixed(2)}deg`);
                item.style.setProperty("--tilt-y", `${(normalizedX * 3).toFixed(2)}deg`);
                item.style.setProperty("--tilt-scale", "1.004");
                item.style.setProperty("--tilt-lift", "-1px");
                item.style.setProperty("--tilt-shadow-x", `${(normalizedX * 5).toFixed(2)}px`);
                item.style.setProperty("--tilt-shadow-y", `${(12 + normalizedY * 3).toFixed(2)}px`);
            }

            item.addEventListener("pointermove", event => {
                if (!tiltEligible.matches || reducedMotion.matches) return;
                pointerX = event.clientX;
                pointerY = event.clientY;
                if (!frame) frame = requestAnimationFrame(renderTilt);
            }, { passive: true });

            item.addEventListener("pointerleave", () => {
                if (frame) cancelAnimationFrame(frame);
                frame = 0;
                resetTilt(item);
            });
        });

        function resetMotion() {
            if (!reducedMotion.matches) return;
            document.body.classList.remove("services-page-motion-ready");
            revealItems.forEach(item => item.classList.add("is-visible"));
            tiltItems.forEach(resetTilt);
        }

        if (typeof reducedMotion.addEventListener === "function") {
            reducedMotion.addEventListener("change", resetMotion);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const homepageContainer = document.getElementById("serviceCategoryCards");
        const servicesContainer = document.getElementById("serviceGroups");
        if (homepageContainer) renderHomepageCards(homepageContainer);
        if (servicesContainer) renderServicesPage(servicesContainer);
    });
})();
