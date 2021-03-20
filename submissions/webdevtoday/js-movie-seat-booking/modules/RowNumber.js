class RowNumber {
    constructor(rowStr) {
        this.sourceString = rowStr;
        this.getNumberOfRowFromString();
    }

    getNumberOfRowFromString() {
        this.number = this.sourceString.match(/\d+/)[0];
    }

    isNumber() {
        return typeof +this.number === "number" ? true : false;
    }

    getNumber() {
        return this.number;
    }
}

export { RowNumber };
