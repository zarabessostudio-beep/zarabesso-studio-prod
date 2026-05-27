/* =========================================================
ZARABESSO STUDIO
VERTICAL ELECTRIC GUITAR
PREMIUM FINAL VERSION
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
    LIGHT
    ========================================================= */

    const ambient =
    new THREE.AmbientLight(
        0xffffff,
        2.6
    );

    electricScene.add(ambient);

    const frontLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

    frontLight.position.set(
        0,
        5,
        10
    );

    electricScene.add(frontLight);

    /* =========================================================
    RESPONSIVE SETTINGS
    ========================================================= */

    function getSettings(){

        if(window.innerWidth <= 768){

            return{

                scale:4.2,

                x:0.4,

                y:-0.4

            };

        }

        if(window.innerWidth <= 1200){

            return{

                scale:5.2,

                x:1.4,

                y:0.1

            };

        }

        return{

            scale:6,

            x:2.2,

            y:0.8

        };

    }

    let settings =
    getSettings();

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

        (gltf) => {

            electricGuitar =
            gltf.scene;

            electricGuitar.traverse((child)=>{

                if(child.isMesh){

                    child.frustumCulled = false;

                }

            });

            /* SCALE */

            electricGuitar.scale.set(
                settings.scale,
                settings.scale,
                settings.scale
            );

            /* POSITION */

            electricGuitar.position.set(
                settings.x,
                settings.y,
                0
            );

            /* =========================================================
            PREMIUM 75° VERTICAL POSITION
            ========================================================= */

            electricGuitar.rotation.x =
            1.32;

            electricGuitar.rotation.y =
            0.18;

            electricGuitar.rotation.z =
            -0.12;

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

            /* FLOAT */

            electricGuitar.position.y =

            settings.y +

            Math.sin(elapsed * 1.2)
            * 0.08;

            /* ROTATION */

            electricGuitar.rotation.y =

            0.18 +

            Math.sin(elapsed * 0.6)
            * 0.06;

            /* PREMIUM TILT */

            electricGuitar.rotation.z =

            -0.12 +

            Math.sin(elapsed * 0.8)
            * 0.015;

        }

        electricRenderer.render(
            electricScene,
            electricCamera
        );

    }

    animate();

});