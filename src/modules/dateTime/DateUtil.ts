class DateUtil {
    toDate(dateTime) {
        let date;
        // 若传入时间为假值，则取当前时间
        if (!dateTime) {
            date = new Date()
        }
        // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
        else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
            date = new Date(dateTime * 1000)
        }
        // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
        else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
            date = new Date(Number(dateTime))
        }
            // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
        // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
        else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
            date = new Date(dateTime.replace(/-/g, '/'))
        }
        // 其他都认为符合 RFC 2822 规范
        else {
            date = new Date(dateTime)
        }
        return date;
    }

    format(date, format) {
        if (!format) {
            format = "yyyy-MM-dd HH:mm:ss"
        }
        const newDate = this.toDate(date);
        const timeSource = {
            'y': newDate.getFullYear().toString(), // 年
            'M': (newDate.getMonth() + 1).toString().padStart(2, '0'), // 月
            'd': newDate.getDate().toString().padStart(2, '0'), // 日
            'H': newDate.getHours().toString().padStart(2, '0'), // 时
            'm': newDate.getMinutes().toString().padStart(2, '0'), // 分
            's': newDate.getSeconds().toString().padStart(2, '0') // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (const key in timeSource) {
            const [ret] = new RegExp(`${key}+`).exec(format) || [];
            if (ret) {
                // 年可能只需展示两位
                const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
                format = format.replace(ret, timeSource[key].slice(beginIndex));
            }
        }

        return format;
    }
}

export default new DateUtil();