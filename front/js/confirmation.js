let url = new URL(window.location.href)
const id = url.searchParams.get('orderId');
document.getElementById('orderId').innerText= id
localStorage.removeItem('panier')

// getOrderId()
// displayOrderId

// function getOrderId(){
//     let queryString = window.location.search
//     let urlParams = new URLSearchParams(queryString)
//     let orderId = urlParams.get("id")
//     //return orderId
   
//  //   console.log(url.searchParams.get.get("data.orderId"))

//     console.log(urlParams.get("id"))
// }
// function displayOrderId(orderId){
//     //const orderIdElement = document.getElementById("orderId")
//     //orderIdElement.textContent = orderId
//     document.getElementById('orderId').innerText= orderId
// }
// function emptyCache(){
//     const cache = window.localStorage
//     cache.clear()
    //localStorage.removeItem('panier')

//}


