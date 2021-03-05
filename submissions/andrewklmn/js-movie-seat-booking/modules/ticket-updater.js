import {
  selectorForm,
  draftTicket,
  initialTicketView,
  SEAT_PRICE_IN_USD,
  ticketDateTime,
  ticketSeats,
  ticketTotal,
  lastSelected,
} from './config';

import getSelectedSeats from './seat-selector';

export default function updateTicket() {
  const selectedSeats = getSelectedSeats(selectorForm);

  if (selectedSeats.length === 0) {
    draftTicket.innerHTML = initialTicketView;
    return;
  }

  const selectedDate = selectorForm.querySelector('.date_selector > .radio_control:checked').getAttribute('aria-label');
  const selectedTime = selectorForm.querySelector('.time_selector > .radio_control:checked').getAttribute('aria-label');

  if (selectedDate !== lastSelected.date
      || selectedTime !== lastSelected.time) {
    selectedSeats.forEach(seat => { seat.checked = false; });
    lastSelected.date = selectedDate;
    lastSelected.time = selectedTime;
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
}
