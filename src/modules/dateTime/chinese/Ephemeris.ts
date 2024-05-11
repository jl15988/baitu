import {XL0, XL0_xzb, XL1} from "./data/XL";
import JulianDay from "./JulianDay";
import {NutB} from "./data/NutB";

function int2(v) {
    return Math.floor(v);
}

//求余
function mod2(v, n) {
    return (v % n + n) % n;
}

function sqrt(x) {
    return Math.sqrt(x);
}

function floor(x) {
    return Math.floor(x);
}

function abs(x) {
    return Math.abs(x);
}

function sin(x) {
    return Math.sin(x);
}

function cos(x) {
    return Math.cos(x);
}

function tan(x) {
    return Math.tan(x);
}

function asin(x) {
    return Math.asin(x);
}

function acos(x) {
    return Math.acos(x);
}

function atan(x) {
    return Math.atan(x);
}

function atan2(y, x) {
    return Math.atan2(y, x);
}

class Ephemeris {
    //地球赤道半径(千米)
    cs_rEar = 6378.1366;
    //平均半径
    cs_rEarA = 0.99834 * this.cs_rEar;
    //地球极赤半径比
    cs_ba = 0.99664719;
    //地球极赤半径比的平方
    cs_ba2 = this.cs_ba * this.cs_ba;
    //天文单位长度(千米)
    cs_AU = 1.49597870691e8;
    //sin(太阳视差)
    cs_sinP = this.cs_rEar / this.cs_AU;
    //太阳视差
    cs_PI = Math.asin(this.cs_sinP);
    //光速(行米/秒)
    cs_GS = 299792.458;
    //每天文单位的光行时间(儒略世纪)
    cs_Agx = this.cs_AU / this.cs_GS / 86400 / 36525;
    //行星会合周期
    cs_xxHH = [116, 584, 780, 399, 378, 370, 367, 367];
    xxName = ['地球', '水星', '金星', '火星', '木星', '土星', '天王星', '海王星', '冥王星'];
    //每弧度的角秒数
    rad = 180 * 3600 / Math.PI;
    //每弧度的度数
    radd = 180 / Math.PI;
    pi2 = Math.PI * 2;
    pi_2 = Math.PI / 2;
    J2000 = 2451545;

    //月亮与地球的半径比(用于半影计算)
    cs_k = 0.2725076;
    //月亮与地球的半径比(用于本影计算)
    cs_k2 = 0.2722810;
    //太阳与地球的半径比(对应959.64)
    cs_k0 = 109.1222;
    //用于月亮视半径计算
    cs_sMoon = this.cs_k * this.cs_rEar * 1.0000036 * this.rad;
    //用于月亮视半径计算
    cs_sMoon2 = this.cs_k2 * this.cs_rEar * 1.0000036 * this.rad;
    //用于太阳视半径计算
    cs_sSun = 959.64;

    //星历函数(日月球面坐标计算)

    //地球经度计算,返回Date分点黄经,传入世纪数、取项数
    E_Lon(t, n) {
        return this.XL0_calc(0, 0, t, n);
    }

    //月球经度计算,返回Date分点黄经,传入世纪数,n是项数比例
    M_Lon(t, n) {
        return this.XL1_calc(0, t, n);
    }

//=========================
    //地球速度,t是世纪数,误差小于万分3
    E_v(t) {
        var f = 628.307585 * t;
        return 628.332 + 21 * Math.sin(1.527 + f) + 0.44 * Math.sin(1.48 + f * 2)
            + 0.129 * Math.sin(5.82 + f) * t + 0.00055 * Math.sin(4.21 + f) * t * t;
    }

    //月球速度计算,传入世经数
    M_v(t) {
        var v = 8399.71 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t); //误差小于5%
        v -= 179 * Math.sin(2.543 + 15542.7543 * t)  //误差小于0.3%
            + 160 * Math.sin(0.1874 + 7214.0629 * t)
            + 62 * Math.sin(3.14 + 16657.3828 * t)
            + 34 * Math.sin(4.827 + 16866.9323 * t)
            + 22 * Math.sin(4.9 + 23871.4457 * t)
            + 12 * Math.sin(2.59 + 14914.4523 * t)
            + 7 * Math.sin(0.23 + 6585.7609 * t)
            + 5 * Math.sin(0.9 + 25195.624 * t)
            + 5 * Math.sin(2.32 - 7700.3895 * t)
            + 5 * Math.sin(3.88 + 8956.9934 * t)
            + 5 * Math.sin(0.49 + 7771.3771 * t);
        return v;
    }

