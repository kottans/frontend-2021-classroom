const currentDate = new Date(),
  calendar = document.querySelector(".calendar"),
  btnWrap = document.querySelector(".calendar_wrap"),
  daysOfWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
function getDay(e) {
  return daysOfWeek[e.getDay()];
}
function getDate(e) {
  return e.getDate();
}
function getMonth(e) {
  return e.getMonth() + 1;
}
function createDate(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getDay()),
    a = n.getDate() + t;
  return n.setDate(a), n;
}
function getCountDaysInMonth(e) {
  const t = new Date(e.getFullYear(), e.getMonth(), 1),
    n = new Date(e.getFullYear(), e.getMonth() + 1, 1);
  return Math.round((n - t) / 1e3 / 3600 / 24);
}
function createMonth(e) {
  const t = document.createDocumentFragment();
  for (let n = 0; n < getCountDaysInMonth(e); n++) {
    const a = getDay(createDate(e, n)),
      r = getDate(createDate(e, n)),
      c = getMonth(createDate(e, n)),
      o = document.createElement("label");
    o.classList.add("calendar_item"),
      (o.innerHTML = `<input type ="radio" name = "date" data-month =${c}  id = ${r} class="calendar_item_input">\n         <span>${a}\n           <br>${r}\n         </span>`),
      t.append(o);
  }
  return t;
}
function appendElements(e, t) {
  e.append(t);
}
appendElements(calendar, createMonth(currentDate)),
  btnWrap.addEventListener("click", function ({ target: e }) {
    const { nodeName: t, id: n } = e;
    "BUTTON" === t && scrollDirection[n](calendar);
  });
const scrollDirection = {
  right: (e) => (e.scrollLeft += 80),
  left: (e) => (e.scrollLeft -= 80),
};
const sessionsTime = ["14:00", "17:30", "21:00", "23:20"],
  filmName = "Monster Hunter",
  priceOfTicket = 8,
  reservedSeats = [1, 10, 12, 13, 45],
  seatsCount = 50;
const choiceSeatsWrapper = document.getElementById("tickets_wrapper"),
  seatsInCinema = document.querySelector("#cinemaHall"),
  sessionsWrap = document.querySelector("#sessionsWrap"),
  bodyElement = document.querySelector("body");
let ticketListWrapper = null,
  chosenTicketsList = null,
  buyButton = null;
