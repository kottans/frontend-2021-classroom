"use strict"
//  TRAILER IFAME HANDLER
const trailerSection = document.querySelector('.content__video-trailer');
const trailerButton = document.querySelector('.content__video-label');
const videoFrame = document.querySelector('iframe');

const resetVideoSrc = function() {
    videoFrame.attributes.src.nodeValue='';
    videoFrame.attributes.src.nodeValue='https://www.youtube.com/embed/R0Ex4-kZWaI';
}

trailerButton.addEventListener('click',function(e){
    if (!trailerSection.classList.contains('hide')){
        videoFrame.tabIndex-=1;
        setTimeout(resetVideoSrc, 500);
        } else{
            videoFrame.tabIndex=0;
        }
    trailerSection.classList.toggle('hide');
})

// CHECKED TICKET PREVIEW

const parseTicketDate = (dateInput, timeInput) => {

    const parsedTicketDate = dateInput.value.split('_').reverse();
    const parsedTicketTime = timeInput.value.split('_').slice(1);
    const dateTime = parsedTicketDate.concat(parsedTicketTime)
    const fullDate = new Date(...dateTime);
    return fullDate;
}

const parseTicketSeatRow = (node) => {
    const parsedValue = node.value.split('_');
    const seatInfo = {
        row: parsedValue[0].substr(1),
        seat: parsedValue[1].substr(1),
        id: node.id,
        };
    writeOrderInformation(seatInfo, 'seats');
    return seatInfo;
};

const getTicketDate = (ticketFullDateObj, outputDateType) => {
    let litericalWeekDay = '';
    let litericalMonthName = '';
    let timeHourMinute = '';

    const getNumericalWeekDay =() =>{
        return ticketFullDateObj.getDay()}

    const getNumericalMonth =() =>{
        return ticketFullDateObj.getMonth()}

    const getTimeHourMinute = () => {
        return timeHourMinute = `${makeTimeTwoNumerical(ticketFullDateObj.getHours())}-${makeTimeTwoNumerical(ticketFullDateObj.getMinutes())}`
    }

    const makeTimeTwoNumerical = (time) => {
        if(time.toString().length === 1) {
            return `0${time}`;
        }if (time.toString().length === 2) {
            return time;
        }
    }

    const getLitericalWeekDay = (numericalWeekDay) => {
        switch (numericalWeekDay) {
            case 0: litericalWeekDay = 'Воскресенье';
                    break;
            case 1: litericalWeekDay = 'Понедельник';
                    break;
            case 2: litericalWeekDay = 'Вторник';
                    break;
            case 3: litericalWeekDay = 'Среда';
                    break;
            case 4: litericalWeekDay = 'Четверг';
                    break;
            case 5: litericalWeekDay = 'Пятница';
                    break;
            case 6: litericalWeekDay = 'Суббота';
                    break;
        }
    }

    const getLitericalMonth = (numericalMonth) => {
        switch (numericalMonth) {
            case 0: litericalMonthName = 'Января';
                    break;
            case 1: litericalMonthName = 'Февраля';
                    break;
            case 2: litericalMonthName = 'Марта';
                    break;
            case 3: litericalMonthName = 'Апреля';
                    break;
            case 4: litericalMonthName = 'Мая';
                    break;
            case 5: litericalMonthName = 'Июня';
                    break;
            case 6: litericalMonthName = 'Июля';
                    break;
            case 7: litericalMonthName = 'Августа';
                    break;
            case 8: litericalMonthName = 'Сентября';
                    break;
            case 9: litericalMonthName = 'Октября';
                    break;
            case 10: litericalMonthName = 'Ноября';
                    break;
            case 11: litericalMonthName = 'Декабря';
                    break;
        }
    }

    if (outputDateType === 'HoursMinutes'){
        getTimeHourMinute();
        return timeHourMinute;
    } else if (outputDateType === 'Month'){
        getLitericalMonth(getNumericalMonth());
        return litericalMonthName;
    } else if (outputDateType === 'WeekDay'){
        getLitericalWeekDay(getNumericalWeekDay());
        return litericalWeekDay;
    }else if (outputDateType === 'Date'){
        return ticketFullDateObj.getDate();
    }
}

const getTicketType = (node) => {
    if (node[0].value === 'full'){
        return 'Полный';
    } else {
        return 'Детский';
    }
}

