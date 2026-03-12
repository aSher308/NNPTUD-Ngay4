var express = require('express');
var router = express.Router();
let { dataUser, dataRole } = require('../utils/data')

/* GET all users */
router.get('/', function (req, res, next) {
  res.send(dataUser);
});

/* GET user by username */
router.get('/:username', function (req, res, next) {
  let username = req.params.username;
  let result = dataUser.filter(function (e) {
    return e.username == username;
  })
  if (result.length) {
    res.send(result[0])
  } else {
    res.status(404).send({
      message: "USER NOT FOUND"
    })
  }
});

/* CREATE new user */
router.post('/', function (req, res) {
  try {
    // Check if username already exists
    let existingUser = dataUser.find(u => u.username === req.body.username);
    if (existingUser) {
      return res.status(400).send({
        message: "USERNAME ALREADY EXISTS"
      })
    }
    
    // Check if role exists
    let roleData = dataRole.find(r => r.id === req.body.role.id);
    if (!roleData) {
      return res.status(404).send({
        message: "ROLE NOT FOUND"
      })
    }

    let newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl || 'https://i.sstatic.net/l60Hf.png',
      status: req.body.status !== undefined ? req.body.status : true,
      loginCount: req.body.loginCount || 0,
      role: req.body.role,
      creationAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
    dataUser.push(newUser);
    res.send(newUser)
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

/* UPDATE user */
router.put('/:username', function (req, res) {
  try {
    let username = req.params.username;
    let result = dataUser.find(function (e) {
      return e.username == username;
    })
    if (result) {
      let keys = Object.keys(req.body);
      for (const key of keys) {
        if (key !== 'username' && key !== 'creationAt') {
          result[key] = req.body[key]
        }
      }
      result.updatedAt = new Date(Date.now())
      res.send(result)
    } else {
      res.status(404).send({
        message: "USER NOT FOUND"
      })
    }
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

/* DELETE user */
router.delete('/:username', function (req, res) {
  try {
    let username = req.params.username;
    let index = dataUser.findIndex(function (e) {
      return e.username == username;
    })
    if (index !== -1) {
      let deletedUser = dataUser.splice(index, 1);
      res.send({
        message: "USER DELETED SUCCESSFULLY",
        user: deletedUser[0]
      })
    } else {
      res.status(404).send({
        message: "USER NOT FOUND"
      })
    }
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

module.exports = router;
