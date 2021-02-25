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
const lastSelected = {
  date: selectorForm.querySelector('.date_selector > .radio_control:checked').getAttribute('aria-label'),
  time: selectorForm.querySelector('.time_selector > .radio_control:checked').getAttribute('aria-label')
};

export {
  mainScreen,
  selectorForm,
  draftTicket,
  initialTicketView,
  SEAT_PRICE_IN_USD,
  bookButton,
  confirmationScreen,
  ticketDateTime,
  ticketSeats,
  ticketTotal,
  cancelButton,
  payButton,
  lastSelected,
};
