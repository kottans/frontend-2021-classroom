"use strict";

import movie from "./movie.js";
import textContentForApp from "./textcontent-for-app.js";
import takenSeatsState from "./taken-seats-state.js";

const body = document.querySelector("body");
const main = document.querySelector("main");

// After order confirmation send to server
const order = {
  "hall type": "",
  date: "",
  time: "",
  seats: "",
  barcode: "",
  ticketNumber: "",
};

// =========================== Helpers ======================================

const addClassToElement = (element, className) => {
  element.classList.add(`${className}`);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(`${className}`);
};

const createDoomElementsFromObject = (object, typeOfItem, className) => {
  const createDOMElement = (elementType, content, className) => {
    return `<${elementType} class = "${className}">${content}</${elementType}>`;
  };

  let content = "";
  Object.keys(object).forEach((key) => {
    content += createDOMElement(
      typeOfItem,
      `${key} : ${object[key]}`,
      className
    );
  });
  return content;
};

const getChosenAttributes = (attributeID) => {
  return document.querySelector(`${attributeID} input:checked`).defaultValue;
};

const getMonthDayFromDate = (date) => {
  return new Date(date).toDateString().split(" ").splice(1, 2).join(" ");
};

const getWeekdayFromDate = (date) => {
  return new Date(date).toDateString().split(" ").splice(0, 1).join(" ");
};

const getDayNumberFromDate = (date) => {
  return new Date(date).toDateString().split(" ").splice(2, 1).join(" ");
};

// ======================== Main Working Functions =========================================

const checkIsAvailableOrderTicketCertainDay = (isAvailable, date) => {
  const getCurrentMonth = () => {
    return new Date(Date.now()).getMonth();
  };

  const getMovieMonth = (date) => {
    return new Date(date).getMonth();
  };

  const getYesterdayDateInDay = () => {
    return +getDayNumberFromDate(Date.now()) - 1;
  };

  if (!isAvailable) {
    return false;
  }
  if (
    getCurrentMonth() >= getMovieMonth(date) &&
    getYesterdayDateInDay() >= +getDayNumberFromDate(date)
  ) {
    return false;
  }
  return true;
  // Disable to order ticket for yesterday or earlier day
};

const dateSliderInit = () => {
  const sliderShowedLength = 5;

  const movieDateSection = document.querySelector("#movieDate");
  const hintElement = document.querySelector("#chosenDate");
  const dateListWrapper = document.querySelector("#dateListWrapper");
  const sliderElementsCollection = document.querySelectorAll(
    ".movieDate__radio"
  );
  const inputCollection = document.querySelectorAll(".movieDate__radioInput");

  const nextDayButton = document.querySelector("#nextDayBtn");
  const previousDayButton = document.querySelector("#previousDayBtn");

  //At least one element exists:
  let sliderElementWidth = sliderElementsCollection[0].offsetWidth;

  let currentFirstElementIndex = 0;
  dateListWrapper.style.left = 0;

  const getSliderPosition = () => {
    return (dateListWrapper.style.left =
      -(currentFirstElementIndex * sliderElementWidth) + "px");
  };

  const checkButtonsIsAvailable = () => {
    if (currentFirstElementIndex < 1) {
      addClassToElement(previousDayButton, "btnMovieDate-disabled");
      previousDayButton.setAttribute("tabindex", "-1");
    } else {
      removeClassFromElement(previousDayButton, "btnMovieDate-disabled");
      previousDayButton.setAttribute("tabindex", "0");
    }
    if (
      currentFirstElementIndex >
      sliderElementsCollection.length - sliderShowedLength - 1
    ) {
      addClassToElement(nextDayButton, "btnMovieDate-disabled");
      nextDayButton.setAttribute("tabindex", "-1");
    } else {
      removeClassFromElement(nextDayButton, "btnMovieDate-disabled");
      nextDayButton.setAttribute("tabindex", "0");
    }
  };

  const getWeekdayMonthFromDate = (element) => {
    return new Date(element).toDateString().split(" ").splice(0, 3).join(" ");
  };

  const addContentToDateHint = (chosenElement) => {
    changeContentOfElement(hintElement, getWeekdayMonthFromDate(chosenElement));
  };

  const updateSliderHiddenElements = () => {
      inputCollection.forEach((date, index) => {
        if (
          index >= currentFirstElementIndex + sliderShowedLength ||
          index < currentFirstElementIndex
        ) {
          date.disabled = true;
        } else {
          date.disabled = !checkIsAvailableOrderTicketCertainDay(
            movie["booking available state"]["date"][date.defaultValue],
            date.defaultValue
          );
        }
      });
  }

  updateSliderHiddenElements();

  movieDateSection.addEventListener("click", function ({ target }) {
    if (target.getAttribute("id") === "nextDayBtn") {
      currentFirstElementIndex++;
      getSliderPosition();
      updateSliderHiddenElements();
      checkButtonsIsAvailable();
      event.preventDefault();
    } else if (target.getAttribute("id") === "previousDayBtn") {
      currentFirstElementIndex--;
      getSliderPosition();
      updateSliderHiddenElements();
      checkButtonsIsAvailable();
      event.preventDefault();
    } else if (target.classList.contains("movieDate__radioInput")) {
      addContentToDateHint(target.defaultValue);
    }
  });

  movieDateSection.addEventListener("focus", function ({ target }) {
    if (target.classList.contains("movieDate__radioInput")) {
      addContentToDateHint(target.defaultValue);
    }
  });

  checkButtonsIsAvailable();
};

