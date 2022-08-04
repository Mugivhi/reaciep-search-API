const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports=app=>{
    app.use(
        createProxyMiddleware('/connect/b9b064a3c845d99c4021a78498a63da3',{
            target:'https://api.edamam.com',
            changeOrigin:true
        })
    )
}