import switchScreens from './screen-switcher';
import {
  selectorForm,
  confirmationScreen,
  mainScreen,
  cancelButton,
} from './config';

export const payButtonListener = () => {
  alert('Action disabled!');
};

export const bookButtonListener = (event) => {
  const selectedSeats = selectorForm.querySelectorAll('.seat_control:checked');
  if (selectedSeats.length > 0) {
    switchScreens(confirmationScreen, mainScreen, cancelButton);
  }
  event.preventDefault();
};