const writeDataIntoUserOrderObject = () => {
  const maxBarcode = 9999999999;
  const ticketFirstPartNumberMax = 99;
  const ticketSecondPartNumberMax = 999;
  const ticketThirdPartNumberLength = 6;

  const chosenSeats = document.querySelectorAll("#hall input:checked");

  const getRandomIntegerWithCertainLength = (min, max, lengthOfResult) => {
    let randomIntegerString = Math.floor(
      Math.random() * (max - min + 1) + min
    ).toString();
    while (randomIntegerString.length < lengthOfResult) {
      randomIntegerString = "0" + randomIntegerString;
    }
    return randomIntegerString;
  };

  const getRandomStringOfCharsAndNumbers = (length) => {
    return Math.random().toString(36).substr(2, length).toUpperCase();
  };

  const createBarcodeNumber = () => {
    const barcodeNumber = [];

    Array.from(chosenSeats).forEach(() =>
      barcodeNumber.push(
        getRandomIntegerWithCertainLength(
          0,
          maxBarcode,
          maxBarcode.toString().length
        )
      )
    );

    return barcodeNumber;
  };

  const createTicketNumber = () => {
    const ticketNumber = [];

    Array.from(chosenSeats).forEach(() =>
      ticketNumber.push(
        `${getRandomIntegerWithCertainLength(
          0,
          ticketFirstPartNumberMax,
          ticketFirstPartNumberMax.toString().length
        )}-${getRandomIntegerWithCertainLength(
          0,
          ticketSecondPartNumberMax,
          ticketSecondPartNumberMax.toString().length
        )}-${getRandomStringOfCharsAndNumbers(ticketThirdPartNumberLength)}`
      )
    );

    return ticketNumber;
  };

  order["hall type"] = getChosenAttributes("#hallType");
  order["date"] = new Date(getChosenAttributes("#movieDate"));
  order["time"] = getChosenAttributes("#movieTime");
  order["seats"] = Array.from(chosenSeats).map((seat) => seat.defaultValue);
  order["barcode"] = createBarcodeNumber();
  order["ticketNumber"] = createTicketNumber();
};

const cleanUserOrderObject = () => {
  order["hall type"] = "";
  order["date"] = "";
  order["time"] = "";
  order["seats"] = "";
  order["barcode"] = "";
  order["ticketNumber"] = "";
};