const getCustonSvgInfo = (customType, infoType) => {
    if(infoType === 'id'){
        if (customType === 'corn250' || customType === 'corn500'){
            return 'corn';
        }else if (customType === 'pepsi05'){
            return 'cola';
        }else if (customType === 'glases'){
            return '3d';
        }
    }else if (infoType === 'content'){
        if (customType === 'corn250'){
            return 'Попкорн 250гр';
        }else if (customType === 'corn500'){
            return 'Попкорн 500гр';
        }else if (customType === 'pepsi05'){
            return 'Pepsi 500мл';
        }else if (customType === 'glases'){
            return '3D-очки';
        }
    }
}

const checkMultiApplied = (nodeList) => {
    if (getRadioIsChecked(nodeList)){
        return true;
    }else return false;
}


const createSeatRowNode = ({row, seat}) => {
    const seatNode = document.createElement('p');
    seatNode.classList.add('ticket__item')
    seatNode.innerHTML = `
                    <svg type="icon" class="ticket__svg">
                        <use xlink:href="../img/sprite.svg#ticket2" class="ticket__icon"></use>
                    </svg>
                    <span>Ряд: ${row} Место: ${seat}</span>`
    return seatNode;
}

const createSeatRowNodeWithPrice = ({row, seat}, {seatPrice}) => {
    let type = orderInformation.type === 'full'? 1:0.5;
    const localPrice = seatPrice*type;
    totalAmount+=localPrice;
    const seatNode = document.createElement('p');
    seatNode.classList.add('ticket__item')
    seatNode.innerHTML = `
                    <svg type="icon" class="ticket__svg">
                        <use xlink:href="../img/sprite.svg#ticket2" class="ticket__icon"></use>
                    </svg>
                    <span>Ряд: ${row} Место: ${seat} --${localPrice} грн</span>`
    return seatNode;
}

const createTicketPreviewLabel = (ticketDate, ticketType) => {
    const ticketPreviewLabel = document.createElement('p');
    ticketPreviewLabel.classList.add('ticket__date');
    ticketPreviewLabel.innerHTML= `<div>
                                    <span class="static">Время сеанса:</span>
                                    <span class="dynamic">${getTicketDate(ticketDate,'HoursMinutes')}</span>
                                    </div>
                                    <div>
                                    <span class="static">Дата сеанса:</span>
                                    <span class="dynamic">${getTicketDate(ticketDate,'Date')} ${getTicketDate(ticketDate,'Month')} ( ${getTicketDate(ticketDate,'WeekDay')} )</span>
                                    </div>
                                    <div>
                                    <span class="static">Тип билета:</span> <span class="dynamic">${ticketType}</span>
                                    </div>`;
    return ticketPreviewLabel;
}

const createCustomTicketNode = ({value}, multi=false) => {
    const setMulti = (multi) => {
        if(multi) {
    return document.querySelectorAll('input:checked[name=ticketSeat]').length;
        } else {
            return 1;
        }
    }
    writeOrderInformation(value, 'custom');

    const customNode = document.createElement('p');
    customNode.classList.add('ticket__item')
    customNode.innerHTML = `
                    <svg type="icon" class="ticket__custom-svg">
                        <use xlink:href="../img/sprite.svg#${getCustonSvgInfo(value, 'id')}" class="ticket__icon"></use>
                    </svg>
                    <span>${getCustonSvgInfo(value, 'content')} x ${setMulti(multi)}`
    return customNode;
}

const createCustomNodeWithPrice = (value, priceList) => {
    const customNode = document.createElement('p');
    const multi = getMulti()? orderInformation.seats.length:1;
    totalAmount+=priceList[value]*multi;
    customNode.classList.add('ticket__item')
    customNode.innerHTML = `
                    <svg type="icon" class="ticket__custom-svg">
                        <use xlink:href="../img/sprite.svg#${getCustonSvgInfo(value, 'id')}" class="ticket__icon"></use>
                    </svg>
                    <span>${getCustonSvgInfo(value, 'content')} x ${multi} -- ${priceList[value]*multi} грн `
    return customNode;
}

const createTotalAmountNode = () => {
    const customNode = document.createElement('p');
    customNode.classList.add('ticket__item','ticket__amount')
    customNode.innerHTML = `<div>
                            <span class="static">Сумма к оплате:</span>
                            <span class="dynamic">${totalAmount} грн</span>
                            </div>
                            <div class="seats__body-submit-btn popup-btn">
                            <button type="button" class="btn-go-back">Вернуться назад</button>
                            <button type="submit" class="btn-go-to-pay">Перейти к оплате</button>
                            </div>`;
    return customNode;
}

const getRadioIsChecked = (nodeList) => {
    return nodeList.length >=1;
}

const seatsCheckboxHandler = (node) => {
    return createSeatRowNode(parseTicketSeatRow(node));
}

