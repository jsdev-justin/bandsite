var datesEl = document.querySelector(".dates")
console.log(dates)


function printDates(arr){
    let html = "";

    arr.forEach(a=>{
        // html += `<div class='flex evenly p-2 border-bottom'>
        // <h3>${a.date}</h3><h3>${a.location}</h3><h3>${a.arena}</h3><button class='bg-black text-white p-1'>Buy Tickets</button>
        // </div>`

        html += `<tr class='p-1 my-5'><td>${a.date}</td><td>${a.location}</td><td>${a.arena}</td><td><button class='bg-black text-white p-1'>Buy Tickets</button>`
    })

    datesEl.innerHTML = html
}

printDates(dates)


