/* =========================================================
ZARABESSO STUDIO
VERTICAL ELECTRIC GUITAR
PREMIUM FINAL VERSION
FRONT FACE FIXED
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

    electricScene.add(
        ambient
    );

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

    electricScene.add(
        frontLight
    );

    /* =========================================================
    RESPONSIVE SETTINGS
    ========================================================= */

    function getSettings(){

        if(window.innerWidth <= 768){

            return{

                scale:4.0,
                x:0.3,
                y:0.8

            };

        }

        if(window.innerWidth <= 1200){

            return{

                scale:5.0,
                x:1.2,
                y:1.4

            };

        }

        return{

            scale:5.7,
            x:1.8,
            y:2

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
            INITIAL FRONT FACE POSITION
            ========================================================= */

            electricGuitar.rotation.set(
                0.08,
                0,
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

            Math.sin(elapsed * 1.1)
            * 0.06;

            /* =========================================================
            KEEP FRONT FACE
            ========================================================= */

            electricGuitar.rotation.y =

            Math.sin(elapsed * 0.4)
            * 0.04;

            /* =========================================================
            VERTICAL POSITION
            ========================================================= */

            electricGuitar.rotation.z =

            -1.57 +

            Math.sin(elapsed * 0.45)
            * 0.012;

            /* =========================================================
            SMALL DEPTH
            ========================================================= */

            electricGuitar.rotation.x =

            0.08 +

            Math.sin(elapsed * 0.6)
            * 0.008;

        }

        electricRenderer.render(
            electricScene,
            electricCamera
        );

    }

    animate();

});