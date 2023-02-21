const express = require('express');
const router = express.Router();
const {
  getAllClients,
  getShowingPlans,
  getDiscountedPlans,
  getStockOutPlans,
  getClientById,
  getPlanBySlug,
  addClient,
  addAllPlans,
  updateClient,
  updateStatus,
  deletePlan,
} = require('../controller/clientController');

//add a product
router.post('/add', addClient);

//add multiple products
router.post('/all', getAllClients);

//get a product
router.get('/clientbyid/:id', getClientById);
router.post('/:id', getClientById);

//get showing products only
router.get('/show', getShowingPlans);

//get discounted products only
//router.get('/discount', getDiscountedProducts);

//get all products
router.get('/', getAllClients);

//get all stock out products
router.get('/stock-out', getStockOutPlans);

//get a product by slug
router.get('/:slug', getPlanBySlug);

//update a product
router.post('/update/:id', updateClient);

//update a product status
router.put('/status/:id', updateStatus);

//delete a product
router.delete('/:id', deletePlan);

module.exports = router;
