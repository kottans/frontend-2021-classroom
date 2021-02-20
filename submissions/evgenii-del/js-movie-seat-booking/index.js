const closePopupBtn = document.querySelector('.js-popup__close');
const popup = document.querySelector('.js-popup');
const popupBtn = document.querySelector('.js-popup__btn');
const overlay = document.querySelector('.js-overlay');
const form = document.forms[0];

const openPopup = () => {
  popup.classList.add('popup_active');
  overlay.classList.add('overlay_active');
};

const closePopup = () => {
  popup.classList.remove('popup_active');
  overlay.classList.remove('overlay_active');
};

const createTicketsBlock = (seats) => {
  const fragment = document.createDocumentFragment();
  seats.map((seat) => {
    const [row, column] = seat.split('-');
    const block = document.createElement('div');
    block.className = 'popup__ticket';
    block.innerHTML = `
            <span class="popup__ticket-row">${row} ряд</span>
            <span class="popup__ticket-column">${column} место</span>
            <span class="popup__ticket-price">150 грн.</span>
        `;
    return fragment.appendChild(block);
  });
  return fragment;
};

const changeCartData = (values) => {
  const { months, times, seats } = values;
  const totalPrice = 150 * seats.length;
  const [technology, time] = times.split('-');

  const ticketsBlock = popup.querySelector('.js-popup__tickets');
  const contentBlock = popup.querySelector('.js-popup__content');
  const ticketsFragment = createTicketsBlock(seats);

  ticketsBlock.innerHTML = '';
  contentBlock.innerHTML = `
        <h2 class="popup__title">The Queen's Gambit</h2>
        <span class="popup__technology">${technology}</span>
        <span class="popup__day">${months}</span>
        <span class="popup__time">${time}</span>
    `;
  popupBtn.innerHTML = `
        Buy
        <span>${totalPrice} грн.</span>
    `;

  ticketsBlock.appendChild(ticketsFragment);
  openPopup();
};

const retrieveFormValue = (event) => {
  event.preventDefault();
  const values = {};

  [...form.elements].forEach((field) => {
    const { name } = field;

    if (name) {
      const { value } = field;

      if (name === 'seats' && field.checked) {
        values[name] = values[name] ? [...values[name], value] : [value];
      } else if (field.checked) {
        values[name] = value;
      }
    }
  });

  if (values.seats) {
    changeCartData(values);
  } else {
    alert('Choose seats');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', retrieveFormValue);
  closePopupBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
  popupBtn.addEventListener('click', () => {
    closePopup();
    form.reset();
    alert('Purchase was successful');
  });
});
