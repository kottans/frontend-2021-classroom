"use strict";

//Source for page administration. Add once, change in need.

const textContentForApp = {
  seatBookingScreen: {
    posterSection: {
      premiereText: "From",
      btnReadMore: "&#9660;",
    },
    controlSection: {
      movieDateHintStartContent: "We are waiting for you",
      previousDayBtn: "&#9668;",
      nextDayBtn: "&#9658;",
      movieTimeTitle: "Time",
      screenTitle: "Screen",
      hallSeatHintAvailable: "Available",
      hallSeatHintTaken: "Taken",
      hallSeatHintSelected: "Your selection",
      "hall information": [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
        [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
      ],
    },
  },
  movieDescriptionScreen: {
    btnBackToMainScreenText: "Back",
  },
  confirmTicketScreen: {
    confirmTicketScreenTitle: "Your order:",
    btnBackToMainScreenText: "Cancel",
    btnConfirmTicket: "Take it",
  },
  notificationScreen: {
    notificationScreenTitle: "Thank You. Have a nice watching!",
    btnBackToMainScreenText: "Great!",
    notificationScreenTextContent: {
      part1: "Your order has been paid.",
      part2:
        "Within a few minutes you will receive an email with your tickets.",
      part3: "See you at the cinema theater!",
    },
  },
};

export default textContentForApp;
