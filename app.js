/**
 *
 * app.js 入口模块
 *
 **/

const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

//本地静态资源访问
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//post请求体数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//使用art-template模板
app.engine('html', require('express-art-template'))

//把路由容器挂载到app服务中
app.use(router)

app.listen('4396', function () {
    console.log('server is running')
})