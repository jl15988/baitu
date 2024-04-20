import Str from "./modules/string/Str";
import StrUtil from "./modules/string/StrUtil";
import DateTime, {DateField, MonthField, WeekDay} from "./modules/dateTime/DateTime";
import DateUtil from "./modules/dateTime/DateUtil";
import NumberUtil from "./modules/number/NumberUtil";
import Num from "./modules/number/Num";
import Throttle from "./modules/common/Throttle";
import Debounce from "./modules/common/Debounce";
import FileUtil from "./modules/file/FileUtil";
import FileTypeMagicMap from "./modules/file/FileTypeMagicMap";
import FileTypeMimeMap from "./modules/file/FileTypeMimeMap";
import HexUtil from "./modules/common/HexUtil";
import ObjectUtil from "./modules/object/ObjectUtil";
import DesensitizedUtil from "./modules/string/DesensitizedUtil";
import ArrayUtil from "./modules/array/ArrayUtil";
import {PatternPool} from "./modules/common/PatternPool";
import ValidateUtil from "./modules/string/ValidateUtil";
import ImgUtil from "./modules/file/ImgUtil";
import IDUtil from "./modules/common/IDUtil";
import SnowflakeIdWorker from "./modules/common/SnowflakeIdWorker";
import EncryptUtil from "./modules/common/EncryptUtil";
import JSONUtil from "./modules/common/JSONUtil";
import UrlUtil from "./modules/common/UrlUtil";
import TreeUtil from "./modules/common/TreeUtil";

export default {
    Str,
    StrUtil,
    DateTime,
    DateField,
    WeekDay,
    MonthField,
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
    PatternPool: new PatternPool(),
    ValidateUtil,
    ImgUtil,
    IDUtil,
    SnowflakeIdWorker,
    EncryptUtil,
    JSONUtil,
    UrlUtil,
    TreeUtil,
    setPatternPool(patternPool: PatternPool) {
        if (patternPool instanceof PatternPool) {
            this.PatternPool = patternPool;
        }
    }
};
