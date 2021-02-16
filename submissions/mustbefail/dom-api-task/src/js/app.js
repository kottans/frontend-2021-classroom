import makeModal from './modal';

const makeMsg = (ticketsAmount, totalPrice) => {
  if (!ticketsAmount) return 'No seat selected';
  return `You have selected ${ticketsAmount} seats for a price of $${totalPrice}`;
};

const render = ({ ticketsAmount, totalPrice }) => {
  const cartTip = document.querySelector('.add-to-cart-block p');
  cartTip.textContent = makeMsg(ticketsAmount, totalPrice);
};

export default () => {
  const state = {
    ticketPrice: 24,
    cart: [],
    totalPrice: null,
    ticketsAmount: null,
  };

  const form = document.querySelector('form');
  form.addEventListener('change', (event) => {
    const { currentTarget } = event;
    const seats = null || currentTarget.elements;
    const checkedSeats = Array.from(seats)
      .filter((seat) => seat.checked)
      .map((seat) => seat.value);

    state.cart = checkedSeats;
    state.ticketsAmount = checkedSeats.length;
    state.totalPrice = state.ticketsAmount * state.ticketPrice;

    render(state);
  });

  const modal = document.querySelector('.modal');

  const toggleModal = () => {
    modal.classList.toggle('show-modal');
  };

  const addToCartBtn = document.querySelector('.add-to-cart-block button');
  addToCartBtn.addEventListener('click', (event) => {
    event.preventDefault();

    modal.innerHTML = makeModal(state);
    toggleModal();
  });

  modal.addEventListener('click', (event) => {
    const closeBtn = modal.querySelector('.close-button');

    if (event.target === modal) toggleModal();
    if (event.target === closeBtn) toggleModal();
  });
};
