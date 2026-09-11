// js/billboard-animation.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('billboard-canvas');
    if (!canvas || typeof THREE === 'undefined' || typeof gsap === 'undefined') return;

    // 0. Lenis is now initialized globally in main.js

    // 1. Basic Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Initial Camera Position (Far away, slightly angled)
    camera.position.set(0, 0, 15);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0); // Boosted AmbientLight
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0); // Stronger DirectionalLight
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0x90b0d0, 1.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Proxy object for animating glowing color via GSAP
    const glowProxy = { r: 0, g: 0, b: 0, intensity: 0 };
    let screenMaterials = [];

    // 3. Load GLTF Model with LoadingManager
    const manager = new THREE.LoadingManager();
    const progressEl = document.getElementById('load-progress');
    const loaderEl = document.getElementById('loader');
    let loaderComplete = false;

    function updateLoaderProgress(percent) {
        if (progressEl) {
            progressEl.innerText = percent + '%';
        }
        if (loaderEl) {
            loaderEl.style.setProperty('--loader-progress', percent + '%');
        }
    }

    function completeLoader() {
        if (!loaderEl || loaderComplete) return;
        loaderComplete = true;
        updateLoaderProgress(100);
        loaderEl.classList.add('is-complete');
        loaderEl.style.opacity = '0';
        setTimeout(() => {
            loaderEl.style.display = 'none';
        }, 650);
    }

    const loaderFallback = setTimeout(completeLoader, 8000);

    manager.onProgress = function (item, loaded, total) {
        const percent = total ? Math.round((loaded / total) * 100) : 0;
        updateLoaderProgress(percent);
    };

    manager.onLoad = function () {
        clearTimeout(loaderFallback);
        completeLoader();
    };


    const textureLoader = new THREE.TextureLoader(manager);
    const logoTexture = textureLoader.load("assets/images/billboard-logo.png");
    logoTexture.flipY = false; // Typical for GLTF meshes
    logoTexture.wrapS = THREE.ClampToEdgeWrapping;
    logoTexture.wrapT = THREE.ClampToEdgeWrapping;
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.center.set(0.5, 0.5);
    logoTexture.repeat.set(1, 1);
    logoTexture.offset.set(0, 0);

    const loader = new THREE.GLTFLoader(manager);

    let billboardModel = null;

    loader.load('assets/models/billboard.glb', (gltf) => {
        billboardModel = gltf.scene;
        
        // Auto-scale to normalize size        // Auto-scale to normalize size
        const boundingBox = new THREE.Box3().setFromObject(billboardModel);
        const size = boundingBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 8.0; // Fit gracefully in the camera's FOV
        const scaleFactor = targetScale / maxDim;
        billboardModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        // Center the model
        const scaledBox = new THREE.Box3().setFromObject(billboardModel);
        const center = scaledBox.getCenter(new THREE.Vector3());
        billboardModel.position.x += (billboardModel.position.x - center.x);
        billboardModel.position.y += (billboardModel.position.y - center.y) - 1; // Slightly lower
        billboardModel.position.z += (billboardModel.position.z - center.z);
        
        // Initial Rotation
        billboardModel.rotation.y = -Math.PI / 6; 

        // Traverse to remove branding & find screen materials
        billboardModel.traverse((child) => {
            if (child.isMesh) {
                console.log(`[Billboard Debug] Mesh found - Name: ${child.name}, Type: ${child.type}, Material: ${child.material ? child.material.name : 'none'}`);
                
                // Remove JTG branding
                if (child.name.toLowerCase().includes('jtg')) {
                    child.visible = false;
                }
                // Collect materials to apply the glow effect
                if (child.material) {
                    if (child.name === 'Object_3') {
                        console.log(`[Billboard Debug] Applying logo texture to mesh: ${child.name}`);
                        
                        // Clone material so we don't affect shared materials
                        child.material = child.material.clone();
                        child.material.map = logoTexture;
                        child.material.emissiveMap = logoTexture;
                        child.material.color.setHex(0xffffff);
                        child.material.emissive.setHex(0xffffff);
                        child.material.emissiveIntensity = 2.0;
                        child.material.needsUpdate = true;
                        
                        screenMaterials.push(child.material);
                    }
                }
            }
        });

        scene.add(billboardModel);

        // Setup GSAP ScrollTrigger once model is loaded
        setupGSAPAnimation();
    }, undefined, (error) => {
        console.error('Error loading billboard model:', error);
        clearTimeout(loaderFallback);
        completeLoader();
    });

    // 4. GSAP ScrollTrigger Setup
    gsap.registerPlugin(ScrollTrigger);

    function setupGSAPAnimation() {
        if (!billboardModel) return;

        // A. Main Billboard scroll timeline (Movement & Glow)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#evolution-section',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        });

        // Translate model to bottom right
        tl.to(billboardModel.position, {
            x: 5,
            y: -3,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Rotate model to angle towards the text on the left
        tl.to(billboardModel.rotation, {
            y: Math.PI / 6,
            x: 0.1,
            duration: 1,
            ease: "power1.inOut"
        }, 0);

        // Ignite glowing cyan screen material
        tl.to(glowProxy, {
            
            r: 1, // White
            g: 1, // White
            b: 1, // White

            intensity: 3.5, // Aggressively amplified glow
            duration: 0.6,
            ease: "power2.in",
            onUpdate: () => {
                screenMaterials.forEach(mat => {
                    if (mat.emissive) {
                        mat.emissive.setRGB(glowProxy.r, glowProxy.g, glowProxy.b);
                        mat.emissiveIntensity = glowProxy.intensity;
                    } else if (mat.color) {
                        mat.color.setRGB(
                            Math.min(1, mat.color.r + glowProxy.r * 0.05),
                            Math.min(1, mat.color.g + glowProxy.g * 0.05),
                            Math.min(1, mat.color.b + glowProxy.b * 0.05)
                        );
                    }
                });
            }
        }, 0.2);

        // B. Staggered Text Block Reveals
        gsap.utils.toArray('.narrative-block').forEach((block) => {
            gsap.fromTo(block, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 80%',
                        end: 'top 40%',
                        scrub: 1
                    }
                }
            );
        });
    }

    // 5. Responsive Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 6. Performance Optimization: IntersectionObserver
    let isVisible = false;
    const evolutionSection = document.getElementById('evolution-section');
    
    if (evolutionSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0 });
        
        observer.observe(evolutionSection);
    }

    // 7. Render Loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Only render when section is visible in the viewport
        if (!isVisible) return;

        renderer.render(scene, camera);
    }

    animate();
});
