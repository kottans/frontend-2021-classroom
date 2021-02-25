document.addEventListener('DOMContentLoaded', () => {
  const seats = document.getElementById('seats');
  const tickets = document.getElementById('tickets-list');

  seats.addEventListener('click', ({ target }) => {
    if (target.classList.contains('seat-checkbox')) {
      const seatValue = target.getAttribute('value').split(/[rs]/g);
      const rowNumber = seatValue[1];
      const seatNumber = seatValue[2];
      if (target.checked) {
        tickets.insertAdjacentHTML(
          'beforeend',
          `<div class='ticket' place='r${rowNumber}s${seatNumber}''>
            <div>Row: ${rowNumber}</div>
            <div>Seat: ${seatNumber}</div>
          </div>`
        );
      } else {
        tickets
          .querySelector(`.ticket[place='r${rowNumber}s${seatNumber}']`)
          .remove();
      }
    }
  });
});
