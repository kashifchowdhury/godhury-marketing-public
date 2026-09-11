// js/three-bg.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Basic Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

    // Create Particles
    let isMobile = window.innerWidth < 768;
    let particlesCount = isMobile ? 300 : 800; // Optimize for mobile
    
    let particlesGeometry = new THREE.BufferGeometry();
    let posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        // Spread particles over a large volume
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Subtle, elegant material (white/champagne tint with low opacity)
    const material = new THREE.PointsMaterial({
        size: 0.025,
        color: 0xe0f2fe, 
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    let particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    
    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Dynamically recreate geometry if crossing mobile threshold
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
            isMobile = newIsMobile;
            particlesCount = isMobile ? 300 : 800;
            
            scene.remove(particlesMesh);
            particlesGeometry.dispose();
            
            particlesGeometry = new THREE.BufferGeometry();
            posArray = new Float32Array(particlesCount * 3);
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 15;
            }
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);
        }
    });

    // Performance Optimization: IntersectionObserver
    let isVisible = true;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0 });
        
        observer.observe(heroSection);
    }

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        
        if (!isVisible) return; // Skip rendering if hero is not visible

        const elapsedTime = clock.getElapsedTime();

        // Slow automatic rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Subtle mouse parallax
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        renderer.render(scene, camera);
    }

    animate();
});
