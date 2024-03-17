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
import DesensitizedUtil from "./modules/string/DesensitizedUtil";
import ArrayUtil from "./modules/array/ArrayUtil";
import patternPoolInstance, {PatternPool} from "./modules/common/PatternPool";
import ValidateUtil from "./modules/string/ValidateUtil";
import Ternary from "./modules/common/Ternary";

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
    /**
     * 脱敏工具包
     */
    readonly DesensitizedUtil = DesensitizedUtil;
    /**
     * 数组工具包
     */
    readonly ArrayUtil = ArrayUtil;
    /**
     * 正则池
     */
    PatternPool: PatternPool = patternPoolInstance;
    /**
     * 正则池class
     */
    PatternPollClass = PatternPool;
    /**
     * 正则工具
     */
    readonly ValidateUtil = ValidateUtil;
    readonly Ternary = Ternary;

    /**
     * 赋值正则池
     * @param patternPool 正则池
     */
    setPatternPool(patternPool: PatternPool) {
        if (patternPool instanceof PatternPool) {
            this.PatternPool = patternPool;
        }
    }

    /**
     * 注入工具方法
     */
    putTo(fn: (key, tool) => {}) {
        if (!fn) return;
        const values = this.values();
        for (let key in values) {
            fn(key, values[key]);
        }
    }

    /**
     * 获取所有工具对象
     */
    values() {
        return {
            Str,
            StrUtil,
            DateTime,
            DateField,
            WeekDay,
            DateUtil,
            Num,
            NumberUtil,
            Throttle,
            Debounce,
            FileUtil,
            HexUtil,
            FileTypeMagicMap,
            FileTypeMimeMap,
            ObjectUtil,
            DesensitizedUtil,
            ArrayUtil,
            PatternPool: patternPoolInstance,
            PatternPollClass: PatternPool,
            ValidateUtil,
            Ternary
        }
    }
}

export default new Baitu();
