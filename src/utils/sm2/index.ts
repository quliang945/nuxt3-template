import {sm2}from 'sm-crypto'
import { publicKey,privateKey,signSuffix } from "@/settings";
//ASCII排序
function sortAsc (o) {
  var n:any = [];
  for (var k in o) n.push(k);
  n.sort();
  for (var i:number = 0, str:string = ''; i < n.length; i++) {
    var v = o[n[i]];
    if (v) {
      if ({}.toString.call(v) == '[object Object]')
        v = sortAsc(v);
      else if ({}.toString.call(v) == '[object Array]')
        v = JSON.stringify(v).replace(/:/g, '=');
    }
    str += '&' + n[i] + '=' + v;
  }
  return str.slice(1);
}
/**
 * @description: sm2加签
 * @param {any 数据} data
 * @return {*}
 */
export function sm2Encrypt(data: any) {
  // ASCII排序并转成字符串
  let data1 = sortAsc(data)+signSuffix
  // 加签名
  return sm2.doSignature(data1, privateKey, { hash:true, der:true })
}
/**
 * @description: sm2验签
 * @param {any 数据} data
 * @param {string 密文} cipherText
 * @return {*}
 */
export function sm2Decrypt(data:any,cipherText: string) {
  let data1 = sortAsc(data)+signSuffix
  return sm2.doVerifySignature(data1, cipherText, publicKey, { hash:true, der:true });
}
