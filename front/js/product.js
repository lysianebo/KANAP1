const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
   .then((reponse) => reponse.json())
   .then((res) => detailProduit(res)) 

function detailProduit(kanap) {
    const {altTxt, colors, description, imageUrl, name, price, _id}  = kanap
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}
function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    document.querySelector(".item__img").appendChild(image)
    return image
} 
function makeTitle(name) {
    title.textContent= name
}
function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}
function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}
function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}