const checkAvailableTimeForToday = () => {
  const movieTimeCollection = document.querySelectorAll(
    ".movieTime__radioInput"
  );

  const getDateNowInFormatYearMonthDay = () => {
    return new Date(Date.now()).toISOString().split("").splice(0, 10).join("");
  };

  const getCurrentTimeInHours = () => {
    return +new Date(Date.now()).toTimeString().split("").splice(0, 2).join("");
  };

  const getMovieTimeInHours = (time) => {
    return time.split("").splice(0, 2).join("");
  };

  const isToday = () => {
    return (
      getDateNowInFormatYearMonthDay() ===
      document.querySelector("#movieDate input:checked").defaultValue
    );
  };

  if (isToday()) {
    movieTimeCollection.forEach((movieTime) => {
      if (
        getMovieTimeInHours(movieTime.defaultValue) <= getCurrentTimeInHours()
      ) {
        movieTime.disabled = true;
      }
    });
  } else {
    movieTimeCollection.forEach((movieTime) => {
      if (
        movie["booking available state"]["time"][`${movieTime.defaultValue}`]
      ) {
        movieTime.disabled = false;
      } else {
        movieTime.disabled = true;
      }
    });
  }
};

const checkIsAvailableToChoseSeats = () => {
  const getCheckedInput = (id) => {
    return document.querySelector(`${id} input:checked`);
  };

  return (
    getCheckedInput("#hallType") !== null &&
    getCheckedInput("#movieDate") !== null &&
    getCheckedInput("#movieTime") !== null
  );
};

const checkIsAvailableToOrderSeats = () => {
  const getCheckedInput = (id) => {
    return document.querySelector(`${id} input:checked`);
  };

  return (
    getCheckedInput("#hallType") !== null &&
    getCheckedInput("#movieDate") !== null &&
    getCheckedInput("#movieTime") !== null &&
    getCheckedInput("#hall") !== null
  );
};

const addTakenSeatsToHallSection = () => {
  const seats = document.querySelectorAll(".seat__input");

  seats.forEach((seat) => {
    seat.disabled = false;
  });

  takenSeatsState[getChosenAttributes("#movieDate")][
    getChosenAttributes("#hallType")
  ][getChosenAttributes("#movieTime")].forEach((seat) => {
    seats[seat].disabled = true;
  });
};

// ======================== Animation and Visualization Functions =========================================

const changeVisualizationInOrderOverflowContent = () => {
  const windowHeight = document.documentElement.clientHeight;
  const mainElementHeight = main.offsetHeight;

  if (windowHeight > mainElementHeight) {
    removeClassFromElement(body, "h-auto");
  } else {
    addClassToElement(body, "h-auto");
  }
};

const changeContentOfElement = (targetElement, content) => {
  targetElement.addEventListener("transitionend", () => {
    targetElement.innerHTML = content;
    removeClassFromElement(targetElement, "opacityHide");
  });
  addClassToElement(targetElement, "opacityHide");
};

const changeScreen = (
  hideAnimation,
  hidePositioning,
  modalScreenContent,
  showAnimation,
  callback
) => {
  main.addEventListener(
    "animationend",
    () => {
      main.addEventListener(
        "animationend",
        () => {
          removeClassFromElement(main, hidePositioning);
          removeClassFromElement(main, showAnimation);
          callback && callback();
        },
        { once: true }
      );
      addClassToElement(main, hidePositioning);
      main.innerHTML = modalScreenContent;
      removeClassFromElement(main, hideAnimation);
      addClassToElement(main, showAnimation);
      changeVisualizationInOrderOverflowContent();
    },
    { once: true }
  );
  addClassToElement(main, hideAnimation);
};

// ============================== Create Content Functions ===================================

const trailerContent = `
      <video id="trailer"
      preload="auto"
      autoplay
      muted
      loop
      poster="${movie["trailer"]["trailer poster"]}"
      class="trailer"
    >
      <source id="trailerSource" src="${movie["trailer"]["trailer src"]}" type="video/mp4" />
    </video>
  `;