function isElementSelected(e) {
  return Array.prototype.some.call(e.children, (e) => e.firstChild.checked);
}
function init() {
  addDomElement(choiceSeatsWrapper, createWrapperForChosenTickets());
}
function createWrapperForChosenTickets() {
  return '  <div id="seatsChoice" class="seats_choice">\n      <ul id="selectionsBuying" class="seats_choice_list"></ul>\n      <input\n        id="buyTickets"\n        class="seats_choice_list_input"\n        type="radio"\n        value=""\n      />\n      <label for="buyTickets" class="seats_choice_list_label"\n        >BUY SELECTED</label\n      >\n    </div>';
}
function addDomElement(e, t) {
  e.insertAdjacentHTML("beforeEnd", t);
}
function getSelectedDateInfo(e) {
  const t = Array.prototype.find.call(e.children, (e) => e.firstChild.checked);
  if (!t) return "";
  const n = t.firstChild;
  return `${n.id}/${n.dataset.month}`;
}
function getSelectedTimeInfo(e) {
  const t = Array.prototype.find.call(e.children, (e) => e.firstChild.checked);
  return t ? t.firstChild.id : "";
}
function createTicket(e) {
  return ` <li data-ticket = ${e} class="seats_choice_list_ticket">\n              <h4>${filmName}</h4>\n              <span>${e}</span><br>\n              <span>date ${getSelectedDateInfo(
    calendar
  )} time ${getSelectedTimeInfo(sessionsWrap)} </span>\n            </li>`;
}
function addTicket(e, t) {
  e.insertAdjacentHTML("beforeEnd", createTicket(t));
}
function getChosenSeat(e, t) {
  const n = e.children;
  let s = null;
  return (
    Array.prototype.some.call(n, function (e) {
      e.dataset.ticket === t.value && (s = e);
    }),
    s
  );
}
function deleteTicket(e, t) {
  e.removeChild(t);
}
sessionsWrap.addEventListener("change", function ({ target: e }) {
  const t = isElementSelected;
  null === ticketListWrapper &&
    (t(calendar) || noSelect.calendar(e),
    t(calendar) &&
      t(sessionsWrap) &&
      (init(),
      (ticketListWrapper = document.querySelector("#seatsChoice")),
      (chosenTicketsList = document.querySelector("#selectionsBuying")),
      (buyButton = document.querySelector(".seats_choice_list_label"))));
});
const ticketMovement = {
  true: (e, t) => addTicket(e, t.value),
  false: (e, t) => deleteTicket(e, getChosenSeat(e, t)),
};
function showElement(e) {
  e.style.display = "block";
}
function hideElement(e) {
  e.style.display = "none";
}
const noSelect = {
  calendar: (e) => {
    alert("Please select date"), (e.checked = !1);
  },
  sessionsWrap: (e) => {
    alert("Please select time"), (e.checked = !1);
  },
};
function initLastConformingMassage() {
  ticketListWrapper.addEventListener("change", function () {
    hideElement(ticketListWrapper), addLastConformingBuyMessage(seatsInCinema);
  });
}
function freesUpSpaceForLastConformingBuyMassage(e) {
  (e.innerHTML = null), (e.style.display = "block");
}
function createLastConformingBuyMessage(e, t) {
  return `    <div id="basket" class="basket">\n      <span>\n        You buy ${e} ticket for ${t} $\n      </span>\n      <h4>Do you wont to continue?</h4>\n      <input id="yes" name="buyButton" type="radio" value="" />\n      <label for="yes" class="basket_btn">Yes</label>\n      <input id="no" name="buyButton" type="radio" value="" />\n      <label for="no" class="basket_btn">No</label>\n    </div>`;
}
function addLastConformingBuyMessage(e) {
  const t = getNumberOfSelectedTickets(chosenTicketsList),
    n = createLastConformingBuyMessage(t, getCostOfTickets(t, priceOfTicket));
  freesUpSpaceForLastConformingBuyMassage(e),
    e.insertAdjacentHTML("beforeEnd", n);
}
function getNumberOfSelectedTickets(e) {
  return e.children.length;
}
function getCostOfTickets(e, t) {
  return e * t;
}
function viewMassage(e, t) {
  e.insertAdjacentHTML("afterBegin", t);
}
function createConfirmingMassage() {
  return '<div class="message_wrapper">\n  <span>Thank for buying,wait confirming message</span>\n   <a href ="#" onClick="window.location.reload()">Go to ticket selection</a>\n</div>';
}
function createAbortMessage() {
  return '<div class="message_wrapper">\n  <span>Thank for visiting our site, please come back next time </span>\n   <a href ="#" onClick="window.location.reload()">Go to ticket selection</a>\n</div>';
}
seatsInCinema.addEventListener("change", function ({ target: e }) {
  const { name: t, id: n, checked: s } = e,
    i = isElementSelected,
    a = ticketMovement[s],
    c = i(calendar) && i(sessionsWrap);
  if (
    (i(calendar)
      ? i(sessionsWrap) || noSelect.sessionsWrap(e)
      : noSelect.calendar(e),
    c)
  ) {
    a(chosenTicketsList, e);
    const s = getNumberOfSelectedTickets(chosenTicketsList);
    s ? showElement(buyButton) : s || hideElement(buyButton),
      "buyButton" === t && answerAfterSelection[n](bodyElement),
      initLastConformingMassage();
  }
});
const answerAfterSelection = {
  yes: (e) => viewMassage(e, createConfirmingMassage()),
  no: (e) => viewMassage(e, createAbortMessage()),
};
const popup = document.querySelector(".popup");
popup.addEventListener("click", function ({ target: e }) {
  const t = document.querySelector(".navigation_items");
  e.checked
    ? (t.style.display = "grid")
    : e.checked || (t.style.display = "none");
});
const conditionOfPlaces = {};
function compareConditionOfPlaces() {
  fillConditionOfPlaces(seatsCount, conditionOfPlaces),
    getReservedSeats(conditionOfPlaces, reservedSeats);
}
function fillConditionOfPlaces(e, t) {
  for (let n = 1; n < e + 1; n++) t[n] = n;
  return t;
}
function getReservedSeats(e, t) {
  Object.keys(e).forEach((n) => {
    t.forEach((t) => {
      n === t.toString() && (e[n] = "disabled");
    });
  });
}
function getRow(e) {
  let t = null;
  return (
    e <= 10
      ? (t = 1)
      : e <= 20
      ? (t = 2)
      : e <= 30
      ? (t = 3)
      : e <= 40
      ? (t = 4)
      : e <= 50 && (t = 5),
    t
  );
}
function createSeats(e, t) {
  const n = document.createDocumentFragment();
  for (let a = 1; a < e + 1; a++) {
    let e = "";
    "disabled" === t[a] && (e = t[a]);
    const s = document.createElement("label");
    s.classList.add("hall_seat"),
      (s.innerHTML = `<input class="hall_seat_input" type="checkbox" \n            ${e} value="Seat-${a}_Row-${getRow(
        a
      )}">\n            <span class="hall_seat_number">${a}</span>`),
      n.append(s);
  }
  return n;
}
compareConditionOfPlaces(),
  appendElements(seatsInCinema, createSeats(seatsCount, conditionOfPlaces));
function createSessionsTime(e) {
  const n = document.createDocumentFragment();
  return (
    e.forEach((e) => {
      const s = document.createElement("label");
      (s.classList = "time_wrap_lists_item"),
        (s.innerHTML = `<input type="radio" name="time" id="${[
          e,
        ]}"/>\n        <span>${[e]} </span>`),
        n.appendChild(s);
    }),
    n
  );
}
appendElements(sessionsWrap, createSessionsTime(sessionsTime));
