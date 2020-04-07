const exporess = require('express')
const router = express.Router()

const auth = require ('../middleware/auth')
const controller = require('../controllers/user')

router.get('/',controller.getUsers)

module.exports = router
