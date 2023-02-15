const cart = []

retrieveItemsFromCache()
cart.forEach((item) => makeArticle(item))
//cart.forEach((item) => displayItem(item))
function retrieveItemsFromCache() {
    const numberofItems = localStorage.length
    for (let i = 0; i < numberofItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObjet = JSON.parse(item)
    cart.push(itemObjet)
    }
}

//function displayItem(item){
  //  const article = makeArticle(item)
   //const image = makeImageDiv(item)
  // const content = makeContentDiv(item)
    //appendtoArticle(article, [content])

//}
 
function makeArticle(item){
    const addArticle = document.createElement("article")
    addArticle.classList.add("cart__item")
    addArticle.dataset.id = item.id
    addArticle.dataset.color = item.color
    document.getElementById("cart__items").appendChild(addArticle)

        const divImg = document.createElement("div")
        divImg.classList.add("cart__item__img")
        const image = document.createElement("img")
        image.src = item.imageUrl
        image.alt = item.altTxt
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
                    input.addEventListener("input", (e) => updatePriceQuantity(item.id, input.value, item)) 
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

        const tQuantity = displayTotalQuantity()
        const tPrice = displayTotalPrice()
      //const Delete = DeleteToSettings()

}

function appendtoArticle(article, array) {
    array.forEach(item => {
    article.appendChild(item)
})
}
function displayTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total,item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
 }
 function displayTotalQuantity(){
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total,item) => total + item.quantity, 0)
    totalQuantity.textContent = total
 }
 function updatePriceQuantity(id, newValue, item){
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    deleteDataFromCache(item)
 }
function saveNewDataToCache(item){
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}
function DeleteToSettings(settings, item) {
   const supprimer = document.querySelector(".deleteItem")
   supprimer.addEventListener("click", deleteDataFromCache)
   // const itemTodelete = cart.findIndex((product) =>
   // product.id === item.id && product.color === item.color)
    cart.splice[itemToDelete, 1]
    displayTotalQuantity()
    displayTotalPrice
    deleteDataFromCache(item)

}
function deleteDataFromCache(item){
const key = `${item.id}-${item.color}`
localStorage.removeItem(key)
}
console.log(cart)