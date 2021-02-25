import {
  mainScreen,
  selectorForm,
  bookButton,
  confirmationScreen,
  cancelButton,
  payButton,
} from './module/config';

import switchScreens from './module/screen-switcher';
import { payButtonListener, bookButtonListener } from './module/button-listeners';
import updateTicket from './module/ticket-updater';

document.addEventListener('DOMContentLoaded', () => {
  selectorForm.addEventListener('change', updateTicket);
  bookButton.addEventListener('click', bookButtonListener);
  cancelButton.addEventListener('click', () => switchScreens(mainScreen, confirmationScreen, bookButton));
  payButton.addEventListener('click', payButtonListener);
});
