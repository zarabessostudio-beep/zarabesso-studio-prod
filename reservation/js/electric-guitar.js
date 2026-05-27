/* =========================================================
ZARABESSO STUDIO
ULTIMATE VERTICAL GUITAR
PREMIUM GOLD PARTICLES
FINAL CINEMATIC VERSION
78° ANGLE + FRONT FACE
========================================================= */

window.addEventListener("load", () => {

    /* =========================================================
    CANVAS
    ========================================================= */

    const electricCanvas =
    document.getElementById(
        "webgl-electric"
    );

    if(!electricCanvas) return;

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

    electricCamera.position.set(
        0,
        0,
        14
    );

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

    function resizeElectric(){

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

    resizeElectric();

    window.addEventListener(
        "resize",
        resizeElectric
    );

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
        2.4
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
        1.8,
        40

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

        /* MOBILE */

        if(window.innerWidth <= 768){

            return{

                scale:3.8,

                /* PLUS PROCHE DU TITRE */

                x:-0.1,

                /* PLUS BAS */

                y:0.4

            };

        }

        /* TABLET */

        if(window.innerWidth <= 1200){

            return{

                scale:4.8,

                x:0.5,

                y:1

            };

        }

        /* DESKTOP */

        return{

            scale:5.5,

            /* RAPPROCHÉ DU H1 */

            x:0.8,

            /* DESCENDU */

            y:1.5

        };

    }

    let settings =
    getSettings();

    /* =========================================================
    GOLD PARTICLES
    ========================================================= */

    const particlesCount = 180;

    const particlesGeometry =
    new THREE.BufferGeometry();

    const particlesPositions =
    new Float32Array(
        particlesCount * 3
    );

    for(let i = 0; i < particlesCount * 3; i++){

        particlesPositions[i] =

        (Math.random() - 0.5)

        * 12;

    }

    particlesGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            particlesPositions,
            3
        )

    );

    const particlesMaterial =
    new THREE.PointsMaterial({

        color:0xffd700,

        size:0.03,

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
            BASE POSITION
            78° VERTICAL
            FACE AVANT VISIBLE
            ========================================================= */

            electricGuitar.rotation.set(

                0.08,

                3.14,

                -1.36

            );

            electricScene.add(
                electricGuitar
            );

            resizeElectric();

        },

        undefined,

        (error)=>{

            console.error(
                "GLB ERROR :",
                error
            );

        }

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
            FLOAT EFFECT
            ========================================================= */

            electricGuitar.position.y =

            settings.y +

            Math.sin(elapsed * 1.2)
            * 0.05;

            /* =========================================================
            LÉGÈRE ROTATION 180°
            ELLE TOURNE ET REVIENT
            ========================================================= */

            electricGuitar.rotation.y =

            3.14 +

            Math.sin(elapsed * 0.25)
            * 0.35;

            /* =========================================================
            ANGLE VERTICAL 78°
            ========================================================= */

            electricGuitar.rotation.z =

            -1.36 +

            Math.sin(elapsed * 0.45)
            * 0.012;

            /* =========================================================
            PETITE PROFONDEUR
            ========================================================= */

            electricGuitar.rotation.x =

            0.08 +

            Math.sin(elapsed * 0.6)
            * 0.01;

        }

        /* =========================================================
        PARTICLES ANIMATION
        ========================================================= */

        particles.rotation.y +=
        0.0008;

        particles.rotation.x =

        Math.sin(elapsed * 0.2)
        * 0.05;

        /* =========================================================
        RENDER
        ========================================================= */

        electricRenderer.render(
            electricScene,
            electricCamera
        );

    }

    animate();

});