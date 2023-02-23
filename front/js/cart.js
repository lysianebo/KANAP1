let panier = localStorage.getItem("panier") 
if(panier) panier = JSON.parse(panier);

loadPage()

async function loadPage(){
    let priceTotal = 0;
    let numberTotal = 0
    for await (let item of panier){
      let result = await makeArticle(item); 
        priceTotal += Number(result.price)* Number(result.number);
        numberTotal += Number(result.number);
    }
   displayTotalQuantity(numberTotal)
   displayTotalPrice(priceTotal)
}
//***********  MISE EN PAGE DE L'ARTICLE  *******************

async function makeArticle(product){
    let item = await fetch("http://localhost:3000/api/products/"+product.id)
    .then((res) => res.json())

    const addArticle = document.createElement("article")
    addArticle.classList.add("cart__item")
    addArticle.dataset.id = "{product-ID}"
    addArticle.dataset.color = "{product-color}"
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
            p.textContent = product.color
            const p2 = document.createElement("p")
            p2.textContent = item.price  * product.quantity + "€" //prix en rapport avec la quantité

            const settingsDiv = document.createElement("div")
            settingsDiv.classList.add("cart__item__content__settings")
                const settingsQuantityDiv = document.createElement("div")
                settingsQuantityDiv.classList.add("cart__item__content__settings__quantity")
                    const quantityP = document.createElement("p")
                    quantityP.textContent ="Qté : "
 
//***********Copie de function  quantityInputToOrder   *******************       

        const input = document.createElement("input")
        input.type = "number"
        input.classList.add("itemQuantity")
        input.name ="itemQuantity"
        input.min ="1"
        input.max ="100"
        input.value = product.quantity
        const log = document.getElementsByClassName(".itemQuantity")
        //input.addEventListener("change", (e) => QuantityToOrder()) 
        input.addEventListener("input.value", updateValue)
         function updateValue (event) {
            log.textContent = event.target.value
            
         }
        //     if (input.value != product.quantity){
        //         const newQuantity = document.querySelector(".itemQuantity").value;
        //         product.quantity
        //     }else{
        //         input.value = product.quantity
        //         savePanier
        //     }
        // })

        console.log("color :" + product.color, " / Qte :" + product.quantity, "  / NewInputQte :" + input.value, " / Prix Unitaire :" + item.price, " / Prix total par article :  " + product.quantity * item.price + "€" , item.price * input.value + "€"  )  

    

//***********Fin de Copie de function  quantityInputToOrder   *******************    

//***********Copie de function  deleteProduct(item)   *******************  

    const contentDelete = document.createElement("div")
    contentDelete.classList.add("cart__item__content__settings__delete")
        const deleteP = document.createElement("p")
        deleteP.classList.add("deleItem")
        deleteP.textContent ="Supprimer"
        //deleteP.addEventListener("click", (d) =>deleteProduct(item))
        deleteP.addEventListener("click", function(event){
        const article = event.target.closest("article.cart__item") 
        const productId = article.dataset.id
        const productColor = article.dataset.color
        const itemToDelete = panier.findIndex(product =>
        productId === item.id && productColor === item.color)
        panier.splice[itemToDelete, 1]
        article.remove()
        saveNewDataToCache
        savePanier
        })         
//***********Fin de function  deleteProduct(item)  *******************  

                     
        appendtoArticle(addArticle, [divImg, contentDiv])
        appendtoArticle(contentDiv, [descriptionDiv, settingsDiv])
        appendtoArticle(settingsDiv, [settingsQuantityDiv, contentDelete])
        appendtoArticle(descriptionDiv, [h2, p, p2])
        appendtoArticle(settingsQuantityDiv, [quantityP, input])
        appendtoArticle(contentDelete, [deleteP])
                        
        return { number : product.quantity, price: item.price}
}   
//***********Fin de MISE EN PAGE DE L'ARTICLE  *******************
function appendtoArticle(article, array) {
    array.forEach(item => {
    article.appendChild(item)
})
}
function displayTotalPrice(price){
    const totalPrice = document.querySelector("#totalPrice")
    totalPrice.textContent = price
 }
 function displayTotalQuantity(quantity){
    const totalQuantity = document.querySelector("#totalQuantity")
    totalQuantity.textContent = quantity
 }
 function QuantityInputToOrder(){
    const input = document.createElement("input")
        input.type = "number"
        input.classList.add("itemQuantity")
        input.name ="itemQuantity"
        input.min ="1"
        input.max ="100"
        input.value = product.quantity
        //input.addEventListener("change", (e) => QuantityToOrder()) 
            if (input.value != product.quantity){
                const newQuantity = document.querySelector(".itemQuantity").value;
            }else{
                input.value = product.quantity
            }
    console.log(product.color, product.quantity, item.price, product.quantity * item.price)                     

    }
 function updatePriceQuantity(id, newValue, item){
    //const itemToUpdate = panier.find((item) => item.id === id)
    //itemToUpdate.quantity = Number(newValue)
    //item.quantity = itemToUpdate.quantity
    //displayTotalQuantity()
    //displayTotalPrice()
    //deleteDataFromCache(item)
 }

// function updatePriceQuantity(id, newValue, item){
   // 
    //item.quantity = document.querySelector(".itemQuantity")
   // p2.textContent = item.price * input.value + "€"
   //const selectElement = document.querySelector(".itemQuantity");

  // selectElement.addEventListener('change', (event) => {
     //const result = document.querySelector(".itemQuantity").value;
     //result.textContent = `${event.target.value}`;
  // });

 function deleteProduct(item) {
    const contentDelete = document.createElement("div")
                contentDelete.classList.add("cart__item__content__settings__delete")
                    const deleteP = document.createElement("p")
                    deleteP.classList.add("deleItem")
                    deleteP.textContent ="Supprimer"
                    deleteP.addEventListener("click", (d) =>deleteProduct(item))
    deleteP.addEventListener("click", function(event){
        //const article = event.target.closest("article.cart__item") 
        //const productId = article.dataset.id
        //const productColor = article.dataset.color
        const itemToDelete = panier.findIndex(product =>
    productId === item.id && productColor === item.color)
    panier.splice[itemToDelete, 1]
    article.remove() 
    saveNewDataToCache() 
    savePanier   
     }  
  )}

function saveNewDataToCache(panier){
    const dataToPanier = JSON.stringify(panier)
    const key = input
    localStorage.setItem(key, dataToPanier)
}
function savePanier(panier){
    localStorage.setItem("product.id", JSON.stringify(panier))
}

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e){
e.preventDefault() //ne pas rafraîchir
if (panier.lenght === 0) alert ("Sélectionnez votre canapé")
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

 