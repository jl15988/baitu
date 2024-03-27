import Str from "./modules/string/Str";
import DateTime, { DateField, MonthField, WeekDay } from "./modules/dateTime/DateTime";
import Num from "./modules/number/Num";
import Throttle from "./modules/common/Throttle";
import Debounce from "./modules/common/Debounce";
import { PatternPool } from "./modules/common/PatternPool";
import SnowflakeIdWorker from "./modules/common/SnowflakeIdWorker";
declare const _default: {
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
    PatternPool: PatternPool;
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
    setPatternPool(patternPool: PatternPool): void;
};
export default _default;
