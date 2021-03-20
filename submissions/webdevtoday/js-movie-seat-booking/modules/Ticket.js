class Ticket {
    constructor(rowNum, seatNum) {
        this.row = rowNum;
        this.seat = seatNum;
        this.IDString = `${this.getRow()}${this.getSeat()}`;
    }

    getRow() {
        return this.row;
    }

    getSeat() {
        return this.seat;
    }

    getIDString() {
        return this.IDString;
    }
}

export { Ticket };
