const HALL = document.getElementById('hall');
const TICKETS = document.getElementById('tickets');
const TOTAL_COST_PROPERTY = document.getElementById('totalCostProperty');
let selectedTickets = [];
let totalCost = 0;
let priceOfTicket = {
    standart_place: 60,
    comfort_place: 100
}

function showTicket(){
    TICKETS.innerHTML = selectedTickets.map(item =>{
        return `<button id="${item.value}" data-seat="${item.typeOfSeat}" class="ticket ${item.typeOfSeat}">Row: ${item.row} Place: ${item.place}
                </button>`
    }).join('');
}
function showTotalCost(){
    TOTAL_COST_PROPERTY.innerHTML = `${totalCost} ₴`;
}
function addTicket(value, typeOfSeat, row, place){
    selectedTickets.push({
        value: value,
        typeOfSeat: typeOfSeat,
        row: row,
        place: place
    });
    totalCost += priceOfTicket[typeOfSeat];
}
function removeTicket(ticketForDelete, typeOfSeat){
    selectedTickets = selectedTickets.filter(item => item.value != ticketForDelete);
    totalCost -= priceOfTicket[typeOfSeat];
}
function parseSeatValue(seatValue){
    let seatInfo = seatValue.split('');
    let r = seatInfo.indexOf('r');
    let p = seatInfo.indexOf('p');
    let row = seatInfo.slice(r+1, p).join('');
    let place = seatInfo.slice(p+1, seatInfo.length).join('');
    return [row, place];
}
var checkedElement;
function uncheckPlace(seatValue){
    let elementForUncheck = document.querySelector("input[value="+ seatValue + "]");
    elementForUncheck.checked = false;
}

HALL.addEventListener('change', (event) => {
    const target = event.target;
    let typeOfSeat = target.closest('div').classList[1];
    let seat = parseSeatValue(target.value)
    if(target.checked){
        addTicket(target.value, typeOfSeat, ...seat);
    }
    else{
        removeTicket(target.value, typeOfSeat);
    }
    showTicket();
    showTotalCost();
})
TICKETS.addEventListener('click', event =>{
    let target = event.target.closest('button');
    removeTicket(target.id, target.dataset.seat);
    uncheckPlace(target.id);
    showTicket();
    showTotalCost();
})

showTotalCost();