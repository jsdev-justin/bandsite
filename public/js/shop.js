var albumGrid = document.querySelector(".grid")
var cart = document.querySelector(".tbody");
var cartTotalRow = document.querySelector(".cart-total-row")

console.log(merch)


function printDates(arr){
    let html = "";

    arr.forEach(a=>{
        html += `<div data-description='${a.description}' class='card p-1 text-center'>
        <h3 class='p-1'>${a.album}</h3>
        <img src=${a.cover} class='album-img' alt=${a.album}>
        <h3 class='p-1'>$${a.price/100}</h3><button data-cover=${a.cover} data-album='${a.album}' data-price=${a.price/100} class='buy-btn bg-black text-white p-1'>Add to Cart</button>
        </div>`
    })

    albumGrid.innerHTML = html

    document.querySelectorAll(".buy-btn").forEach(b=>{
        b.onclick=(e)=>buyItem(e)
    })
}

printDates(merch.music)


function buyItem(e){
    var cartItems = document.querySelectorAll('.cart-item') || [];
    console.log(cartItems)
    cartItems = Array.from(cartItems).map(c=>c.getAttribute("data-album"));
    console.log(cartItems)

    if(!checkItems(cartItems,e.target.dataset.album)){
        alert("You already have that in your basket");
        return;
    }


    let item={
        album:e.target.dataset.album,
        price:e.target.dataset.price,
        cover:e.target.dataset.cover
    }
    console.log(item)

    var cartItem = document.createElement("tr");
    cartItem.className="cart-item"
    cartItem.setAttribute('data-album',item.album);
    // cartItem.innerHTML = `<div><img src=${item.cover} class='cart-img'><br><small>${item.album}</small></div><h5>$${item.price}</h5><input type='number' name='quantity' value="1" min='1' max='10' step='1'><h5 class="quant-item-total" data-itemprice=${item.price}>${item.price}</h5><span class='remove'>x</span>`
    cartItem.innerHTML = `<td><img src=${item.cover} class='cart-img'><br><small>${item.album}</small></td><td><h5>$${item.price}</h5></td><td><input type='number' name='quantity' value="1" min='1' max='10' step='1'></td><td><h5 class="quant-item-total" data-itemprice=${item.price}>${item.price}</h5></td><td><span class='remove'>x</span></td>`


    cart.appendChild(cartItem)

    if(cartTotalRow.innerHTML === ""){
    createTotal(item.price)
    }
    else{
        adjustTotal()
    }



    //add behavior 


    document.querySelectorAll("input[type='number']").forEach(i=>{
    i.onchange=(e)=>changeQuantity(e)
    })

    document.querySelectorAll(".remove").forEach((r,idx)=>{
        r.onclick=(e)=>removeFromCart(e)
    })
}

let ref=1

function changeQuantity(e){
     console.log(e)
    // console.log(e.target.nextElementSibling)
    let total = e.target.parentElement.nextElementSibling.firstElementChild.getAttribute('data-itemprice')
    console.log(total)
    total = parseFloat(total);

    let quantityAndTotal = total * e.target.value

    e.target.parentElement.nextElementSibling.firstElementChild.textContent = quantityAndTotal

    adjustTotal()

    // let cartTotalEl = document.querySelector(".total");
    //     cartTotal = cartTotalEl.textContent;

        // if(ref > e.target.value){
        //     console.log("minus price")
        //     cartTotal = parseFloat(cartTotal) - parseFloat(total)
        // }
        // else{
        //     console.log("add price")
        //     cartTotal = parseFloat(cartTotal) + parseFloat(total)

        // }

        // cartTotal = parseFloat(cartTotal);
        // console.log(cartTotal,total)
        // cartTotal -= parseFloat(total);
        // cartTotal += (parseFloat(total) * e.target.value);

        // cartTotalEl.innerHTML = cartTotal.toFixed(2)

        // cartTotalEl.innerHTML = total;

        // ref = e.target.value;

}


function checkItems(items,item){
    return items.indexOf(item) === -1
}



function removeFromCart(e){
    console.log(e.target.parentElement.parentElement)
    cart.removeChild(e.target.parentElement.parentElement)
    adjustTotal()
}



function createTotal(price){
  

    let totalDiv = document.createElement('div');
    totalDiv.className="flex flex-end";
    price = price
    totalDiv.innerHTML = `<button class='buybtn bg-green p-1 mr-15'>Buy</button><h3>Total:$<span class='total'>${price}</span></h3>`

    cartTotalRow.appendChild(totalDiv)

    document.querySelector(".buybtn").onclick=checkOut;
}


function adjustTotal(){
    console.log("adjust!!")
    var quantItemTotals = document.querySelectorAll(".quant-item-total");
    console.log(quantItemTotals)
    let prices = Array.from(quantItemTotals).map(q=>q.textContent);
        cartTotal = prices.reduce((a,b)=>parseFloat(a) + parseFloat(b));

    console.log(prices,cartTotal)
    totalDOM = document.querySelector(".total")
    totalDOM.innerHTML = cartTotal

}



function checkOut(){
    stripeHandler.open();
    // alert(total)
}





var stripeHandler = StripeCheckout.configure({
    key:'pk_test_51IrW83H6Eled2mMIUg4IwXSTSfGnVTkuwsofM02nFiN45f69MZxvWADGkLip1J1bIB50NqRHQEZcZYd2oYYdB8fz00gomBWt2b',
    locale:'en',
    name:"Motley Crue Checkout",
    image:"../assets/shout.jpeg",
    token:function(token){

        console.log(token);

        fetch("/purchase",{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({token:token.id,total:document.querySelector(".total").innerHTML})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.msg.split(" ").indexOf("successful") !== -1){
                alert("Congrats, your crue purchase went thru! 🤘")
            }
        })
    }
})


