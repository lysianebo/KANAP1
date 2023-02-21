const panier = []
let item = ""

retrieveItemsFromCache()
panier.forEach((item) => makeArticle(item))
//cart.forEach((item) => displayItem(item))
function retrieveItemsFromCache() {
    const numberofItems = localStorage.length
    for (let i = 0; i < numberofItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObjet = JSON.parse(item)
    panier.push(itemObjet)
    }
}

fetch("http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((panier) => makeArticle(panier))

function makeArticle(){
for (var i = 0; i < localStorage.length; i++) {
   console.log(localStorage.getItem(localStorage.key(i)));
}
  
    //for (let i = 0; i < panier.length; i++) {

      //  const item = panier[i];
    const addArticle = document.createElement("article")
    addArticle.classList.add("cart__item")
    addArticle.dataset.id = item.id
    addArticle.dataset.color = item.color
    document.getElementById("cart__items").appendChild(addArticle)

        const divImg = document.createElement("div")
        divImg.classList.add("cart__item__img")
        const image = document.createElement("img")
      //image.src = imageUrl
      //image.alt = altTxt
        divImg.appendChild(image)
        
        const contentDiv = document.createElement('div')
        contentDiv.classList.add("cart__item__content")

            const descriptionDiv = document.createElement("div")
            descriptionDiv.classList.add("cart__item__content__description")
            
            const h2= document.createElement("h2")
            h2.textContent = item.name
            const p = document.createElement("p")
            p.textContent = item.color
            const p2 = document.createElement("p")
            p2.textContent = item.price + "€"

            const settingsDiv = document.createElement("div")
            settingsDiv.classList.add("cart__item__content__settings")
                const quantity = document.createElement("div")
                quantity.classList.add("cart__item__content__settings__quantity")
                    const quantityP = document.createElement("p")
                    quantityP.textContent ="Qté : "
                    const input = document.createElement("input")
                    input.type = "number"
                    input.classList.add("itemQuantity")
                    input.name ="itemQuantity"
                    input.min ="1"
                    input.max ="100"
                    input.value = item.quantity
                    input.addEventListener("input", (e) => updatePriceQuantity(panier.id, input.value, panier)) 
                const contentDelete = document.createElement("div")
                contentDelete.classList.add("cart__item__content__settings__delete")
                    const deleteP = document.createElement("p")
                    deleteP.classList.add("deleItem")
                    deleteP.textContent ="Supprimer "
                    
                   // p.addEvenListener("click", () => deleteItem(item))
                    //DeleteToSettings()
                    //const Delete = DeleteToSettings()

             
        appendtoArticle(addArticle, [divImg, contentDiv])
        appendtoArticle(contentDiv, [descriptionDiv, settingsDiv])
        appendtoArticle(settingsDiv, [quantity, contentDelete])

        appendtoArticle(descriptionDiv, [h2, p, p2])
        appendtoArticle(quantity, [quantityP, input])
        appendtoArticle(contentDelete, [deleteP])

        displayTotalQuantity()
        displayTotalPrice()
}

function appendtoArticle(article, array) {
    array.forEach(item => {
    article.appendChild(item)
})
}
function displayTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    //const totalItemPrice = panier.reduce((total,item) => total + item.price * item.quantity, 0)
    //totalPrice.textContent = total
    //const total = totalPrice.textContent
 }
 function displayTotalQuantity(){
    const totalQuantity = document.querySelector("#totalQuantity")
  // const total = panier.reduce((total,item) => total + item.quantity, 0)
    //totalQuantity.textContent = total
    //const totalItems = totalQuantity.textContent
 }
 function updatePriceQuantity(id, newValue, item){
    const itemToUpdate = panier.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    deleteDataFromCache(item)
 }




 
function saveNewDataToCache(item){
    const dataToSave = JSON.stringify(item)
    const key = id//`${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}
function DeleteToSettings(settings, item) {
   const supprimer = document.querySelector(".deleteItem")
   supprimer.addEventListener("click", deleteDataFromCache)
   const itemTodelete = cart.findIndex((product) =>
   product.id === item.id && product.color === item.color)
    cart.splice[itemToDelete, 1]
    displayTotalQuantity()
    displayTotalPrice
    deleteDataFromCache(item)
}
function deleteDataFromCache(item){
const key = id //`${item.id}-${item.color}`
localStorage.removeItem(key)
}
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e){
e.preventDefault() //ne pas rafraîchir
if (cart.lenght === 0) alert ("Sélectionnez votre canapé")
//return

//if (formIsInvalid()) return
if (emailIsInvalid()) return

const body = makeRequestBody()
fetch("http://localhost:3000/api/products/order",{
method : "POST",
body: JSON.stringify(body),
Headers:{
    "Content-type":"appplication/json"
}
})
.then((res) => res.json())
.then((data) => {
const orderId = data.orderId
window.location.href = "confirmation.html" + "?orderId=" + orderId
})
.catch((err) => console.error(err))
}
function formIsInvalid(){
   // const form = document.querySelector("cart__order__form")
   const inputs = form.querySelectorAll("input")
    inputs.forEach((input) =>{
        if (input.value === ""){
            alert("Vous devez compléter ce champ")
            return true
        }
        return false
    })
}
function emailIsInvalid(){
    const email = document.querySelector("#email").value
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (regex.test(email) === false) {
        alert ("Votre adresse mail n'est pas valide")
        return true
    }
    return false
}


function makeRequestBody(){
    const form = document.querySelector("cart__order__form")
    inputFirstame = document.getElementById("firstName").value;
    inputLastname = document.getElementById("lastName").value;
    inputAddress = document.getElementById("address").value;
    inputCity = document.getElementById("city").value;
    inputEmail = document.getElementById("email").value;

    const body = {
    contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
      }
      //products: getIdsFromCache()
    }
    return body
}
//pas besoin de faire split si seulement key et pas color
function getIdsFromCache(){
    const numberOfProducts = localStorage-length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++){
    const key = localStorage.key(i)
    const id = key-split("-")[0]
    //const id = key-split("-")[0]

    ids.push(id)
    }
    return ids
}
