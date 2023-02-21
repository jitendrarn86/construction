const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  signUpWithProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllUsers,
  getUserById,
  getUserByWalletAddress,
  updateUser,
  deleteUser,
  addMyUser,
  updateProfile,
  addTransaction,
  getTransactionById,
} = require('../controller/TransactionController');
const {
  passwordVerificationLimit,
  emailVerificationLimit,
} = require('../config/others');

//verify email
router.post('/verify-email', emailVerificationLimit, verifyEmailAddress);

//register a user
router.post('/register/:token', registerUser);

//login a user
router.post('/login', loginUser);

//register or login with google and fb
router.post('/signup', signUpWithProvider);

router.post('/addtransaction', addTransaction);

//forget-password
router.put('/forget-password', passwordVerificationLimit, forgetPassword);

//reset-password
router.put('/reset-password', resetPassword);

//change password
router.post('/change-password', changePassword);

//get all user
router.get('/', getAllUsers);

//get a user
router.get('/:id', getUserById);

router.get('/byid/:id', getTransactionById);

//get a user by wallet
router.get('/myuser/:wallet', getUserByWalletAddress);

router.post('/update-profile', updateProfile);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
