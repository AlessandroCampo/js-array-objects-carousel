const thumbnail_container = document.getElementById("thumbnail-container")
const main_img = document.getElementById("main_img")
const main_title = document.querySelector("h2")
const main_plot = document.querySelector("p")
const arrowUp = document.getElementById("up")
const arrowDown = document.getElementById("down")
const animesArray = [fullMetalAlchemist, aot, deathNote, sevenDeadlySins, overlord, blue_lock]

let currentPosition = 2

generateThumbnails()

arrowDown.addEventListener("click", () => {
    currentPosition == 0 ? currentPosition = animesArray.length - 1 : currentPosition--
    main_img.src = animesArray[currentPosition].source
    main_title.innerText = animesArray[currentPosition].title
    main_plot.innerText = animesArray[currentPosition].plot
    // generateThumbnails()
    const thumbnails = document.querySelectorAll(".thumbnail")
    thumbnails.forEach((element, index) => {
        element.src = animesArray[currentPosition + index].source
    })


})

arrowUp.addEventListener("click", () => {
    currentPosition == animesArray.length - 1 ? currentPosition = 0 : currentPosition++
    main_img.src = animesArray[currentPosition].source
    main_title.innerText = animesArray[currentPosition].title
    main_plot.innerText = animesArray[currentPosition].plot
    // generateThumbnails()
    const thumbnails = document.querySelectorAll(".thumbnail")
    thumbnails.forEach((element, index) => {
        element.src = animesArray[currentPosition - index].source
    })


})

function generateThumbnails() {
    for (let i = 0; i < 3; i++) {
        let thumbnailIMG = new Image()
        thumbnailIMG.src = animesArray[i].source
        thumbnailIMG.className = "h-2/6 thumbnail"
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