import Str from "./modules/string/Str";
import {StrUtil} from "./modules/string/StrUtil";
import DateTime, {DateField, WeekDay} from "./modules/dateTime/DateTime";
import {DateUtil} from "./modules/dateTime/DateUtil";
import {NumberUtil} from "./modules/number/NumberUtil";
import Num from "./modules/number/Num";
import Throttle from "./modules/common/Throttle";
import Debounce from "./modules/common/Debounce";
import {FileUtil} from "./modules/file/FileUtil";
import {FileTypeMagicMap} from "./modules/file/FileTypeMagicMap";
import {FileTypeMimeMap} from "./modules/file/FileTypeMimeMap";
import {HexUtil} from "./modules/base/HexUtil";
import {ObjectUtil} from "./modules/object/ObjectUtil";
import {DesensitizedUtil} from "./modules/string/DesensitizedUtil";
import {ArrayUtil} from "./modules/array/ArrayUtil";
import {PatternPool} from "./modules/common/PatternPool";
import {ValidateUtil} from "./modules/string/ValidateUtil";
import {ImgUtil} from "./modules/file/ImgUtil";

const values = {
    /**
     * 字符串对象
     */
    Str,
    /**
     * 字符串工具包
     */
    StrUtil: new StrUtil(),
    /**
     * 日期对象
     */
    DateTime,
    /**
     * 日期属性
     */
    DateField,
    /**
     * 周数，0到6
     */
    WeekDay,
    /**
     * 日期工具包
     */
    DateUtil: new DateUtil(),
    /**
     * 数字对象
     */
    Num,
    /**
     * 数字工具
     */
    NumberUtil: new NumberUtil(),
    /**
     * 节流工具
     */
    Throttle,
    /**
     * 防抖工具
     */
    Debounce,
    /**
     * 文件工具包
     */
    FileUtil: new FileUtil(),
    /**
     * 16进制工具包
     */
    HexUtil: new HexUtil(),
    /**
     * 文件类型魔数映射
     */
    FileTypeMagicMap: new FileTypeMagicMap(),
    /**
     * 文件类型MIME映射
     */
    FileTypeMimeMap: new FileTypeMimeMap(),
    /**
     * 对象工具包
     */
    ObjectUtil: new ObjectUtil(),
    /**
     * 脱敏工具包
     */
    DesensitizedUtil: new DesensitizedUtil(),
    /**
     * 数组工具包
     */
    ArrayUtil: new ArrayUtil(),
    /**
     * 正则池
     */
    PatternPool: new PatternPool(),
    /**
     * 正则池class
     */
    PatternPollClass: PatternPool,
    /**
     * 验证工具
     */
    ValidateUtil: new ValidateUtil(),
    /**
     * 图片工具
     */
    ImgUtil: new ImgUtil()
}

class Baitu {
    /**
     * 字符串对象
     */
    readonly Str = Str;
    /**
     * 字符串工具包
     */
    readonly StrUtil = new StrUtil();
    /**
     * 日期对象
     */
    readonly DateTime = DateTime;
    /**
     * 日期工具包
     */
    readonly DateUtil = new DateUtil();
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
    readonly NumberUtil = new NumberUtil();
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
    readonly FileUtil = new FileUtil();
    /**
     * 文件类型魔数映射
     */
    readonly FileTypeMagicMap = new FileTypeMagicMap();
    /**
     * 文件类型MIME映射
     */
    readonly FileTypeMimeMap = new FileTypeMimeMap();
    /**
     * 16进制工具包
     */
    readonly HexUtil = new HexUtil();
    /**
     * 对象工具包
     */
    readonly ObjectUtil = new ObjectUtil();
    /**
     * 脱敏工具包
     */
    readonly DesensitizedUtil = new DesensitizedUtil();
    /**
     * 数组工具包
     */
    readonly ArrayUtil = new ArrayUtil();
    /**
     * 正则池
     */
    PatternPool = new PatternPool();
    /**
     * 正则池class
     */
    PatternPollClass = PatternPool;
    /**
     * 验证工具
     */
    readonly ValidateUtil = new ValidateUtil();
    /**
     * 图片工具
     */
    readonly ImgUtil = new ImgUtil();

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
        return values;
    }
}

export default new Baitu();
