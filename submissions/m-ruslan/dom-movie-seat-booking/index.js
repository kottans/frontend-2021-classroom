const selectedSeats = [];
let isBasketHidden = true;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is loaded");

  document.querySelector("#seats").addEventListener("change", (event) => {
    const inputElement = event.target.closest(".seats__input");
    if (!inputElement) return;

    const labelElement = getLabelForInput(inputElement.id);
    handleSeatSelecting(labelElement, inputElement);
    drawBasket();
    addAdditionalEventListeners();
  });
});

const getLabelForInput = (inputID) => {
  var labels = document.getElementsByTagName("LABEL");
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor === inputID) return labels[i];
  }
};

const handleSeatSelecting = (seatLabel, seatInput) => {
  const seatClasses = Array.from(seatLabel.classList);
  const isSeatBooked = seatClasses.includes("seats__label_booked");
  if (isSeatBooked) return;

  const seatID = seatLabel.htmlFor;
  const wasSeatSelectedBefore = !seatInput.checked;
  if (wasSeatSelectedBefore) {
    selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
  } else {
    selectedSeats.push(seatID);
  }
};

const showOrHideBasket = (basket) => {
  const basketClasses = basket.classList;
  isBasketHidden = Array.from(basketClasses).includes("basket_hidden");
  if (selectedSeats.length === 0 && !isBasketHidden) {
    basketClasses.add("basket_hidden");
  }
  if (selectedSeats.length > 0 && isBasketHidden) {
    basketClasses.remove("basket_hidden");
  }
};

const drawBasket = () => {
  const basket = document.querySelector("#basket");
  showOrHideBasket(basket);
  if (selectedSeats.length === 0) return;

  const basketElements = createBasketElements();
  basket.innerHTML = "";
  basket.append(...basketElements);
};

const addAdditionalEventListeners = () => {
  document
    .querySelector("#basket__submit-button")
    .addEventListener("click", () => {
      alert("Sorry, this feature has not been added yet");
    });
};

const createBasketElements = () => {
  const basketHeaderElement = createBasketHeaderElement();
  const listOfSelectedSeatsElement = createListOfSelectedSeats();
  const totalAmountElement = createTotalAmountElement();
  const submitButtonElement = createSubmitButtonElement();

  return [
    basketHeaderElement,
    listOfSelectedSeatsElement,
    totalAmountElement,
    submitButtonElement,
  ];
};

const createBasketHeaderElement = () => {
  const header = document.createElement("h2");
  header.setAttribute("class", "basket__header");
  header.innerHTML = `Your tickets:`;
  return header;
};

const createListOfSelectedSeats = () => {
  const list = document.createElement("ul");
  list.setAttribute("class", "basket__list");
  const selectedSeatsElements = selectedSeats.map((seat, index, arr) => {
    const seatRow = seat.slice(5, 6);
    const seatNumber = seat.slice(7);
    const seatElement = document.createElement("li");
    seatElement.setAttribute("class", "basket__list-element");
    seatElement.innerHTML = `
    <p class="basket__list-element-info">Row ${seatRow} - Seat ${seatNumber}</p>
    <p class="basket__list-element-number">Ticket ${index + 1} of ${
      arr.length
    }</p>
    `;
    return seatElement;
  });

  list.append(...selectedSeatsElements);

  return list;
};

const createTotalAmountElement = () => {
  const totalContainer = document.createElement("h2");
  totalContainer.setAttribute("class", "basket__total-amount");
  const priceForOneSeatFieldText = document.querySelector("#price").innerHTML;
  const priceForOneSeat = priceForOneSeatFieldText.slice(
    priceForOneSeatFieldText.indexOf("$") + 1
  );
  totalContainer.innerHTML = `Total: $${
    priceForOneSeat * selectedSeats.length
  }`;

  return totalContainer;
};

const createSubmitButtonElement = () => {
  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "basket__submit-button");
  submitButton.setAttribute("class", "basket__submit-button");
  submitButton.innerHTML = `Buy`;
  return submitButton;
};
