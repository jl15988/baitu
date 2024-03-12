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
    };
    readonly DateField: typeof DateField;
    readonly WeekDay: typeof WeekDay;
}
declare const _default: Baitu;
export default _default;
