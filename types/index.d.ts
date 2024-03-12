import DateTime, { DateField, WeekDay } from "./modules/dateTime/DateTime";
declare class Baitu {
    readonly DateTime: typeof DateTime;
    readonly DateUtil: {
        date(): Date;
        dateTime(): DateTime;
        now(): number;
        formatNow(): string;
        formatToDate(): string;
        parse(dateTime: string | number | DateTime | Date): Date;
        toDateTime(dateTime: string | number | DateTime | Date): DateTime;
        format(date: string | number | DateTime | Date, format?: string): string;
        daysOfMonth(date: DateTime | Date): number;
        compare(date1: DateTime | Date, date2: DateTime | Date, dateField?: DateField): number;
        age(date: DateTime | Date): number;
    };
    readonly DateField: typeof DateField;
    readonly WeekDay: typeof WeekDay;
    readonly NumberUtil: {
        fixed(number: number, fractionDigits: number): number;
        fixedCut(number: number, fractionDigits: number): number;
        floor(number: number): number;
        ceil(number: number): number;
    };
}
declare const _default: Baitu;
export default _default;
