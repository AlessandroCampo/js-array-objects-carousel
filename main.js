const thumbnail_container = document.getElementById("thumbnail-container")
const main_img = document.getElementById("main_img")
const secondary_img = document.getElementById("secondary_img")
const main_title = document.querySelector("h2")
const main_plot = document.querySelector("p")
const arrowUp = document.getElementById("up")
const arrowDown = document.getElementById("down")
const animesArray = [fullMetalAlchemist, aot, deathNote, sevenDeadlySins, overlord, blue_lock]
let delay = 3000


let currentPosition = 0;

arrowDown.addEventListener("click", down);

function down() {
    clearInterval(autoSlide)
    createInterval()
    currentPosition === 0 ? currentPosition = animesArray.length - 1 : currentPosition--;

    updateMainContent(currentPosition);
    updateThumbnailSources(currentPosition);
}

arrowUp.addEventListener("click", up);

function up() {
    clearInterval(autoSlide)
    createInterval()
    currentPosition === animesArray.length - 1 ? currentPosition = 0 : currentPosition++;

    updateMainContent(currentPosition);
    updateThumbnailSources(currentPosition);
}

function updateMainContent(position) {

    main_img.src = animesArray[position].source;
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
        if (i == 0) {
            thumbnailIMG.classList.add("rounded-tr-xl")
        } else if (i == 2) {
            thumbnailIMG.classList.add("rounded-br-xl")
        }
        thumbnail_container.append(thumbnailIMG)
        thumbnailIMG.addEventListener("click", (e) => {
            main_img.src = e.target.src
            let targetSrc = e.target.getAttribute("src")
            for (let i = 0; i < animesArray.length; i++) {
                if (animesArray[i].source == targetSrc) {
                    main_title.innerText = animesArray[i].title
                    main_plot.innerText = animesArray[i].plot
                }
            }
        })
    }
}

let autoSlide

function createInterval() {
    autoSlide = setInterval(up, delay)
}

createInterval()