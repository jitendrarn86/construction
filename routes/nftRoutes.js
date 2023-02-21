const express = require('express');
const router = express.Router();
const {
  getAllNfts,
  getShowingNfts,
  getDiscountedNfts,
  getStockOutNfts,
  getNftById,
  getNftBySlug,
  addNft,
  addAllNfts,
  updateNft,
  updateStatus,
  deleteNft,
} = require('../controller/nftController');

//add a product
router.post('/add', addNft);

//add multiple products
router.post('/all', addAllNfts);

//get a product
router.post('/:id', getNftById);

//get showing products only
router.get('/show', getShowingNfts);

//get discounted products only
router.get('/discount', getDiscountedNfts);

//get all products
router.get('/', getAllNfts);

//get all stock out products
router.get('/stock-out', getStockOutNfts);

//get a product by slug
router.get('/:slug', getNftBySlug);

//update a product
router.put('/:id', updateNft);

//update a product status
router.put('/status/:id', updateStatus);

//delete a product
router.delete('/:id', deleteNft);

module.exports = router;
