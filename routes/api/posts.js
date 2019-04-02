const express = require('express')
const router = express.Router()

/**
 * Get Index posts route
 * 
 * @method GET
 * @author Dian Afrial
 */

router.get('/', (req, res) => res.json({
  code:200,
  msg:"Here Posts List"
}))

module.exports = router