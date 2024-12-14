import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import utc from 'dayjs/plugin/utc'
import Timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// 日期转换自定义格式
dayjs.extend(customParseFormat)
// 星期
dayjs.extend(weekday)
// 是否闰年
dayjs.extend(isLeapYear)
// 季度
dayjs.extend(quarterOfYear)
// 是否和一个时间相同或在一个时间之前
dayjs.extend(isSameOrBefore)
// 是否和一个时间相同或在一个时间之后
dayjs.extend(isSameOrAfter)
// 是否是今天
dayjs.extend(isToday)
// 是否是明天
dayjs.extend(isTomorrow)
// 是否是昨天
dayjs.extend(isYesterday)
// 协调世界时
dayjs.extend(utc)
// 时区
dayjs.extend(Timezone)
// 额外格式化
dayjs.extend(advancedFormat)
