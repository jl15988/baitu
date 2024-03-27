import Str from "./modules/string/Str";
import StrUtil from "./modules/string/StrUtil";
import DateTime, { DateField, MonthField, WeekDay } from "./modules/dateTime/DateTime";
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
import PatternPool from "./modules/common/PatternPool";
import ValidateUtil from "./modules/string/ValidateUtil";
import ImgUtil from "./modules/file/ImgUtil";
import IDUtil from "./modules/common/IDUtil";
import SnowflakeIdWorker from "./modules/common/SnowflakeIdWorker";
import EncryptUtil from "./modules/common/EncryptUtil";
export { Str, StrUtil, DateTime, DateField, WeekDay, MonthField, DateUtil, Num, NumberUtil, Throttle, Debounce, FileUtil, HexUtil, FileTypeMagicMap, FileTypeMimeMap, ObjectUtil, DesensitizedUtil, ArrayUtil, PatternPool, ValidateUtil, ImgUtil, IDUtil, SnowflakeIdWorker, EncryptUtil };
declare const Baitu: {
    Str: typeof Str;
    StrUtil: import("./modules/string/StrUtil").StrUtil;
    DateTime: typeof DateTime;
    DateField: typeof DateField;
    WeekDay: typeof WeekDay;
    MonthField: typeof MonthField;
    DateUtil: import("./modules/dateTime/DateUtil").DateUtil;
    Num: typeof Num;
    NumberUtil: import("./modules/number/NumberUtil").NumberUtil;
    Throttle: typeof Throttle;
    Debounce: typeof Debounce;
    FileUtil: import("./modules/file/FileUtil").FileUtil;
    HexUtil: import("./modules/base/HexUtil").HexUtil;
    FileTypeMagicMap: import("./modules/file/FileTypeMagicMap").FileTypeMagicMap;
    FileTypeMimeMap: import("./modules/file/FileTypeMimeMap").FileTypeMimeMap;
    ObjectUtil: import("./modules/object/ObjectUtil").ObjectUtil;
    DesensitizedUtil: import("./modules/string/DesensitizedUtil").DesensitizedUtil;
    ArrayUtil: import("./modules/array/ArrayUtil").ArrayUtil;
    PatternPool: import("./modules/common/PatternPool").PatternPool;
    ValidateUtil: import("./modules/string/ValidateUtil").ValidateUtil;
    ImgUtil: import("./modules/file/ImgUtil").ImgUtil;
    IDUtil: {
        uuid(simple?: boolean): string;
        snowflake(workerId?: number, dataCenterId?: number): SnowflakeIdWorker;
    };
    SnowflakeIdWorker: typeof SnowflakeIdWorker;
    EncryptUtil: {
        Base64: import("./modules/common/EncryptUtil").Base64Class;
        MD5: (str: string) => string;
        RSA: typeof import("./modules/common/EncryptUtil").RSA;
        AES: {
            new (secretKey: string): {
                secretKey: string;
                iv: string;
                mode: any;
                padding: any;
                pads: {
                    Pkcs7: any;
                    Ansix923: any;
                    Iso10126: any;
                    Iso97971: any;
                    NoPadding: any;
                    ZeroPadding: any;
                };
                mods: {
                    CFB: any;
                    CTR: any;
                    CTRGladman: any;
                    ECB: any;
                    OFB: any;
                };
                setPadding(padding: any): void;
                setMode(mode: any): void;
                encode(str: string): string;
                decode(str: string): string;
            };
            build(secretKey: string): {
                secretKey: string;
                iv: string;
                mode: any;
                padding: any;
                pads: {
                    Pkcs7: any;
                    Ansix923: any;
                    Iso10126: any;
                    Iso97971: any;
                    NoPadding: any;
                    ZeroPadding: any;
                };
                mods: {
                    CFB: any;
                    CTR: any;
                    CTRGladman: any;
                    ECB: any;
                    OFB: any;
                };
                setPadding(padding: any): void;
                setMode(mode: any): void;
                encode(str: string): string;
                decode(str: string): string;
            };
        };
    };
    setPatternPool(patternPool: import("./modules/common/PatternPool").PatternPool): void;
};
export default Baitu;
