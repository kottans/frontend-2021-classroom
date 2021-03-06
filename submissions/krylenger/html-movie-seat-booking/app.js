const bodyContainer = document.getElementById('body-container'),
      hall = document.getElementById('choose-section__hall'),
      confirmationSection = document.getElementById('choose-section__chosen-tickets'),
      confirmationSectionInnerContainer = document.getElementById('chosen-tickets__inner'),
      ticketsContainer = document.getElementById('chosen-tickets__tickets-container'),
      checkoutButton = document.getElementById('checkout-seats__checkout-button');

const postPaymentDelay = 2000;

const state = {
  chosenSeats: [],
};

const removeSeat = (currentSeat, chosenSeatsArray) =>
  (chosenSeatsArray = chosenSeatsArray.filter((seatInArray) => seatInArray !== currentSeat));

const addSeat = (seat, chosenSeatsArray) => {
  chosenSeatsArray.push(seat);
  return chosenSeatsArray;
};

const checkIfSeatAlreadyChosen = (seat, chosenSeatsArray) =>
  (chosenSeatsArray = chosenSeatsArray.includes(seat)
    ? removeSeat(seat, chosenSeatsArray)
    : addSeat(seat, chosenSeatsArray));

const updateChosenSeats = (seat, chosenSeatsArray) =>
  (chosenSeatsArray = checkIfSeatAlreadyChosen(seat, chosenSeatsArray));

createTicketTemplate = ([row, seat], index) => `<div class="chosen-tickets__ticket">
  <span class="chosen-tickets__dot"></span>
  <span class="chosen-tickets__span-bold">${++index}.</span>
  <div class="chosen-tickets__row-seat">
    <span>Row: ${row}</span>
    <span>Seat: ${seat}</span>
  </div>
  <span class="chosen-tickets__span-bold">7$</span>
</div>`;

createModalConfirmationTemplate = () => `<section class="choose-section__chosen-tickets choose-section__chosen-tickets--modal chosen-tickets__modal-wrapper" id="choose-section__chosen-tickets">
<div class="chosen-tickets chosen-tickets__inner" id="chosen-tickets__inner">
  <div class="chosen-tickets__header">
    <span class="chosen-tickets__dot chosen-tickets__dot--main"></span>
    <button class="chosen-tickets__button--go-back" id="chosen-tickets__button--go-back">cancel</button>
  </div>
  <h3 class="choose-section__title">Please double check</h3>
  <div class="chosen-tickets__tickets-container chosen-tickets__tickets-container--modal" id="chosen-tickets__tickets-container--modal">
  </div>
  <a class="checkout-seats__checkout-button" id="checkout-seats__checkout-button--modal" type="submit">
    Pay
  </a>
</div>
</section>`;

const createModalConfirmation = (modalConfirmationTemplate) => {
  const modalConfirmation = document.createElement('div');
  modalConfirmation.setAttribute('id', 'modal-wrapper');
  modalConfirmation.innerHTML = modalConfirmationTemplate;
  bodyContainer.append(modalConfirmation);
};

const emptyContainer = (container) => {
  container.innerHTML = '';
};

const convertStringRowSeatToNumberValues = (stringValue) =>
  stringValue.split('.').map((stringNumber) => parseInt(stringNumber));

const renderSuccessfulPaymentConfirmation = (containerWhereRender, buttonToRenderSuccessfulPayment) => {
  emptyContainer(containerWhereRender);
  containerWhereRender.innerHTML = '√ SUCCESSFUL PAYMENT';
  buttonToRenderSuccessfulPayment.innerHTML = 'SUCCESSFUL';
}

const renderConfirmationTickets = (chosenSeatsArray, containerWhereRender) => {
  emptyContainer(containerWhereRender);
  chosenSeatsArray.forEach((ticketValue, index) => {
    const rowSeatArray = convertStringRowSeatToNumberValues(ticketValue);
    const newTicket = createTicketTemplate(rowSeatArray, index);
    containerWhereRender.innerHTML += newTicket;
  });
};

const renderButtonInformation = (chosenSeatsState, button) => {
  let ticketWord = 'tickets';
  if (chosenSeatsState.length === 1) ticketWord = 'ticket';
  button.innerHTML = `Buy ${chosenSeatsState.length} ${ticketWord} for $${chosenSeatsState.length * 7}.00`;
};

const render = (chosenSeatsState, containerWhereRenderTickets, buttonToRenderTotalInformation) => {
  renderConfirmationTickets(chosenSeatsState, containerWhereRenderTickets);
  renderButtonInformation(chosenSeatsState, buttonToRenderTotalInformation);
};

const renderModalConfirmation = (template, chosenSeatsState, resetStateFunc) => {
  createModalConfirmation(template);

  const ticketsContainerModal = document.getElementById('chosen-tickets__tickets-container--modal'),
        buttonCloseModalConfirmation = document.getElementById('chosen-tickets__button--go-back'),
        modalWrapper = document.getElementById('modal-wrapper'),
        checkoutButtonModal = document.getElementById('checkout-seats__checkout-button--modal');

  render(chosenSeatsState, ticketsContainerModal, checkoutButtonModal);

  buttonCloseModalConfirmation.addEventListener('click', () => {
    modalWrapper.remove();
  });
  checkoutButtonModal.addEventListener('click', () => {
    renderSuccessfulPaymentConfirmation(ticketsContainerModal, checkoutButtonModal);
    resetStateFunc();
    setTimeout(() => {
      modalWrapper.remove();
    }, postPaymentDelay)
  })
};

const initApp = () => {
  let chosenSeatsState = state.chosenSeats;

  const resetApp = () => {
    const seatsLabels = hall.children; 

    for (let seatLabel of seatsLabels) {
      if (seatLabel.firstElementChild.checked) seatLabel.firstElementChild.checked = false;
    }
    chosenSeatsState = [];
    ticketsContainer.innerHTML = '';
    checkoutButton.innerHTML = 'Buy 0 tickets for $0.00';
  }
  
  hall.addEventListener('click', ({ target }) => {
    if (target.name !== 'seat') return;
    chosenSeatsState = updateChosenSeats(target.value, chosenSeatsState);
    render(chosenSeatsState, ticketsContainer, checkoutButton);
  });

  checkoutButton.addEventListener('click', ({ target }) => {
    if (chosenSeatsState.length) renderModalConfirmation(createModalConfirmationTemplate(), chosenSeatsState, resetApp);
  });
};

document.addEventListener('DOMContentLoaded', initApp);

