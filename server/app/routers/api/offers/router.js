const express = require('express')

const router = express.Router()

// controllers
const { browse, read } = require('../../../controllers/offerActions')

router.get('', browse)
router.get('/:id', read)

module.exports = router
