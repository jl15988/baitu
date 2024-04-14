export class DateB {

    date: Date;

    constructor(year?: number, monthIndex?: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number) {
        switch (arguments.length) {
            case 1:
                this.date = new Date(year);
                break;
            case 2:
                this.date = new Date(year, monthIndex);
                break;
            case 3:
                this.date = new Date(year, monthIndex, date);
                break;
            case 4:
                this.date = new Date(year, monthIndex, date, hours);
                break;
            case 5:
                this.date = new Date(year, monthIndex, date, hours, minutes);
                break;
            case 6:
                this.date = new Date(year, monthIndex, date, hours, minutes, seconds);
                break;
            default:
                this.date = new Date();
        }
        return this;
    }
}

export default new DateB();
