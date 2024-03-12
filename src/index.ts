import DateTime, {DateField, WeekDay} from "./modules/dateTime/DateTime";
import DateUtil from "./modules/dateTime/DateUtil";
import NumberUtil from "./modules/number/NumberUtil";

if (window) {
    window["DateTime"] = DateTime;
    window["DateField"] = DateField;
    window["WeekDay"] = WeekDay;
    window["DateUtil"] = DateUtil;
    window["NumberUtil"] = NumberUtil;
}

class Baitu {
    readonly DateTime = DateTime;
    readonly DateUtil = DateUtil;
    readonly DateField = DateField;
    readonly WeekDay = WeekDay;
    readonly NumberUtil = NumberUtil;
}

export default new Baitu();
