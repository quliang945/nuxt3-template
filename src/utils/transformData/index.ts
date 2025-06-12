import FormData from 'form-data';
import { stringify } from 'qs';
export const dataTypeLabels: { [K in App.DataTypeStringKey]: App.DataTypeString<K> } = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]'
};
function getDataTypeString<K extends App.DataTypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as App.DataTypeString<K>;
}
 function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array;
}
 function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file;
}
/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
export async function transformRequestData(requestData: any, contentType?: App.ContentType) {
  // application/json类型不处理
  let data = requestData;
  // form类型转换
  if (contentType === 'application/x-www-form-urlencoded') {
    data = stringify(requestData);
  }
  // form-data类型转换
  if (contentType === 'multipart/form-data') {
    data = await handleFormData(requestData);
  }
  return data;
}

async function handleFormData(data: Record<string, any>) {
  const formData:any = new FormData();
  const entries = Object.entries(data);

  entries.forEach(async ([key, value]) => {
    const isFileType = isFile(value) || (isArray(value) && value.length && isFile(value[0]));
    if (isFileType) {
      await transformFile(formData, key, value);
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}
/**
 * 接口为上传文件的类型时数据转换
 * @param key - 文件的属性名
 * @param file - 单文件或多文件
 */
async function transformFile(formData: FormData, key: string, file: File[] | File) {
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      (file as File[]).map(item => {
        formData.append(key, item);
        return true;
      })
    );
  } else {
    formData.append(key, file);
  }
}
