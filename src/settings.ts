/***************************************SM4**************************************************/
//sm4密钥
export const sKey:string = 'F978E5181C939281'
/***************************************SM2**************************************************/
//是否开启sm2签名 true开启，false关闭
export const signApi:boolean = true
// 加密后缀
export const signSuffix:string ='zaq1'
// sm2 公钥
export const publicKey:string='042b9f5863e48406850fea8db246719f64a9f300f7b96050591ec9c861f1f9502f5c8e6fe6774e97ca47e4084ba703159f10da14dfc397e08d42fa4d368e0f1de6'
//sm2 私钥
export const privateKey:string='3f118d79e2b6d60daa7836fb12187acd313fce9c59c49a13fcf119a733bd6137'
//排除sm2签名请求接口
export const reqExcludeSignUrl:string[]=[]
//排除sm2签名响应接口
export const resExcludeSignUrl: string[] = []
/************************************************************************************* */
// 跳转首页路由默认'/'
export const routeHome: string = '/exam'
// 跳转列表页路由默认'/'
export const routeExam: string = '/'
// 跳转登录路由默认'/'
export const routeLogin: string = '/login'
// 参数前缀
export const paramPrefix: string = 'qu'
// 排除登录路由名称
export const excludeLoginUrl: string[] = ['index','login','register', 'forget',]
