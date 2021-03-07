class ShoppingBasket {
    constructor() {
        this.basketElement = document.querySelector('.ShoppingBasket');
        this.containerElement = this.basketElement.querySelector('.ShoppingBasket_container');
        this.listElement = this.basketElement.querySelector('.ShoppingBasket_list');
        this.countElement = this.basketElement.querySelector('.ShoppingBasket_count');
        this.costElement = this.basketElement.querySelector('.ShoppingBasket_cost');
        this.buttonElement = document.querySelector('.ShoppingBasketButton');
        this.buttonElementCount = this.buttonElement.querySelector('.ShoppingBasketButton_count');
        this.linkingTicketsToTheList = {};
        this.count = 0;
        this.oneTicketCost = 50;
        this.currency = 'UAH';
    }

    addEventListenerToButton() {
        this.buttonElement.addEventListener('click', this.buttonClickHandler.bind(this));
    }

    removeEventListenerToButton() {
        this.buttonElement.removeEventListener('click', this.buttonClickHandler.bind(this));
    }

    buttonClickHandler() {
        this.buttonElementToggleActiveClass();
    }

    buttonElementToggleActiveClass() {
        document.body.classList.toggle('lock-body');
        this.buttonElement.classList.toggle('ShoppingBasketButton--active');
        this.containerElement.classList.toggle('ShoppingBasket_container--active');
    }

    calculateCost() {
        return this.oneTicketCost * this.count;
    }

    makeCostString() {
        return `${this.calculateCost()}${this.currency}`;
    }

    makeTicketWord() {
        return this.count > 1 ? 'tickets' : 'ticket';
    }

    makeCountString() {
        return `${this.count} ${this.makeTicketWord()}`;
    }

    insertCountToCountElements() {
        this.countElement.innerHTML = this.makeCountString();
        this.buttonElementCount.innerHTML = this.count;
    }

    insertCostToCostElement() {
        this.costElement.innerHTML = this.makeCostString();
    }

    showBasket() {
        this.basketElement.classList.add('ShoppingBasket--active');
    }

    hideBasket() {
        this.basketElement.classList.remove('ShoppingBasket--active');
    }

    showButtonElementCount() {
        this.buttonElementCount.classList.add('ShoppingBasketButton_count--active');
    }

    hideButtonElementCount() {
        this.buttonElementCount.classList.remove('ShoppingBasketButton_count--active');
    }

    createListElement(text) {
        const li = document.createElement('li');
        li.className = 'ShoppingBasket_item';
        li.innerHTML = text;
        return li;
    }

    countTickets() {
        return this.count;
    }

    increaseCount() {
        this.count++;
    }

    decreaseCount() {
        this.count--;
    }

    toggleTicket(ticket) {
        if (this.linkingTicketsToTheList.hasOwnProperty(ticket.getIDString())) {
            this.removeTicket(ticket);
            return;
        }
        this.appendTicket(ticket);
    }

    appendTicket(ticket) {
        const text = `${ticket.getRow()} row ${ticket.getSeat()} seat`;
        const li = this.createListElement(text);
        this.listElement.append(li);
        this.linkingTicketsToTheList[ticket.getIDString()] = li;
        this.increaseCount();
        if ( this.count === 1 ) {
            this.showBasket();
            this.showButtonElementCount();
            this.addEventListenerToButton();
        }
        this.insertCountToCountElements();
        this.insertCostToCostElement();
        this.removeEventListenerToButton();
    }

    removeTicket(ticket) {
        this.linkingTicketsToTheList[ticket.getIDString()].remove();
        delete this.linkingTicketsToTheList[ticket.getIDString()];
        this.decreaseCount();
        if ( this.count < 1 ) {
            this.hideBasket();
            this.hideButtonElementCount();
        }
        this.insertCountToCountElements();
        this.insertCostToCostElement();
    }
}

export { ShoppingBasket };
