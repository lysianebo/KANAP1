
fetch("http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((dataKanaps) => {
    console.table(dataKanaps);
    return addProduct(dataKanaps);
   })
  

function addProduct(dataKanaps) {

  dataKanaps.forEach(element => {
    
  const {_id, imageUrl, altTxt, name, description} = element
  const items = document.getElementById ("items")

  const anchor = makeAnchor(_id)
  const article = document.createElement("article")
  const h3 = makeH3(name)
  const p = makeParagraphe(description)
  const image = makeImage(imageUrl, altTxt)

  items.append(anchor)
  anchor.append(article)
  appendtoArticle(article, [image, h3, p])
})
}

function appendtoArticle(article, array) {
  array.forEach(item => {
  article.appendChild(item)
  })
}


function makeAnchor(id){
  const anchor = document.createElement("a")
  anchor.href = "product.html?id=" + id
  return anchor
}

function makeImage(imageUrl, altTxt){
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  return image
}

function makeH3(name){
  const h3 = document.createElement("h3")
    h3.textContent = name
   h3.classList.add("productName")
  return h3
}

function makeParagraphe(description){
  const p = document.createElement("p")
  p.textContent = description
  p.classList.add("productDescription")
  return p
}