//=========================
    //月日视黄经的差值
    MS_aLon(t, Mn, Sn) {
        return this.M_Lon(t, Mn) + this.gxc_moonLon(t) - (this.E_Lon(t, Sn) + this.gxc_sunLon(t) + Math.PI);
    }

    //太阳视黄经
    S_aLon(t, n) {
        return this.E_Lon(t, n) + this.nutationLon2(t) + this.gxc_sunLon(t) + Math.PI; //注意，这里的章动计算很耗时
    }

//=========================

    //已知地球真黄经求时间
    E_Lon_t(W) {
        var t, v = 628.3319653318;
        t = (W - 1.75347) / v;
        v = this.E_v(t);   //v的精度0.03%，详见原文
        t += (W - this.E_Lon(t, 10)) / v;
        v = this.E_v(t);   //再算一次v有助于提高精度,不算也可以
        t += (W - this.E_Lon(t, -1)) / v;
        return t;
    }

    //已知真月球黄经求时间
    M_Lon_t(W) {
        var t, v = 8399.70911033384;
        t = (W - 3.81034) / v;
        t += (W - this.M_Lon(t, 3)) / v;
        v = this.M_v(t);  //v的精度0.5%，详见原文
        t += (W - this.M_Lon(t, 20)) / v;
        t += (W - this.M_Lon(t, -1)) / v;
        return t;
    }

    //已知月日视黄经差求时间
    MS_aLon_t(W) {
        var t, v = 7771.37714500204;
        t = (W + 1.08472) / v;
        t += (W - this.MS_aLon(t, 3, 3)) / v;
        v = this.M_v(t) - this.E_v(t);  //v的精度0.5%，详见原文
        t += (W - this.MS_aLon(t, 20, 10)) / v;
        t += (W - this.MS_aLon(t, -1, 60)) / v;
        return t;
    }

    //已知太阳视黄经反求时间
    S_aLon_t(W) {
        var t, v = 628.3319653318;
        t = (W - 1.75347 - Math.PI) / v;
        v = this.E_v(t); //v的精度0.03%，详见原文
        t += (W - this.S_aLon(t, 10)) / v;
        v = this.E_v(t); //再算一次v有助于提高精度,不算也可以
        t += (W - this.S_aLon(t, -1)) / v;
        return t;
    }

    /****
     MS_aLon_t1:function(W){ //已知月日视黄经差求时间,高速低精度,误差不超过40秒
  var t,v = 7771.37714500204;
  t  = ( W + 1.08472               )/v;
  t += ( W - this.MS_aLon(t, 3, 3) )/v;  v=this.M_v(t)-this.E_v(t);  //v的精度0.5%，详见原文
  t += ( W - this.MS_aLon(t,50,20) )/v;
  return t;
},
     S_aLon_t1:function(W){ //已知太阳视黄经反求时间,高速低精度,最大误差不超过50秒,平均误差15秒
  var t,v= 628.3319653318;
  t  = ( W - 1.75347-Math.PI   )/v; v = 628.332 + 21*Math.sin( 1.527+628.307585*t );
  t += ( W - this.S_aLon(t,3) )/v;
  t += ( W - this.S_aLon(t,40))/v;
  return t;
}
     ****/
    //已知月日视黄经差求时间,高速低精度,误差不超过600秒(只验算了几千年)
    MS_aLon_t2(W) {
        var t, v = 7771.37714500204;
        t = (W + 1.08472) / v;
        var L, t2 = t * t;
        t -= (-0.00003309 * t2 + 0.10976 * Math.cos(0.784758 + 8328.6914246 * t + 0.000152292 * t2) + 0.02224 * Math.cos(0.18740 + 7214.0628654 * t - 0.00021848 * t2) - 0.03342 * Math.cos(4.669257 + 628.307585 * t)) / v;
        L = this.M_Lon(t, 20) - (4.8950632 + 628.3319653318 * t + 0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t + 0.000349 * Math.cos(4.6261 + 1256.61517 * t) - 20.5 / this.rad);
        v = 7771.38 - 914 * Math.sin(0.7848 + 8328.691425 * t + 0.0001523 * t * t) - 179 * Math.sin(2.543 + 15542.7543 * t) - 160 * Math.sin(0.1874 + 7214.0629 * t);
        t += (W - L) / v;
        return t;
    }

    //已知太阳视黄经反求时间,高速低精度,最大误差不超过600秒
    S_aLon_t2(W) {
        var t, L, v = 628.3319653318;
        t = (W - 1.75347 - Math.PI) / v;
        t -= (0.000005297 * t * t + 0.0334166 * Math.cos(4.669257 + 628.307585 * t) + 0.0002061 * Math.cos(2.67823 + 628.307585 * t) * t) / v;
        t += (W - this.E_Lon(t, 8) - Math.PI + (20.5 + 17.2 * Math.sin(2.1824 - 33.75705 * t)) / this.rad) / v;
        return t;
    }

    //月亮被照亮部分的比例
    moonIll(t) {
        var t2 = t * t, t3 = t2 * t, t4 = t3 * t;
        var D, M, m, a, dm = Math.PI / 180;
        D = (297.8502042 + 445267.1115168 * t - 0.0016300 * t2 + t3 / 545868 - t4 / 113065000) * dm; //日月平距角
        M = (357.5291092 + 35999.0502909 * t - 0.0001536 * t2 + t3 / 24490000) * dm; //太阳平近点
        m = (134.9634114 + 477198.8676313 * t + 0.0089970 * t2 + t3 / 69699 - t4 / 14712000) * dm; //月亮平近点
        a = Math.PI - D + (-6.289 * Math.sin(m) + 2.100 * Math.sin(M) - 1.274 * Math.sin(D * 2 - m) - 0.658 * Math.sin(D * 2) - 0.214 * Math.sin(m * 2) - 0.110 * Math.sin(D)) * dm;
        return (1 + Math.cos(a)) / 2;
    }

    //转入地平纬度及地月质心距离,返回站心视半径(角秒)
    moonRad(r, h) {
        return this.cs_sMoon / r * (1 + Math.sin(h) * this.cs_rEar / r);
    }

    //求月亮近点时间和距离,t为儒略世纪数力学时
    moonMinR(t, min) {
        var a = 27.55454988 / 36525, b;
        if (min) b = -10.3302 / 36525; else b = 3.4471 / 36525;
        t = b + a * int2((t - b) / a + 0.5); //平近(远)点时间
        var r1, r2, r3, dt;
        //初算二次
        dt = 2 / 36525;
        r1 = this.XL1_calc(2, t - dt, 10);
        r2 = this.XL1_calc(2, t, 10);
        r3 = this.XL1_calc(2, t + dt, 10);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2;
        dt = 0.5 / 36525;
        r1 = this.XL1_calc(2, t - dt, 20);
        r2 = this.XL1_calc(2, t, 20);
        r3 = this.XL1_calc(2, t + dt, 20);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2;
        //精算
        dt = 1200 / 86400 / 36525;
        r1 = this.XL1_calc(2, t - dt, -1);
        r2 = this.XL1_calc(2, t, -1);
        r3 = this.XL1_calc(2, t + dt, -1);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2;
        r2 += (r1 - r3) / (r1 + r3 - 2 * r2) * (r3 - r1) / 8;
        var re = new Array(t, r2);
        return re;
    }

    //月亮升交点
    moonNode(t, asc) {
        var a = 27.21222082 / 36525, b;
        if (asc) b = 21 / 36525; else b = 35 / 36525;
        t = b + a * int2((t - b) / a + 0.5); //平升(降)交点时间
        var w, v, w2, dt;
        dt = 0.5 / 36525;
        w = this.XL1_calc(1, t, 10);
        w2 = this.XL1_calc(1, t + dt, 10);
        v = (w2 - w) / dt;
        t -= w / v;
        dt = 0.05 / 36525;
        w = this.XL1_calc(1, t, 40);
        w2 = this.XL1_calc(1, t + dt, 40);
        v = (w2 - w) / dt;
        t -= w / v;
        w = this.XL1_calc(1, t, -1);
        t -= w / v;
        var re = [t, this.XL1_calc(0, t, -1)];
        return re;
    }

    //地球近远点
    earthMinR(t, min) {
        var a = 365.25963586 / 36525, b;
        if (min) b = 1.7 / 36525; else b = 184.5 / 36525;
        t = b + a * int2((t - b) / a + 0.5); //平近(远)点时间
        var r1, r2, r3, dt;
        //初算二次
        dt = 3 / 36525;
        r1 = this.XL0_calc(0, 2, t - dt, 10);
        r2 = this.XL0_calc(0, 2, t, 10);
        r3 = this.XL0_calc(0, 2, t + dt, 10);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2; //误差几个小时
        dt = 0.2 / 36525;
        r1 = this.XL0_calc(0, 2, t - dt, 80);
        r2 = this.XL0_calc(0, 2, t, 80);
        r3 = this.XL0_calc(0, 2, t + dt, 80);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2; //误差几分钟
        //精算
        dt = 0.01 / 36525;
        r1 = this.XL0_calc(0, 2, t - dt, -1);
        r2 = this.XL0_calc(0, 2, t, -1);
        r3 = this.XL0_calc(0, 2, t + dt, -1);
        t += (r1 - r3) / (r1 + r3 - 2 * r2) * dt / 2; //误差小于秒
        r2 += (r1 - r3) / (r1 + r3 - 2 * r2) * (r3 - r1) / 8;
        var re = [t, r2];
        return re;
    }

    //地图投影转换部分
    //地图解码,p地图串,Jb经度的倍率,Wb纬度倍率
    dituJM(p, Jb, Wb) {
        p = p.split('');
        var len = p.length, a = [];
        var J = 0, W = 0, b = 0;
        var i, j, k = 0, k2 = 0, c;
        for (i = 0; i < len; i++) {
            c = p[i];
            if (c == '#') {
                J = 0, W = 0, k2 = 0, a[k] = 1e7, k++;
                continue;
            }
            if (c >= 'a' && c <= 'z') b = c.charCodeAt(0) - 97;
            else if (c >= 'A' && c <= 'Z') b = 65 - c.charCodeAt(0);
            else {
                for (j = ++i; i < j + 20; c += p[i++]) {
                    if (p[i] == ',') {
                        b = c - 0;
                        break;
                    }
                    if (p[i] == ':') {
                        b = 0 - c;
                        break;
                    }
                }
            }
            k2++;
            if (k2 % 2) J += b, a[k] = J * Jb, k++;
            else W += b, a[k] = W * Wb, k++;
        }
        return a;
    }

    //xt星体,zn坐标号,t儒略世纪数,n计算项数
    XL0_calc(xt, zn, t, n) {
        t /= 10; //转为儒略千年数
        var i, j, v = 0, tn = 1, c;
        var F = XL0[xt], n1, n2, N;
        var n0, pn = zn * 6 + 1, N0 = F[pn + 1] - F[pn]; //N0序列总数
        for (i = 0; i < 6; i++, tn *= t) {
            n1 = F[pn + i], n2 = F[pn + 1 + i], n0 = n2 - n1;
            if (!n0) continue;
            if (n < 0) N = n2;  //确定项数
            else {
                N = int2(3 * n * n0 / N0 + 0.5) + n1;
                if (i) N += 3;
                if (N > n2) N = n2;
            }
            for (j = n1, c = 0; j < N; j += 3) c += F[j] * Math.cos(F[j + 1] + t * F[j + 2]);
            v += c * tn;
        }
        v /= F[0];
        if (xt == 0) { //地球
            var t2 = t * t, t3 = t2 * t; //千年数的各次方
            if (zn == 0) v += (-0.0728 - 2.7702 * t - 1.1019 * t2 - 0.0996 * t3) / this.rad;
            if (zn == 1) v += (+0.0000 + 0.0004 * t + 0.0004 * t2 - 0.0026 * t3) / this.rad;
            if (zn == 2) v += (-0.0020 + 0.0044 * t + 0.0213 * t2 - 0.0250 * t3) / 1000000;
        } else { //其它行星
            var dv = XL0_xzb[(xt - 1) * 3 + zn];
            if (zn == 0) v += -3 * t / this.rad;
            if (zn == 2) v += dv / 1000000;
            else v += dv / this.rad;
        }
        return v;
    }


    /*=================================月亮星历--=======================================
    //==================================================================================
    */

    //计算月亮
    XL1_calc(zn, t, n) {
        var ob = XL1[zn];
        var i, j, F, N, v = 0, tn = 1, c;
        var t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t, tx = t - 10;
        if (zn == 0) {
            v += (3.81034409 + 8399.684730072 * t - 3.319e-05 * t2 + 3.11e-08 * t3 - 2.033e-10 * t4) * this.rad; //月球平黄经(弧度)
            v += 5028.792262 * t + 1.1124406 * t2 + 0.00007699 * t3 - 0.000023479 * t4 - 0.0000000178 * t5;  //岁差(角秒)
            if (tx > 0) v += -0.866 + 1.43 * tx + 0.054 * tx * tx; //对公元3000年至公元5000年的拟合,最大误差小于10角秒
        }
        t2 /= 1e4, t3 /= 1e8, t4 /= 1e8;
        n *= 6;
        if (n < 0) n = ob[0].length;
        for (i = 0; i < ob.length; i++, tn *= t) {
            F = ob[i];
            N = int2(n * F.length / ob[0].length + 0.5);
            if (i) N += 6;
            if (N >= F.length) N = F.length;
            for (j = 0, c = 0; j < N; j += 6) c += F[j] * Math.cos(F[j + 1] + t * F[j + 2] + t2 * F[j + 3] + t3 * F[j + 4] + t4 * F[j + 5]);
            v += c * tn;
        }
        if (zn != 2) v /= this.rad;
        return v;
    };

    //返回月球坐标,n1,n2,n3为各坐标所取的项数
    m_coord(t, n1, n2, n3) {
        var re = [];
        re[0] = this.XL1_calc(0, t, n1);
        re[1] = this.XL1_calc(1, t, n2);
        re[2] = this.XL1_calc(2, t, n3);
        return re;
    }

    //=============================一些天文基本问题=====================================
