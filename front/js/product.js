const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null){
    let itemPrice = 0
    let imgUrl, altText
    let productName
}

fetch(`http://localhost:3000/api/products/${id}`)
   .then((reponse) => reponse.json())
   .then((res) => dataKanap(res)) 

function dataKanap(kanap) {
    //récupération de toutes les données dans l'objet kanap
    const {altTxt, colors, description, imageUrl, name, price, id}  = kanap
    //les données sont passées dans des fonctions qui vont les afficher
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    productName = name 
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
    const parent = document.querySelector(".item__img")
    if(parent != null)parent.appendChild(image)
    return image
} 
function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if(h1 != null)h1.textContent = name
    return name
}
function makePrice(price) {
    const span = document.querySelector("#price")
   if (span !=null)span.textContent = price
}
function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null)p.textContent = description
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
const button = document.querySelector("#addToCart")
button.addEventListener("click", buttonEvent)

function buttonEvent(){
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (ifInvalidCommand(color, quantity)) return
    saveCommand(color,quantity)
    redirectToCart()
}
function saveCommand(color, quantity){
    const key = `${id}-${color}`
    const command = {
        id : id,
        color: color,
        quantity: Number(quantity),
        price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: productName 
    }
    //Transformer les données en string
    localStorage.setItem(key, JSON.stringify(command))
}

function ifInvalidCommand(color, quantity){
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Vous devez sélectionner une couleur et une quantité. Merci")
        return true
        }
}
function redirectToCart(){
    window.location.href = "cart.html"
}