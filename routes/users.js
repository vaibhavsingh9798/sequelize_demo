const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router.get('/list',userController.getUsers)

router.post('/user',userController.postUser)

router.put('/user/:id',userController.putUser)

router.delete('/user/:id',userController.deleteUser)

module.exports = router;