(() => {
  const FORM = document.querySelector('.movie-form');
  const FORM_INPUTS = FORM.querySelectorAll('input:not([name="direction"])');
  const FORM_SEAT_CONTROL = document.querySelector('.seat-control');
  const SUBMIT_BUTTON = document.querySelector('.submit-button');
  const TICKET_WRAPPER = document.querySelector('.ticket-wrapper');
  const TICKET_VALUES = document.querySelectorAll('.ticket__value');
  const ORDER_INFO_LIST = document.querySelector('.order__info-list');
  const ORDER_PLACEHOLDER_ITEM = document.querySelector('.order__placeholder-item');
  const ORDER_TOTAL_PRICE_VALUE = document.querySelector('.order__total-price-value');
  const SEAT_PRICE = 18;
  const RENDERED_ORDER_INFO_ITEMS = {};

  SUBMIT_BUTTON.addEventListener('click', (e) => {
    e.preventDefault();
    SUBMIT_BUTTON.disabled = true;
    fillTicket(FORM_INPUTS);
    showTicketWrapper();
  });
  TICKET_WRAPPER.addEventListener('click', () => {
    SUBMIT_BUTTON.disabled = false;
    hideTicketWrapper();
    resetTicket();
  });
  FORM_SEAT_CONTROL.addEventListener('input', updateOrderInfoList);

  function fillTicket(inputs) {
    const checkedInputs = getCheckedInputs(inputs);
    const values = getValues(checkedInputs);

    TICKET_VALUES.forEach((ticketValue) =>
      ticketValue.insertAdjacentHTML(
        'afterbegin',
        values[ticketValue.id] || '-'
      )
    );
  }

  function getCheckedInputs(inputs) {
    return Array.prototype.filter.call(inputs, (input) => input.checked);
  }

  function getValues(inputs) {
    const values = {};

    values.day = inputs.find(input => input.name === 'day').value;
    values.time = inputs.find(input => input.name === 'time').value;
    values.hall = inputs.find(input => input.name === 'time').dataset.hall;
    values.seat = inputs.filter(input => input.name === 'seat')
      .map(({value}) => {
        const [row, seat] = value.split('_');
        return `<li class="ticket__seat-value-item">Row
                  <span class="ticket__row-value">${row}</span>/ Seat
                  <span class="ticket__seat-value">${seat}<span>
                </li>`
      }).join('');

    return values;
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
    if (isOrderInfoListEmpty()) {
      ORDER_PLACEHOLDER_ITEM.remove();
    }

    const infoItem = createOrderInfoItem(value);
    ORDER_INFO_LIST.append(infoItem);
    RENDERED_ORDER_INFO_ITEMS[value] = infoItem;
    ORDER_TOTAL_PRICE_VALUE.textContent = +ORDER_TOTAL_PRICE_VALUE.textContent + SEAT_PRICE;
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

  function isOrderInfoListEmpty() {
    return Object.keys(RENDERED_ORDER_INFO_ITEMS).length === 0;
  }

  function removeOrderInfoItem(value) {
    RENDERED_ORDER_INFO_ITEMS[value].remove();
    delete RENDERED_ORDER_INFO_ITEMS[value];
    ORDER_TOTAL_PRICE_VALUE.textContent = +ORDER_TOTAL_PRICE_VALUE.textContent - SEAT_PRICE;

    if (isOrderInfoListEmpty()) {
      ORDER_INFO_LIST.append(ORDER_PLACEHOLDER_ITEM);
    }
  }
})();
