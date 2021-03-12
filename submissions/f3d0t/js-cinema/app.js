const SEAT_PRICE = 2;
const ACTIVE_SEATS = [];

const FORM_BOOKING = document.querySelector(".form__booking");
const FORM_BUTTON = document.querySelector(".form__button");
const FORM_TICKETS_COUNT = document.querySelector(".form__tickets-count");
const FORM_TICKETS_COST = document.querySelector(".form__tickets-cost");
const TICKETS_CONTAINER = document.querySelector(".tickets_cont");
const MODAL_TICKETS_CONTAINER = document.querySelector(".modal__tickets_cont");
const MODAL_WRAPPER = document.querySelector(".modal_wrapper");
const MODAL_FORM = document.querySelector(".modal");
const MODAL_COUNT = document.querySelector(".modal__count");
const MODAL_COST = document.querySelector(".modal__cost");
const MODAL_CLOSE = document.querySelector(".modal__close");
const MODAL_BUTTON = document.querySelector(".modal__button");

const addSeat = (seatsArray, row, seat) => {
	seatsArray.push(`${row}-${seat}`);
};

const deleteSeat = (seatsArray, row, seat) => {
	seatsArray.splice(seatsArray.indexOf(`${row}-${seat}`), 1);
};

const updateForm = (formButton, formCount, formCost, seatsArray, seatPrice) => {
	if (seatsArray.length > 0) {
		formCount.textContent = seatsArray.length + " ticket";
		if (seatsArray.length > 1) formCount.textContent += "s";
		formCost.textContent = " for " + seatsArray.length * seatPrice + "$";
		formButton.disabled = false;
	} else {
		formCount.textContent = "";
		formCost.textContent = "Please, select seats";
		formButton.disabled = true;
	}
};

const getTicketHtml = ([row, seat], price) => `
    <div class="booked_tickets__ticket">
        <span class="ticket__row">Row: ${row}</span>
        <span class="ticket__seat">Seat: ${seat}</span>
        <span class="ticket__price">Price: ${price}$</span>
    </div>`;

const getTicketsHtml = (seatsArray, seatPrice) => {
	if (seatsArray.length > 0) {
		return seatsArray.map((bookedSeat) => getTicketHtml(bookedSeat.split("-"), seatPrice)).join("");
	}
	return "<p>Select seats...=)</p>";
};

const updateTickets = (ticketsContainer, seatsArray, seatPrice) => {
	ticketsContainer.innerHTML = getTicketsHtml(seatsArray, seatPrice);
};

const openModal = (modalWrapper, modalTicketsContainer, modalCount, modalCost, modalButton, seatsArray, seatPrice) => {
	updateTickets(modalTicketsContainer, seatsArray, seatPrice);
	modalCount.textContent = seatsArray.length + " ticket";
	if (seatsArray.length > 1) modalCount.textContent += "s";
	modalCost.textContent = " for " + seatsArray.length * seatPrice + "$";
	modalWrapper.style.display = "flex";
    modalButton.focus();
};

const closeModal = (modalWrapper) => {
	modalWrapper.style.display = "none";
};

const initApp = () => {
	bindEventListeners();
};

const bindEventListeners = () => {
	FORM_BOOKING.addEventListener("input", ({ target }) => {
		if (target.checked === true) {
			addSeat(ACTIVE_SEATS, target.dataset.row, target.dataset.seat);
		} else if (target.checked === false) {
			deleteSeat(ACTIVE_SEATS, target.dataset.row, target.dataset.seat);
		}
		updateForm(FORM_BUTTON, FORM_TICKETS_COUNT, FORM_TICKETS_COST, ACTIVE_SEATS, SEAT_PRICE);
		updateTickets(TICKETS_CONTAINER, ACTIVE_SEATS, SEAT_PRICE);
	});
	FORM_BOOKING.addEventListener("submit", (event) => {
        event.preventDefault();
		openModal(MODAL_WRAPPER, MODAL_TICKETS_CONTAINER, MODAL_COUNT, MODAL_COST, MODAL_BUTTON, ACTIVE_SEATS, SEAT_PRICE);
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			event.preventDefault();
			closeModal(MODAL_WRAPPER);
		}
	});
	MODAL_CLOSE.addEventListener("click", () => closeModal(MODAL_WRAPPER));
	MODAL_FORM.addEventListener("submit", (event) => {
        event.preventDefault();
		alert("Sucsessfully booked!");
		setTimeout(() => {
			location.reload();
		}, 1000);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initApp();
});
