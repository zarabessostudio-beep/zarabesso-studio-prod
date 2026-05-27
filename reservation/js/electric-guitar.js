/* =========================================================
ZARABESSO STUDIO
TRUE VERTICAL ELECTRIC GUITAR
PARALLEL TO H1
GOLD PARTICLES VERSION
========================================================= */

window.addEventListener("load", () => {

    const electricCanvas =
    document.getElementById(
        "webgl-electric"
    );

    if (!electricCanvas) return;

    /* =========================================================
    SCENE
    ========================================================= */

    const electricScene =
    new THREE.Scene();

    /* =========================================================
    CAMERA
    ========================================================= */

    const electricCamera =
    new THREE.PerspectiveCamera(
        22,
        1,
        0.1,
        1000
    );

    electricCamera.position.z = 14;

    /* =========================================================
    RENDERER
    ========================================================= */

    const electricRenderer =
    new THREE.WebGLRenderer({

        canvas:electricCanvas,

        alpha:true,

        antialias:true,

        powerPreference:"high-performance"

    });

    electricRenderer.setPixelRatio(
        Math.min(window.devicePixelRatio,1.5)
    );

    electricRenderer.setClearColor(
        0x000000,
        0
    );

    electricRenderer.outputEncoding =
    THREE.sRGBEncoding;

    /* =========================================================
    RESIZE
    ========================================================= */

    function rendererSize(){

        const width =
        electricCanvas.parentElement.offsetWidth;

        const height =
        electricCanvas.parentElement.offsetHeight;

        electricRenderer.setSize(
            width,
            height,
            false
        );

        electricCamera.aspect =
        width / height;

        electricCamera.updateProjectionMatrix();

    }

    rendererSize();

    /* =========================================================
    LIGHTS
    ========================================================= */

    const ambient =
    new THREE.AmbientLight(
        0xffffff,
        2.8
    );

    electricScene.add(
        ambient
    );

    const frontLight =
    new THREE.DirectionalLight(
        0xffffff,
        2.2
    );

    frontLight.position.set(
        0,
        6,
        10
    );

    electricScene.add(
        frontLight
    );

    /* =========================================================
    GOLD LIGHT
    ========================================================= */

    const goldLight =
    new THREE.PointLight(
        0xffd700,
        1.4,
        30
    );

    goldLight.position.set(
        0,
        2,
        6
    );

    electricScene.add(
        goldLight
    );

    /* =========================================================
    RESPONSIVE SETTINGS
    ========================================================= */

    function getSettings(){

        if(window.innerWidth <= 768){

            return{

                scale:3.9,
                x:0.1,
                y:1.1

            };

        }

        if(window.innerWidth <= 1200){

            return{

                scale:4.8,
                x:1,
                y:1.8

            };

        }

        return{

            scale:5.5,
            x:1.8,
            y:2.5

        };

    }

    let settings =
    getSettings();

    /* =========================================================
    GOLD PARTICLES
    ========================================================= */

    const particlesGeometry =
    new THREE.BufferGeometry();

    const particlesCount = 120;

    const positions =
    new Float32Array(
        particlesCount * 3
    );

    for(let i = 0; i < particlesCount * 3; i++){

        positions[i] =
        (Math.random() - 0.5) * 12;

    }

    particlesGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );

    const particlesMaterial =
    new THREE.PointsMaterial({

        color:0xffd700,

        size:0.035,

        transparent:true,

        opacity:0.7,

        depthWrite:false

    });

    const particles =
    new THREE.Points(

        particlesGeometry,
        particlesMaterial

    );

    electricScene.add(
        particles
    );

    /* =========================================================
    LOADER
    ========================================================= */

    const loader =
    new THREE.GLTFLoader();

    let electricGuitar = null;

    /* =========================================================
    LOAD MODEL
    ========================================================= */

    loader.load(

        "/reservation/assets/models/guitar.glb",

        (gltf)=>{

            electricGuitar =
            gltf.scene;

            electricGuitar.traverse((child)=>{

                if(child.isMesh){

                    child.frustumCulled = false;

                    child.castShadow = false;

                    child.receiveShadow = false;

                }

            });

            /* =========================================================
            SCALE
            ========================================================= */

            electricGuitar.scale.set(
                settings.scale,
                settings.scale,
                settings.scale
            );

            /* =========================================================
            POSITION
            ========================================================= */

            electricGuitar.position.set(
                settings.x,
                settings.y,
                0
            );

            /* =========================================================
            TRUE VERTICAL POSITION
            PARALLEL TO H1
            ========================================================= */

            electricGuitar.rotation.x =
            0.05;

            electricGuitar.rotation.y =
            0;

            electricGuitar.rotation.z =
            1.57;

            electricScene.add(
                electricGuitar
            );

            resizeElectric();

        }

    );

    /* =========================================================
    RESIZE
    ========================================================= */

    function resizeElectric(){

        rendererSize();

        settings =
        getSettings();

        if(electricGuitar){

            electricGuitar.scale.set(
                settings.scale,
                settings.scale,
                settings.scale
            );

            electricGuitar.position.set(
                settings.x,
                settings.y,
                0
            );

        }

    }

    window.addEventListener(
        "resize",
        resizeElectric
    );

    /* =========================================================
    CLOCK
    ========================================================= */

    const clock =
    new THREE.Clock();

    /* =========================================================
    ANIMATION
    ========================================================= */

    function animate(){

        requestAnimationFrame(
            animate
        );

        const elapsed =
        clock.getElapsedTime();

        if(electricGuitar){

            /* =========================================================
            FLOAT
            ========================================================= */

            electricGuitar.position.y =

            settings.y +

            Math.sin(elapsed * 1.2)
            * 0.06;

            /* =========================================================
            KEEP FRONT FACE
            ========================================================= */

            electricGuitar.rotation.y =

            Math.sin(elapsed * 0.5)
            * 0.04;

            /* =========================================================
            TRUE VERTICAL POSITION
            ========================================================= */

            electricGuitar.rotation.z =

            1.57 +

            Math.sin(elapsed * 0.45)
            * 0.01;

            /* =========================================================
            DEPTH
            ========================================================= */

            electricGuitar.rotation.x =

            0.05 +

            Math.sin(elapsed * 0.6)
            * 0.006;

        }

        /* =========================================================
        PARTICLES ANIMATION
        ========================================================= */

        particles.rotation.y += 0.0008;

        particles.rotation.x =
        Math.sin(elapsed * 0.2)
        * 0.08;

        electricRenderer.render(
            electricScene,
            electricCamera
        );

    }

    animate();

});