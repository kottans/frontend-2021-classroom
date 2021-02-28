import makeModal from './modal.js';

const makeMsg = (ticketsAmount, totalPrice) => {
  if (!ticketsAmount) return 'No seat selected';
  return `You have selected ${ticketsAmount} seats for a price of $${totalPrice}`;
};

const renderApp = ({ ticketsAmount, totalPrice }) => {
  const cartTip = document.querySelector('.add-to-cart-block p');
  cartTip.textContent = makeMsg(ticketsAmount, totalPrice);
};

const app = () => {
  const form = document.querySelector('form');
  const modal = document.querySelector('.modal');
  const addToCartBtn = document.querySelector('.add-to-cart-block button');

  const toggleModal = () => {
    modal.classList.toggle('show-modal');
  };

  const state = {
    ticketPrice: 24,
    cart: [],
    totalPrice: null,
    ticketsAmount: null,
  };

  form.addEventListener('click', (event) => {
    const { currentTarget } = event;

    const seats = currentTarget.querySelectorAll('input:checked');
    const seatsData = [...seats].map((seat) => seat.value);

    state.cart = seatsData;
    state.ticketsAmount = seatsData.length;
    state.totalPrice = state.ticketsAmount * state.ticketPrice;
    renderApp(state);
  });

  addToCartBtn.addEventListener('click', (event) => {
    event.preventDefault();

    modal.innerHTML = makeModal(state);
    toggleModal();
  });

  document.addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 27) toggleModal();
  });

  modal.addEventListener('click', (event) => {
    const closeBtn = modal.querySelector('.close-button');
    if (event.target === modal) toggleModal();
    if (event.target === closeBtn) toggleModal();
  });
};

export default app;
