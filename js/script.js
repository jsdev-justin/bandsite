var datesEl = document.querySelector(".dates")
console.log(dates)


function printDates(arr){
    let html = "";

    arr.forEach(a=>{
        html += `<div class='flex evenly p-2 border-bottom'>
        <h3>${a.date}</h3><h3>${a.location}</h3><h3>${a.arena}</h3><button class='bg-black text-white p-1'>Buy Tickets</button>
        </div>`
    })

    datesEl.innerHTML = html
}

printDates(dates)


