const hall = document.querySelector('.hall');
const cart = document.querySelector('.form__cart');
const filmPoster = document.querySelector('.cinema-info__image');
const filmTitle = document.querySelector('.description__title');
const filmHall = document.querySelector('.description__hall');
const filmDate = document.querySelector('.description__date');
const filmTime = document.querySelector('.description__time');
const emptyCart = document.querySelector('.tikets__wrap');
const fullCart = document.querySelector('.tikets__form');
const priceCart = document.querySelector('.form__total');

const ticketPrice = {
    "ordinary": 60,
    "special": 30,
    "comfort": 120
};

const getData = () => {
    return fetch('./data/data.json')
     .then(res => res.json())
     .then((data) => data);
}   

const reverseDate = (date) => date.split("-").reverse().join("-");

const renderData = (data) => {
    filmPoster.src = data.poster;
    filmTitle.innerText = `"${data.film}"`;
    filmHall.innerText = `Зал №${data.hall}`;

    const [date, time] = data.datetime.split(' ');
    filmDate.innerText = reverseDate(date);
    filmDate.setAttribute('datetime', date);

    filmTime.innerText = time;
    filmTime.setAttribute('datetime', time);

    data.selected.forEach((item) => {
        const seat = document.querySelector(`#seat${item.row}-${item.seat}`);
        seat.closest('.hall__seat').classList.add('no-hover');
        seat.setAttribute("disabled", "");
        seat.nextElementSibling.classList.add(`${item.type}--active`);  
    });
}

const renderCart = (ticket) => {
    const [row, seat, price] = ticket.split('-');
    const template = `
        <div class="form__ticket" id="${ticket}">
            <span class="form__ticket-row">Ряд: ${row}</span>    
            <span class="form__ticket-seat">Місце: ${seat}</span>
            <span class="form__ticket-price">Ціна: ${ticketPrice[price]}</span>
        </div>`;
    var ticketWrap = document.createElement("template");
    ticketWrap.innerHTML = template;
    cart.appendChild(ticketWrap.content);
}

const deleteFromCart = (id) => {
    Array.from(cart.children).forEach((item) => {
        if(item.getAttribute('id') === id) {
           item.remove(); 
        }
    })
}

const changeSeatStatus = (seat, type) => seat.nextElementSibling.classList.toggle(`${type}--active`);

const addToCart = ({target}) => {
    if(target.classList.contains('hall__seat-data')) {
        const data = target.dataset.value;
        const [rowTicket, seatTicket, typeTicket] = data.split('-');
        isCartEmpty()

        if(target.checked) {
            changeSeatStatus(target, typeTicket);
            renderCart(data);
            addSelectedTicket(rowTicket, seatTicket, typeTicket);
            setTotalPrice();
        } else {
            changeSeatStatus(target, typeTicket); 
            deleteFromCart(data);
            removeSelectedTicket(rowTicket, seatTicket, typeTicket);
            setTotalPrice();
        }
    }
} 

const addSelectedTicket = (row, seat, type) => {
    let data = JSON.parse(window.sessionStorage.getItem('serverData'));
    const ticket = {
        "row": row,
        "seat": seat,
        "type": type
    }
    data.selected.push(ticket);
    window.sessionStorage.setItem('serverData', JSON.stringify(data));
}

const removeSelectedTicket = (row, seat) => {
    let data = JSON.parse(window.sessionStorage.getItem('serverData'));
    data.selected = data.selected.filter((ticket) => {
        if(`${ticket.row}-${ticket.seat}` !== `${row}-${seat}`) {
            return ticket;
        }
    })
    window.sessionStorage.setItem('serverData', JSON.stringify(data));
}

const getSelectedTikets = () => JSON.parse(window.sessionStorage.getItem('serverData')).selected;

const isCartEmpty = () => {
    let selectedTikets = getSelectedTikets();

    if(selectedTikets.length === 0) {
        emptyCart.classList.toggle('no-display');
        fullCart.classList.toggle('no-display');
        return true;
    }

    return false;
}

const setTotalPrice = () => {
    if(!isCartEmpty()) {
        let selectedTikets = getSelectedTikets();
        let countTikets = selectedTikets.length;
        let initialSum= 0;
        let totalPrice = selectedTikets.reduce((sum, price) => {
            return sum + ticketPrice[price.type];
        }, initialSum);

        priceCart.innerText = `Кількість: ${countTikets} шт. Ціна: ${totalPrice} грн.`; 
    }
}

const createJSON = () => {
    const cart =  {
        "film": filmTitle.innerText,
        "datetime": `${reverseDate(filmDate.innerText)} ${filmTime.innerText}`,
        "hall": filmHall.innerText,
        "selected": []
    }

    window.sessionStorage.setItem("serverData", JSON.stringify(cart));
}

const init = async () => {
    renderData(await getData());
    createJSON();
    hall.addEventListener('click', addToCart);
    hall.addEventListener('touchstart', addToCart, {capture: true});
}

window.onload = init();

