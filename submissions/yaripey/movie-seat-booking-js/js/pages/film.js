import { getFilm, buyTickets } from '../common/queries.js'
import { createWaiterMarkUp, fetchErrorMarkUp, transformDate } from '../common/helpers.js'

import pageSwitcher from './pageSwitcher.js'

const filmPage = (rootElem, filmID) => {
  rootElem.innerHTML = createWaiterMarkUp()

  getFilm(filmID)
    .then(res => res.json())
    .then(res => {
      const film = res.data.getFilm
      const dates = []
      film.sessions.forEach(session => {
        if (!dates.includes(session.date)) dates.push(session.date)
      })
      rootElem.innerHTML = `
      <section class="main">
        <article class="about-film">
          <div class="information">
            <div style="background-image: url('${film.posterLink}')" class="film-poster floating-card"></div>
            <div class="description">
              <h1>${film.name}</h1>
              <p>
                ${film.description}
              </p>
            </div>
          </div>
          <h2>Квитки</h2>
          <form class="date-time-form" name="dateTimeForm">
            <legend>Дата</legend>
            <div class="date-block">
              ${dates.map(date => `
              <label>
                <input type="radio" class="radio-box hidden-input" name="date" value="${date}">
                <div class="input-label">${transformDate(date)}</div>
              </label>
              `).join('')}
            </div>

            <legend>Час</legend>
            <div class="time-block" id="timeBlock">
              Будь ласка, оберіть дату.
            </div>

            <legend>Місця</legend>
            <div class="screen">
              <div class="first-half"></div>
              <div class="second-half"></div>
              <div class="screen-label">Екран</div>
            </div>

            <div class="seats-buttons">
              Будь-ласка, оберіть дату та час сеансу.
            </div>
          </form>
        </article>
      </section>
      <section class="tickets-container">
        <div class="tickets">
          <h2>Обрані квитки</h2>
          <div class="check">
            <div class="heading">
              <div>Ряд</div>
              <div>Місце</div>
              <div>Ціна</div>
            </div>
            <ul id="check-table">
            </ul>
            <div class="check-sum">
              <div class="check-sum-label">Сума:</div>
              <div class="check-sum-amount">0 грн</div>
            </div>
          </div>
          <button class="buy-tickets" disabled>Придбати</button>
        </div>
      </section>
      `
      document.forms.dateTimeForm.addEventListener('input', (e) => {
        const ticketsTable = document.querySelector('#check-table')
        const seatsBlock = document.querySelector('.seats-buttons')
        const buyButton = document.querySelector('.buy-tickets')
        if(e.target.closest('.date-block')) {
          const dateValue = document.forms.dateTimeForm.date.value
          const timeBlock = document.querySelector('#timeBlock')
          timeBlock.innerHTML = `${film.sessions.filter(session => session.date === dateValue).map(session => `
          <label>
            <input type="radio" class="radio-box hidden-input" name="time" value="${session.id}">
            <div class="input-label">${session.time}</div>
          </label>
          `).join('')}`
          buyButton.disabled = true
          seatsBlock.innerHTML = `
            <div>
              Будь ласка, оберіть час.
            </div>
          `
          ticketsTable.innerHTML = ''
        }
        if (e.target.closest('.time-block')) {
          const chosenSessionID = document.forms.dateTimeForm.time.value
          const chosenSession = film.sessions.find(session => session.id === chosenSessionID)
          seatsBlock.innerHTML = `${chosenSession.seats.map((row, rowNumber) => `
            <div class="hall-row">
              <div class="row-number">${rowNumber + 1}</div>
              <div class="seat-group">
                ${row.map((seat, seatNumber) => `
                  <label class="seat-label">
                    <input
                      type="checkbox"
                      value="${rowNumber}-${seatNumber}"
                      class="seat-check"
                      ${seat === "u" ? "disabled" : ""}
                      name="seatCheck"
                    >
                    <div class="seat-text">${seatNumber + 1}</div>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}`
          ticketsTable.innerHTML = ''
          buyButton.disabled = true
        }
        if (e.target.closest('.seat-label')) {
          const checkboxes = document.querySelectorAll('.seat-check:checked')
          const values = []
          for(let checkbox of checkboxes.values()) {
            values.push(checkbox.value)
          }
          buyButton.disabled = false
          if (values.length === 0) {
            buyButton.disabled = true
          }
          const sum = values.reduce((acc, value) => acc + 60, 0) 
          const checkSumAmount = document.querySelector('.check-sum-amount')
          ticketsTable.innerHTML = `
            ${values.map(ticket => {
              const splitTicket = ticket.split('-')
              const row = splitTicket[0]
              const seat = splitTicket[1]
              return `
                <li>
                  <div class="row-num">${parseInt(row)+1}</div>
                  <div class="seat-num">${parseInt(seat)+1}</div>
                  <div class="seat-price">60</div>
                </li>
              `
            }).join('')}
          `
          checkSumAmount.innerHTML = `${sum} грн`
        }
      })

      document.querySelector('.buy-tickets').addEventListener('click', (e) => {
        e.preventDefault();
        
        const values = []
        const checkboxes = document.querySelectorAll('.seat-check:checked')
        for(let checkbox of checkboxes.values()) {
          values.push(checkbox.value)
        }
        const sessionID = document.forms.dateTimeForm.time.value
        rootElem.innerHTML = `
          <div>
            Processing
          </div>
        `
        buyTickets(sessionID, values)
          .then(res => res.json())
          .then(res => {
            const tickets = res.data.buyTickets
            const ticketsCheck = document.createElement('div')
            ticketsCheck.classList.add('tickets-check')
            ticketsCheck.innerHTML = `
              <div class="tickets-purchased-text">
                Дякуємо за бронювання квитків! Ваші квитки:
              </div>
            `
            const ticketBlocks = document.createElement('div')
            ticketBlocks.classList.add('ticket-blocks')
            tickets.forEach(ticket => {
              const ticketBlock = document.createElement('div')
              ticketBlock.innerHTML = `
                <div class="ticket-block">
                  <div>Фільм: ${ticket.session.film.name}</div>
                  <div>Дата: ${ticket.session.date}</div>
                  <div>Час: ${ticket.session.time}</div>
                  <div>Ряд: ${parseInt(ticket.row) + 1}</div>
                  <div>Місце: ${parseInt(ticket.seat) + 1}</div>
                </div>
              `
              ticketBlocks.appendChild(ticketBlock)
            })
            ticketsCheck.appendChild(ticketBlocks)

            const homeLink = document.createElement('a')
            homeLink.classList.add('home-link')
            homeLink.innerText = 'На головну'
            homeLink.addEventListener('click', (e) => {
              e.preventDefault()
              pageSwitcher('/')
            })
            ticketsCheck.appendChild(homeLink)

            rootElem.innerHTML = ''
            rootElem.appendChild(ticketsCheck)
          })     
      })
    })
    .catch(err => rootElem.innerHTML = fetchErrorMarkUp())
}

export default filmPage
