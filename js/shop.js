var albumGrid = document.querySelector(".grid")
var cart = document.querySelector(".cart-body")

console.log(merch)


function printDates(arr){
    let html = "";

    arr.forEach(a=>{
        html += `<div class='card p-1 text-center'>
        <h3 class='p-1'>${a.album}</h3>
        <img src=${a.cover} class='album-img' alt=${a.album}>
        <h3 class='p-1'>$${a.price/100}</h3><button data-cover=${a.cover} data-album='${a.album}' data-price=${a.price} class='buy-btn bg-black text-white p-1'>Buy Tickets</button>
        </div>`
    })

    albumGrid.innerHTML = html

    document.querySelectorAll(".buy-btn").forEach(b=>{
        b.onclick=(e)=>buyItem(e)
    })
}

printDates(merch.music)


function buyItem(e){
    let item={
        album:e.target.dataset.album,
        price:e.target.dataset.price,
        cover:e.target.dataset.cover
    }
    console.log(item)

    var cartItem = document.createElement("div");
    cartItem.className="cart-item flex evenly p-1"
    cartItem.innerHTML = `<img src=${item.cover} class='cart-img'><h5>$${item.price}</h5><input type='number' name='quantity' value="1" min='1' max='10' step='1'><h5>${item.price}</h5>`


    cart.appendChild(cartItem)

    document.querySelectorAll("input[type='number']").forEach(i=>{

    i.onchange=(e)=>saySomething(e)
    })
}


function saySomething(e){
    console.log(e.target.value)
}