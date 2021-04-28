const express = require('express')

const router = express.Router()

const {createRoom} = require('../controller/roomController')

router.post('/create', createRoom);

module.exports = router