const express = require('express');
var router = express.Router();


const userController = require('../controller/userController');
const auth = require('../../jwtHelper');



router.get('/getuser', userController.all);



router.get("/verifytoken", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token verified"
    });
});
router.post('/register', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

router.post('/login', userController.login);

module.exports = router;