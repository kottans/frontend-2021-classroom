import {seatsData} from './seats.js';

document.addEventListener('DOMContentLoaded', () => {

    const startApp = () => {
        const cinemaHall = document.querySelector('#seats-form');

        addSeatsToPage(seatsData, cinemaHall);
        doBookingSeats(cinemaHall);
    };

    const addSeatsToPage = (seatsData, cinemaHall) => {

        seatsData.forEach(rowData => {
            const row = createRow();

            rowData.forEach(seatData => {
                row.innerHTML += createSeat(seatData);
            });

            cinemaHall.append(row);
        })
    }

    const createRow = () => {
        const row = document.createElement('ol');
        row.classList.add('cinema-hall__row');
        return row;
    }

    const createSeat = ({seatId, row, seat, price, booked}) => {
        return `
            <li>
                <label>
                    <input type="checkbox" name="seat[]" class="cinema-hall__check" data-row="${row}" data-seat="${seat}" value="${seatId}" data-price="${price}" ${booked ? "disabled" : ""}>
                    <span class="cinema-hall__seat">${seat}</span>
                </label>
            </li>
        `;
    }

    const doBookingSeats = cinemaHall => {
        const selectedSeatsTotal = document.querySelector('.cinema-hall__seats-total-info');
        const modalInfo = document.querySelector('.modal__info');
        let selectedSeatsCount = 0;
        let selectedSeatsCost = 0;
        
        cinemaHall.addEventListener('change', ({target}) => {
            
            const seat = target.closest('input');
            const seatPrice = +seat.getAttribute('data-price');
            
            if (!seat) return;
            if (seat.checked) {
                showSelectedSeat(seat);
                selectedSeatsCount++
                selectedSeatsCost += seatPrice;
            } else {
                removeSelectedSeat(seat);
                selectedSeatsCount--
                selectedSeatsCost -= seatPrice;
            };
            
            let totalSelectedSeatsInfo = getTotalSelectedSeatsInfo(selectedSeatsCount, selectedSeatsCost);
            showTotalSelectedSeatsInfo(selectedSeatsTotal, totalSelectedSeatsInfo);
            handleSelectedSeatsBlock(selectedSeatsCount);
            if (doClickButtonContinue) showTotalSelectedSeatsInfo(modalInfo, totalSelectedSeatsInfo);
        });
        
        doClickButtons();

    }

    const doClickButtons = () => {
        const modalWindow = document.querySelector('.modal');
        const mainBlock = document.querySelector('.main');
        const body = document.querySelector('body');
        doClickButtonContinue(modalWindow, mainBlock, body);
        doClickButtonReturn(modalWindow, mainBlock, body);
    };

    const doClickButtonContinue = (modalWindow, mainBlock, body) => {
        const buttonContinue = document.querySelector('.cinema-hall__button');

        buttonContinue.addEventListener('click', () => {
            modalWindow.classList.add('active');
            mainBlock.style.visibility = 'hidden';
            body.style.overflow = 'hidden';
        });
    }

    const doClickButtonReturn = (modalWindow, mainBlock, body) => {
        const buttonReturn = document.querySelector('.button--return');

        buttonReturn.addEventListener('click', () => {
            modalWindow.classList.remove('active');
            mainBlock.style.visibility = null;
            body.style.overflow = null;
        });
    }

    const createSelectedSeat = ({selectedSeatId, rowNumber, seatNumber, selectedSeatPrice}) => {
        return `
            <div class="cinema-hall__selected-seat" data-id="${selectedSeatId}">
                <div class="seat-info">
                    Row: <span class="seat-info__row">${rowNumber}</span> --- Seat: <span class="seat-info__seat">${seatNumber}</span>
                </div>
                <div class="seat-price">
                    ${selectedSeatPrice}
                </div>
            </div>
        `;
    };

    const getSelectedSeatInfo = seat => {
        const selectedSeatId = seat.value;
        const rowNumber = seat.getAttribute('data-row');
        const seatNumber = seat.getAttribute('data-seat');
        const selectedSeatPrice = seat.getAttribute('data-price');
        return {
            selectedSeatId,
            rowNumber,
            seatNumber,
            selectedSeatPrice
        };
    };

    const showSelectedSeat = seat => {
        const selectedSeatsList = document.querySelector('.cinema-hall__selected-seats-list');
        selectedSeatsList.innerHTML += createSelectedSeat(getSelectedSeatInfo(seat));
    };

    const removeSelectedSeat = ({value}) => {
        const selectedSeat = document.querySelector(`[data-id="${value}"]`);
        selectedSeat.remove();
    };

    const handleSelectedSeatsBlock = selectedSeatsCount => {
        const selectedSeatsBlock = document.querySelector('.cinema-hall__selected-seats-block');
        const activeSelectedSeatsBlock = document.querySelector('.cinema-hall__selected-seats-block.active');
        
        if (selectedSeatsCount > 0 && !activeSelectedSeatsBlock) showSelectedSeatsBlock(selectedSeatsBlock);
        else if (selectedSeatsCount === 0) hideSelectedSeatsBlock(selectedSeatsBlock);
    };

    const showTotalSelectedSeatsInfo = (pageElement, totalSelectedSeatsInfo) => {
        pageElement.innerHTML = totalSelectedSeatsInfo;
    };

    const getTotalSelectedSeatsInfo = (selectedSeatsCount, selectedSeatsCost) => {
        return `
            <p>Total selected seats: ${selectedSeatsCount}</p>
            <p>Total cost: $${selectedSeatsCost}</p>
        `;
    };

    const showSelectedSeatsBlock = selectedSeatsBlock => {
        selectedSeatsBlock.classList.add('active');
    };

    const hideSelectedSeatsBlock = selectedSeatsBlock => {
        selectedSeatsBlock.classList.remove('active');
    };

    startApp();

});
