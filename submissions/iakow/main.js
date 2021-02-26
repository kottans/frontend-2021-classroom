const form = document.querySelector(".booking-form");
const chosenPlacesContainer = document.querySelector("#purchased-tickets");

form.addEventListener("change", () => {
  const formData = new FormData(form);
  const button = document.querySelector(".btn-buy");
  const ticketPrice = 7;
  const chosenPlaces = [];
  
  for (let pair of formData.entries()) {
    if (pair[0] === "seat") {
      chosenPlaces.push(pair[1]);
    }
  }

  if (chosenPlaces.length) {
    chosenPlacesContainer.innerText =
      "Chosen places: " + chosenPlaces.join(", ");
    button.innerText =
      "add to card  ($" + chosenPlaces.length * ticketPrice + ")";
  } else {
    chosenPlacesContainer.innerText = "";
    button.innerText = "add to card";
  }
});
