import { RowNumber } from './modules/RowNumber.js';
import { Ticket } from './modules/Ticket.js';
import { ShoppingBasket } from './modules/ShoppingBasket.js';

document.addEventListener('DOMContentLoaded', () => {

    const shoppingBasket = new ShoppingBasket();

    document.forms.CinemaSeats.addEventListener('input', ( { target } ) => {

        const ticketRow = new RowNumber(target.name);
        const ticketSeat = target.value;

        if (ticketRow.isNumber()) {
            const ticket = new Ticket(ticketRow.getNumber(), ticketSeat);
            shoppingBasket.toggleTicket(ticket);
        }

    });
});
