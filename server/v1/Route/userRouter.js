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

// router.post('/register', upload.single('profilePic'), userController.createUser);
// router.post('/login', userController.loginUser)
// router.put('/updateuser', verifyToken, upload.single('profilePic'), userController.updateUser);
// router.get('/usergetById', verifyToken, userController.getById);
// router.get('/alluserlocation', verifyToken, userController.getallUserLocation)