/*function initDatePicker() {
    const currentDate = new Date(),
        DAY_DURATION = 60 * 60 * 24;
    DAYS_AMOUNT = 7;
    const arr = Array(DAYS_AMOUNT)
        .fill(currentDate);
    const pickerHTML =  arr.reduce(
            (pickerInnerHTML, currentPickerDate, dayIndex) =>{
                console.log(currentPickerDate);
                console.log(currentPickerDate.getDate() + dayIndex * DAY_DURATION);
                pickerInnerHTML += getDateInputBlockTemplate(currentPickerDate);
                return pickerInnerHTML;
            }
            );

        console.log(pickerHTML);
    document.querySelector('#datesWrapper').innerHTML = pickerHTML;
}
initDatePicker() ;
function getDateInputBlockTemplate(date) {
    return `<label class="date__label">
              <input type="radio" id="d${getDashedFormattedDate(date)}" 
               class="date__input" name="date" 
               value="${getDashedFormattedDate(date)}" />
              <time datetime="${getDashedFormattedDate(date)}" class="date__wrap">
                <span class="month">${getMonth(date)}</span> 
                <span class="day">${addZeroesAtNumberBeginning(getDay(date))}</span>
              </time>
            </label>`;
}

function getDashedFormattedDate(date) {
    return `${getYear(date)}-${getMonth(date)}-${getDay(date)}}`;
}

function addZeroesAtNumberBeginning(number) {
    return number < 10 ? '0' + number : number;
}

function getYear(date) {
    return date.getFullYear();
}

function getMonth(date) {
    return addZeroesAtNumberBeginning(date.getMonth() + 1);
}

function getDay(date) {
    return date.getDate();
}
*/