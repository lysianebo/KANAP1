// Chargement du localStorage
let panier = localStorage.getItem("panier") 
if(panier) panier = JSON.parse(panier);
console.log("panier",panier)


loadPage()

// Chargement de la page panier en allant chercher les produits de l'API mentionnés dans le panier 
async function loadPage(){
    let priceTotal = 0
    let numberTotal = 0
    if(!panier || panier.length  === 0 ) return ;
    for await (let item of panier){
        let product = await fetch("http://localhost:3000/api/products/"+item.id)
            .then((res) => res.json())
        
       makeArticle(product, item)
       updateTotalPriceQuantity()
    }
}
//***********  MISE EN PAGE DE L'ARTICLE (modification du DOM) *******************

async function makeArticle(product, item){
    await fetch("http://localhost:3000/api/products/"+product._id)
    .then((res) => res.json())
    
    const Article = document.createElement("article")
        Article.classList.add("cart__item")
        Article.dataset.id = product._id
        Article.dataset.color = item.color
        document.getElementById("cart__items").appendChild(Article)

        const divImg = document.createElement("div")
              divImg.classList.add("cart__item__img")
                const image = document.createElement("img")
                image.src = product.imageUrl
                image.alt = product.altxt
              divImg.appendChild(image)
        
        const contentDiv = document.createElement('div')
              contentDiv.classList.add("cart__item__content")

              const descriptionDiv = document.createElement("div")
                    descriptionDiv.classList.add("cart__item__content__description")
                    const h2= document.createElement("h2")
                          h2.textContent = product.name
                    const p = document.createElement("p")
                          p.textContent = item.color
                    const p2 = document.createElement("p")
                          p2.textContent = (product.price * item.quantity) + "€" //prix en rapport avec la quantité
                          
              const settingsDiv = document.createElement("div")
                    settingsDiv.classList.add("cart__item__content__settings")
                        const settingsQuantityDiv = document.createElement("div")
                              settingsQuantityDiv.classList.add("cart__item__content__settings__quantity")
                        const quantityP = document.createElement("p")
                              quantityP.textContent ="Qté : "
 

//***********  quantityInput   *******************       

                const input = document.createElement("input")
                input.type = "number"
                input.classList.add("itemQuantity")
                input.name ="itemQuantity"
                input.min ="1"
                input.max ="100"
                input.value = item.quantity
                input.addEventListener("change",   function(event) {
                   // TODO  VERIFICATION CHAMP QUANTITY
                    location.reload();
                    const article = event.target.closest("article.cart__item")
                    const productId = article.dataset.id
                    const productColor = article.dataset.color
                    
                    const itemToDelete = panier.findIndex(product =>
                        productId === product.id && productColor === product.color)
                    if(itemToDelete !== -1){
                        panier[itemToDelete].quantity = this.value
                        savePanier(panier)
                        updateTotalPriceQuantity()
                    }
                })
//***********      deleteProduct(item)   *******************  

        const contentDelete = document.createElement("div")
        contentDelete.classList.add("cart__item__content__settings__delete")
            const deleteP = document.createElement("p")
            deleteP.classList.add("deleteproduct")
            deleteP.textContent ="Supprimer"
            deleteP.addEventListener("click", function(event){
                const article = event.target.closest("article.cart__item")
                const productId = article.dataset.id
                const productColor = article.dataset.color
                console.log(productColor)
                const itemToDelete = panier.findIndex(product =>
                productId === product.id && productColor === product.color)

                if(itemToDelete !== -1){
                    panier.splice(itemToDelete, 1)
                    article.remove()
                    savePanier(panier)
                    updateTotalPriceQuantity()
                }
            })
//***********Fin de deleteProduct(item)  *******************  
                     
        appendtoArticle(Article, [divImg, contentDiv])
        appendtoArticle(contentDiv, [descriptionDiv, settingsDiv])
        appendtoArticle(settingsDiv, [settingsQuantityDiv, contentDelete])
        appendtoArticle(descriptionDiv, [h2, p, p2])
        appendtoArticle(settingsQuantityDiv, [quantityP, input])
        appendtoArticle(contentDelete, [deleteP])
                        
       // return { number : item.quantity, price: product.price}
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
async function updateTotalPriceQuantity(id, newValue, item){
      let priceTotal = 0
      let numberTotal = 0
      for await (let item of panier){
          let product = await fetch("http://localhost:3000/api/products/"+item.id)
              .then((res) => res.json())
         priceTotal += Number(product.price)* Number(item.quantity);
        numberTotal += Number(item.quantity);
      }
      displayTotalQuantity(numberTotal)
      displayTotalPrice(priceTotal)
}

function savePanier(panier){
    localStorage.setItem("panier", JSON.stringify(panier))
}


//*********Envoyer la commande après vérification du formulaire *******
   
    const orderButton = document.querySelector("#order")
          orderButton.addEventListener("click", (e) => submitForm(e))

function submitForm(e){
    e.preventDefault() //ne pas rafraîchir
    if(!panier || panier.length  === 0 )  alert ("Vous devez retourner à la page d'accueil pour sélectionner votre canapé")
    //return
    
    if (formIsInvalid()) //return
    if (emailIsInvalid())// return
    
  // let body = makeRequestBody()
        body = JSON.stringify(body),

    fetch("http://localhost:3000/api/products/order",{
        method : "POST",
        body: body,
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("data",data)
    const orderId = data.orderId
    window.location.href = "confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}
function formIsInvalid(){
    const form = document.querySelector("cart__order__form")
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
    //const form = document.querySelector("cart__order__form")
    inputFirstame = document.getElementById("firstName").value;
    inputLastname = document.getElementById("lastName").value;
    inputAddress = document.getElementById("address").value;
    inputCity = document.getElementById("city").value;
    inputEmail = document.getElementById("email").value;

    return {
    contact: {
        firstName: inputFirstame,
        lastName: inputLastname,
        address: inputAddress,
        city: inputCity,
        email: inputEmail
        },
        products: getIdsFromCache()
    }
    return body
}
function getIdsFromCache(){
        const ids = []
        for (let item of panier){
            ids.push(`product-${item.id}`)
        }
        return ids
 }
