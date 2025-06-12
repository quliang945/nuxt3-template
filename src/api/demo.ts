// ssr demo data
export const ssrData = textId => utilRequest.get('http://192.168.192.25:8089/examination/webText/selectTextBodyById', { textId })
