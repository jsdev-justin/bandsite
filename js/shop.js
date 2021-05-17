var albumGrid = document.querySelector(".grid")

console.log(merch)


function printDates(arr){
    let html = "";

    arr.forEach(a=>{
        html += `<div class='card p-1 text-center'>
        <h3 class='p-1'>${a.album}</h3>
        <img src=${a.cover} class='album-img' alt=${a.album}>
        <h3 class='p-1'>$${a.price/100}</h3><button class='bg-black text-white p-1'>Buy Tickets</button>
        </div>`
    })

    albumGrid.innerHTML = html
}

printDates(merch.music)