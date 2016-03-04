var express = require('express');
var models = require('../models');
var router = express.Router();


router.post('/users', function(req, res) {
  models.User.create({
    username: req.body.name
  }).then(function() {
    res.redirect('/');
  }).catch(function(err){
      res.send(err);
  });
});

router.get('/:userId/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.userId
    }
  }).then(function() {
    res.redirect('/');
  }).catch(function(err){
      res.send(err);
  });
});

router.get('/:userId', function(req, res) {
    models.User.findOne({where: {id: req.params.userId}, include: [models.Task]}).then(function(user) {
	res.render('taskslist', {user: user});
    }).catch(function(err){
	res.send(err);
    });
});

router.post('/:userId/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.userId
  }).then(function() {
    res.redirect('/api/'+ req.params.userId);
  }).catch(function(err){
      res.send(err);
  });
});

router.get('/:userId/tasks/:taskId/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.taskId
    }
  }).then(function() {
    res.redirect('/api/'+req.params.userId);
  }).catch(function(err){
      res.send(err);
  });
});

module.exports = router;
