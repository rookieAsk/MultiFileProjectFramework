const NODE_ENV = process.env.NODE_ENV; // webpack编译时获取node环境的配置信息
const config = {
  production: { // 生产环境(线上环境)
    DOMAIN: 'production.com', // 上线域名、地址
  },
  development: { // 开发环境
    DOMAIN: 'development.com', // 测试域名、地址
  }
}
module.exports = config[NODE_ENV];