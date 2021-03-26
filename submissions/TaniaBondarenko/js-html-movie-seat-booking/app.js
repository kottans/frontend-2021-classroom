const SEATS = document.querySelector(".seats");
let bookingButton;
let shopContainer;
let ticketChosen;
let ticketClass;
let totalPrice = 0;
let count = 0;

function createShopContainer() {
  shopContainer = document.createElement("div");
  shopContainer.setAttribute("class", "shopContainer");
  SEATS.appendChild(shopContainer);
}

SEATS.addEventListener("click", chooseTicket);

function chooseTicket({ target }) {
  ticketChosen = target;
  if (!target.matches("input")) {
    return;
  } else if (!target.classList.contains("clicked")) {
    createBookingButton();
    rowSeat = ticketChosen.value.split("-");
    target.classList.add("clicked");
    addTicket();
  } else {
    defineTicketClass();
    target.classList.remove("clicked");
    document.getElementsByClassName(`${target.value}`)[0].remove();
    totalPrice -= price;
    count -= 1;
  }
}

function addTicket() {
  defineTicketClass();
  let bookTicket = document.createElement("div");
  bookTicket.setAttribute("class", `bookTicket ${ticketChosen.value}`);
  shopContainer.appendChild(bookTicket);
  bookTicket.innerHTML += `
                    <span class="bookTicketRow">Row ${rowSeat[0]} </span>
                    <span class="bookTicketSeat">Seat ${rowSeat[1]} </span> 
                    <span class="BookTicketClass">${ticketClass} </span> 
                    <span class="price">${price} usd</span>
                   `;
  totalPrice += price;
  count += 1;
}

function defineTicketClass() {
  let row = ticketChosen.parentElement.parentElement;
  if (row.classList.contains("rowVip")) {
    ticketClass = "VIP";
    price = 300;
  } else {
    ticketClass = "LUX";
    price = 100;
  }
}

let createBookingButton = (function () {
  let executed = false;
  return function () {
    if (!executed) {
      executed = true;
      bookingButton = document.createElement("div");
      bookingButton.setAttribute("class", "submitButton");
      bookingButton.innerHTML = `<button class="booking" type="submit">Continue</button>`;
      SEATS.appendChild(bookingButton);
      createShopContainer();
      bookingButton.addEventListener("click", buyTicket, { once: true });
    }
  };
})();

function buyTicket() {
  let paidDiv = document.createElement("div");
  paidDiv.innerHTML = `<hr>Total price for ${count} tickets - ${totalPrice}usd`;
  shopContainer.appendChild(paidDiv);
  stopNextActions();
  createPaidButton();
}

function stopNextActions() {
  let inputs = Array.from(document.querySelectorAll("input"));
  inputs.forEach((element) => element.setAttribute("disabled", "disabled"));
  bookingButton.remove();
}

function createPaidButton() {
  let paidButton = document.createElement("div");
  paidButton.setAttribute("class", "paidButton");
  paidButton.innerHTML = `<button class="lastButton" type="submit">Pay</button>`;
  shopContainer.appendChild(paidButton);
  paidButton.scrollIntoView({ block: "end" });
}
