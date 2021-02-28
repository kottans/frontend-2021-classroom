const menu = document.querySelector('.navigation-list');
const menuButton = document.querySelector('.navigation-button');
const form = document.querySelector('.booking-form');
const table = document.querySelector('.order-table');

class Seat {
    constructor(row, place, price) {
        this.row = row;
        this.seat = place;
        this.price = price;
    }

    getSeat() {
        return `${this.row} ряд ${this.seat} місце`
    }
}

class Order {
    constructor(city = 'Київ', date = '2021-01-30', time = '10:00') {
        this.city = city;
        this._date = date;
        this.time = time;
        this._place = [];
        this._total = 0
    }

    get date() {
        const [year, month, date] = this._date.split('-');
        return `${date}.${month}.${year}p.`;
    }

    set date(newDate) {
        this._date = newDate;
    }

    get place() {
        return this._place.map((place) => {
            return place.getSeat();
        }).join('; ');
    }

    set place(newPlace) {
        const price = +newPlace.dataset.price;
        const [row, seat] = newPlace.value.split(' ');
        const oldSeat = this._place.find(place => place.row === row && place.seat === seat);
        if (oldSeat) {
            const ind = this._place.indexOf(oldSeat);
            this._place.splice(ind, ind + 1);
            this._total -= price;
            return
        }
        this._place.push(new Seat(row, seat, price));
        this._total += price;
    }

    get total() {
        return `${this._total}грн.`;
    }

    updateTableOrder(name) {
        table.querySelector(`.${name}`).textContent = this[name];
    }
}

function inputHandler(e) {
    e.preventDefault();
    const {name, value} = e.target;
    if (name === 'place') {
        order.place = e.target;
        order.updateTableOrder('total');
    } else {
        order[name] = value;
    }
    order.updateTableOrder(name);
}

let order = new Order();

menuButton.addEventListener('click', function () {
    if (this.classList.contains('navigation-button__open')) {
        this.classList.remove('navigation-button__open');
        this.classList.add('navigation-button__close');
    } else {
        this.classList.add('navigation-button__open');
        this.classList.remove('navigation-button__close');
    }
    menu.classList.toggle('navigation-list__active');
});

window.onload = function () {
    document.querySelector('.navigation').classList.remove('navigation-nojs');
    form.addEventListener('input', inputHandler);
};
