const MOVIE_HALL = document.querySelector('.seats-container');
const ORDER_LIST = document.querySelector('.order__list');
const TOTAL_PRICE = document.querySelector('.total-price');

const TICKET_PRICE = 5;
let totalOrderPrice = 0;
const chosenSeats = [];

const updateList = (target) => {
  const seat = target.closest('input');
  if (seat.checked) {
    chosenSeats.push(seat);
    totalOrderPrice += TICKET_PRICE;
  } else {
    chosenSeats.splice(chosenSeats.indexOf(seat), 1);
    totalOrderPrice -= TICKET_PRICE;
  }

  TOTAL_PRICE.innerHTML = `Total: $${totalOrderPrice}`;
};

const showOrderList = () => {
  ORDER_LIST.innerHTML = '';
  chosenSeats.forEach((seat) => {
    const orderLine = document.createElement('li');
    orderLine.classList.add('order__list-item');
    orderLine.innerText = `${seat.value} $${TICKET_PRICE}`;
    ORDER_LIST.append(orderLine);
  });
  return ORDER_LIST;
};

MOVIE_HALL.addEventListener('change', ({ target }) => {
  updateList(target);
  showOrderList();
});
