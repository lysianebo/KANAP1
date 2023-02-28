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
   .then((res) => getDataKanap(res)) 

function getDataKanap(product) {
    //récupération de toutes les données dans l'objet kanap
    const {altTxt, colors, description, imageUrl, name, price, id}  = product
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
    const quantity = Number.parseInt(document.querySelector("#quantity").value)

    const span = document.querySelector("#price")
   if (span !=null)span.textContent = price * quantity
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
    const buttonToCart = document.querySelector("#addToCart")
    buttonToCart.addEventListener("click", buttonEvent)
function buttonEvent(){
    const color = document.querySelector("#colors").value
    const quantity = Number.parseInt(document.querySelector("#quantity").value)
    if (invalidCommand(color, quantity)) return
    saveCommand(color,quantity)
    redirectToCart()
}
function invalidCommand(color, quantity){
    if (color == null || color === "" ) {
        alert("Vous devez sélectionner une couleur. Merci")
        return true
        }
  if (quantity == null || quantity <= 0 || quantity > 100 ||!Number.isInteger(quantity)) {
      alert("Vous devez sélectionner une quantité de 1 à 100. Merci")
    return true
    }
} 
//Sauvegarde dans localStorage if commande valide
function saveCommand(color, quantity){
    let isFound = false;
    let panier = localStorage.getItem("panier") 
    if(!panier){  // soit le panier est vide
        let data = [{
            id : id,
            color : color,
            quantity: Number(quantity),
        }];
        localStorage.setItem("panier", JSON.stringify(data))
    }else{ // soit le panier n'est pas vide
        panier = JSON.parse(panier);

        panier.forEach(item =>{
            if(isFound) return;
            if(id === item.id && color === item.color){
                item.quantity = Number(item.quantity) + Number(quantity);
                isFound = true
            }
        })

        if(!isFound){
            panier.push( {
                id : id,
                color: color,
                quantity: Number(quantity),
            })
        }

        localStorage.setItem("panier",JSON.stringify(panier))
    }
}
function redirectToCart(){
    window.location.href = "cart.html"
}