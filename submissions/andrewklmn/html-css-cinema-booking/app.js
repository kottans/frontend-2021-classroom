const FREE = 0;
const BOOKED = 1;
const seatContainer = document.querySelector('.seat_set');

const seatInitialSet = [
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE],
  [FREE, FREE, FREE, FREE, BOOKED, BOOKED, BOOKED, FREE, FREE],
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE, FREE],
  [FREE, FREE, FREE, FREE, FREE, FREE, FREE, FREE, FREE],
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE, FREE],
  [FREE, FREE, BOOKED, BOOKED, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE],
];

const init = (seats) => {
  seats.forEach((row, rowIndex) => {
    const seatRow = document.createElement('section');
    const r = rowIndex + 1;
    seatRow.classList.add('seat_row');
    seatRow.innerHTML = '<h2 class="hidden">Seat row</h2>';

    row.forEach((seat, seatIndex) => {
      const seatElement = document.createElement('article');
      const s = seatIndex + 1;
      const d = seat === BOOKED ? 'disabled' : '';
      const t = seat === BOOKED ? 'Taken!' : `row #${r}, seat #${s}`;
      seatElement.classList.add('seat');
      seatElement.setAttribute('role', 'none');
      seatElement.innerHTML = `
            <h2 class="hidden">Seat</h2>
            <input 
              class="seat_control disappearanced" 
              type="checkbox"
              id="seat_${r}_${s}" 
              name="seat_${r}_${s}" 
              aria-label="row${r}, seat${s}"
              value="booked" ${d}
            >
            <label 
              class="seat_label" 
              aria-hidden="true" 
              for="seat_${r}_${s}"
              title="${t}">
              ${s}
            </label>
`;
      seatRow.appendChild(seatElement);
    });
    seatContainer.appendChild(seatRow);
  });
  /*
  seatContainer.innerHTML += `
    <button class="book_button" type="submit">
      Book now
    </button>`;
  */
};

document.addEventListener('DOMContentLoaded', () => {
  init(seatInitialSet);
});
