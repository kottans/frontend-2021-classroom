const seatsForm = document.querySelector('#tickets');
const seatsCart = document.querySelector('#cart-tickets');
const cartTotal = document.querySelector('#cart-total');
const cart = document.querySelector('#cart');
const modal = document.querySelector('#modal');
const modalConfirmButton = modal.querySelector('#modal-confirm');
const modalCancelButton = modal.querySelector('#modal-cancel');
const modalTotal = modal.querySelector('#modal-total');
const modalAmount = modal.querySelector('#modal-tickets');
const PRICE = 5;

const createSeatTemplate = (seat) => {
  const template = `<div class="selected-seats__ticket">
  <p class="ticket__location">${seat}</p>
  <p class="ticket__price">$${PRICE.toFixed(2)}</p>
</div>`;
  return template;
};

const createTotalTemplate = (seatsAmount) => {
  const total = (PRICE * seatsAmount).toFixed(2);
  return `Total: $${total}`;
};

const updateModal = (seatsAmount) => {
  modalAmount.textContent = seatsAmount
    ? `Seats: ${seatsAmount}`
    : 'No seats selected';
  modalTotal.textContent = seatsAmount ? createTotalTemplate(seatsAmount) : '';
  modalConfirmButton.style.display = seatsAmount ? 'block' : 'none';
};

const clearCart = () => {
  seatsCart.innerHTML = '<p class="cart__empty">No seats selected yet</p>';
  cartTotal.textContent = 'Total: $0.00';
  updateModal(0);
};

const updateCart = (selectedSeatsNodeList) => {
  const seatsAmount = selectedSeatsNodeList.length;
  updateModal(seatsAmount);
  if (!seatsAmount) {
    clearCart();
  } else {
    seatsCart.innerHTML = '';
    selectedSeatsNodeList.forEach((seat) => {
      seatsCart.innerHTML += createSeatTemplate(seat.value);
    });
    cartTotal.textContent = createTotalTemplate(seatsAmount);
  }
};

const showModal = () => {
  modal.style.display = 'flex';
};

const hideModal = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

seatsForm.addEventListener('change', () => {
  const seats = seatsForm.querySelectorAll('input:checked');
  updateCart(seats);
});

cart.addEventListener('click', ({ target }) => {
  if (target.id === 'cart-confirm') {
    document.body.style.overflow = 'hidden';
    showModal();
  } else if (target.id === 'cart-cancel') {
    clearCart();
  }
});

modalCancelButton.addEventListener('click', hideModal);

document.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape') {
    hideModal();
  }
});
