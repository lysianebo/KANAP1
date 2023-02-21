
function getOrderId(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const orderId = urlParams.get("id")
    //return orderId
    console.log(urlParams.get("id"))
}
function displayOrderId(orderId){
    const orderIdElement = document.querySelector("#orderId")
    orderIdElement.textContent = orderId
}
function emptyCache(){
    const cache = window.localStorage
    cache.clear()
}

getOrderId()
displayOrderId(orderId)
