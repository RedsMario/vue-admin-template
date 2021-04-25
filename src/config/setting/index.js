module.exports = {
  // 控制权限的方式
  authentication: 'FrontEnd', // FrontEnd | RearEnd
  // 控制路由白名单
  routerWhiteList: ['/login', '/register', '/401', '/404'],
  // 本地存储方式, 默认为cookie
  storage: 'localStorage', // sessionStorage | localStorage | cookie
  // 存入Cookie的Token键名
  tokenKey: 'AUTH_TOKEN',
  // 响应成功状态码
  successStatusCode: [200, 201]
}
