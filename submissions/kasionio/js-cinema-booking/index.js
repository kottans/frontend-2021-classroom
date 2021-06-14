const form = document.getElementById('form');
const totalPrice = document.getElementById('total-price');
const chosenPlaces = document.getElementById('place');
const paymentButton = document.getElementById('paymentButton');
const chosenTickets = [];
const TICKET_PRICE = 10;

const chooseTickets = ({target}) => {
    target.checked ? addTicket(target.value) : removeTicket(target.value);

    let chosenTicketsNodes = chosenTickets.map(ticket => {
        const [row, place] = ticket.split('-');
        return ` 
  <div class='place-item'>
    <span>row: ${row}</span>,
    <span>place: ${place}</span>
  <div> 
  `;
    });
    chosenPlaces.innerHTML = chosenTicketsNodes.join('');
    countTicketsPrice();
}

const countTicketsPrice = () => totalPrice.textContent = chosenTickets.length * TICKET_PRICE;
const addTicket = ticket => chosenTickets.push(ticket);
const removeTicket = ticket => chosenTickets.splice(chosenTickets.indexOf(ticket), 1);

const showTotal = () => alert(`Tickets: ${chosenTickets.join(', ')}. Total price: ${totalPrice.textContent}$`);

form.addEventListener('input', chooseTickets);
paymentButton.addEventListener('click', showTotal);
