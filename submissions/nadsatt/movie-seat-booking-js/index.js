const DAY_CONTROL = document.querySelector('.day-control');
const TIME_CONTROL = document.querySelector('.time-control');
const SEAT_CONTROL = document.querySelector('.seat-control');
const SUBMIT_BUTTON = document.querySelector('.submit-button');
const TICKET_WRAPPER = document.querySelector('.ticket-wrapper');
const TICKET_VALUES = document.querySelectorAll('.ticket__value');
const ORDER_INFO_LIST = document.querySelector('.order__info-list');
const ORDER_TOTAL_PRICE = document.querySelector('.order__total-price-value');
const SEAT_PRICE = 18;
const RENDERED_ORDER_INFO_ITEMS = {};

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
SEAT_CONTROL.addEventListener('input', updateOrderInfoList);

function getSeatHtml(value) {
  const [row, seat] = value.split('_');
  return `<li class="ticket__seat-value-item">Row
              <span class="ticket__row-value">${row}</span>/ Seat
              <span class="ticket__seat-value">${seat}<span>
            </li>`;
}

function fillTicket() {
  const day = DAY_CONTROL.querySelector('.day-control__input:checked').value;
  const {
    value: time,
    dataset: { hall },
  } = TIME_CONTROL.querySelector('input:checked');
  const seat = Array.prototype.map
    .call(SEAT_CONTROL.querySelectorAll('input:checked'), (input) =>
      getSeatHtml(input.value)
    )
    .join('');

  const values = { day, time, hall, seat };

  TICKET_VALUES.forEach((ticketValue) =>
    ticketValue.insertAdjacentHTML('afterbegin', values[ticketValue.id] || '-')
  );
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

function updateOrderInfoList({ srcElement, srcElement: { value } }) {
  if (srcElement.checked) {
    addOrderInfoItem(value);
  } else {
    removeOrderInfoItem(value);
  }
}

function addOrderInfoItem(value) {
  const infoItem = createOrderInfoItem(value);
  ORDER_INFO_LIST.append(infoItem);
  RENDERED_ORDER_INFO_ITEMS[value] = infoItem;
  ORDER_TOTAL_PRICE.textContent = +ORDER_TOTAL_PRICE.textContent + SEAT_PRICE;
}

function createOrderInfoItem(value) {
  const [row, seat] = value.split('_');

  const infoItem = document.createElement('li');
  infoItem.classList.add('order__info-item');
  infoItem.innerHTML = `<div>
        <span>Row</span>
        <span class="order__row-value">${row}</span>
        <span>/&nbsp;Seat&nbsp;</span>
        <span class="order__seat-value">${seat}</span>
       </div>
       <span class="order__price-value">$18</span>`;

  return infoItem;
}

function removeOrderInfoItem(value) {
  RENDERED_ORDER_INFO_ITEMS[value].remove();
  delete RENDERED_ORDER_INFO_ITEMS[value];
  ORDER_TOTAL_PRICE.textContent = +ORDER_TOTAL_PRICE.textContent - SEAT_PRICE;
}
