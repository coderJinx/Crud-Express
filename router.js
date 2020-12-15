/**
 *
 * router.js 路由模块
 *
 */

const Student = require('./student')

//express中提供了一种专门包装路由的方式
const express = require('express')

//1.创建一个路由容器
const router = express.Router()

//2.把路由都挂载到router路由容器中
/**
 * 渲染学生列表页面
 */
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server Error!')
        }
        res.render('index.html', {
            title: [
                'stu1',
                'stu2',
                'stu3',
                'stu4'
            ],
            //文件中读到的数据是字符串，需要转换成对象
            students: students
        })
    })
})

/**
 * 渲染添加学生页面
 */
router.get('/students/new', function (req, res) {
    res.render('new.html')
})

/**
 * 处理添加学生
 */
router.post('/students/new', function (req, res) {
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server Error!')
        }
        res.redirect('/students')
    })
})

/**
 *渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server Error!')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

/**
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
    Student.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server Error!')
        }
        res.redirect('/students')
    })
})

/**
 * 处理删除学生
 */
router.get('/students/delete', function (req, res) {
    Student.deleteById(req.query, function (err) {
        if (err) {
            return res.status(500).send('Server Error!')
        }
        res.redirect('/students')
    })
})

//3.把router导出
module.exports = router
