import Str from "./modules/string/Str";
import { StrUtil } from "./modules/string/StrUtil";
import DateTime, { DateField, WeekDay } from "./modules/dateTime/DateTime";
import { DateUtil } from "./modules/dateTime/DateUtil";
import { NumberUtil } from "./modules/number/NumberUtil";
import Num from "./modules/number/Num";
import Throttle from "./modules/common/Throttle";
import Debounce from "./modules/common/Debounce";
import { FileUtil } from "./modules/file/FileUtil";
import { FileTypeMagicMap } from "./modules/file/FileTypeMagicMap";
import { FileTypeMimeMap } from "./modules/file/FileTypeMimeMap";
import { HexUtil } from "./modules/base/HexUtil";
import { ObjectUtil } from "./modules/object/ObjectUtil";
import { DesensitizedUtil } from "./modules/string/DesensitizedUtil";
import { ArrayUtil } from "./modules/array/ArrayUtil";
import { PatternPool } from "./modules/common/PatternPool";
import { ValidateUtil } from "./modules/string/ValidateUtil";
import { ImgUtil } from "./modules/file/ImgUtil";
declare class Baitu {
    /**
     * 字符串对象
     */
    readonly Str: typeof Str;
    /**
     * 字符串工具包
     */
    readonly StrUtil: StrUtil;
    /**
     * 日期对象
     */
    readonly DateTime: typeof DateTime;
    /**
     * 日期工具包
     */
    readonly DateUtil: DateUtil;
    /**
     * 日期属性
     */
    readonly DateField: typeof DateField;
    /**
     * 周数，0到6
     */
    readonly WeekDay: typeof WeekDay;
    /**
     * 数字对象
     */
    readonly Num: typeof Num;
    /**
     * 数字工具
     */
    readonly NumberUtil: NumberUtil;
    /**
     * 节流工具
     */
    readonly Throttle: typeof Throttle;
    /**
     * 防抖工具
     */
    readonly Debounce: typeof Debounce;
    /**
     * 文件工具包
     */
    readonly FileUtil: FileUtil;
    /**
     * 文件类型魔数映射
     */
    readonly FileTypeMagicMap: FileTypeMagicMap;
    /**
     * 文件类型MIME映射
     */
    readonly FileTypeMimeMap: FileTypeMimeMap;
    /**
     * 16进制工具包
     */
    readonly HexUtil: HexUtil;
    /**
     * 对象工具包
     */
    readonly ObjectUtil: ObjectUtil;
    /**
     * 脱敏工具包
     */
    readonly DesensitizedUtil: DesensitizedUtil;
    /**
     * 数组工具包
     */
    readonly ArrayUtil: ArrayUtil;
    /**
     * 正则池
     */
    PatternPool: PatternPool;
    /**
     * 正则池class
     */
    PatternPollClass: typeof PatternPool;
    /**
     * 验证工具
     */
    readonly ValidateUtil: ValidateUtil;
    /**
     * 图片工具
     */
    readonly ImgUtil: ImgUtil;
    /**
     * 赋值正则池
     * @param patternPool 正则池
     */
    setPatternPool(patternPool: PatternPool): void;
    /**
     * 注入工具方法
     */
    putTo(fn: (key: any, tool: any) => {}): void;
    /**
     * 获取所有工具对象
     */
    values(): {
        /**
         * 字符串对象
         */
        Str: typeof Str;
        /**
         * 字符串工具包
         */
        StrUtil: StrUtil;
        /**
         * 日期对象
         */
        DateTime: typeof DateTime;
        /**
         * 日期属性
         */
        DateField: typeof DateField;
        /**
         * 周数，0到6
         */
        WeekDay: typeof WeekDay;
        /**
         * 日期工具包
         */
        DateUtil: DateUtil;
        /**
         * 数字对象
         */
        Num: typeof Num;
        /**
         * 数字工具
         */
        NumberUtil: NumberUtil;
        /**
         * 节流工具
         */
        Throttle: typeof Throttle;
        /**
         * 防抖工具
         */
        Debounce: typeof Debounce;
        /**
         * 文件工具包
         */
        FileUtil: FileUtil;
        /**
         * 16进制工具包
         */
        HexUtil: HexUtil;
        /**
         * 文件类型魔数映射
         */
        FileTypeMagicMap: FileTypeMagicMap;
        /**
         * 文件类型MIME映射
         */
        FileTypeMimeMap: FileTypeMimeMap;
        /**
         * 对象工具包
         */
        ObjectUtil: ObjectUtil;
        /**
         * 脱敏工具包
         */
        DesensitizedUtil: DesensitizedUtil;
        /**
         * 数组工具包
         */
        ArrayUtil: ArrayUtil;
        /**
         * 正则池
         */
        PatternPool: PatternPool;
        /**
         * 正则池class
         */
        PatternPollClass: typeof PatternPool;
        /**
         * 验证工具
         */
        ValidateUtil: ValidateUtil;
        /**
         * 图片工具
         */
        ImgUtil: ImgUtil;
    };
}
declare const _default: Baitu;
export default _default;
