const projects = [
    // Branding Series (A)
    { id: 1, title: "Corporate Branding & Execution", client: "Godhury Client Project", category: "branding", image: "assets/images/A1.jpg", description: "Custom branding design, identity collateral, and production execution delivered with perfection." },
    { id: 2, title: "Brand Identity Package", client: "Godhury Client Project", category: "branding", image: "assets/images/A2.jpg", description: "Comprehensive corporate brand guidelines, business collateral, and visual assets." },
    { id: 3, title: "Executive Identity Suite", client: "Godhury Client Project", category: "branding", image: "assets/images/A3.jpg", description: "High-end corporate stationery and custom presentation materials." },
    { id: 4, title: "Brand Communication Guidelines", client: "Godhury Client Project", category: "branding", image: "assets/images/A4.jpg", description: "Complete brand asset development and corporate typography standards." },
    { id: 5, title: "Corporate Collateral Suite", client: "Godhury Client Project", category: "branding", image: "assets/images/A6.jpg", description: "Bespoke corporate identity cards, letterheads, and brand gift kits." },
    { id: 6, title: "Visual Rebrand Strategy", client: "Godhury Client Project", category: "branding", image: "assets/images/A11.jpg", description: "Modern brand refresh including logo architecture and corporate color palettes." },
    { id: 7, title: "Executive Presentation Kit", client: "Godhury Client Project", category: "branding", image: "assets/images/A13.jpg", description: "Custom foil-embossed presentation folders and corporate profiles." },
    { id: 8, title: "Brand Marketing Assets", client: "Godhury Client Project", category: "branding", image: "assets/images/A15.jpg", description: "Integrated offline branding materials for multi-channel campaigns." },
    { id: 9, title: "Institutional Identity System", client: "Godhury Client Project", category: "branding", image: "assets/images/A17.jpg", description: "Scalable identity system for corporate headquarters and regional branches." },
    { id: 10, title: "Custom Merchandise & Branding", client: "Godhury Client Project", category: "branding", image: "assets/images/A18.jpg", description: "Premium corporate souvenirs and branded promotional items." },
    { id: 11, title: "Bespoke Packaging Design", client: "Godhury Client Project", category: "branding", image: "assets/images/A19.jpg", description: "Custom structural packaging design and high-grade print finishing." },
    { id: 12, title: "Corporate Asset Suite", client: "Godhury Client Project", category: "branding", image: "assets/images/A22.jpg", description: "Official corporate communication assets and branded stationery." },
    { id: 13, title: "Brand Communication Materials", client: "Godhury Client Project", category: "branding", image: "assets/images/A24.jpg", description: "High-impact promotional print collateral and corporate gifts." },
    { id: 14, title: "Strategic Rebrand Campaign", client: "Godhury Client Project", category: "branding", image: "assets/images/A29.jpg", description: "End-to-end rebrand rollout for major corporate client." },
    { id: 15, title: "Executive Brand Presentation", client: "Godhury Client Project", category: "branding", image: "assets/images/A32.jpg", description: "Custom hardbound brand books and corporate overview portfolios." },

    // Offset & Digital Printing Series (B & F)
    { id: 16, title: "Premium Offset Print Catalogue", client: "Godhury Client Project", category: "print", image: "assets/images/B1.jpg", description: "High-precision 4-color offset printing with spot UV coating." },
    { id: 17, title: "Spot UV Corporate Brochure", client: "Godhury Client Project", category: "print", image: "assets/images/B2.jpg", description: "Multi-page corporate brochure on heavy stock art card with soft-touch lamination." },
    { id: 18, title: "Annual Report Hardcover Print", client: "Godhury Client Project", category: "print", image: "assets/images/B3.jpg", description: "Hardbound corporate annual report with foil stamped title accents." },
    { id: 19, title: "Custom Die-Cut Packaging", client: "Godhury Client Project", category: "print", image: "assets/images/B6.jpg", description: "Bespoke product packaging boxes with custom structural die-cutting." },
    { id: 20, title: "Foil Stamped Corporate Folder", client: "Godhury Client Project", category: "print", image: "assets/images/B8.jpg", description: "Metallic foil stamping on premium textured paper stock." },
    { id: 21, title: "High-Fidelity Product Catalogue", client: "Godhury Client Project", category: "print", image: "assets/images/B9.jpg", description: "Vibrant color reproduction product catalogue for retail client." },
    { id: 22, title: "Luxury Soft-Touch Publication", client: "Godhury Client Project", category: "print", image: "assets/images/B10.jpg", description: "Velvet soft-touch laminated corporate overview brochure." },
    { id: 23, title: "Specialty Matte Print Collateral", client: "Godhury Client Project", category: "print", image: "assets/images/B11.jpg", description: "Matte-finished marketing flyers and corporate profiles." },
    { id: 24, title: "Custom Printed Gift Boxes", client: "Godhury Client Project", category: "print", image: "assets/images/F (2).jpg", description: "Rigid gift box fabrication with metallic foil embellishments." },
    { id: 25, title: "Executive Souvenir Print", client: "Godhury Client Project", category: "print", image: "assets/images/F (3).jpg", description: "Custom commemorative gift packaging for corporate milestones." },
    { id: 26, title: "Corporate Calendar Suite", client: "Godhury Client Project", category: "print", image: "assets/images/F (7).jpg", description: "Custom desk and wall calendar design and mass printing." },
    { id: 27, title: "Specialty Foil Certificates", client: "Godhury Client Project", category: "print", image: "assets/images/F (8).jpg", description: "Security-printed corporate certificates with gold foil crest." },
    { id: 28, title: "Custom Promotional Print", client: "Godhury Client Project", category: "print", image: "assets/images/F (10).jpg", description: "Personalized promotional marketing materials and event collateral." },
    { id: 29, title: "Premium Laminated Brochures", client: "Godhury Client Project", category: "print", image: "assets/images/F (13).jpg", description: "High-gloss laminated corporate sales folders." },
    { id: 30, title: "Corporate Profile Publication", client: "Godhury Client Project", category: "print", image: "assets/images/F (14).jpg", description: "Saddle-stitched corporate profile booklets." },

    // Outdoor Advertising & Signage Series (C & E)
    { id: 31, title: "Large Format City Billboard", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C1.jpg", description: "Large-scale vinyl billboard printing and strategic placement." },
    { id: 32, title: "Highway Unipole Display", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C3.jpg", description: "High-elevation unipole structure with front-lit vinyl printing." },
    { id: 33, title: "Strategic Urban Billboard", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C4.jpg", description: "Prime location billboard banner for corporate campaign." },
    { id: 34, title: "High-Impact Outdoor Banner", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C7.jpg", description: "Weather-resistant outdoor flex banner printing and mounting." },
    { id: 35, title: "Commercial Hub Billboard", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C9.jpg", description: "Massive commercial hub billboard execution." },
    { id: 36, title: "Illuminated Flex Outdoor Signage", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C10.jpg", description: "Back-lit illuminated outdoor sign board." },
    { id: 37, title: "Transit & Bus Shelter Branding", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C12.jpg", description: "Public transport shelter branding and backlit displays." },
    { id: 38, title: "Archway & Gantry Advertising", client: "Godhury Client Project", category: "outdoor", image: "assets/images/C15.jpg", description: "Highway welcome archway banner fabrication and printing." },
    { id: 39, title: "Retail Shopfront Branding", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E1.jpg", description: "Complete retail facade makeover and outdoor branding." },
    { id: 40, title: "3D Acrylic LED Signage", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E2.jpg", description: "Custom 3D raised acrylic channel letters with internal LED lighting." },
    { id: 41, title: "Corporate Facade Lettering", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E3.jpg", description: "Stainless steel and acrylic corporate logo signage." },
    { id: 42, title: "Commercial Showroom Signage", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E7.jpg", description: "Illuminated outdoor sign structure for flagship showroom." },
    { id: 43, title: "Retail Pylon Sign Display", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E8.jpg", description: "Free-standing outdoor pylon sign tower." },
    { id: 44, title: "Neon & LED Architectural Sign", client: "Godhury Client Project", category: "outdoor", image: "assets/images/E9.jpg", description: "Architectural LED lighting and custom neon sign installation." },

    // Events, Activations & Exhibitions Series (D & G)
    { id: 45, title: "Corporate Gala Stage Design", client: "Godhury Client Project", category: "events", image: "assets/images/D1.jpg", description: "Custom 3D stage setup, backdrop printing, and ambient LED lighting." },
    { id: 46, title: "Grand Product Launch Activation", client: "Godhury Client Project", category: "events", image: "assets/images/D2.jpg", description: "Turnkey venue setup for flagship corporate product unveiling." },
    { id: 47, title: "Brand Activation Experience Zone", client: "Godhury Client Project", category: "events", image: "assets/images/D3.jpg", description: "Interactive experiential brand booth and consumer activity zone." },
    { id: 48, title: "Custom Exhibition Pavilion", client: "Godhury Client Project", category: "events", image: "assets/images/D5.jpg", description: "Wooden structure fabrication, graphic prints, and lighting setup." },
    { id: 49, title: "Corporate Conference Backdrop", client: "Godhury Client Project", category: "events", image: "assets/images/D6.jpg", description: "Seamless tension fabric conference backdrop and podium branding." },
    { id: 50, title: "High-Profile Press Meet Setup", client: "Godhury Client Project", category: "events", image: "assets/images/D7.jpg", description: "Press conference backdrop fabrication, sound, and lighting." },
    { id: 51, title: "Trade Show Exhibition Stand", client: "Godhury Client Project", category: "events", image: "assets/images/D8.jpg", description: "Custom trade show booth with illuminated product displays." },
    { id: 52, title: "Ambient Event Lighting & Stage", client: "Godhury Client Project", category: "events", image: "assets/images/D9.jpg", description: "Truss structure setup, intelligent stage lighting, and sound." },
    { id: 53, title: "Corporate Award Ceremony Stage", client: "Godhury Client Project", category: "events", image: "assets/images/D10.jpg", description: "Grand award presentation stage with LED video wall integration." },
    { id: 54, title: "Brand Experience Kiosk", client: "Godhury Client Project", category: "events", image: "assets/images/D11.jpg", description: "Mall activation kiosk with interactive product showcase." },
    { id: 55, title: "Custom Trade Exhibition Pavilion", client: "Godhury Client Project", category: "events", image: "assets/images/G1.jpg", description: "Large-scale international trade fair pavilion fabrication." },
    { id: 56, title: "3D Exhibition Stall Fabrication", client: "Godhury Client Project", category: "events", image: "assets/images/G2.jpg", description: "Bespoke 3D exhibition booth with custom reception and lounge." },
    { id: 57, title: "Modular Expo Display System", client: "Godhury Client Project", category: "events", image: "assets/images/G3.jpg", description: "Reusable modular expo display stands and graphic panels." },
    { id: 58, title: "Premium Tech Expo Booth", client: "Godhury Client Project", category: "events", image: "assets/images/G4.jpg", description: "Futuristic tech pavilion with acrylic illuminated counters." },
    { id: 59, title: "Brand Activation Pavilion", client: "Godhury Client Project", category: "events", image: "assets/images/G5.jpg", description: "Consumer engagement booth with custom gaming and photo zones." },
    { id: 60, title: "Double-Decker Exhibition Stand", client: "Godhury Client Project", category: "events", image: "assets/images/G6.jpg", description: "Two-story exhibition structure with private VIP lounge." }
];

const grid = document.getElementById('portfolioGrid');
const featuredGrid = document.getElementById('featuredProjects');
const filterBtns = document.querySelectorAll('.filter-btn');
const resultCount = document.getElementById('portfolioResultCount');
const modal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const categoryLabels = {
    branding: 'Creative Design',
    print: 'Print & Production',
    outdoor: 'Outdoor & Signage',
    events: 'Events & Activation'
};
const featuredProjectIds = [1, 31, 45];
let lastTrigger = null;

function getProject(id) {
    return projects.find(project => project.id === Number(id));
}

function renderFeaturedProjects() {
    featuredGrid.innerHTML = featuredProjectIds.map((id, index) => {
        const project = getProject(id);
        return `
            <article class="featured-project featured-project--${index + 1}">
                <button class="featured-project__button" type="button" data-project-id="${project.id}" aria-label="View project: ${project.title}">
                    <img src="${project.image}" alt="${project.title}" decoding="async">
                    <span class="featured-project__shade" aria-hidden="true"></span>
                    <span class="featured-project__content">
                        <span class="featured-project__index">0${index + 1}</span>
                        <span class="featured-project__category">${categoryLabels[project.category]}</span>
                        <strong>${project.title}</strong>
                        <span class="featured-project__action">View project <span aria-hidden="true">&#8599;</span></span>
                    </span>
                </button>
            </article>
        `;
    }).join('');
}

// Populate Grid
function renderGrid(filter) {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((project, index) => {
        const variant = index % 11 === 0 ? 'wide' : index % 7 === 3 ? 'tall' : 'standard';
        return `
            <article class="portfolio-item portfolio-item--${variant}" role="listitem" style="view-transition-name: item-${project.id}">
                <button class="portfolio-card" type="button" data-project-id="${project.id}" aria-label="View project: ${project.title}">
                    <span class="portfolio-card__media">
                        <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async">
                    </span>
                    <span class="portfolio-card__body">
                        <span class="portfolio-card__category">${categoryLabels[project.category]}</span>
                        <strong>${project.title}</strong>
                        <span class="portfolio-card__action" aria-hidden="true">View <span>&#8599;</span></span>
                    </span>
                </button>
            </article>
        `;
    }).join('');

    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`;
}

// Initial render
renderFeaturedProjects();
renderGrid('all');

// Filtering with View Transitions (if supported)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(button => {
            const isActive = button === btn;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        const filter = btn.dataset.filter;

        if (document.startViewTransition && !reducedMotion.matches) {
            document.startViewTransition(() => renderGrid(filter));
        } else {
            renderGrid(filter);
        }
    });
});

// Modal logic
function openModal(id, trigger) {
    const project = getProject(id);
    if (project) {
        const modalImg = document.getElementById('modalImg');
        lastTrigger = trigger;
        modalImg.src = project.image;
        modalImg.alt = project.title;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalClient').textContent = 'Client: ' + project.client;
        document.getElementById('modalCategory').textContent = categoryLabels[project.category];
        document.getElementById('modalDesc').textContent = project.description;
        modal.showModal();
    }
}

document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project-id]');
    if (trigger) {
        openModal(trigger.dataset.projectId, trigger);
    }
});

closeModal.addEventListener('click', () => {
    modal.close();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.open) {
        event.preventDefault();
        modal.close();
    }
});

modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});

modal.addEventListener('close', () => {
    if (lastTrigger) {
        lastTrigger.focus({ preventScroll: true });
    }
});