const createContentOfHallTypeSection = () => {
  let content = "";

  const checkIsAvailable = (isAvailable) => {
    if (!isAvailable) {
      return "disabled";
    }
  };

  Object.keys(movie["booking available state"]["hallType"]).forEach((key) => {
    content += `<label class="movieType__radio">
      <input
      class="movieType__radioInput visually-hidden"
      type="radio"
      name="movie-type"
      value="${key}"
      ${checkIsAvailable(movie["booking available state"]["hallType"][key])}
      />
      <span class="movieType__radioText">${key}</span>
      </label>`;
  });

  return content;
};

const createContentOfMovieDateSection = () => {
  let content = "";

  Object.keys(movie["booking available state"]["date"]).forEach((key) => {
    content += `
      <label class="movieDate__radio">
        <input
        class="movieDate__radioInput visually-hidden"
        type="radio"
        name="movie-date"
        value=${key}
         ${
           checkIsAvailableOrderTicketCertainDay(
             movie["booking available state"]["date"][key],
             key
           )
             ? "tabindex=0"
             : "disabled"
         }
        />
        <span class="movieDate__radioSupText">
        ${getWeekdayFromDate(key)}
        </span>
        <time class="movieDate__radioText" datetime=${key}>
        ${getDayNumberFromDate(key)}
        </time>
      </label>`;
  });

  return content;
};

const createContentOfMovieTimeSection = () => {
  let content = "";

  const checkIsAvailable = (isAvailable) => {
    if (!isAvailable) {
      return "disabled";
    }
  };

  Object.keys(movie["booking available state"]["time"]).forEach((key) => {
    content += `
      <label class="movieTime__radio">
        <input
          class="movieTime__radioInput visually-hidden"
          type="radio"
          name="movie-time"
          value=${key}
          ${checkIsAvailable(movie["booking available state"]["time"][key])}
        />
        <time class="movieTime__radioText" datetime=${key}>${key}</time>
      </label>`;
  });

  return content;
};

const createContentOfHallSection = () => {
  let content = "";

  textContentForApp["seatBookingScreen"]["controlSection"][
    "hall information"
  ].forEach((row) => {
    content += '<div class="hall__row">';
    row.forEach((seat) => {
      content += `
    <label class="seat">
      <input
        class="seat__input visually-hidden"
        type="checkbox"
        value=${seat}
      />
      <span class="seat__mask">${seat}</span>
    </label>`;
    });
    content += "</div>";
  });

  return content;
};

