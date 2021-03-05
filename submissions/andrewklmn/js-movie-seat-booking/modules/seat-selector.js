export default function getSelectedSeats(selectorForm) {
  return [...selectorForm.querySelectorAll('.seat_control:checked')];
}
