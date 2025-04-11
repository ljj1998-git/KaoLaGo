import Base64 from "crypto-js/enc-base64";
import UTF8 from "crypto-js/enc-utf8";
import md5 from "crypto-js/md5";
import CryptoJS from "crypto-js";

export function encodeByBase64(txt: string) {
  return UTF8.parse(txt).toString(Base64);
}

export function decodeByBase64(txt: string) {
  return Base64.parse(txt).toString(UTF8);
}

export function encryptByMd5(txt: string) {
  return md5(txt).toString();
}

const key = "U6KXl21KHL6D1H9X";
const iv = "0102030405060708";

export function encryptByAes(word: string) {
  const _key = CryptoJS.enc.Utf8.parse(key); //key(固定约束)
  const _iv = CryptoJS.enc.Utf8.parse(iv);
  // value(加密内容)、key(密钥)
  const encrypt = CryptoJS.AES.encrypt(word, _key, {
    iv: _iv, // 偏移量
    mode: CryptoJS.mode.CBC, // 模式（五种加密模式--->CBC）
    padding: CryptoJS.pad.Pkcs7, // 填充
  });
  //将加密的内容转成字符串返回出去
  return encrypt.toString();
}
