/**
 *
 * student.js 数据操作文件模块
 *
 **/

const fs = require('fs')
const dbPath = './db.json'

/**
 *  获取所有学生列表
 *  callback中的参数
 *      第一个参数 err
 *          成功是 null
 *          错误是错误对象
 *      第二个参数 data
 *          成功是数组
 *          错误是 undefined
 **/
exports.find = function (callback){
    //readFile的第二个参数是可选的，传入utf8就是告诉他把读取到的文件直接按照utf8编码转成我们能认识的字符
    //除了这样来转换之外，也可以通过data.toString()方法
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 通过id获取单个学生信息
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        const students = JSON.parse(data).students
        const res = students.find(function (item) {
           return  item.id === parseInt(id)
        })
        callback(null, res)
    })
}

/**
 * 添加保存学生信息
 **/
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err,data) {
        if (err) {
            return callback(err)
        }
        const students = JSON.parse(data).students

        //确保id不重复
        student.id = students[students.length - 1].id + 1

        //把用户传递的对象保存到数组中
        students.push(student)

        //把对象数据转换为字符串
        const fileDate = JSON.stringify({
            students: students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath, fileDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })

}

/**
 * 更新学生信息
 **/
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        const students = JSON.parse(data).students

        //注意：这里把id同一转换成数字类型
        student.id = parseInt(student.id)

        const stu = students.find(function (item) {
            return item.id === student.id
        })

        //遍历拷贝对象
        for (let key in student) {
            stu[key] = student[key]
        }
        //把对象数据转换为字符串
        const fileDate = JSON.stringify({
            students: students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath, fileDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生信息
 **/
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        const students = JSON.parse(data).students

        //findIndex方法用来根据条件查找元素的下标
        const deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        //把对象数据转换为字符串
        const fileDate = JSON.stringify({
            students: students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath, fileDate, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}