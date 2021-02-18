const mainScreen = document.querySelector('main');
const selectorForm = document.querySelector('.booking_form');
const draftTicket = document.querySelector('.ticket');
const initialTicketView = draftTicket.innerHTML;
const SEAT_PRICE_IN_USD = 20;
const bookButton = selectorForm.querySelector('.book_button');

const confirmationScreen = document.querySelector('.confirm_screen');
const ticketDateTime = document.querySelector('.ticket_date_time');
const ticketSeats = document.querySelector('.ticket_seats');
const ticketTotal = document.querySelector('.ticket_total');
const cancelButton = document.querySelector('.cancel_confirm_button');
const payButton = document.querySelector('.confirm_button');

let lastSelectedDate = selectorForm.querySelector('.date_selector > .radio_control:checked').getAttribute('aria-label');
let lastSelectedTime = selectorForm.querySelector('.time_selector > .radio_control:checked').getAttribute('aria-label');

const showConfirmScreen = () => {
  mainScreen.classList.add('hidden');
  confirmationScreen.classList.remove('hidden');
};

const hideConfirmScreen = () => {
  confirmationScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
};

const payButtonListener = () => {
  alert('Action disabled!');
}

const bookButtonListener = (event) => {
  const selectedSeats = selectorForm.querySelectorAll('.seat_control:checked');
  if (selectedSeats.length > 0) {
    showConfirmScreen();
  }
  event.preventDefault();
};

const updateTicket = () => {
  const selectedSeats = [...selectorForm.querySelectorAll('.seat_control:checked')];

  if (selectedSeats.length === 0) {
    draftTicket.innerHTML = initialTicketView;
    return;
  }

  const selectedDate = selectorForm.querySelector('.date_selector > .radio_control:checked').getAttribute('aria-label');
  const selectedTime = selectorForm.querySelector('.time_selector > .radio_control:checked').getAttribute('aria-label');

  if (selectedDate !== lastSelectedDate
      || selectedTime !== lastSelectedTime) {
    selectedSeats.forEach(seat => seat.checked = false);
    lastSelectedDate = selectedDate;
    lastSelectedTime = selectedTime;
    draftTicket.innerHTML = initialTicketView;
    return;
  }

  let total = 0;
  draftTicket.innerHTML = `
    <li class="ticket_header">Your order:</li>
    <li>Movie: Interstellar</li>
    <li>----------</li>
    <li>Date: ${selectedDate}</li>
    <li>Time: ${selectedTime}</li>
    <li>----------</li>
    <li>Seats:</li>
    ${selectedSeats.map((seat) => {
      const seatPosition = seat.id.split('_');
      total += SEAT_PRICE_IN_USD;
      return `<li>row #${seatPosition[1]}, seat #${seatPosition[2]}</li>`;
    }).join('')}
    <li>----------</li>
    <li>Total: $${total.toFixed(2)}</li>
  `;
  ticketDateTime.innerHTML = `Show time: ${selectedDate}, ${selectedTime}`;
  ticketSeats.innerHTML = `${selectedSeats.map((seat) => {
    const seatPosition = seat.id.split('_');
    return `<div>row #${seatPosition[1]}, seat #${seatPosition[2]}</div>`;
  }).join('')}`;
  ticketTotal.innerHTML = `Price: $${total.toFixed(2)}`;
};

document.addEventListener('DOMContentLoaded', () => {
  selectorForm.addEventListener('change', updateTicket);
  bookButton.addEventListener('click', bookButtonListener);
  cancelButton.addEventListener('click', hideConfirmScreen);
  payButton.addEventListener('click', payButtonListener);
});
