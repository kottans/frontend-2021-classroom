class Ticket {
  constructor() {
    this.orderForm = document.querySelector('#ticketsForm');
    this.tickets = document.querySelector('#tickets');
    this.purchaseButton = document.querySelector('#purchaseButton');
    this.confirmButton = document.querySelector('#confirmButton');
    this.editButton = document.querySelector('#editButton');
    this.totalPrice = document.querySelector('#totalPrice');
    this.orderSection = document.querySelector('.order');
    this.addListeners(this.orderForm, this.purchaseButton, this.editButton);
    this.priceCounter = 0;
  }

  addListeners(form, purchase, edit) {
    form.addEventListener('change', ({ target }) => {
      if (target.type === 'checkbox') {
        this.manageTickets(target);
      }
    });

    purchase.addEventListener('click', () => {
      if (this.tickets.children.length !== 0) {
        this.showModal(purchase, edit);
      }
    });

    edit.addEventListener('click', () => {
      this.hideModal(purchase, edit);
    });
  }

  manageTickets(target) {
    const [row, seat, price] = target.value.split('/');
    if (target.checked === true) {
      this.addTicket(row, seat, price);
      this.priceCounter += Number(price);
    } else {
      this.removeTicket(row, seat);
      this.priceCounter -= Number(price);
    }
    this.totalPrice.innerHTML = this.priceCounter + '$';
  }

  getHtmlTicket(row, seat, price) {
    return `
      <li id="ticket${row}${seat}">
        <span>Row ${row} seat ${seat}</span> 
        <span>Price: ${price}$</span>
      </li>
    `;
  }

  addTicket(row, seat, price) {
    this.tickets.insertAdjacentHTML(
      'beforeend',
      this.getHtmlTicket(row, seat, price)
    );
  }

  removeTicket(row, seat) {
    const findElement = document.querySelector(`#ticket${row}${seat}`);
    findElement.parentNode.removeChild(findElement);
  }

  showModal(purchase, edit) {
    purchase.classList.add('hidden');
    this.confirmButton.classList.remove('hidden');
    this.confirmButton.innerHTML = `Confirm (${this.priceCounter}$)`;
    edit.classList.remove('hidden');
    this.orderSection.classList.add('modal');
  }

  hideModal(purchase, edit) {
    this.orderSection.classList.remove('modal');
    purchase.classList.remove('hidden');
    this.confirmButton.classList.add('hidden');
    edit.classList.add('hidden');
  }
}

new Ticket();