//==================================================================================
    // 返回朔日的编号,jd应在朔日附近，允许误差数天
    suoN(jd) {
        return Math.floor((jd + 8) / 29.5306);
    }

    //太阳光行差,t是世纪数
    gxc_sunLon(t) {
        var v = -0.043126 + 628.301955 * t - 0.000002732 * t * t; //平近点角
        var e = 0.016708634 - 0.000042037 * t - 0.0000001267 * t * t;
        return (-20.49552 * (1 + e * Math.cos(v))) / this.rad; //黄经光行差
    }

    //黄纬光行差
    gxc_sunLat(t) {
        return 0;
    }

    //月球经度光行差,误差0.07"
    gxc_moonLon(t) {
        return -3.4E-6;
    }

    //月球纬度光行差,误差0.006"
    gxc_moonLat(t) {
        return 0.063 * Math.sin(0.057 + 8433.4662 * t + 0.000064 * t * t) / this.rad;
    }

    //传入T是2000年首起算的日数(UT),dt是deltatT(日),精度要求不高时dt可取值为0
    pGST(T, dt) {
        //返回格林尼治平恒星时(不含赤经章动及非多项式部分),即格林尼治子午圈的平春风点起算的赤经
        var t = (T + dt) / 36525, t2 = t * t, t3 = t2 * t, t4 = t3 * t;
        return this.pi2 * (0.7790572732640 + 1.00273781191135448 * T) //T是UT,下一行的t是力学时(世纪数)
            + (0.014506 + 4612.15739966 * t + 1.39667721 * t2 - 0.00009344 * t3 + 0.00001882 * t4) / this.rad;
    }

    //传入力学时J2000起算日数，返回平恒星时
    pGST2(jd) {
        var dt = JulianDay.dt_T(jd);
        return this.pGST(jd - dt, dt);
    }

    //太阳升降计算。jd儒略日(须接近L当地平午UT)，L地理经度，fa地理纬度，sj=-1升,sj=1降
    sunShengJ(jd, L, fa, sj) {
        var i;
        jd = floor(jd + 0.5) - L / this.pi2;
        for (i = 0; i < 2; i++) {
            var T = jd / 36525, E = (84381.4060 - 46.836769 * T) / this.rad; //黄赤交角
            var t = T + (32 * (T + 1.8) * (T + 1.8) - 20) / 86400 / 36525;  //儒略世纪年数,力学时
            var J = (48950621.66 + 6283319653.318 * t + 53 * t * t - 994
                + 334166 * cos(4.669257 + 628.307585 * t)
                + 3489 * cos(4.6261 + 1256.61517 * t)
                + 2060.6 * cos(2.67823 + 628.307585 * t) * t) / 10000000;
            var sinJ = sin(J), cosJ = cos(J); //太阳黄经以及它的正余弦值
            var gst = (0.7790572732640 + 1.00273781191135448 * jd) * this.pi2 + (0.014506 + 4612.15739966 * T + 1.39667721 * T * T) / this.rad; //恒星时(子午圈位置)
            var A = atan2(sinJ * cos(E), cosJ);  //太阳赤经
            var D = asin(sin(E) * sinJ);        //太阳赤纬
            var cosH0 = (sin(-50 * 60 / this.rad) - sin(fa) * sin(D)) / (cos(fa) * cos(D));
            if (abs(cosH0) >= 1) return 0; //太阳在地平线上的cos(时角)计算
            jd += this.rad2rrad(sj * acos(cosH0) - (gst + L - A)) / 6.28; //(升降时角-太阳时角)/太阳速度
        }
        return jd; //反回格林尼治UT
    }

    //时差计算(高精度),t力学时儒略世纪数
    pty_zty(t) {
        var t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t;
        var L = (1753470142 + 628331965331.8 * t + 5296.74 * t2 + 0.432 * t3 - 0.1124 * t4 - 0.00009 * t5) / 1000000000 + Math.PI - 20.5 / this.rad;

        var E, dE, dL, f, z = [];
        dL = -17.2 * Math.sin(2.1824 - 33.75705 * t) / this.rad; //黄经章
        dE = 9.2 * Math.cos(2.1824 - 33.75705 * t) / this.rad; //交角章
        E = this.hcjj(t) + dE; //真黄赤交角

        //地球坐标
        z[0] = this.XL0_calc(0, 0, t, 50) + Math.PI + this.gxc_sunLon(t) + dL;
        z[1] = -(2796 * Math.cos(3.1987 + 8433.46616 * t) + 1016 * Math.cos(5.4225 + 550.75532 * t) + 804 * Math.cos(3.88 + 522.3694 * t)) / 1000000000;

        z = this.llrConv(z, E); //z太阳地心赤道坐标
        z[0] -= dL * Math.cos(E);

        L = this.rad2rrad(L - z[0]);
        return L / this.pi2; //单位是周(天)
    }

    //时差计算(低精度),误差约在1秒以内,t力学时儒略世纪数
    pty_zty2(t) {
        var L = (1753470142 + 628331965331.8 * t + 5296.74 * t * t) / 1000000000 + Math.PI;
        var z = [];
        var E = (84381.4088 - 46.836051 * t) / this.rad;
        z[0] = this.XL0_calc(0, 0, t, 5) + Math.PI, z[1] = 0; //地球坐标
        z = this.llrConv(z, E); //z太阳地心赤道坐标
        L = this.rad2rrad(L - z[0]);
        return L / this.pi2; //单位是周(天)
    }

    //=================================数学工具=========================================
