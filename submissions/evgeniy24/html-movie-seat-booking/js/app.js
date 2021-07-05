const BOOKING_WRAP = document.querySelector('.booking-wrap');
const SUMMARY_SEATS = document.querySelector('.summary-position');


const showCinemaHall = function (...elements) {
  elements.forEach((element) => {
    element.classList.add('display-element')
  })
}

const renderSelectedSeats = function (seat) {
  const positionElement = document.createElement('li');
  positionElement.className = "summary-position__element";

  const rowCellPrice = seat.value.split('_');

  positionElement.innerHTML = `
      <div class = "summary-position__row">Row: ${rowCellPrice[0]}</div>
      <div class = "summary-position__seat">Seat: ${rowCellPrice[1]}</div>
      <div class = "summary-position__price"> ${rowCellPrice[2]} $</div>
  `
  SUMMARY_SEATS.append(positionElement);
}

const renderSummaryBooking = function () {
  const cinemaHall = document.querySelector('.cinema-hall'),
    summary_date = document.querySelector('.summary-date'),
    selectedSeats = document.querySelectorAll('.seats-input:checked'),
    selectedDateInput = document.querySelector('.date__input:checked'),
    selectedTimeInput = document.querySelector('.time__input:checked');

  if (selectedDateInput && selectedTimeInput) {
    showCinemaHall(cinemaHall);
    summary_date.innerHTML = `
    ${selectedDateInput.value}
    ${selectedTimeInput.value}
    `
  }

  SUMMARY_SEATS.innerHTML = '';
  selectedSeats.forEach(renderSelectedSeats);
};

document.addEventListener('DOMContentLoaded', () => {
  BOOKING_WRAP.addEventListener('change', renderSummaryBooking);
})