const createSeatBookingScreen = `<section id="choseSeatSection" class="choseSeatSection">
  <section class="posterSection">
    <div class="textContent">
      <h2 id="movieTitle" class="textContent__title">${movie["title"]}</h2>
      <p class="textContent__description">${
        movie["poster section"]["main description"]
      }</p>
      <a href="#" id="btnReadMore" class="btnReadMore">${
        textContentForApp["seatBookingScreen"]["posterSection"]["btnReadMore"]
      }</a>
    </div>

    <a
      class="badgeWrapper"
      href=${movie["poster section"]["IMBd link"]}
      target="_blank"
    >
      <div class="badge badge-rating">
        <p>IMBd<br />${movie["poster section"]["IMBd rating"]}</p>
      </div>
    </a>

    <div class="badge badge-data">
      <p>${
        textContentForApp["seatBookingScreen"]["posterSection"]["premiereText"]
      }
        <br />
        <time datetime=${movie["poster section"]["premiere"]}>
        ${getMonthDayFromDate(movie["poster section"]["premiere"])}
        </time>
        <br />
        ${movie["poster section"]["duration"]}
      </p>
    </div>

    <img
      class="posterSection__img"
      src=${movie["poster section"]["poster"]["poster src"]}
      alt=${movie["poster section"]["poster"]["poster alt"]}
    />
  </section>

  <section id="controlSection" class="controlSection">
    <section id="hallType" class="movieType">${createContentOfHallTypeSection()}</section>

    <section id="movieDate" class="movieDate">
      <p id="chosenDate" class="movieDate__currentTime">
        <time datetime="2021-03-02">
          ${
            textContentForApp["seatBookingScreen"]["controlSection"][
              "movieDateHintStartContent"
            ]
          }
        </time>
      </p>

      <div class="flexRow">
        <a id="previousDayBtn" href="#" class="btnMovieDate" tabindex="0">
          ${
            textContentForApp["seatBookingScreen"]["controlSection"][
              "previousDayBtn"
            ]
          }
        </a>
        <div class="movieDate__slider">
          <div id="dateListWrapper" class="flexRow movieDate__dateListWrapper">
            ${createContentOfMovieDateSection()}
          </div>
        </div>
        <a id="nextDayBtn" href="#" class="btnMovieDate" tabindex="0">
          ${
            textContentForApp["seatBookingScreen"]["controlSection"][
              "nextDayBtn"
            ]
          }
        </a>
      </div>
    </section>

    <section id="movieTime" class="movieTime">
      <p class="movieTime__title">
      ${
        textContentForApp["seatBookingScreen"]["controlSection"][
          "movieTimeTitle"
        ]
      }
      </p>

      <div id="movieTimeContent" class="flexRow flexRow-between">
        ${createContentOfMovieTimeSection()}
      </div>
    </section>

    <section id="hall" class="hall">
      <p class="hall__screen">
        ${
          textContentForApp["seatBookingScreen"]["controlSection"][
            "screenTitle"
          ]
        }
      </p>

    <div id="hallContent">${createContentOfHallSection()}</div>
    </section>

    <section class="hall__legend">
      <p class="hall__legendItem hall__legendItem-available">
        ${
          textContentForApp["seatBookingScreen"]["controlSection"][
            "hallSeatHintAvailable"
          ]
        }
      </p>
      <p class="hall__legendItem hall__legendItem-taken">
        ${
          textContentForApp["seatBookingScreen"]["controlSection"][
            "hallSeatHintTaken"
          ]
        }
      </p>
      <p class="hall__legendItem hall__legendItem-selection">
        ${
          textContentForApp["seatBookingScreen"]["controlSection"][
            "hallSeatHintSelected"
          ]
        }
      </p>
      <a id="buyTicket" class="siteButton siteButton-disabled">
        <img
            class="siteButton__img"
            src="img/shopping-cart.svg"
            alt="shopping cart"
        />
      </a>
    </section>
  </section>
</section>`;

const createControlElements = (buttonSet) => {
  let controlElements = "";
  buttonSet.forEach((button) => {
    controlElements += `<a id="${button[0]}" class="siteButton siteButton-text" href="#">${button[1]}</a>`;
  });
  return controlElements;
};

const createModalScreen = (
  sectionClass,
  sectionTitleClass,
  sectionTitleContent,
  contentWrapperClass,
  createContentFunction,
  createControlElementsFunction
) => {
  const content = `<section class="${sectionClass}">
        <h3 class="${sectionTitleClass}">${sectionTitleContent}</h3>
        <div class="${contentWrapperClass}">${createContentFunction()}</div>
        <div class="flexRow flexRow-center">${createControlElementsFunction()}</div>
      </section>`;
  return content;
};

const createMovieDescriptionScreenContent = () => {
  return `
  <div class="movieDescription__textContent">
  ${createDoomElementsFromObject(
    movie["read more content"]["text"],
    "p",
    "movieDescription__element"
  )}
  </div>
  <div class="movieDescription__posterContent">
    <img class="movieDescription__poster" src="${
      movie["read more content"]["poster"]["poster src"]
    }" alt="${movie["read more content"]["poster"]["poster alt"]}"/>
  </div>
  `;
};

