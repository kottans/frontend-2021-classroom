import {
  screens,
  selectorForm,
  bookButton,
  cancelButton,
  payButton,
} from './module/config';

import showScreen from './module/screen-show';
import { payButtonListener, bookButtonListener } from './module/button-listeners';
import updateTicket from './module/ticket-updater';

document.addEventListener('DOMContentLoaded', () => {
  selectorForm.addEventListener('change', updateTicket);
  bookButton.addEventListener('click', bookButtonListener);
  cancelButton.addEventListener('click', () => showScreen(screens.main, bookButton));
  payButton.addEventListener('click', payButtonListener);
});
