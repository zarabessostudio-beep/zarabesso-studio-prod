/* =========================================================
ZARABESSO STUDIO
ULTIMATE VERTICAL GUITAR
PREMIUM GOLD PARTICLES
FINAL STABLE VERSION
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

    electricRenderer.setSize(
        electricCanvas.parentElement.offsetWidth,
        electricCanvas.parentElement.offsetHeight,
        false
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
        1.6,
        40

    );

    goldLight.position.set(
        0,
        3,
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

                x:0.2,

                y:1

            };

        }

        /* TABLET */

        if(window.innerWidth <= 1200){

            return{

                scale:4.8,

                x:1.1,

                y:1.7

            };

        }

        /* DESKTOP */

        return{

            scale:5.5,

            x:1.8,

            y:2.4

        };

    }

    let settings =
    getSettings();

    /* =========================================================
    GOLD PARTICLES
    ========================================================= */

    const particlesCount = 160;

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

        size:0.035,

        transparent:true,

        opacity:0.75,

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
            TRUE 90° VERTICAL POSITION
            FRONT FACE VISIBLE
            ========================================================= */

            electricGuitar.rotation.set(

                0,

                3.14,

                -1.57

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
            * 0.06;

            /* =========================================================
            FRONT SHOWROOM ROTATION
            ========================================================= */

            electricGuitar.rotation.y =

            3.14 +

            Math.sin(elapsed * 0.45)
            * 0.03;

            /* =========================================================
            KEEP 90° VERTICAL
            ========================================================= */

            electricGuitar.rotation.z =

            -1.57 +

            Math.sin(elapsed * 0.4)
            * 0.01;

            /* =========================================================
            SMALL DEPTH
            ========================================================= */

            electricGuitar.rotation.x =

            Math.sin(elapsed * 0.6)
            * 0.01;

        }

        /* =========================================================
        GOLD PARTICLES ANIMATION
        ========================================================= */

        particles.rotation.y +=
        0.0008;

        particles.rotation.x =

        Math.sin(elapsed * 0.2)
        * 0.08;

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