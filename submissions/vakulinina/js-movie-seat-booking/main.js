const ticketList = document.querySelector('.tickets-details');
const numberOfTickets = document.querySelector('.tickets-number')
const selectedSeats = [];
const TICKET_PRICE = 5;
let totalPrice = 0;

const updateOrder = (target) => {
  if (target.checked) {
    selectedSeats.push(target);
    totalPrice += TICKET_PRICE;
  } else {
    selectedSeats.splice(selectedSeats.indexOf(target), 1)
    totalPrice -= TICKET_PRICE;
  }
}

const renderOrderSummary = () => {
  ticketList.innerHTML = '';
  if (selectedSeats.length > 0) {
    numberOfTickets.innerText = `${selectedSeats.length} tickets`;
  } else {
    numberOfTickets.innerText = '';
  }
  selectedSeats.forEach(seat => {
    const ticket = document.createElement('li');
    [row, seat] = seat.value.split('-');
    ticket.innerText = `Row ${row} Seat ${seat}`;
    ticketList.append(ticket);
  })
  document.querySelector('.price').innerText = `$${totalPrice.toFixed(2)}`;
}

document.querySelector('.hall').addEventListener('input', ({ target }) => {
  updateOrder(target);
  renderOrderSummary();
})

numberOfTickets.addEventListener('click', (event) => {
  event.preventDefault();
  ticketList.classList.toggle('visually-hidden');
})
