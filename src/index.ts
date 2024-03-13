import Str from "./modules/string/Str";
import StrUtil from "./modules/string/StrUtil";
import DateTime, {DateField, WeekDay} from "./modules/dateTime/DateTime";
import DateUtil from "./modules/dateTime/DateUtil";
import NumberUtil from "./modules/number/NumberUtil";
import Num from "./modules/number/Num";
import Throttle from "./modules/common/Throttle";
import Debounce from "./modules/common/Debounce";
import FileUtil from "./modules/file/FileUtil";
import FileTypeMagicMap from "./modules/file/FileTypeMagicMap";
import FileTypeMimeMap from "./modules/file/FileTypeMimeMap";
import HexUtil from "./modules/base/HexUtil";
import ObjectUtil from "./modules/object/ObjectUtil";

if (window) {
    window["Str"] = Str;
    window["StrUtil"] = StrUtil;
    window["DateTime"] = DateTime;
    window["DateField"] = DateField;
    window["WeekDay"] = WeekDay;
    window["DateUtil"] = DateUtil;
    window["Num"] = Num;
    window["NumberUtil"] = NumberUtil;
    window["Throttle"] = Throttle;
    window["Debounce"] = Debounce;
    window["FileUtil"] = FileUtil;
    window["HexUtil"] = HexUtil;
    window["FileTypeMagicMap"] = FileTypeMagicMap;
    window["FileTypeMimeMap"] = FileTypeMimeMap;
    window["ObjectUtil"] = ObjectUtil;
}

class Baitu {
    /**
     * 字符串对象
     */
    readonly Str = Str;
    /**
     * 字符串工具包
     */
    readonly StrUtil = StrUtil;
    /**
     * 日期对象
     */
    readonly DateTime = DateTime;
    /**
     * 日期工具包
     */
    readonly DateUtil = DateUtil;
    /**
     * 日期属性
     */
    readonly DateField = DateField;
    /**
     * 周数，0到6
     */
    readonly WeekDay = WeekDay;
    /**
     * 数字对象
     */
    readonly Num = Num;
    /**
     * 数字工具
     */
    readonly NumberUtil = NumberUtil;
    /**
     * 节流工具
     */
    readonly Throttle = Throttle;
    /**
     * 防抖工具
     */
    readonly Debounce = Debounce;
    /**
     * 文件工具包
     */
    readonly FileUtil = FileUtil;
    /**
     * 文件类型魔数映射
     */
    readonly FileTypeMagicMap = FileTypeMagicMap;
    /**
     * 文件类型MIME映射
     */
    readonly FileTypeMimeMap = FileTypeMimeMap;
    /**
     * 16进制工具包
     */
    readonly HexUtil = HexUtil;
    /**
     * 对象工具包
     */
    readonly ObjectUtil = ObjectUtil;
}

export default new Baitu();
