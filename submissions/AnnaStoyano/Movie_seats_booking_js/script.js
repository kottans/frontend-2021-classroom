document.addEventListener("DOMContentLoaded", function (e) {
    bookTicket();
});

function bookTicket() {
    const hallForm = document.querySelector("#seats");
    const seatsListHall = document.querySelector('.cinema-hall-wrapper .selected-seats--list');
    const popupWrapper = document.querySelector('.popup__wrapper');
    const seats = [];
    hallForm.addEventListener('change', ({target}) => {
        if (target.name == 'seat') {
            selectSeats(seats, target, seatsListHall);
        }
    });
    hallForm.addEventListener('click', e => {
        if (e.target.type == 'submit') {
            e.preventDefault();
            buyTicket(seats, popupWrapper);
        }
    });
}

function selectSeats(seats, target, showedSeatsList) {
    if (target.checked) {
        seats.push(target.value);
    } else if (!target.checked) {
        const seatIndex = seats.indexOf(target);
        seats.splice(seatIndex, 1);
    }
    fillSeatsInfo(seats, showedSeatsList);
}

function buyTicket(seats, popup__wrapper) {
    showWrapper(popup__wrapper);
    closeBotton(popup__wrapper);
    fillSeatsInfo(seats, popup__wrapper.querySelector('.selected-seats--list'));
}

function fillSeatsInfo(seats, seatsList) {
    const seatsWrapper = seatsList.closest('.selected-seats');
    console.log(seatsWrapper);
    if (seats && seats.length > 0) {
        const checkedSeatsString = seats.map(seat => `<li>${seat}</li>`).join('\n');
        seatsList.innerHTML = checkedSeatsString;
        showWrapper(seatsWrapper);
    } else {
        seatsWrapper.classList.add('hidden');
    }
}

function showWrapper(displayWrapper) {
    if (displayWrapper.classList.contains('hidden')) {
        displayWrapper.classList.remove('hidden');
    }
}

function closeBotton(wrapper) {
    const closeButton = wrapper.querySelector('.close');
    closeButton.addEventListener('click', () => wrapper.classList.add('hidden'));
}
