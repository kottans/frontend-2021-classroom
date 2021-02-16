const seatsForm = document.querySelector('#tickets');
const seatsCart = document.querySelector('#cart-tickets');
const cartTotal = document.querySelector('#cart-total');
const confirmButton = document.querySelector('#cart-confirm');
const cancelButton = document.querySelector('#cart-cancel');
const modal = document.querySelector('#modal');
const modalConfirmButton = modal.querySelector('#modal-confirm');
const modalCancelButton = modal.querySelector('#modal-cancel');
const modalTotal = modal.querySelector('#modal-total');
const modalSeats = modal.querySelector('#modal-tickets');
let selectedSeatsStore = [];
const PRICE = 5;

const createSelectedSeatsTemplates = (selectedSeats) => {
  const templates = selectedSeats.map(
    (seat) => `<div class="selected-seats__ticket">
                    <p class="ticket__location">${seat}</p>
                    <p class="ticket__price">$${PRICE.toFixed(2)}</p>
                </div>`
  );
  return templates;
};

const addSeat = (seatToAdd, selectedSeats) => {
  selectedSeats.push(seatToAdd);
};

const showTotal = (selectedSeats) => {
  let total = (PRICE * selectedSeats.length).toFixed(2);
  cartTotal.textContent = `Total: $${total}`;
};

const updateCart = (selectedSeats) => {
  let seats = createSelectedSeatsTemplates(selectedSeats);
  seatsCart.innerHTML = '';
  seats.forEach((seat) => {
    seatsCart.innerHTML += seat;
  });
  if (seats.length === 0) {
    seatsCart.innerHTML = '<p class="cart__empty">No seats selected yet</p>';
  }
  showTotal(selectedSeats);
};

const removeSeat = (seatToRemove, selectedSeats) => {
  let index = selectedSeats.indexOf(seatToRemove);
  selectedSeats.splice(index, 1);
};

const updateModal = (selectedSeats) => {
  let seats = selectedSeats.length;
  let total = (seats * PRICE).toFixed(2);
  modalSeats.textContent = seats > 0 ? `Seats: ${seats}` : 'No seats selected';
  modalTotal.textContent = seats > 0 ? `Total: $${total}` : '';
  modalConfirmButton.style.display = seats > 0 ? 'block' : 'none';
};

const showModal = () => {
  modal.style.display = 'flex';
};

const hideModal = () => {
  modal.style.display = 'none';
};

seatsForm.addEventListener('click', ({ target }) => {
  let seat = target.closest('.seat__input');
  if (seat) {
    if (seat.checked) {
      addSeat(seat.value, selectedSeatsStore);
    } else {
      removeSeat(seat.value, selectedSeatsStore);
    }
    updateCart(selectedSeatsStore);
  }
});

confirmButton.addEventListener('click', () => {
  updateModal(selectedSeatsStore);
  showModal();
});

cancelButton.addEventListener('click', () => {
  selectedSeatsStore = [];
  updateCart(selectedSeatsStore);
});

modalCancelButton.addEventListener('click', () => {
  hideModal();
});
