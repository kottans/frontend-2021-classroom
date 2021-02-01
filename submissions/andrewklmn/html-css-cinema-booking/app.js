const FREE = 0;
const BOOKED = 1;
const seatContainer = document.querySelector('.seat_container');

const seatInitialSet = [
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE],
  [FREE, FREE, FREE, FREE, BOOKED, BOOKED, BOOKED, FREE, FREE],
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE, FREE],
  [FREE, FREE, FREE, FREE, FREE, FREE, FREE, FREE, FREE],
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE, FREE],
  [FREE, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE, FREE],
  [FREE, FREE, BOOKED, BOOKED, BOOKED, BOOKED, BOOKED, FREE, FREE, FREE, FREE],
];

const init = (seats) => {
  seats.forEach((row, rowIndex) => {
    const seatRow = document.createElement('section');
    seatRow.classList.add('seat_row');
    row.forEach((seat, seatIndex) => {
      const seatElement = document.createElement('article');
      const r = rowIndex + 1;
      const s = seatIndex + 1;
      const d = seat === BOOKED ? 'disabled' : '';

      seatElement.classList.add('seat');
      seatElement.innerHTML = `
        <input 
          class="seat_control" 
          type="checkbox" 
          id="seat_${r}_${s}" 
          name="seat_${r}_${s}" 
          value="booked" ${d}>
        <label class="seat_label" for="seat_${r}_${s}">${s}</label>
      `;
      seatRow.appendChild(seatElement);
    });
    seatContainer.appendChild(seatRow);
  });
  seatContainer.innerHTML += '<button type="submit">Book now</button>';
};

document.addEventListener('DOMContentLoaded', () => {
  init(seatInitialSet);
});
