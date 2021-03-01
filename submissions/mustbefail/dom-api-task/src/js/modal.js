const makeTicketTemplate = (ticket) => {
  const { rowNumber, seatNumber } = ticket;
  return `
    <div class="ticket-data">
      <span class="row">Row:</br>${rowNumber}</span>
      <span class="seat">Seat:</br> ${seatNumber}</span>
      <span class="time">11/03/2201 </br>17:00</span>
      <span class="price">price: </br>$24</span>
    </div>`;
};

const parseTicket = (ticket) => {
  const [row, seat] = ticket.split('_');
  const rowNumber = row.split(' ')[1];
  const seatNumber = seat.split(' ')[1];
  return { seatNumber, rowNumber };
};

const makeTicketPool = (cart) => cart
  .map((ticket) => {
    const parsedTicket = parseTicket(ticket);
    return makeTicketTemplate(parsedTicket);
  })
  .join('');

const makeModal = (state) => {
  const { cart, totalPrice } = state;
  return `
    <div class="modal-content">
      <div class="header">
        <h1>Cart</h1>
        <span class="close-button">&times;</span>
      </div>
      <div class="ticket">
      <h3 class="film">The Devil All the Time</h3>
      ${makeTicketPool(cart) || 'No tickets selected'}
      </div>
      <div class="footer">
      <a class="btn-green" href="#"><span>Total: $${totalPrice || 0}</span></a>
      </div>
    </div>
  `;
};

export default makeModal;
