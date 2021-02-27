'use strict';

const cinemaHall = document.querySelector('.cinema-hall');
const ticketBlock = document.querySelector('.ticket-block');
const buyBtn = document.getElementById('buyBtn');
const cancelOrder = document.getElementById('cancel-order');
const priceRegular = document.querySelector('.cinema-tickets_type.type-good .price').textContent;
const priceLux = document.querySelector('.cinema-tickets_type.type-lux .price').textContent;
const modalOrder = document.getElementById('modal-order');
let totalTicketsAmount = 0;
let totalTicketsPrice = 0;


function renderChosenTicketBlockWrap() {
    const wrapBlock = document.createElement('div');
    wrapBlock.classList.add('wrap');

    wrapBlock.innerHTML = (`
        <h4>Tickets info:</h4>
        <ul class="list-of-tickets"></ul>
    `);

    ticketBlock.appendChild(wrapBlock);
}

function generateChosenTicketBlock({seatRow, seatNumber, seatPrice}) {
    return `<span class="seatRow">${seatRow} row</span>
            <span class="seatNumber">${seatNumber} seat</span>
            <b class="seatPrice">${seatPrice} hrn</b>`;
}

function renderChosenTicketBlock(ticketID, ticketInfo) {
    const listOFTicketsBlock = document.querySelector('.list-of-tickets');

    const priceBlock = document.createElement('li');
    priceBlock.id = ticketID;

    priceBlock.innerHTML = (generateChosenTicketBlock(ticketInfo));

    listOFTicketsBlock.appendChild(priceBlock);
}

function addTicket(event, ticketID) {
    let seatInfo = event.target.value.split('_');
    let seatPrice = priceRegular;

    if(event.target.closest('.seats-row').classList.contains('seats-row_lux')) {
        seatPrice = priceLux;
    }

    const ticketInfo = {
        seatRow: seatInfo[0],
        seatNumber: seatInfo[1],
        seatPrice: seatPrice
    };

    if(!ticketBlock.childNodes.length) renderChosenTicketBlockWrap();

    renderChosenTicketBlock(ticketID, ticketInfo);
    totalTicketsPrice += parseInt(seatPrice, 10);
    totalTicketsAmount += 1;
}

function removeTicket(ticketID) {
    let priceElement = document.getElementById(ticketID).querySelector('.seatPrice').innerHTML;
    let ticketPrice = parseInt(priceElement, 10);
    totalTicketsPrice -= ticketPrice;
    totalTicketsAmount -= 1;

    document.getElementById(ticketID).remove();
}



document.addEventListener("DOMContentLoaded", function () {

    cinemaHall.addEventListener('change', (event) => {
        let ticketID = event.target.value;
        if(document.getElementById(ticketID)) {
            removeTicket(ticketID);
        } else {
            addTicket(event, ticketID);
        }

        buyBtn.disabled = false;

        if(!document.querySelector('.list-of-tickets').childNodes.length) {
            ticketBlock.innerHTML = '';
            buyBtn.disabled = true;
        }
    });

    buyBtn.addEventListener('click', (event) => {
        event.preventDefault();

        modalOrder.style.display = 'block';
        modalOrder.querySelector('.total-tickets-amount').innerHTML = totalTicketsAmount;
        modalOrder.querySelector('.total-tickets-price').innerHTML = totalTicketsPrice;

    });

    cancelOrder.addEventListener('click', (event) => {
        event.preventDefault();

        modalOrder.style.display = 'none';
    });
});