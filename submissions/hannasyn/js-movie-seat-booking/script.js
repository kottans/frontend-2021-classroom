/* eslint-disable no-alert */
const bookingButton = document.querySelector('#booking-button');
const hall = document.querySelector('.hall');
const checkoutScreen = document.querySelector('#checkout');
const backButton = document.querySelector('#back-button');
const payButton = document.querySelector('#pay-button');
const sceduleContainer = document.querySelector('.schedule');
const bookedContainer = document.querySelector('.booked__container');
const dateContainer = document.querySelector('#dateContainer');
const timeContainer = document.querySelector('#timeContainer');
const bookedItemContainer = document.querySelector('#bookedItemContainer');
const checkoutTickets = document.querySelector('#checkoutTickets');
const checkoutDate = document.querySelector('#checkoutDate');
const checkoutTime = document.querySelector('#checkoutTime');
const checkoutTotalPrice = document.querySelector('#checkoutTotalPrice');
const body = document.querySelector('body');
const price = 10;

const ticketTemplate = `
  <div id="{{ ticketId }}" class="booked__item">
    <p class="booked__seat-row">Row: <span class="highlight-text">{{ rowNum }}</span></p>
    <p class="booked__seat">Seat: <span class="highlight-text">{{ seatNum }}</span></p>
    <p class="booked__price">Price: $<span class="highlight-text">${price}</span></p>
  </div>`;

function addTicket(ticket) {
  bookedItemContainer.insertAdjacentHTML('beforeend', ticket);
}

function removeTicket(item) {
  bookedItemContainer.removeChild(item);
}

function uncheckSeats() {
  const checkedSeats = document.querySelectorAll('.seats__input:checked');
  checkedSeats.forEach((seat) => {
    // eslint-disable-next-line no-param-reassign
    seat.checked = false;
  });
}

function clearBookedField() {
  bookedContainer.classList.remove('show');
  bookedItemContainer.innerHTML = '';
  uncheckSeats();
}

function clickedScedule({ target }) {
  if (target.classList.contains('schedule__input')) {
    clearBookedField();
  }
}

function fillBookedField(ticket, target, item) {
  if (!target.checked) {
    removeTicket(item);
  } else {
    bookedContainer.classList.add('show');
    addTicket(ticket);
  }
}

function setBookedField({ target }) {
  if (!target.classList.contains('seats__input')) {
    return;
  }

  const [rowNum, seatNum] = target.value.split('-');
  const chosenDate = document.querySelector('.input-date:checked').value;
  const chosenTime = document.querySelector('.input-time:checked').value;

  const ticketId = target.value;
  const chosenTicket = ticketTemplate
    .replace('{{ ticketId }}', `${ticketId}`)
    .replace('{{ rowNum }}', `${rowNum}`)
    .replace('{{ seatNum }}', `${seatNum}`);
  dateContainer.innerHTML = chosenDate;
  timeContainer.innerHTML = chosenTime;

  const currentBookedItem = document.getElementById(`${ticketId}`);

  fillBookedField(chosenTicket, target, currentBookedItem);
}

function fillCheckout() {
  const chosenDate = document.querySelector('.input-date:checked').value;
  const chosenTime = document.querySelector('.input-time:checked').value;
  const chosenTickets = [...document.querySelectorAll('.seats__input:checked')];

  let totalPrice = 0;

  checkoutDate.innerHTML = chosenDate;
  checkoutTime.innerHTML = chosenTime;

  const chosenTicket = chosenTickets
    .map((ticket) => {
      const [rowNum, seatNum] = ticket.value.split('-');
      totalPrice += price;
      const checkoutTicketTemplate = ticketTemplate
        .replace('{{ rowNum }}', `${rowNum}`)
        .replace('{{ seatNum }}', `${seatNum}`)
        .replace('id="{{ ticketId }}"', '');
      return checkoutTicketTemplate;
    })
    .join('');

  checkoutTotalPrice.innerHTML = totalPrice;
  checkoutTickets.innerHTML = chosenTicket;
}

function showCheckoutScreen(e) {
  e.preventDefault();
  if (!bookedItemContainer.hasChildNodes()) {
    alert('First choose your seat!');
    return;
  }
  fillCheckout();
  body.classList.add('lock');
  checkoutScreen.classList.add('show');
}

function closeCheckoutScreen() {
  checkoutScreen.classList.remove('show');
  body.classList.remove('lock');
}

payButton.addEventListener('click', () => {
  alert('Thank you for order!');
  setTimeout(() => {
    closeCheckoutScreen();
    clearBookedField();
  }, 1000);
});

backButton.addEventListener('click', closeCheckoutScreen);
sceduleContainer.addEventListener('click', clickedScedule);
hall.addEventListener('click', setBookedField);
bookingButton.addEventListener('click', showCheckoutScreen);
