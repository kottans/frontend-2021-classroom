/* eslint-disable no-param-reassign */
const bookingButton = document.querySelector('#booking-button');
const hall = document.querySelector('.hall');
const bookedField = document.querySelector('.booked');
const checkoutScreen = document.querySelector('#checkout');
const backButton = document.querySelector('#back-button');
const payButton = document.querySelector('#pay-button');
const checkoutContent = document.querySelector('#checkout-content');
const sceduleContainer = document.querySelector('.schedule');
const price = 10;

const ticketTemplate = `
  <div id="{{ ticketId }}" class="booked__item">
    <p class="booked__seat-row">Row: <span class="highlight-text">{{ rowNum }}</span></p>
    <p class="booked__seat">Seat: <span class="highlight-text">{{ seatNum }}</span></p>
    <p class="booked__price">Price: $<span class="highlight-text">${price}</span></p>
  </div>`;

function addTicket(container, templateItem) {
  container.insertAdjacentHTML('beforeend', templateItem);
}

function removeTicket(container, item) {
  container.removeChild(item);
}

function uncheckSeats() {
  const checkedSeats = document.querySelectorAll('.seats__input:checked');
  // eslint-disable-next-line no-return-assign
  checkedSeats.forEach((seat) => (seat.checked = false));
}

function clearBookedField({ target }) {
  if (target.classList.contains('schedule__input')) {
    bookedField.innerHTML = '';
    uncheckSeats();
  }
}

function fillBookedField(templateMain, templateItem, target, container, item) {
  if (!bookedField.hasChildNodes()) {
    bookedField.innerHTML = templateMain;
  } else if (!target.checked) {
    removeTicket(container, item);
  } else {
    addTicket(container, templateItem);
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

  const bookedTemplate = `<div class="booked__container">
    <h4 class="booked__title">Your booking:</h4>
    <p class="booked__date">
      Date: <span class="highlight-text">${chosenDate}</span>
    </p>
    <p class="booked__time">
      Time: <span class="highlight-text">${chosenTime}</span>
    </p>
    ${chosenTicket}
  </div>`;

  const bookedContainer = document.querySelector('.booked__container');
  const bookedItem = document.getElementById(`${ticketId}`);

  fillBookedField(
    bookedTemplate,
    chosenTicket,
    target,
    bookedContainer,
    // eslint-disable-next-line comma-dangle
    bookedItem
  );
}

function fillCheckout() {
  const chosenDate = document.querySelector('.input-date:checked').value;
  const chosenTime = document.querySelector('.input-time:checked').value;
  const chosenTickets = [...document.querySelectorAll('.seats__input:checked')];

  let totalPrice = 0;

  const checkoutTemplate = `
  <p class="checkout__details">
    Date: <span class="highlight-text">${chosenDate}</span>
  </p>
  <p class="checkout__details">
    Time: <span class="highlight-text">${chosenTime}</span>
  </p>
        
  ${chosenTickets
    .map((ticket) => {
      const [rowNum, seatNum] = ticket.value.split('-');
      totalPrice += price;
      const checkoutTicketTemplate = ticketTemplate
        .replace('{{ rowNum }}', `${rowNum}`)
        .replace('{{ seatNum }}', `${seatNum}`);
      return checkoutTicketTemplate;
    })
    .join('')}
        <div class="checkout__price">
          Total: $<span class="highlight-text">${totalPrice}</span>
        </div>
  `;
  checkoutContent.innerHTML = checkoutTemplate;
}

function showCheckoutScreen(e) {
  e.preventDefault();
  fillCheckout();
  checkoutScreen.classList.add('show');
}

backButton.addEventListener('click', () => {
  checkoutScreen.classList.remove('show');
});

payButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('Thank you for order!');
  setTimeout(() => {
    checkoutScreen.classList.remove('show');
  }, 1000);
});

sceduleContainer.addEventListener('click', clearBookedField);
hall.addEventListener('click', setBookedField);
bookingButton.addEventListener('click', showCheckoutScreen);
