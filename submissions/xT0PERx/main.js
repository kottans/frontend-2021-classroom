const choiceSeatsWrapper = document.getElementById("tickets_wrapper");
const seatsInCinema = document.querySelector("#cinemaHall");
const main = document.querySelector("body");
const filmName = "Monster Hunter";
const priceOfTicket = 8;

init();

function init() {
  addDomElement(choiceSeatsWrapper);
}

function createWrapperForChosenTickets() {
  const template = `<div id="seatsChoice" class="seats_choice">
            <ul id="selectionsBuying" class="ticketsList"></ul>
            <input id ="buyTickets" class="buy_input" type="radio" value="" />
            <label for ="buyTickets" class="buy_label">BUY SELECTED</label>
          </div>`;
  return template;
}

function addDomElement(element) {
  element.insertAdjacentHTML("beforeEnd", createWrapperForChosenTickets());
}

function createTicket(seatNumber) {
  const ticket = ` <li data-ticket = ${seatNumber} class="ticket">
              <h4>${filmName}</h4>
              <span>${seatNumber}</span>
            </li>`;
  return ticket;
}

function addedTicket(ticketsList, chosenSeat) {
  ticketsList.insertAdjacentHTML("beforeEnd", createTicket(chosenSeat));
}

function tellWhatSeatChosen(ticketsList, seat) {
  const basket = ticketsList.children;
  let chosen = null;
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].dataset.ticket === seat.value) {
      chosen = basket[i];
    }
  }
  return chosen;
}

function deleteTicket(ticketsList, chosenSeat) {
  ticketsList.removeChild(chosenSeat);
}

const ticketMovement = {
  true: (ticketsList, ticket) => addedTicket(ticketsList, ticket.value),
  false: (ticketsList, ticket) =>
    deleteTicket(ticketsList, tellWhatSeatChosen(ticketsList, ticket)),
};

const chosenTicketsList = document.querySelector("#selectionsBuying");
const buyButton = document.querySelector(".buy_label");

const visible = {
  true: (item) => (item.style.display = "block"),
  false: (item) => (item.style.display = "none"),
};

seatsInCinema.addEventListener("change", function ({ target }) {
  ticketMovement[target.checked](chosenTicketsList, target);
  visible[!!countsNumberOfSelectedTickets(chosenTicketsList)](buyButton);

  if (target.name === "buyButton") {
    answerAfterSelection[target.id](main);
  }
});

const ticketListWrapper = document.querySelector("#seatsChoice");

ticketListWrapper.addEventListener("change", function ({ target }) {
  visible[false](ticketListWrapper);
  addBuyingMessage(seatsInCinema);
});

function freesUpSpace(item) {
  item.innerHTML = null;
  item.style.display = "block";
}

function createConformingBuyMessage(count, price) {
  const template = `    <div id="basket" class="basket">
      <span id="message" class="basket_span">
        You buy ${count} ticket for ${price} $
      </span>
      <h4>Do you wont to continue?</h4>
      <input id="yes" name="buyButton" class="buy_input" type="radio" value="" />
      <label for="yes" class="btn">Yes</label>
      <input id="no" name="buyButton" class="buy_input" type="radio" value="" />
      <label for="no" class="btn">No</label>
    </div>`;
  return template;
}

function addBuyingMessage(placeWhereAdd) {
  freesUpSpace(placeWhereAdd);
  placeWhereAdd.insertAdjacentHTML(
    "beforeEnd",
    createConformingBuyMessage(
      countsNumberOfSelectedTickets(chosenTicketsList),
      calculatesCostOfTickets(
        countsNumberOfSelectedTickets(chosenTicketsList),
        priceOfTicket
      )
    )
  );
}

function countsNumberOfSelectedTickets(ticketList) {
  let numberOfTickets = ticketList.children.length;
  return numberOfTickets;
}

function calculatesCostOfTickets(amount, price) {
  const priceForChosenTickets = amount * price;
  return priceForChosenTickets;
}

/////////////////////////////// confirming buying ticket(s)

function viewMassage(place, massage) {
  place.insertAdjacentHTML("afterBegin", massage);
}

function createConformBuyMassage() {
  const template = `<div class="message_wrapper">
  <span>Thank for buying,wait confirming message</span>
</div>`;
  return template;
}

function createAbortMessage() {
  const template = `<div class="message_wrapper">
  <span>Thank for visiting our site, please come back next time </span>
</div>`;
  return template;
}

const answerAfterSelection = {
  yes: (place) => viewMassage(place, createConformBuyMassage()),
  no: (place) => viewMassage(place, createAbortMessage()),
};
