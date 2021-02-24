const BOOKING_WRAP = document.querySelector('.booking-wrap');
const SUMMARY_WRAP = document.querySelector('.summary-seats');

const renderSummaryBooking = function () {
  const selectedSeatsInput = document.querySelectorAll('.seats-input:checked'),
        selectedDateInput = document.querySelector('.date__input:checked'),
        selectedTimeInput = document.querySelector('.time__input:checked');
        
        
        if (selectedDateInput && selectedTimeInput) {
          SUMMARY_WRAP.innerHTML = `
          ${selectedDateInput.value}
          ${selectedTimeInput.value}
          `
          console.log(selectedDateInput, selectedTimeInput);
        }
      

  
};


BOOKING_WRAP.addEventListener('change', renderSummaryBooking);