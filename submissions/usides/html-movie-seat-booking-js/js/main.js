const PRICES = {
  firstRow: 3,
  secondRow: 2,
  thirdRow: 1,
};

const tryBtn = document.querySelector('.try-btn');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('.main');
const form = document.getElementById('control-seat-form');
const orderedBoxes = document.getElementById('ordered-boxes');
const totalPrice = document.getElementById('total-price');
const priceRows = document.querySelectorAll('div[data-row]');

const renderOrder = (selectedBoxes) => {
  if (selectedBoxes.length === 0) {
    orderedBoxes.innerHTML =
      '<p class="control__order__boxes__item">Not selected</p>';
    totalPrice.innerHTML = '0';
    return;
  }

  orderedBoxes.innerHTML = selectedBoxes
    .map((item) => `<p class="control__order__boxes__item">${item.value}</p>`)
    .join('\n');

  totalPrice.innerHTML = selectedBoxes
    .map((item) => {
      if (item.value <= 6) return PRICES.firstRow;
      if (item.value > 6 && item.value <= 13) return PRICES.secondRow;
      return PRICES.thirdRow;
    })
    .reduce((sum, current) => sum + current);
};

const printPrices = () => {
  priceRows.forEach((item) => {
    item.insertAdjacentHTML(
      'beforeend',
      new Array(PRICES[item.dataset.row])
        .fill('<img src="./img/fish.svg" alt="fish logo" />')
        .join('\n')
    );
  });
};

const boxSelectionHandler = ({ target }) => {
  const input = target.closest('input');
  if (!input) return;
  const selectedBoxes = [...form.querySelectorAll('input:checked')];
  renderOrder(selectedBoxes);
};

const tryButtonHandler = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    [overlay, main].forEach((item) => {
      item.classList.remove('hidden-opacity', 'visually-hidden');
    });
  } else {
    document.documentElement.requestFullscreen();
    [overlay, main].forEach((item) => item.classList.add('hidden-opacity'));
  }
};

const removeFromScreen = () => {
  if (document.fullscreenElement) {
    [overlay, main].forEach((item) => item.classList.add('visually-hidden'));
  }
};

const init = () => {
  printPrices();
  tryBtn.addEventListener('click', tryButtonHandler);
  form.addEventListener('click', boxSelectionHandler);
  [overlay, main].forEach((item) => {
    item.addEventListener('transitionend', removeFromScreen);
  });
};

init();
