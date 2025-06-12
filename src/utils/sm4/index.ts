import { sm4 } from "gm-crypt";
import { sKey } from "@/settings";

/**
 * @description: sm4加密
 * @param {any 数据} data
 * @return {*}
 */
export function sm4Encrypt(data: any) {
  const sm4Config = {
    key: sKey,
    mode: 'ecb',
    cipherType:'base64'
  }
  const sm42 =new sm4(sm4Config)
  const newData =typeof(data)=='string'? data: JSON.stringify(data);
  // 加密后再用base64编码
  return sm42.encrypt(newData).toString();
}
/**
 * @description: sm4解密
 * @param {string 密文} cipherText
 * @return {*}
 */
export function sm4Decrypt(cipherText: string) {
  const sm4Config = {
    key: sKey,
    mode: "ecb",
    cipherType: "base64",
  };
  const sm42 = new sm4(sm4Config);
  // 解密前再用base64解码
  return JSON.parse(sm42.decrypt(cipherText));
}