const createTicket = (hall, date, time, seat, barcode, ticket) => {
  return `<article class="ticket">
          <div class="ticket__number ticket__number-top">
            <p class="ticket__numberTitle">
              TICKET NO: <span class="ticket__numberValue">${ticket}</span>
            </p>
          </div>
          <div class="ticket__body">
            <div class="ticket__bodyTopSection">
              <div class="ticket__bodyBarcode">
                <img
                  class="ticket__barcode"
                  src='./img/bar-code.svg'
                  alt="barcode of your ticket"
                />
                <p class="ticket__barcodeValue">${barcode}</p>
              </div>
              <div class="ticket__bodyImg" style="background-image:url(${
                movie["ticket"]["background src"]
              });">
                <p class="ticket__bodySubTitle">ADMIT ONE</p>
                <h4 class="ticket__bodyTitle">CINEMA TICKET</h4>
              </div>
            </div>
            <div class="ticket__bodyBottomSection">
              <div class="ticket__bodyCinemaBrandBox">
                <img
                  class="ticket__cinemaBrand"
                  src="./img/clapperboard.svg"
                  alt="cinema theater brand label - clapperboard"
                />
              </div>
              <div class="ticket__bodyMovieData">
                <p class="ticket__bodyMovieTitle">${movie["title"]}</p>
                <p class="ticket__bodyHallType">${hall}</p>
              </div>
              <div class="ticket__bodyMovieDate">
                <div class="badge badge-data badge-ticket">
                <p class="badge__day">${getWeekdayFromDate(date)}</p>
                <p class="badge__date">${getMonthDayFromDate(date)}</p>
                  <p class="badge__time">${time}</p>
                </div>
              </div>
              <div class="ticket__bodyMovieSeat">
                <p class="ticket__bodyMovieSeatTitle">SEAT NO:</p>
                <p class="ticket__bodyMovieSeatNumber">${seat}</p>
              </div>
            </div>
          </div>
          <div class="ticket__number ticket__number-bottom">
            <p class="ticket__numberTitle">
              TICKET NO: <span class="ticket__numberValue">${ticket}</span>
            </p>
          </div>
        </article>`;
};

const createOrderListContent = () => {
  let content = "";
  order["seats"].forEach((seat, index) => {
    content += createTicket(
      order["hall type"],
      order["date"],
      order["time"],
      seat,
      order["barcode"][index],
      order["ticketNumber"][index]
    );
  });
  return content;
};

const createMessageScreenContent = () => {
  return `
  <p class="notification__element">
    ${textContentForApp["notificationScreen"]["notificationScreenTextContent"]["part1"]}
  </p>
  <p class="notification__element">
    ${textContentForApp["notificationScreen"]["notificationScreenTextContent"]["part2"]}
  </p>
  <p class="notification__element">
    ${textContentForApp["notificationScreen"]["notificationScreenTextContent"]["part3"]}
  </p>
  `;
};

// ============================ Listeners =====================================
const addListenerIntoSeatBookingScreen = () => {
  dateSliderInit();

  const readMoreAboutMovieButton = document.querySelector("#btnReadMore");
  const buyTicketButton = document.querySelector("#buyTicket");
  const controlSection = document.querySelector("#controlSection");

  readMoreAboutMovieButton.addEventListener(
    "click",
    () => {
      const modalElementContent = createModalScreen(
        "movieDescription",
        "movieDescription__title",
        movie["title"],
        "movieDescription__content",
        createMovieDescriptionScreenContent,
        createControlElements.bind(this, [
          [
            "backToChoseSeatSectionFromReadMore",
            textContentForApp["movieDescriptionScreen"][
              "btnBackToMainScreenText"
            ],
          ],
        ])
      );

      changeScreen(
        "hideAnimationForNextScreenVertical",
        "angle90_vertical",
        modalElementContent,
        "showAnimationForNextScreenVertical",
        addListenerIntoMovieDescriptionScreen
      );
    },
    { once: true }
  );

  controlSection.addEventListener("click", ({ target }) => {
    if (target.classList.contains("movieDate__radioInput")) {
      checkAvailableTimeForToday();
    }

    if (
      target.tagName.toLowerCase() === "input" &&
      checkIsAvailableToChoseSeats()
    ) {
      addTakenSeatsToHallSection();
    }

    if (
      target.tagName.toLowerCase() === "input" &&
      checkIsAvailableToOrderSeats()
    ) {
      removeClassFromElement(buyTicketButton, "siteButton-disabled");
      buyTicketButton.setAttribute("href", "#");

      buyTicketButton.addEventListener(
        "click",
        () => {
          writeDataIntoUserOrderObject();

          const modalElementContent = createModalScreen(
            "confirmTicket",
            "confirmTicket__title",
            textContentForApp["confirmTicketScreen"][
              "confirmTicketScreenTitle"
            ],
            "movieDescription__content",
            createOrderListContent,
            createControlElements.bind(this, [
              [
                "backToChoseSeatSectionFromConfirmTicketScreen",
                textContentForApp["confirmTicketScreen"][
                  "btnBackToMainScreenText"
                ],
              ],
              [
                "confirmOrder",
                textContentForApp["confirmTicketScreen"]["btnConfirmTicket"],
              ],
            ])
          );

          changeScreen(
            "hideAnimationForNextScreenHorizontal",
            "angle90_horizontal",
            modalElementContent,
            "showAnimationForNextScreenHorizontal",
            addListenerIntoConfirmTicketScreen
          );
        },
        { once: true }
      );
    }
  });
};

