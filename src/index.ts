import DateTime, {DateField, WeekDay} from "./modules/dateTime/DateTime";
import DateUtil from "./modules/dateTime/DateUtil";

if (window) {
    window["DateTime"] = DateTime;
    window["DateField"] = DateField;
    window["WeekDay"] = WeekDay;
    window["DateUtil"] = DateUtil;
}

class Baitu {
    readonly DateTime = DateTime
    readonly DateUtil = DateUtil
    readonly DateField = DateField
    readonly WeekDay = WeekDay
}

export default new Baitu();
