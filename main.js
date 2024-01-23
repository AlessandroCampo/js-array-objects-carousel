const thumbnail_container = document.getElementById("thumbnail-container")
const main_img = document.getElementById("main_img")
const secondary_img = document.getElementById("secondary_img")
const main_title = document.querySelector("h2")
const main_plot = document.querySelector("p")
const arrowUp = document.getElementById("up")
const arrowDown = document.getElementById("down")
const invertButton = document.getElementById("invert")
const startStopButton = document.getElementById("pause")
const animesArray = [fullMetalAlchemist, aot, deathNote, sevenDeadlySins, overlord, blue_lock, dbz, hxh]
let delay = 4500
let slideDirection = "up"


let currentPosition = 0;

arrowDown.addEventListener("click", down);

function down() {
    arrowDown.removeEventListener("click", down)
    if (autoSlide) {
        clearInterval(autoSlide)
        createInterval(slideDirection)
    }

    currentPosition === 0 ? currentPosition = animesArray.length - 1 : currentPosition--;

    updateMainContent(currentPosition);
    updateThumbnailSources(currentPosition);
    setTimeout(() => {
        arrowDown.addEventListener("click", down);
    }, 1500)
}

arrowUp.addEventListener("click", up);

function up() {
    arrowUp.removeEventListener("click", up);
    if (autoSlide) {
        clearInterval(autoSlide)
        createInterval(slideDirection)
    }
    currentPosition === animesArray.length - 1 ? currentPosition = 0 : currentPosition++;

    updateMainContent(currentPosition);
    updateThumbnailSources(currentPosition);
    setTimeout(() => {
        arrowUp.addEventListener("click", up);
    }, 1500)
}

function updateMainContent(position) {
    if (main_img.classList.contains("-z-5")) {
        secondary_img.src = animesArray[position].source;
        gsap.to(main_img, {
            opacity: 0,
            duration: 1.5,
            onComplete() {
                main_img.classList.remove("-z-5")
                main_img.classList.add("-z-10")
                secondary_img.classList.remove("-z-10")
                secondary_img.classList.add("-z-5")
                main_img.style.opacity = 1
            }
        })
    } else {
        main_img.src = animesArray[position].source;
        gsap.to(secondary_img, {
            opacity: 0,
            duration: 1.5,
            onComplete() {
                secondary_img.classList.remove("-z-5")
                secondary_img.classList.add("-z-10")
                main_img.classList.remove("-z-10")
                main_img.classList.add("-z-5")
                secondary_img.style.opacity = 1
            }
        })
    }

    main_title.innerText = animesArray[position].title;
    main_plot.innerText = animesArray[position].plot;
}

function updateThumbnailSources(position) {
    const thumbnails = document.querySelectorAll(".thumbnail");

    for (let i = 0; i < thumbnails.length; i++) {
        const newIndex = (position + i) % animesArray.length;
        thumbnails[i].src = animesArray[newIndex].source;
    }
}

generateThumbnails()

function generateThumbnails() {
    for (let i = 0; i < 3; i++) {
        let thumbnailIMG = new Image()
        thumbnailIMG.src = animesArray[i].source
        thumbnailIMG.className = "h-2/6 thumbnail"
        thumbnailIMG.style.opacity = "0.4"
        if (i == 0) {
            thumbnailIMG.classList.add("rounded-tr-xl")
        } else if (i == 2) {
            thumbnailIMG.classList.add("rounded-br-xl")
        }
        thumbnail_container.append(thumbnailIMG)
        thumbnailIMG.addEventListener("click", (e) => {
            if (autoSlide) {
                clearInterval(autoSlide)
                createInterval(slideDirection)
            }

            if (main_img.classList.contains("-z-5")) {
                secondary_img.src = e.target.src
                gsap.to(main_img, {
                    opacity: 0,
                    duration: 1,
                    onComplete() {
                        main_img.classList.remove("-z-5")
                        main_img.classList.add("-z-10")
                        secondary_img.classList.remove("-z-10")
                        secondary_img.classList.add("-z-5")
                        main_img.style.opacity = 1
                    }
                })


            } else if (secondary_img.classList.contains("-z-5")) {
                main_img.src = e.target.src;
                gsap.to(secondary_img, {
                    opacity: 0,
                    duration: 1,
                    onComplete() {
                        secondary_img.classList.remove("-z-5")
                        secondary_img.classList.add("-z-10")
                        main_img.classList.remove("-z-10")
                        main_img.classList.add("-z-5")
                        secondary_img.style.opacity = 1
                    }
                })

            }
            let targetSrc = e.target.getAttribute("src")
            for (let i = 0; i < animesArray.length; i++) {
                if (animesArray[i].source == targetSrc) {
                    main_title.innerText = animesArray[i].title
                    main_plot.innerText = animesArray[i].plot
                    currentPosition = i
                }
            }
        })
    }
}

let autoSlide

function createInterval(upDown) {
    if (upDown == "up") {
        autoSlide = setInterval(up, delay)
    } else if (upDown == "down") {
        autoSlide = setInterval(down, delay)
    }

}

createInterval("up")

startStopButton.addEventListener("click", () => {
    if (startStopButton.classList.contains("fa-circle-stop")) {
        startStopButton.classList.remove("fa-circle-stop")
        startStopButton.classList.add("fa-circle-play")
    } else if (startStopButton.classList.contains("fa-circle-play")) {
        startStopButton.classList.remove("fa-circle-play")
        startStopButton.classList.add("fa-circle-stop")
    }

    if (autoSlide) {
        clearInterval(autoSlide)
        autoSlide = null
    } else {
        createInterval(slideDirection)
    }

})

invertButton.addEventListener("click", () => {
    if (startStopButton.classList.contains("fa-circle-stop")) {
        clearInterval(autoSlide)
        if (invertButton.classList.contains("fa-circle-up")) {
            invertButton.classList.remove("fa-circle-up")
            invertButton.classList.add("fa-circle-down")
            slideDirection = "down"
            createInterval(slideDirection)
        } else if (invertButton.classList.contains("fa-circle-down")) {
            invertButton.classList.remove("fa-circle-down")
            invertButton.classList.add("fa-circle-up")
            slideDirection = "up"
            createInterval(slideDirection)
        }
    } else if (startStopButton.classList.contains("fa-circle-play")) {
        if (invertButton.classList.contains("fa-circle-up")) {
            invertButton.classList.remove("fa-circle-up")
            invertButton.classList.add("fa-circle-down")
            slideDirection = "down"
        } else if (invertButton.classList.contains("fa-circle-down")) {
            invertButton.classList.remove("fa-circle-down")
            invertButton.classList.add("fa-circle-up")
            slideDirection = "up"
        }
    }

})