const addListenerIntoMovieDescriptionScreen = () => {
  const backButton = document.querySelector(
    "#backToChoseSeatSectionFromReadMore"
  );

  backButton.addEventListener(
    "click",
    () => {
      changeScreen(
        "hideAnimationForPreviousScreenVertical",
        "angle-90_vertical",
        createSeatBookingScreen,
        "showAnimationForPreviousScreenVertical",
        addListenerIntoSeatBookingScreen
      );
    },
    { once: true }
  );
};

const addListenerIntoConfirmTicketScreen = () => {
  const backButton = document.querySelector(
    "#backToChoseSeatSectionFromConfirmTicketScreen"
  );
  const payForTicketButton = document.querySelector("#confirmOrder");

  backButton.addEventListener(
    "click",
    () => {
      changeScreen(
        "hideAnimationForPreviousScreenHorizontal",
        "angle-90_horizontal",
        createSeatBookingScreen,
        "showAnimationForPreviousScreenHorizontal",
        addListenerIntoSeatBookingScreen
      );

      cleanUserOrderObject();
    },
    { once: true }
  );

  payForTicketButton.addEventListener(
    "click",
    () => {
      const modalElementContent = createModalScreen(
        "notification",
        "notification__title",
        textContentForApp["notificationScreen"]["notificationScreenTitle"],
        "notification__content",
        createMessageScreenContent,
        createControlElements.bind(this, [
          [
            "backToChoseSeatSectionFromMessageScreen",
            textContentForApp["notificationScreen"]["btnBackToMainScreenText"],
          ],
        ])
      );

      changeScreen(
        "hideAnimationForNextScreenVertical",
        "angle90_vertical",
        modalElementContent,
        "showAnimationForNextScreenVertical",
        addListenerIntoMovieMessageScreen
      );
    },
    { once: true }
  );
};

const addListenerIntoMovieMessageScreen = () => {
  const backButton = document.querySelector(
    "#backToChoseSeatSectionFromMessageScreen"
  );

  backButton.addEventListener(
    "click",
    () => {
      changeScreen(
        "hideAnimationForPreviousScreenVertical",
        "angle-90_vertical",
        createSeatBookingScreen,
        "showAnimationForPreviousScreenVertical",
        addListenerIntoSeatBookingScreen
      );
    },
    { once: true }
  );
};

const initApp = () => {
  window.addEventListener("load", changeVisualizationInOrderOverflowContent),
    { once: true };
  window.addEventListener("resize", () => {
    changeVisualizationInOrderOverflowContent();
    if (document.querySelector("#choseSeatSection")) {
      dateSliderInit();
    }
  });

  main.insertAdjacentHTML("beforebegin", trailerContent);
  main.innerHTML = createSeatBookingScreen;
  addListenerIntoSeatBookingScreen();
};

initApp();
