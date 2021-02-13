(function () {
  const menu = document.querySelector('.navigation-list');
  const menuButton = document.querySelector('.navigation-button');
  const form = document.querySelector('.booking-form');
  const table = document.querySelector('.order-table');
  let order = {
    city: 'Київ',
    date: '2021-01-30',
    time: '10:00',
    place: [],
    total: 0,

    dateString: function () {
      const [year, month, date] = this.date.split('-');
      return `${date}.${month}.${year}p.`;
    },

    placeString: function () {
      return this.place
        .map((p) => {
          const [row, seat] = p.value.split(' ');
          return `${row} ряд ${seat} місце`;
        })
        .join('; ');
    },

    totalString: function () {
      this.total = 0;
      this.place.forEach((p) => {
        this.total += +p.dataset.price;
      });
      return `${this.total}грн.`;
    },
  };

  function updateTable(name, value) {
    table.querySelector(`.${name}`).textContent = value;
  }

  function inputHandler(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let newValue, newTotal;
    switch (name) {
      case 'place':
        order['place'] = Array.from(
          form.querySelectorAll('input[type="checkbox"]:checked')
        );
        newTotal = order['totalString']();
        break;
      default:
        order[name] = value;
    }
    const methodName = `${name}String`;
    newValue = order[methodName] ? order[methodName]() : value;
    updateTable(name, newValue);
    if (newTotal) {
      updateTable('total', newTotal);
    }
  }

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
})();
