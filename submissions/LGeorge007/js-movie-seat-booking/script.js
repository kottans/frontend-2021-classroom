const form = document.querySelector("#tickets");
const ticketContainer = document.querySelector("#ticket-container");
const bookButton = document.querySelector("#menu-button");
const confirmButton = document.querySelector("#confirm-button");
const cancelButton = document.querySelector("#cancel-button");
const seatsSum = document.querySelector("#seats-sum");
const moneySum = document.querySelector("#money-sum");
const filter = document.querySelector("#filter");
const modal = document.querySelector("#modal");
const message = document.querySelector("#message");
let ticketSum = 0;
let ticketCount = 0;

const renderTickets = function (tickets) {
    let fragmentHtml = "";
    tickets.forEach(element => {
        fragmentHtml += `<div class="ticket">
                                <p>${element.defaultValue}</p>
                             </div>`
    });
    ticketContainer.innerHTML = fragmentHtml;
}

const renderTotal = function (tickets) {
    ticketSum = 0;
    ticketCount = tickets.length;
    tickets.forEach(e => ticketSum += +e.dataset.price);
    seatsSum.innerHTML = `${ticketCount}`;
    moneySum.innerHTML = `${ticketSum} \$`;
}

const hideModal = function () {
    filter.style.display = "none";
    modal.style.display = "none";
}

const showModal = function () {
    filter.style.display = "block";
    modal.style.display = "block";
    renderModal();
}

const renderModal = function () {
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

const handleInput = function () {
    let choosenSeats = document.querySelectorAll("input:checked");
    renderTickets(choosenSeats);
    renderTotal(choosenSeats);
}

bookButton.addEventListener("click", showModal);
confirmButton.addEventListener("click", hideModal);
cancelButton.addEventListener("click", hideModal);

form.addEventListener("change", handleInput);
