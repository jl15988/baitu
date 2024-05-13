//取整数部分
import {DT} from "./data/DT";

function int2(v) {
    return Math.floor(v);
}

class JulianDay {

    J2000 = 2451545;

    getJulianDay(year: number, month: number, day: number, hour: number, min: number, second: number) {
        return this.toJulianDay(year, month, day + ((second / 60 + min) / 60 + hour) / 24);
    }

    toJulianDay(year: number, month: number, day: number) {
        let n = 0, G = 0;
        //判断是否为格里高利历日1582*372+10*31+15
        if (year * 372 + month * 31 + int2(day) >= 588829) {
            G = 1
        }
        if (month <= 2) {
            month += 12;
            year--
        }
        //加百年闰
        if (G) {
            n = int2(year / 100);
            n = 2 - n + int2(n / 4)
        }
        return int2(365.25 * (year + 4716)) + int2(30.6001 * (month + 1)) + day + n - 1524.5;
    }

    //传入儒略日(J2000起算),计算TD-UT(单位:日)
    dt_T(t) {
        return this.dt_calc(t / 365.2425 + 2000) / 86400.0;
    }

    dt_ext(y, jsd) {
        var dy = (y - 1820) / 100;
        return -20 + jsd * dy * dy;
    } //二次曲线外推

    dt_calc(y) { //计算世界时与原子时之差,传入年
        var y0 = DT[DT.length - 2]; //表中最后一年
        var t0 = DT[DT.length - 1]; //表中最后一年的deltatT
        if (y >= y0) {
            var jsd = 31; //sjd是y1年之后的加速度估计。瑞士星历表jsd=31,NASA网站jsd=32,skmap的jsd=29
            if (y > y0 + 100) return this.dt_ext(y, jsd);
            var v = this.dt_ext(y, jsd);       //二次曲线外推
            var dv = this.dt_ext(y0, jsd) - t0;  //ye年的二次外推与te的差
            return v - dv * (y0 + 100 - y) / 100;
        }
        var i, d = DT;
        for (i = 0; i < d.length; i += 5) if (y < d[i + 5]) break;
        var t1 = (y - d[i]) / (d[i + 5] - d[i]) * 10, t2 = t1 * t1, t3 = t2 * t1;
        return d[i + 1] + d[i + 2] * t1 + d[i + 3] * t2 + d[i + 4] * t3;
    }

    //提取jd中的时间(去除日期)
    timeStr(jd) {
        let h, m, s;
        jd += 0.5;
        jd = (jd - int2(jd));
        s = int2(jd * 86400 + 0.5);
        h = int2(s / 3600);
        s -= h * 3600;
        m = int2(s / 60);
        s -= m * 60;
        h = "0" + h;
        m = "0" + m;
        s = "0" + s;
        return h.substr(h.length - 2, 2) + ':' + m.substr(m.length - 2, 2) + ':' + s.substr(s.length - 2, 2);
    }
}

export default new JulianDay()
