/* =========================================================
ZARABESSO STUDIO
ULTRA PREMIUM ISOLATED GUITAR
360° SHOWROOM VERSION
GOLD PARTICLES SEPARATED
FINAL CINEMATIC RELEASE
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
    ISOLATED GROUPS
    ========================================================= */

    const guitarGroup =
    new THREE.Group();

    const particlesGroup =
    new THREE.Group();

    electricScene.add(
        guitarGroup
    );

    electricScene.add(
        particlesGroup
    );

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
        1.7,
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

                /* -10% */

                scale:3.1,

                /* PROCHE DU TITRE */

                x:-0.15,

                /* PLUS BAS */

                y:0.3

            };

        }

        /* TABLET */

        if(window.innerWidth <= 1200){

            return{

                scale:3.9,

                x:0.35,

                y:0.9

            };

        }

        /* DESKTOP */

        return{

            scale:4.0,

            x:0.6,

            y:1.4

        };

    }

    let settings =
    getSettings();

    /* =========================================================
    PREMIUM GOLD PARTICLES
    ISOLATED FROM GUITAR
    ========================================================= */

    const particlesCount = 45;

    const particlesGeometry =
    new THREE.BufferGeometry();

    const particlesPositions =
    new Float32Array(
        particlesCount * 3
    );

    for(let i = 0; i < particlesCount * 3; i++){

        particlesPositions[i] =

        (Math.random() - 0.5)
        * 14;

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

        size:0.015,

        transparent:true,

        opacity:0.15,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });

    const particles =
    new THREE.Points(

        particlesGeometry,
        particlesMaterial

    );

    /* =========================================================
    PARTICLES DISTANCE
    ========================================================= */

    particles.position.z =

    -4;

    particlesGroup.add(
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

                    /* =========================================================
                    KEEP NATURAL MATERIAL
                    ========================================================= */

                    if(child.material){

                        child.material.transparent =
                        false;

                    }

                }

            });

            /* =========================================================
            SCALE
            -10%
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
            BASE ROTATION
            78°
            ========================================================= */

            electricGuitar.rotation.set(

                0.06,

                3.14,

                -1.36

            );

            /* =========================================================
            ADD TO ISOLATED GROUP
            ========================================================= */

            guitarGroup.add(
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
            * 0.04;

            /* =========================================================
            FULL 360° SHOWROOM ROTATION
            ========================================================= */

            electricGuitar.rotation.y =

            3.14 +

            elapsed * 0.35;

            /* =========================================================
            KEEP 78° VERTICAL POSITION
            ========================================================= */

            electricGuitar.rotation.z =

            -1.36 +

            Math.sin(elapsed * 0.5)
            * 0.01;

            /* =========================================================
            SMALL DEPTH
            ========================================================= */

            electricGuitar.rotation.x =

            0.06 +

            Math.sin(elapsed * 0.7)
            * 0.008;

        }

        /* =========================================================
        PARTICLES SLOW MOVEMENT
        ========================================================= */

        particlesGroup.rotation.y +=
        0.0005;

        particlesGroup.rotation.x =

        Math.sin(elapsed * 0.15)
        * 0.03;

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