const regularSeatPrice = 50;
const vipSeatPrice = 100;
const vipTag = 'vip';
const seats = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 2, 0, 2, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [3, 3, 3, 3, 4, 3, 3, 3],
];
// 0 is free seat, 1 is inaccessible seat, 2 is used seat, 3 is free vip-seat, 4 is used vip-seat

let selectedSeats = [];

const seatsForm = document.forms.auditorium__selection;
let formSubmitButton;

const auditorium = document.querySelector('.auditorium');
const preOrder = document.querySelector('.pre_order');
const ticketsList = preOrder.querySelector('.pre_order__list');
const orderConfirmationWindow = document.querySelector('.order_confirmation');
const orderConfirmationText = orderConfirmationWindow.querySelector(
  '.order_confirmation__text'
);
const confirmButton = orderConfirmationWindow.querySelector(
  '.order_confirmation__button-confirm'
);
const cancelButton = orderConfirmationWindow.querySelector(
  '.order_confirmation__button-cancel'
);

function prepareRow(rowData, rowIndex) {
  let rowString = '';
  rowData.forEach((item, i) => {
    switch (item) {
      case 0:
        rowString += `<input type="checkbox" id="${`${rowIndex + 1}_${
          i + 1
        }`}"/><label for="${rowIndex + 1}_${
          i + 1
        }" class="seat" data-price="${regularSeatPrice}"></label>`;
        break;
      case 1:
        rowString += `<input type="checkbox" id="${rowIndex + 1}_${
          i + 1
        }" disabled /><label for="${rowIndex + 1}_${
          i + 1
        }" class="seat"></label>`;
        break;
      case 2:
        rowString += `<input type="checkbox" id="${rowIndex + 1}_${
          i + 1
        }" disabled checked /><label for="${rowIndex + 1}_${
          i + 1
        }" class="seat"></label>`;
        break;
      case 3:
        rowString += `<input type="checkbox" id="${rowIndex + 1}_${
          i + 1
        }" data-type="vip"><label for="${rowIndex + 1}_${
          i + 1
        }" class="seat" data-price="${vipSeatPrice}" /></label>`;
        break;
      case 4:
        rowString += `<input type="checkbox" id="${rowIndex + 1}_${
          i + 1
        }" disabled checked data-type="vip"/><label for="${rowIndex + 1}_${
          i + 1
        }" class="seat"/></label>`;
    }
  });
  return rowString;
}

function initAuditorium() {
  let renderString = '';
  seats.forEach((item, i) => {
    renderString += `<div class="auditorium__row">${prepareRow(item, i)}</div>`;
  });
  renderString += '<input type="submit" class="seats_submit" value="Заказать">';
  seatsForm.innerHTML = renderString;
  formSubmitButton = seatsForm.querySelector('.seats_submit');
  seatsForm.addEventListener('submit', submitSelectedTickets);
  seatsForm.addEventListener('change', calculatePreOrder);
}

function prepareTicketsList() {
  let renderString = '';
  selectedSeats.forEach((item) => {
    renderString += `<li class="pre_order__item">ряд ${item[0]}, место ${item[1]}</li>`;
  });
  ticketsList.innerHTML = renderString;
}

function calculatePreOrder() {
  const checkedNodeList = seatsForm.querySelectorAll(
    'input[type=checkbox]:checked:not(:disabled)'
  );
  if (checkedNodeList.length > 0) {
    selectedSeats = [...checkedNodeList].map(({ id, dataset }) => [
      parseInt(id, 10),
      parseInt(id.slice(id.indexOf('_') + 1), 10),
      dataset.type,
    ]);
    prepareTicketsList();
    auditorium.classList.add('auditorium-tight');
    preOrder.classList.remove('pre_order-hidden');
  } else if (checkedNodeList.length === 0) {
    selectedSeats = [];
    auditorium.classList.remove('auditorium-tight');
    preOrder.classList.add('pre_order-hidden');
  }
}

function confirmOrder() {
  function payOrder() {
    location.reload();
  }

  function cancelOrder() {
    orderConfirmationWindow.classList.toggle('order_confirmation-hidden');
    document.removeEventListener('keydown', modalKeyHandler);
    confirmButton.removeEventListener('click', payOrder);
    cancelButton.removeEventListener('click', cancelOrder);
    formSubmitButton.focus();
  }

  function modalKeyHandler(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === confirmButton) {
          e.preventDefault();
          cancelButton.focus();
        }
      } else {
        if (document.activeElement === cancelButton) {
          e.preventDefault();
          confirmButton.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      cancelOrder();
    }
  }

  function performTicketsString(ticketsNumber) {
    const words = ['билет', 'билета', 'билетов'];
    if (Math.abs(ticketsNumber % 100) > 20) ticketsNumber %= 10;
    return words[
      (ticketsNumber > 4 || ticketsNumber === 0) + (ticketsNumber !== 1)
    ];
  }

  function calculatePrice() {
    return selectedSeats.reduce(
      (sum, item) =>
        item[2] === vipTag ? (sum += vipSeatPrice) : (sum += regularSeatPrice),
      0
    );
  }

  orderConfirmationText.innerHTML = `Вы заказали ${
    selectedSeats.length
  } ${performTicketsString(
    selectedSeats.length
  )} на сумму ${calculatePrice()} грн`;
  orderConfirmationWindow.classList.toggle('order_confirmation-hidden');
  confirmButton.focus();
  confirmButton.addEventListener('click', payOrder);
  cancelButton.addEventListener('click', cancelOrder);
  document.addEventListener('keydown', modalKeyHandler);
}

function submitSelectedTickets(e) {
  e.preventDefault();
  if (selectedSeats.length === 0) {
    return;
  }
  confirmOrder();
}

initAuditorium();
