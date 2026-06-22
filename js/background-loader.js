document.addEventListener("DOMContentLoaded", async () => {

    const heroCenter =
    document.getElementById("heroCenter");

    try {

        const response =
        await fetch("/api/background");

        const images =
        await response.json();

        heroCenter.innerHTML = "";

        images.forEach((url, index) => {

            const img =
            document.createElement("img");

            img.src = url;
            img.className =
            index === 0
            ? "hero-bg active"
            : "hero-bg";

            img.alt =
            "Zarabesso Studio";

            heroCenter.appendChild(img);

        });

        startSlider();

    } catch(err){

        console.error(
          "Erreur chargement Cloudinary",
          err
        );

    }

});

function startSlider(){

    const slides =
    document.querySelectorAll(".hero-bg");

    if(slides.length === 0) return;

    let current = 0;

    setInterval(() => {

        slides[current]
        .classList.remove("active");

        current++;

        if(current >= slides.length){
            current = 0;
        }

        slides[current]
        .classList.add("active");

    }, 5000);

}