//==================================================================================
    //对超过0-2PI的角度转为0-2PI
    rad2mrad(v) {
        v = v % (2 * Math.PI);
        if (v < 0) return v + 2 * Math.PI;
        return v;
    }

    //对超过-PI到PI的角度转为-PI到PI
    rad2rrad(v) {
        v = v % (2 * Math.PI);
        if (v <= -Math.PI) return v + 2 * Math.PI;
        if (v > Math.PI) return v - 2 * Math.PI;
        return v;
    }

// function mod2(a,b){ //临界余数(a与最近的整倍数b相差的距离)
//   var c=a/b;
//   c -= Math.floor(c);
//   if(c>0.5) c-=1;
//   return c*b;
// }
//#4 下面是hetai9z优化后的函数,简洁快速:
    // 临界余数(a与最近的整倍数b相差的距离)
    mod2(a, b) {
        let c = (a + b) % b
        if (c > b / 2.0) c -= b
        return c;
    }

    //球面转直角坐标
    llr2xyz(JW) {
        var r = [], J = JW[0], W = JW[1], R = JW[2];
        r[0] = R * cos(W) * cos(J);
        r[1] = R * cos(W) * sin(J);
        r[2] = R * sin(W);
        return r;
    }

    //直角坐标转球
    xyz2llr(xyz) {
        var r = [], x = xyz[0], y = xyz[1], z = xyz[2];
        r[2] = sqrt(x * x + y * y + z * z);
        r[1] = asin(z / r[2]);
        r[0] = this.rad2mrad(atan2(y, x));
        return r;
    }

    //球面坐标旋转
    llrConv(JW, E) {
        //黄道赤道坐标变换,赤到黄E取负
        var r = [], J = JW[0], W = JW[1];
        r[0] = atan2(sin(J) * cos(E) - tan(W) * sin(E), cos(J));
        r[1] = asin(cos(E) * sin(W) + sin(E) * cos(W) * sin(J));
        r[2] = JW[2];
        r[0] = this.rad2mrad(r[0]);
        return r;
    }

    //赤道坐标转为地平坐标
    CD2DP(z, L, fa, gst) {
        var a = [z[0] + Math.PI / 2 - gst - L, z[1], z[2]];  //转到相对于地平赤道分点的赤道坐标
        a = this.llrConv(a, Math.PI / 2 - fa);
        a[0] = this.rad2mrad(Math.PI / 2 - a[0]);
        return a;
    }

    //求角度差
    j1_j2(J1, W1, J2, W2) {
        var dJ = this.rad2rrad(J1 - J2), dW = W1 - W2;
        if (Math.abs(dJ) < 1 / 1000 && Math.abs(dW) < 1 / 1000) {
            dJ *= Math.cos((W1 + W2) / 2);
            return Math.sqrt(dJ * dJ + dW * dW);
        }
        return Math.acos(Math.sin(W1) * Math.sin(W2) + Math.cos(W1) * Math.cos(W2) * Math.cos(dJ));
    }

    h2g(z, a) { //日心球面转地心球面,Z星体球面坐标,A地球球面坐标
        //本含数是通用的球面坐标中心平移函数,行星计算中将反复使用
        a = this.llr2xyz(a); //地球
        z = this.llr2xyz(z); //星体
        z[0] -= a[0];
        z[1] -= a[1];
        z[2] -= a[2];
        return this.xyz2llr(z);
    }

    shiChaJ(gst, L, fa, J, W) { //视差角(不是视差)
        var H = gst + L - J; //天体的时角
        return this.rad2mrad(atan2(sin(H), tan(fa) * cos(W) - sin(W) * cos(H)));
    }

    //只计算黄经章动
    nutationLon2(t) {
        var i, a, t2 = t * t, dL = 0, B = NutB;
        for (i = 0; i < B.length; i += 5) {
            if (i == 0) a = -1.742 * t; else a = 0;
            dL += (B[i + 3] + a) * Math.sin(B[i] + B[i + 1] * t + B[i + 2] * t2);
        }
        return dL / 100 / this.rad;
    }

    /*
    * 岁差计算
    * */

    //返回P03黄赤交角,t是世纪数
    hcjj(t) {
        var t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t;
        return (84381.4060 - 46.836769 * t - 0.0001831 * t2 + 0.00200340 * t3 - 5.76e-7 * t4 - 4.34e-8 * t5) / this.rad;
    }
}

export default new Ephemeris()
