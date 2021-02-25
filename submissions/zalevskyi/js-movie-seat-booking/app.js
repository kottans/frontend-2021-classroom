const FORM = document.getElementById('booking_hall')
const ORDER_LIST = document.getElementById('order_list')
const ORDER_SUMMARY = document.getElementById('order_summary')
const BOOKING_BUTTON = document.getElementById('booking_button')
const PRICE = 120

function renderHall() {
  let seatsAvailableStatus = [
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  FORM.innerHTML = seatsAvailableStatus.map(getRowHTML).join('')
}
function getRowHTML(seats, rowZeroBased) {
  let row = rowZeroBased + 1
  return `<fieldset class='row' id='row${row}'>
    <legend class='visually_hidden'>Row ${row} seats</legend>
    ${seats.map(getSeatHTML, row).join('')}</fieldset>`
}
/**
 * Generates HTML code for a seat
 * Must be used as callback for Array.map()
 * with obligatory passing in a row number as thisArg of Array.map()
 * @this {number} row number
 */
function getSeatHTML(available, seatInRowZeroBased) {
  const seatInRow = seatInRowZeroBased + 1
  const seat = seatCode(this, seatInRow)
  const disabled = available ? '' : 'disabled'
  return `<input type='checkbox' name='seat' value='${seat}'
    id='${seat}' class='seat__input visually_hidden' ${disabled}>
    <label for='${seat}' class='seat'>${seatInRow}</label>`
}
const seatCode = (row, seatInRow) => `r${row}s${seatInRow}`
const seatCodeDeconstructed = (seatCode) => seatCode.split('r')[1].split('s')
const ticketCode = (seat) => `ticket-${seat}`
function createTicketElement(seat) {
  const ticket = document.createElement('tr')
  const [row, seatInRow] = seatCodeDeconstructed(seat)
  ticket.id = ticketCode(seat)
  ticket.classList.add('order_list_row')
  ticket.innerHTML = `<td class='order_list_data'>${row}</td>
    <td class='order_list_data'>${seatInRow}</td>
    <td class='order_list_data'>${PRICE}</td>`
  return ticket
}
function displayBookingSummary(seatsBooked) {
  switch (seatsBooked.length) {
    case 0:
      ORDER_SUMMARY.classList.add('removed')
      BOOKING_BUTTON.classList.add('removed')
      break
    case 1:
      ORDER_SUMMARY.classList.remove('removed')
      BOOKING_BUTTON.classList.remove('removed')
      break
  }
  ORDER_SUMMARY.innerHTML = `<p>Total tickets: ${seatsBooked.length}</p>
    <p>Total cost: ${seatsBooked.length * PRICE}</p>`
}

FORM.addEventListener('change', ({ target: { value: seat } }) => {
  const seatsBooked = new FormData(FORM).getAll('seat')
  const seatIndex = seatsBooked.indexOf(seat)
  displayBookingSummary(seatsBooked)
  if (seatIndex === -1) {
    document.getElementById(ticketCode(seat)).remove()
  } else if (seatIndex === seatsBooked.length - 1) {
    ORDER_LIST.appendChild(createTicketElement(seat))
  } else {
    ORDER_LIST.insertBefore(
      createTicketElement(seat),
      document.getElementById(ticketCode(seatsBooked[seatIndex + 1]))
    )
  }
})
FORM.addEventListener('submit', (evt) => {
  evt.preventDefault()
  document.getElementById('film').classList.add('removed')
  document.getElementById('legend').classList.add('removed')
  document.getElementById('hall').classList.add('removed')
  document.getElementById('order').classList.add('removed')
  document.getElementById('result').classList.remove('removed')
})

renderHall()
