const selectedSeats = [];

document.querySelector('.seatsBlock').addEventListener('click', ({target}) => {
    const orderElement = document.querySelector('.order');

    if (target.checked === true) {
        selectedSeats.push(target.value);
    } else {
        const index = selectedSeats.indexOf(target.value);
        if (index > -1) {
            selectedSeats.splice(index, 1);
        }
    }

    selectedSeats.length > 0 ? renderOrderElementWithTickets(orderElement, stringifyArray(selectedSeats.sort()))
    : renderOrderElementWithText(orderElement, 'Select seats to book tickets');

});

const renderOrderElementWithTickets = (orderElement, places) => {
    orderElement.innerHTML = `
    <div class="order-info-big">
        <p class="order-title-big">Your order:</p>
    </div>
    <div class="order-info">
        <p class="order-title">Movie:</p>
        <p class="order-description">Tenet</p>
    </div>
    <div class="order-info">
        <p class="order-title">Session:</p>
        <p class="order-description">5 February, 22:30</p>
    </div>
    <div class="order-info">
        <p class="order-title">Selected seats:</p>
        <p class="order-description">${places}</p>
    </div>
    <form action="" method="post" class="order-form">
        <button class="pay">Book tickets</button>
    </form>
    `;
    orderElement.style.border = '2px solid #024fff';
};

const renderOrderElementWithText = (orderElement, text) => {
    orderElement.innerHTML = `
    <p class="before-order">${text}</p>
    `;
    orderElement.style.border = 'none';
};

const stringifyArray = (selectedSeats) => {
    const result = [];
    selectedSeats.forEach(place => {
        const rowPlace = place.split("-");
        result.push(`${rowPlace[0]} row ${rowPlace[1]} seat`);
    });

    return result.join(";<br>");
};
