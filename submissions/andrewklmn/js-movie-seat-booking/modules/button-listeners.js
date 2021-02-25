import showScreen from './screen-shower';
import {
  screens,
  selectorForm,
  cancelButton,
} from './config';

export const payButtonListener = () => {
  alert('Action disabled!');
};

export const bookButtonListener = (event) => {
  const selectedSeats = selectorForm.querySelectorAll('.seat_control:checked');
  if (selectedSeats.length > 0) {
    showScreen(screens.confirmation, cancelButton);
  }
  event.preventDefault();
};
