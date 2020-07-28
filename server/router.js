 const express = require('express');
 const router = express.Router();

 router.get('/', (req, res) => {
   res.send('server is running dude')
 });

 module.exports = router;