document.addEventListener('DOMContentLoaded', () => {
const chosenSeatsList = document.querySelector('.selected-seats-info__seats-list'); 
const finalCostField = document.querySelector('.selected-seats-info__total-cost-block__total-cost'); 

const seatsHall = document.querySelector('.main__screen-and-seats-block__seats-list');


function getCheckedCheckBoxes() {
    let seats = document.getElementsByClassName('seats-list__row__input');

    let chosenSeats = []; 
    for (let i = 0; i < seats.length; i++) {
       if (seats[i].checked) {
        
        chosenSeats.push(seats[i].value.split("-")); 
       
       }
    }
    renderChosenSeatAndFinalCost(chosenSeats);
  }

function chosenSeatRowTemplate(seatForRender) {
    return `<div class="selected-seats-info__seats-list__row">
    <div class="seats-list__row__seats">
      <div class="row__seats place">
        <span class="place__number">${seatForRender[1]}</span>
        <span class="place__title">Place</span>
      </div>
      <div class="row__seats row-seats">
        <span class="row-seats__number">${seatForRender[0]}</span>
        <span class="row-seats__title">Row</span>
      </div>
      <div class="row__seats seat-cost">
        <span class="seat-cost__number">$5</span>
        <span class="seat-cost__title">Cost</span>
      </div>
    </div>
   
  </div>`;
  }



function renderChosenSeatAndFinalCost(chosenSeatsForRender) {
    chosenSeatsList.innerHTML = chosenSeatsForRender
      .map((seatRow) => chosenSeatRowTemplate(seatRow))
      .join("");

      finalCostField.innerHTML = `$${(+chosenSeatsForRender.length *5)}`  ;
      
  }





  seatsHall.addEventListener("click", getCheckedCheckBoxes);

});