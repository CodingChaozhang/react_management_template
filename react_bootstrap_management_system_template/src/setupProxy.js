const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) { 
  app.use(createProxyMiddleware('/manage', {target: 'http://admintest.happymmall.com', changeOrigin: true})) 
  app.use(createProxyMiddleware('/user', {target: 'http://admintest.happymmall.com', changeOrigin: true}))  
}  

