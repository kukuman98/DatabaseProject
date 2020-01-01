var express = require('express');
var router = express.Router();
var gms = require('../../utils/GMS');

router.post('/', function (req, res, next) {
    const data = req.body
    gms.gamelist(data.type)
        .then(function (result) {
            console.log(result)
            var data = []
            result.forEach(function (element) {
                data.push({
                    price: element.price,
                    gameID: element.Game_ID,
                    description:element.description,
                    photo:element.photo,
                    state:element.release_state
                });
            });
            res.json(data);
        })
        .catch(function (err) {
            console.log(err)
        })

});

module.exports = router;

// git push --force heroku HEAD:master