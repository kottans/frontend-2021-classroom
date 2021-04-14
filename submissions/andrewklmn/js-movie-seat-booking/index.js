import {
  screens,
  selectorForm,
  bookButton,
  cancelButton,
  payButton,
} from './modules/config';

import showScreen from './modules/screen-show';

import {
  payButtonListener,
  bookButtonListener,
  cancelButtonListener,
} from './modules/button-listeners';

import updateTicket from './modules/ticket-updater';

document.addEventListener('DOMContentLoaded', () => {
  selectorForm.addEventListener('change', updateTicket);
  bookButton.addEventListener('click', bookButtonListener);
  cancelButton.addEventListener('click', cancelButtonListener);
  cancelButton.addEventListener('click', () => showScreen(screens.main, bookButton));
  payButton.addEventListener('click', payButtonListener);
});
