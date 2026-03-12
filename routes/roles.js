var express = require('express');
var router = express.Router();
let { dataRole, dataUser } = require('../utils/data')

/* GET all roles */
router.get('/', function (req, res, next) {
  res.send(dataRole);
});

/* GET role by id */
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  let result = dataRole.filter(function (e) {
    return e.id == id;
  })
  if (result.length) {
    res.send(result[0])
  } else {
    res.status(404).send({
      message: "ROLE NOT FOUND"
    })
  }
});

/* GET all users in a role */
router.get('/:id/users', function (req, res, next) {
  let id = req.params.id;
  // Check if role exists
  let role = dataRole.filter(function (e) {
    return e.id == id;
  })
  if (!role.length) {
    return res.status(404).send({
      message: "ROLE NOT FOUND"
    })
  }
  // Get all users with this role
  let users = dataUser.filter(function (e) {
    return e.role.id == id;
  })
  res.send(users)
});

/* CREATE new role */
router.post('/', function (req, res) {
  try {
    // Generate new role id
    let roleIds = dataRole.map(r => r.id).sort();
    let newId = 'r' + (parseInt(roleIds[roleIds.length - 1].replace('r', '')) + 1);
    
    let newRole = {
      id: newId,
      name: req.body.name,
      description: req.body.description,
      creationAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
    dataRole.push(newRole)
    res.send(newRole)
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

/* UPDATE role */
router.put('/:id', function (req, res) {
  try {
    let id = req.params.id;
    let result = dataRole.filter(function (e) {
      return e.id == id;
    })
    if (result.length) {
      result = result[0];
      if (req.body.name) result.name = req.body.name;
      if (req.body.description) result.description = req.body.description;
      result.updatedAt = new Date(Date.now())
      res.send(result)
    } else {
      res.status(404).send({
        message: "ROLE NOT FOUND"
      })
    }
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

/* DELETE role */
router.delete('/:id', function (req, res) {
  try {
    let id = req.params.id;
    let index = dataRole.findIndex(function (e) {
      return e.id == id;
    })
    if (index !== -1) {
      let deletedRole = dataRole.splice(index, 1);
      res.send({
        message: "ROLE DELETED SUCCESSFULLY",
        role: deletedRole[0]
      })
    } else {
      res.status(404).send({
        message: "ROLE NOT FOUND"
      })
    }
  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
});

module.exports = router;
