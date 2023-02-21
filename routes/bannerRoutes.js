const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  getShowingPlans,
  getDiscountedPlans,
  getStockOutPlans,
  getPlanById,
  getPlanBySlug,
  addPlan,
  addAllPlans,
  updatePlan,
  updateStatus,
  deletePlan,
} = require('../controller/bannerController');

//add a product
router.post('/add', addPlan);

//add multiple products
router.post('/all', addAllPlans);

//get a product
router.post('/:id', getPlanById);

//get showing products only
router.get('/show', getShowingPlans);

//get discounted products only
//router.get('/discount', getDiscountedProducts);

//get all products
router.get('/', getAllPlans);

//get all stock out products
router.get('/stock-out', getStockOutPlans);

//get a product by slug
router.get('/:slug', getPlanBySlug);

//update a product
router.put('/:id', updatePlan);

//update a product status
router.put('/status/:id', updateStatus);

//delete a product
router.delete('/:id', deletePlan);

module.exports = router;