const orderInformation = {
    date: '',
    type: '',
    custom: [],
    seats: [],
    multi: false
}

const priceList = {
    seatPrice: 90,
    corn250: 75,
    corn500: 150,
    pepsi05: 50,
    glases: 30
}
let totalAmount = 0;

const getMulti = () => {
    return orderInformation.multi;
}
const writeOrderInformation = (element, orderSettings) => {
    orderInformation[orderSettings].push(element);
}
const resetOrderInformation = () => {
    orderInformation.seats = [];
    orderInformation.custom= [];
    orderInformation.multi = false;
    orderInformation.type = '';
    orderInformation.date = '';
}

const getOrderInformation = () => {
    orderInformation.date = ticketDate;
    orderInformation.type = checkedTypeRadio[0].value;
    orderInformation.multi = getRadioIsChecked(checkedMultiCheckbox);
}

const checkReadyFullTickets = () => {
     if (document.querySelector('.ticket__item')){
        return true;
    }else return false;
}

const formHandler = () => {
    let ticketDate;
    const previewPlace = document.querySelector('.seats__body-ticket-preview');
    const checkedDateRadio = document.querySelectorAll('input:checked[name=ticketDate]');
    const checkedTimeRadio = document.querySelectorAll('input:checked[name=ticketTime]');
    const checkedTypeRadio = document.querySelectorAll('input:checked[name=ticketType]');
    const checkedCustomCheckbox = document.querySelectorAll('input:checked[name=ticketCustom]');
    const checkedSeatCheckbox = document.querySelectorAll('input:checked[name=ticketSeat]');
    const checkedMultiCheckbox = document.querySelectorAll('input:checked[name=ticketCustomMulti]');

    const getOrderInformation = () => {
        orderInformation.date = ticketDate;
        orderInformation.type = checkedTypeRadio[0].value;
        orderInformation.multi = getRadioIsChecked(checkedMultiCheckbox);
    }
    const checkTicketFieldsToBooking = () => {
        return getRadioIsChecked(checkedDateRadio) && getRadioIsChecked(checkedTimeRadio) && getRadioIsChecked(checkedTypeRadio) && getRadioIsChecked(checkedSeatCheckbox);
    }

    if (checkTicketFieldsToBooking()) {
        previewPlace.innerHTML = '';
        ticketDate = parseTicketDate(checkedDateRadio[0], checkedTimeRadio[0]);
        resetOrderInformation();
        getOrderInformation();
        const fragment = document.createDocumentFragment();
        fragment.appendChild(createTicketPreviewLabel(ticketDate, getTicketType(checkedTypeRadio)));
        checkedSeatCheckbox.forEach(node => {fragment.appendChild(seatsCheckboxHandler(node))});
        if (getRadioIsChecked(checkedCustomCheckbox)){
            checkedCustomCheckbox.forEach(node => {fragment.appendChild(createCustomTicketNode(node, checkMultiApplied(checkedMultiCheckbox)))});
            previewPlace.appendChild(fragment);
            return true;
        }else if (!getRadioIsChecked(checkedCustomCheckbox)){
            previewPlace.appendChild(fragment);
            return true;
        }
    } else {
        previewPlace.innerHTML = '';
        return false;
    }
}

const totalCaculations = (readyToBooking,orderInformation, priceList)=> {
    if(readyToBooking){
    totalAmount = 0;
    document.querySelector('.hidden').innerHTML='';
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createTicketPreviewLabel(orderInformation.date,orderInformation.type));
    orderInformation.seats.forEach(seat => { fragment.appendChild(createSeatRowNodeWithPrice(seat, priceList))});
    orderInformation.custom.forEach(customs => { fragment.appendChild(createCustomNodeWithPrice(customs, priceList))});
    fragment.appendChild(createTotalAmountNode())
    document.querySelector('.hidden').appendChild(fragment);
    }else{
        console.log("Please, check all necessary params")
    }
}

const totalAmountPopUp = document.querySelector('.hidden');

document.querySelector('.seats__body').addEventListener('change', function() {
    totalCaculations( formHandler(),orderInformation, priceList);
})

document.querySelector('.total-amount').addEventListener('click', e => {
    e.preventDefault();
    if(checkReadyFullTickets()){
    totalAmountPopUp.classList.add('visible');
    document.querySelector('.btn-go-back').addEventListener('click', function(e) {
        totalAmountPopUp.classList.remove('visible');})
    document.querySelector('.btn-go-to-pay').addEventListener('click', function(e) {
            document.location.href=location.href;})}
} )
