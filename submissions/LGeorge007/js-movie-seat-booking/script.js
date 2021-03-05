let rightSide = document.querySelector(".right-side");
let form = document.querySelector("#tickets");
let ticketContainer = document.querySelector(".ticket-container");
let button = document.querySelector(".submit-button");
let confirmButton = document.querySelector("#confirm-button");
let cancelButton = document.querySelector("#cancel-button");
let seatsSum = document.querySelector(".seats-sum");
let moneySum = document.querySelector(".money-sum");
let filter = document.querySelector("#filter");
let modal = document.querySelector("#modal");
let message = document.querySelector(".message");
let ticketSum = 0;
let ticketCount = 0;

const renderTickets = function(tickets) {
    let fragmentHtml = "";
    tickets.forEach(element => {
            fragmentHtml += `<div class="ticket">
                                <p>${element.defaultValue}</p>
                             </div>`
        });
    ticketContainer.innerHTML = fragmentHtml;
}

const renderTotal = function(tickets) {
    ticketSum = 0;
    ticketCount = tickets.length;
    tickets.forEach(e=> ticketSum += +e.dataset.price);
    seatsSum.innerHTML = `${ticketCount}`;
    moneySum.innerHTML = `${ticketSum} \$`;
}

let renderModal = function() {
    let fragmentHtml = "";
    if (ticketCount === 0) {
        fragmentHtml = `<h3>Please confirm booking</h3>
                        <p>No seats selected</p>`;
        confirmButton.style.display = "none";
    } else {
        fragmentHtml = `<h3>Please confirm booking</h3>
                        <p>You have booked:</p>
                        <p>${ticketCount} tickets</p>
                        <p>Total: ${ticketSum}\$</p>`
        confirmButton.style.display = "inline-block";
    };
    message.innerHTML = fragmentHtml;
}

const handleInput = function() {
    let choosenSeats = document.querySelectorAll("input:checked");
    renderTickets(choosenSeats);
    renderTotal(choosenSeats);
}

const hideModal = function() {
    filter.style.display = "none";
    modal.style.display = "none";
}

const showModal = function() {
    filter.style.display = "block";
    modal.style.display = "block";
    renderModal();
}

button.addEventListener("click", showModal);
confirmButton.addEventListener("click", hideModal);
cancelButton.addEventListener("click", hideModal);

form.addEventListener("change", handleInput);
