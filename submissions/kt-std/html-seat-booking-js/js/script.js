document.getElementById('bookingForm').addEventListener('change', (e) => {
    const checkedSeats = document.querySelectorAll('.seat:checked'),
        checkedDate = document.querySelector('input[name="date"]:checked'),
        checkedTime = document.querySelector('input[name="time"]:checked'),
        checkedHall = document.querySelector('input[name="type_picker"]:checked');
    if (checkedSeats.length) {
        document.getElementById('submit').disabled = false;
        updateElementInnerHTML(getListOfCheckedSeats(checkedSeats), 'seatsContainer');
        appendInfoToContainer(checkedDate, 'ticketDate');
        appendInfoToContainer(checkedTime, 'ticketTime');
        appendInfoToContainer(checkedHall, 'hallContainer');
    }else{
        document.getElementById('submit').disabled = true;
        cleanTicket();
    }   
});

function cleanTicket(ticket) {
    document.querySelectorAll('.ticket__description').forEach(ticketField => ticketField.innerHTML = "");
}

function appendInfoToContainer(input, containerId) {
    document.getElementById(containerId).innerHTML = input.value;
}

function updateElementInnerHTML(info, containerId) {
    document.getElementById(containerId).innerHTML = info;
}

function getListOfCheckedSeats(checkedSeats) {
    return Array.from(checkedSeats).reduce((accumulator, seat) => accumulator += getFormattedSeatNumber(seat.value), '');
}

function getFormattedSeatNumber(seat) {
    const [seatRow, seatNumber] = seat.split('_');
    return `R${seatRow}S${seatNumber}<br>`;
}

window.addEventListener('beforeunload', (event) => {
    document.getElementById('bookingForm').reset()
});