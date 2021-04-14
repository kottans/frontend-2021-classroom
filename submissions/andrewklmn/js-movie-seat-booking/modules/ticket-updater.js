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

const MAX_DETAILED_SEATS_IN_TICKET = 6;
const MAX_LENGTH_OF_SIMPLE_SEAT_LIST = 4;

function getShortedSeatsInRowRecord(seats) {
  if (seats.length < MAX_LENGTH_OF_SIMPLE_SEAT_LIST) {
    return seats.join(',');
  }

  const sequences = [[seats[0]]];
  let currentSequenceIndex = 0;

  let i = 1;
  while (i < seats.length) {
    if (seats[i] - seats[i - 1] === 1) {
      sequences[currentSequenceIndex][1] = seats[i];
    } else {
      currentSequenceIndex += 1;
      sequences.push([seats[i]]);
    }
    i += 1;
  }

  return sequences.map((sequence) => {
    if (sequence.length === 1) {
      return sequence[0];
    }
    if (sequence[1] - sequence[0] === 1) {
      return sequence.join(',');
    }
    return sequence.join('-');
  }).join(',');
}

function getSeatPosition(seatElement) {
  const seatPosition = seatElement.id.split('_');
  return {
    row: seatPosition[1],
    seat: seatPosition[2],
  };
}

function drawTicketPosition(selectedSeats) {
  if (selectedSeats.length <= MAX_DETAILED_SEATS_IN_TICKET) {
    return selectedSeats.map((nextSeat) => {
      const { row, seat } = getSeatPosition(nextSeat);
      return `<li>row#${row} seat:${seat}</li>`;
    }).join('');
  }

  const selectedRows = selectedSeats.reduce((acc, nextSeat) => {
    const { row } = getSeatPosition(nextSeat);
    if (!acc.includes(row)) {
      acc.push(row);
    }
    return acc;
  }, []);

  let answer = '';

  selectedRows.forEach((nextRow) => {
    const seatsInRow = [];
    selectedSeats.forEach((x) => {
      const { row, seat } = getSeatPosition(x);
      if (nextRow === row) {
        seatsInRow.push(seat);
      }
    });
    answer += `<li>row#${nextRow} seat:${getShortedSeatsInRowRecord(seatsInRow)}</li>`;
  });
  return answer;
}

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
    selectedSeats.forEach((seat) => {
      const toBeChecked = seat;
      toBeChecked.checked = false;
    });
    lastSelected.date = selectedDate;
    lastSelected.time = selectedTime;
    draftTicket.innerHTML = initialTicketView;
    return;
  }

  const total = selectedSeats.length * SEAT_PRICE_IN_USD;

  draftTicket.innerHTML = `
    <li class="ticket_header">Your order:</li>
    <li>Movie: Interstellar</li>
    <li>Date: ${selectedDate}</li>
    <li>Time: ${selectedTime}</li>
    <li>-------------</li>
    ${drawTicketPosition(selectedSeats)}
    <li>-------------</li>
    <li>Number of seats:&nbsp;${selectedSeats.length}</li>
    <li>Price: $${total.toFixed(2)}</li>
  `;

  ticketDateTime.innerHTML = `Show time: ${selectedDate}, ${selectedTime}`;
  ticketSeats.innerHTML = drawTicketPosition(selectedSeats);
  ticketTotal.innerHTML = `Number of seats:&nbsp;${selectedSeats.length}</br>
    Price: $${total.toFixed(2)}`;
}
