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
  addTempMint,
  getAllMint,
  getAllHomeMint,
  getUpcomingMint,
  getAllUpcomingMint,
  getMintById,
  updateTempMint,
  updateMintNft,
  updateMktMintByNft,
  getMintByWalletAddress,
  addBuyRequest,
  updateOwner,
} = require('../controller/MintController');
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

router.post('/addtempmint', addTempMint);
router.post('/addbuyrequest', addBuyRequest);
router.post('/update-owner', updateOwner);

//forget-password
router.put('/forget-password', passwordVerificationLimit, forgetPassword);

//reset-password
router.put('/reset-password', resetPassword);

//change password
router.post('/change-password', changePassword);

//get all user
router.get('/', getAllUsers);

router.get('/allmints', getAllMint);
router.get('/allhomemints', getAllHomeMint);
router.get('/upcomingmints', getUpcomingMint);
router.get('/allupcomingmints', getAllUpcomingMint);

//get a user
router.get('/:id', getUserById);

router.get('/mintbyid/:id', getMintById);

router.get('/mymint/:wallet', getMintByWalletAddress);

//get a user by wallet
router.get('/myuser/:wallet', getUserByWalletAddress);

router.post('/update-profile', updateProfile);

router.post('/update-mint', updateTempMint);
router.post('/update-mintnft', updateMintNft);
router.post('/update-mktmintnft', updateMktMintByNft);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
