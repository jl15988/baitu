declare class Ephemeris {
    cs_rEar: number;
    cs_rEarA: number;
    cs_ba: number;
    cs_ba2: number;
    cs_AU: number;
    cs_sinP: number;
    cs_PI: number;
    cs_GS: number;
    cs_Agx: number;
    cs_xxHH: number[];
    xxName: string[];
    rad: number;
    radd: number;
    pi2: number;
    pi_2: number;
    J2000: number;
    cs_k: number;
    cs_k2: number;
    cs_k0: number;
    cs_sMoon: number;
    cs_sMoon2: number;
    cs_sSun: number;
    E_Lon(t: any, n: any): number;
    M_Lon(t: any, n: any): number;
    E_v(t: any): number;
    M_v(t: any): number;
    MS_aLon(t: any, Mn: any, Sn: any): number;
    S_aLon(t: any, n: any): number;
    E_Lon_t(W: any): any;
    M_Lon_t(W: any): any;
    MS_aLon_t(W: any): any;
    S_aLon_t(W: any): any;
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
    MS_aLon_t2(W: any): any;
    S_aLon_t2(W: any): any;
    moonIll(t: any): number;
    moonRad(r: any, h: any): number;
    moonMinR(t: any, min: any): any[];
    moonNode(t: any, asc: any): any[];
    earthMinR(t: any, min: any): any[];
    dituJM(p: any, Jb: any, Wb: any): any[];
    XL0_calc(xt: any, zn: any, t: any, n: any): number;
    XL1_calc(zn: any, t: any, n: any): number;
    m_coord(t: any, n1: any, n2: any, n3: any): any[];
    suoN(jd: any): number;
    gxc_sunLon(t: any): number;
    gxc_sunLat(t: any): number;
    gxc_moonLon(t: any): number;
    gxc_moonLat(t: any): number;
    pGST(T: any, dt: any): number;
    pGST2(jd: any): number;
    sunShengJ(jd: any, L: any, fa: any, sj: any): any;
    pty_zty(t: any): number;
    pty_zty2(t: any): number;
    rad2mrad(v: any): any;
    rad2rrad(v: any): any;
    mod2(a: any, b: any): number;
    llr2xyz(JW: any): any[];
    xyz2llr(xyz: any): any[];
    llrConv(JW: any, E: any): any[];
    CD2DP(z: any, L: any, fa: any, gst: any): any[];
    j1_j2(J1: any, W1: any, J2: any, W2: any): number;
    h2g(z: any, a: any): any[];
    shiChaJ(gst: any, L: any, fa: any, J: any, W: any): any;
    nutationLon2(t: any): number;
    hcjj(t: any): number;
}
declare const _default: Ephemeris;
export default _default;
