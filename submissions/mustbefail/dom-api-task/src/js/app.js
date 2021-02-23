import makeModal from './modal.js';

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
  form.addEventListener('click', (event) => {
    const { currentTarget } = event;

    const seats = currentTarget.querySelectorAll('input:checked');
    const seatsData = Array.from(seats).map((seat) => seat.value);

    state.cart = seatsData;
    state.ticketsAmount = seatsData.length;
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
