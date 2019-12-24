const mysql = require('mysql')
const async = require('async');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'project'
})

let query = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                
                reject(err)
            } else {
                // 執行 sql 腳本對資料庫進行讀寫
                connection.query(sql, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()  // 結束會話
                })
            }
        })
    })
}

let transaction = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        reject(err)
                    }
                    else {
                        async.eachSeries(sql, function (element, callback) {
                            connection.query(element, function (err, result) {
                                if (err) {
                                    connection.rollback()
                                    callback(err)
                                }
                                else {
                                    console.log(element, result);
                                    callback()
                                }
                            })
                        }, function (err) {
                            if (err) {
                                connection.rollback()
                                reject(err);

                            } else {
                                connection.commit(function (err) {
                                    if (err) {
                                        connection.rollback()
                                        reject(err);
                                    }
                                    else {
                                        resolve('commit susscess')
                                    }
                                    connection.release()
                                })
                            }
                        })
                    }
                })
            }
        })
    })
}


let format = function (sql, insert) {
    return mysql.format(sql, insert)
}
module.exports = { query, format, transaction }