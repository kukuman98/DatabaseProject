const database = require('../utils/async-db.js')

async function getCartID(uid) {
    var sql = "SELECT `Cart_ID` FROM `Cart` WHERE `ID`=?"
    const insert = [uid]
    sql = database.format(sql, insert)
    try {
        result = await database.query(sql)
        if (result.length) {
            return result[0].Cart_ID
        }
        else {
            throw 'User no found'
        }
    }
    catch (err) {
        return err
    }
}

async function add(uid, gameID) {

    try {
        const cartID = await getCartID(uid)
        var sql = "INSERT INTO `Cart_List` VALUE (?,?)"
        const insert = [cartID, gameID]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        return result

    }
    catch (err) {
        return err
    }

}

async function remove(uid, gameID) {
    try {
        const cartID = await getCartID(uid)
        var sql = "DELETE FROM `Cart_List` WHERE `Cart_ID`=? AND `Game_ID`=?"
        const insert = [cartID, gameID]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        if (result.affectedRows > 0) {
            return 'remove game suscess'
        }
        else{
            throw 'game no found, remove fail'
        }
    }
    catch (err) {
        return err
    }
}

async function list(uid) {
    try {
        const cartID = await getCartID(uid)
        var sql = "SELECT * FROM `Cart_List` WHERE `Cart_ID`=?"
        const insert = [cartID]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        return result
    }
    catch (err) {
        return err
    }
}

async function clear(uid) {
    try {
        const cartID = await getCartID(uid)
        var sql = "DELETE FROM `Cart_List` WHERE `Cart_ID`=?"
        const insert = [cartID]
        sql = database.format(sql, insert)
        result = await database.query(sql)
        if (result.affectedRows > 0) {
            return 'clear cart suscess'
        }
        else{
            throw 'cart is empty'
        }
    }
    catch (err) {
        return err
    }
}
add(2, 1)
    .then(function (result) {
        console.log(result)
    })
    .catch(function (err) {
        console.log(err)
    })
list(2)
    .then(function (result) {
        console.log(result)
    })
    .catch(function (err) {
        console.log(err)
    })