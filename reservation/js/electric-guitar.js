/* =========================================================
ZARABESSO STUDIO
ELECTRIC GUITAR
FINAL CLEAN VERSION
NO SYNTAX ERRORS
========================================================= */

window.addEventListener("load", () => {

    /* =========================================================
    CANVAS
    ========================================================= */

    const electricCanvas =
    document.getElementById(
        "webgl-electric"
    );

    if (!electricCanvas) {

        console.error(
            "Canvas introuvable"
        );

        return;
    }

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

        canvas: electricCanvas,

        alpha: true,

        antialias: true,

        powerPreference: "default"

    });

    electricRenderer.setClearColor(
        0x000000,
        0
    );

    electricRenderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
    );

    electricRenderer.outputEncoding =
    THREE.sRGBEncoding;

    /* =========================================================
    RENDER SIZE
    ========================================================= */

    function rendererSize() {

        const width =
        electricCanvas.parentElement.offsetWidth;

        const height =
        electricCanvas.parentElement.offsetHeight;

        if (width < 10 || height < 10) {
            return;
        }

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
        3
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
        5,
        10
    );

    electricScene.add(
        frontLight
    );

    const goldLight =
    new THREE.PointLight(
        0xffd27a,
        2,
        25
    );

    goldLight.position.set(
        3,
        2,
        6
    );

    electricScene.add(
        goldLight
    );

    /* =========================================================
    RESPONSIVE SETTINGS
    ========================================================= */

    function getSettings() {

        if (window.innerWidth <= 480) {

            return {

                scale: 4.1,
                x: 1,
                y: 2.2

            };
        }

        if (window.innerWidth <= 768) {

            return {

                scale: 4.6,
                x: 1.2,
                y: 2.4

            };
        }

        if (window.innerWidth <= 1200) {

            return {

                scale: 5.2,
                x: 1.6,
                y: 2.7

            };
        }

        return {

            scale: 5.5,
            x: 1.9,
            y: 3

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

            /* =========================================================
            OPTIMIZATION
            ========================================================= */

            electricGuitar.traverse(

                (child) => {

                    if (child.isMesh) {

                        child.castShadow = false;

                        child.receiveShadow = false;

                        child.frustumCulled = false;
                    }
                }
            );

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
            VERTICAL ROTATION
            ========================================================= */

            electricGuitar.rotation.set(
                0,
                -1.55,
                0.12
            );

            /* =========================================================
            ADD
            ========================================================= */

            electricScene.add(
                electricGuitar
            );

            console.log(
                "Vertical guitar loaded"
            );

            resizeElectric();
        },

        undefined,

        (error) => {

            console.error(
                "GLB ERROR :",
                error
            );
        }
    );

    /* =========================================================
    RESIZE
    ========================================================= */

    function resizeElectric() {

        rendererSize();

        settings =
        getSettings();

        if (electricGuitar) {

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

    /* =========================================================
    EVENTS
    ========================================================= */

    window.addEventListener(
        "resize",
        resizeElectric
    );

    setTimeout(
        resizeElectric,
        300
    );

    setTimeout(
        resizeElectric,
        1000
    );

    /* =========================================================
    CLOCK
    ========================================================= */

    const clock =
    new THREE.Clock();

    /* =========================================================
    ANIMATION
    ========================================================= */

    function animate() {

        requestAnimationFrame(
            animate
        );

        const elapsed =
        clock.getElapsedTime();

        if (electricGuitar) {

            /* FLOAT */

            electricGuitar.position.y =

            settings.y +

            Math.sin(elapsed * 1.1)
            * 0.05;

            /* ROTATION */

            electricGuitar.rotation.y =

            -1.55 +

            Math.sin(elapsed * 0.5)
            * 0.06;

            /* PREMIUM TILT */

            electricGuitar.rotation.z =

            0.12 +

            Math.sin(elapsed * 0.8)
            * 0.01;
        }

        /* RENDER */

        electricRenderer.render(
            electricScene,
            electricCamera
        );
    }

    animate();

});