var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', function(req, res, next) {
    models.User.findAll({
	include: [models.Task]
    }).then(function(users) {
	res.render('index', {title: 'express', users: users});
    });
});

module.exports = router;
