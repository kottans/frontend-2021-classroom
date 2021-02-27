const menu = document.querySelector('.navigation-list');
const menuButton = document.querySelector('.navigation-button');
const form = document.querySelector('.booking-form');
const table = document.querySelector('.order-table');

class Order {
    constructor(city, date, time) {
        this.city = city;
        this.date = date;
        this.time = time;
        this.place = [];
        this.total = 0
    }

    stringifyDate() {
        const [year, month, date] = this.date.split('-');
        return `${date}.${month}.${year}p.`;
    }

    stringifyPlace() {
        let resPlace = [];
        this.place.forEach(p => {
            const [row, seat] = p.value.split(' ');
            resPlace.push(`${row} ряд ${seat} місце`);
        });
        return resPlace.join('; ');
    }

    stringifyTotal() {
        this.total = 0;
        this.place.forEach(p => {
            this.total += +p.dataset.price;
        });
        return `${this.total}грн.`;
    }
}

function updateTableOrder(name, value) {
    table.querySelector(`.${name}`).textContent = value;
}

function inputHandler(e) {
    e.preventDefault();
    const {name, value} = e.target;
    let newValue, newTotal;
    if (name === 'place') {
        order.place = form.querySelectorAll('input[type="checkbox"]:checked');
        newTotal = order.stringifyTotal();
    } else {
        order[name] = value;
    }
    const methodName = `stringify${name.charAt(0).toUpperCase() + name.slice(1)}`;
    newValue = (order[methodName]) ? order[methodName]() : value;
    updateTableOrder(name, newValue);
    if (newTotal) {
        updateTableOrder('total', newTotal);
    }
}

let order = new Order('Київ', '2021-01-30', '10:00');

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
