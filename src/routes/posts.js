const express = require("express")
const router = express.Router()
const { postController, searchController } = require('../controllers')
require('run-middleware')(router)


router.get("/", postController.index)
router.get("/update", postController.post)
router.get("/search", searchController.show)


// function loop(){
//    router.runMiddleware('/update')
//    setTimeout(loop, 1800000)    
// }

// loop()

module.exports = router
