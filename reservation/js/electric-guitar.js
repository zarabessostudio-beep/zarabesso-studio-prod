/* =========================================================
ZARABESSO STUDIO
ULTRA PREMIUM ISOLATED GUITAR
SOFT CINEMATIC PARTICLES
NO TEXTURE CONFLICT VERSION
FINAL STABLE RELEASE
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
        2.6
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
    SOFT GOLD LIGHT
    ========================================================= */

    const goldLight =
    new THREE.PointLight(

        0xffd700,
        1.2,
        28

    );

    goldLight.position.set(
        0,
        2,
        5
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

                scale:3.1,

                x:-0.10,

                /* DESCENDU */

                y:-0.2

            };

        }

        /* TABLET */

        if(window.innerWidth <= 1200){

            return{

                scale:3.9,

                x:0.35,

                y:0.5

            };

        }

        /* DESKTOP */

        return{

            scale:4.0,

            x:0.6,

            /* PLUS BAS POUR LA MANCHE */

            y:1

        };

    }

    let settings =
    getSettings();

    /* =========================================================
    PREMIUM PARTICLES
    SOFT GRAY / BROWN
    DOES NOT IMPACT GLB
    ========================================================= */

    const particlesCount = 60;

    const particlesGeometry =
    new THREE.BufferGeometry();

    const particlesPositions =
    new Float32Array(
        particlesCount * 3
    );

    for(let i = 0; i < particlesCount * 3; i++){

        particlesPositions[i] =

        (Math.random() - 0.5)
        * 16;

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

        /* GRIS MARRON CINEMATIC */

        color:0x8b7355,

        /* PLUS GROS */

        size:0.045,

        transparent:true,

        /* PLUS DISCRET */

        opacity:0.22,

        depthWrite:false,

        depthTest:true

    });

    const particles =
    new THREE.Points(

        particlesGeometry,
        particlesMaterial

    );

    /* =========================================================
    PARTICLES VERY FAR
    PREVENTS COLOR POLLUTION
    ========================================================= */

    particles.position.z =

    -8;

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
                    KEEP NATURAL GLB TEXTURE
                    ========================================================= */

                    if(child.material){

                        child.material.transparent =
                        false;

                        child.material.depthWrite =
                        true;

                        child.material.toneMapped =
                        true;

                    }

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
            BASE ROTATION
            78°
            FRONT FACE
            ========================================================= */

            electricGuitar.rotation.set(

                0.05,

                3.14,

                -1.36

            );

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
            FLOAT
            ========================================================= */

            electricGuitar.position.y =

            settings.y +

            Math.sin(elapsed * 1.2)
            * 0.04;

            /* =========================================================
            FULL 360°
            ========================================================= */

            electricGuitar.rotation.y =

            3.14 +

            elapsed * 0.25;

            /* =========================================================
            KEEP VERTICAL POSITION
            ========================================================= */

            electricGuitar.rotation.z =

            -1.36 +

            Math.sin(elapsed * 0.4)
            * 0.008;

            /* =========================================================
            MICRO DEPTH
            ========================================================= */

            electricGuitar.rotation.x =

            0.05 +

            Math.sin(elapsed * 0.6)
            * 0.006;

        }

        /* =========================================================
        PARTICLES SLOW MOVEMENT
        ========================================================= */

        particlesGroup.rotation.y +=
        0.00025;

        particlesGroup.rotation.x =

        Math.sin(elapsed * 0.15)
        * 0.02;

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