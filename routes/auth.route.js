const authenticateToken = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {signUp,logIn,getAllUsers,logout} = require('../controllers/user.controller');

router.post('/register',signUp);
router.post('/login', logIn);
router.get('/allusers',getAllUsers);
router.get('/logout',authenticateToken,logout);

module.exports = router;