/* =========================================================
ZARABESSO STUDIO
ULTRA VERTICAL ELECTRIC GUITAR
85° SHOWROOM VERSION
FINAL PREMIUM
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

        /* MOBILE */

        if(window.innerWidth <= 768){

            return{

                /* -5% SIZE */

                scale:4.0,

                /* MORE VERTICAL SPACE */

                x:0.2,

                y:1.2

            };

        }

        /* TABLET */

        if(window.innerWidth <= 1200){

            return{

                scale:4.9,

                x:1.1,

                y:1.5

            };

        }

        /* DESKTOP */

        return{

            scale:5.7,

            x:1.8,

            y:2.2

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
            -5%
            ========================================================= */

            electricGuitar.scale.set(
                settings.scale,
                settings.scale,
                settings.scale
            );

            /* =========================================================
            POSITION
            HIGHER POSITION
            ========================================================= */

            electricGuitar.position.set(
                settings.x,
                settings.y,
                0
            );
/* =========================================================
REAL VERTICAL POSITION
PARALLEL TO H1
========================================================= */

/*
X = profondeur avant/arrière
Y = rotation latérale
Z = verticalité réelle
*/

electricGuitar.rotation.x =
0.15;

electricGuitar.rotation.y =
0.08;

/* 85° VERTICAL */

electricGuitar.rotation.z =
1.48;

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
VERTICAL SHOWROOM FLOAT
========================================================= */

electricGuitar.position.y =

settings.y +

Math.sin(elapsed * 1.15)
* 0.08;

/* =========================================================
REAL VERTICAL SHOWROOM ROTATION
========================================================= */

electricGuitar.rotation.y =

0.08 +

Math.sin(elapsed * 0.55)
* 0.035;

/* =========================================================
85° VERTICAL POSITION
KEEP GUITAR STANDING
========================================================= */

electricGuitar.rotation.z =

1.48 +

Math.sin(elapsed * 0.45)
* 0.012;

/* =========================================================
PREMIUM DEPTH TILT
========================================================= */

electricGuitar.rotation.x =

0.12 +

Math.sin(elapsed * 0.7)
* 0.01;

}

electricRenderer.render(
    electricScene,
    electricCamera
);

}

animate();

});