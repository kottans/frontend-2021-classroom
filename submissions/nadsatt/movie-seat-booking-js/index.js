const DAY_CONTROL = document.querySelector('.day-control');
const TIME_CONTROL = document.querySelector('.time-control');
const SEAT_CONTROL = document.querySelector('.seat-control');
const SUBMIT_BUTTON = document.querySelector('.submit-button');
const TICKET_WRAPPER = document.querySelector('.ticket-wrapper');
const TICKET_VALUES = document.querySelectorAll('.ticket__value');
const ORDER_SEAT_VALUE_LIST = document.querySelector('.order__seat-value-list');
const ORDER_PLACEHOLDER_ITEM = `
  <li class="order__seat-value-item order__placeholder-item">
    <div>
      <span>Row</span>
      <span class="order__row"></span>
      <span>/&nbsp;Seat&nbsp;</span>
      <span class="order__seat"></span>
    </div>
    <span class="order__price">$</span>
  </li>`;
const ORDER_TOTAL_PRICE = document.querySelector('.order__total-price');
const SEAT_PRICE = 18;

SUBMIT_BUTTON.addEventListener('click', (e) => {
  e.preventDefault();
  SUBMIT_BUTTON.disabled = true;
  fillTicket();
  showTicketWrapper();
});
TICKET_WRAPPER.addEventListener('click', () => {
  SUBMIT_BUTTON.disabled = false;
  hideTicketWrapper();
  resetTicket();
});
SEAT_CONTROL.addEventListener('input', () => {
  const checkedSeats = SEAT_CONTROL.querySelectorAll(':checked');
  updateOrderSeatValueList(checkedSeats);
  updateOrderTotalPrice(checkedSeats);
});

function fillTicket() {
  const day = DAY_CONTROL.querySelector('.day-control__input:checked').value;
  const {
    value: time,
    dataset: { hall },
  } = TIME_CONTROL.querySelector('input:checked');
  const seat = Array.prototype.map
    .call(SEAT_CONTROL.querySelectorAll('input:checked'), (input) =>
      getTicketSeatValueItem(input.value)
    )
    .join('');

  const values = { day, time, hall, seat };

  TICKET_VALUES.forEach((ticketValue) =>
    ticketValue.insertAdjacentHTML('afterbegin', values[ticketValue.id] || '-')
  );
}

function getTicketSeatValueItem(value) {
  const [row, seat] = value.split('_');
  return `<li class="ticket__seat-value-item">Row
            <span class="ticket__row-value">${row}</span>/ Seat
            <span class="ticket__seat-value">${seat}<span>
          </li>`;
}

function showTicketWrapper() {
  TICKET_WRAPPER.classList.add('ticket-wrapper--visible');
}

function hideTicketWrapper() {
  TICKET_WRAPPER.classList.remove('ticket-wrapper--visible');
}

function resetTicket() {
  TICKET_VALUES.forEach((ticketValue) => (ticketValue.textContent = ''));
}

function updateOrderSeatValueList(checkedSeats) {
  let orderSeatValueItems = '';
  if (!checkedSeats.length) {
    orderSeatValueItems = ORDER_PLACEHOLDER_ITEM;
  } else {
    checkedSeats.forEach(
      (seat) => (orderSeatValueItems += getOrderSeatValueItem(seat))
    );
  }
  ORDER_SEAT_VALUE_LIST.innerHTML = orderSeatValueItems;
}

function getOrderSeatValueItem({ value }) {
  const [row, seat] = value.split('_');
  return `<li class="order__seat-value-item">
            <div>
              <span>Row</span>
              <span class="order__row">${row}</span>
              <span>/&nbsp;Seat&nbsp;</span>
              <span class="order__seat">${seat}</span>
            </div>
            <span class="order__price">$18</span>
          </li>`;
}

function updateOrderTotalPrice(checkedSeats) {
  ORDER_TOTAL_PRICE.textContent = checkedSeats.length * SEAT_PRICE;
}
