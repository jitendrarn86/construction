const Client = require('../models/Client');

const addClient = async (req, res) => {
  try {
    const newPlan = new Client(req.body);
    await newPlan.save();
    res.status(200).send({
      message: 'Client Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllPlans = async (req, res) => {
  try {
    await Client.deleteMany();
    await Client.insertMany(req.body);
    res.status(200).send({
      message: 'Client Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingPlans = async (req, res) => {
  try {
    const plans = await Client.find({ status: 'Show' }).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedPlans = async (req, res) => {
  try {
    const plans = await Client.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllClients = async (req, res) => {
  try {
    const plans = await Client.find({}).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutPlans = async (req, res) => {
  try {
    const plans = await Client.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    });

    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getPlanBySlug = async (req, res) => {
  try {
    const plan = await Client.findOne({ slug: req.params.slug });
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getClientById = async (req, res) => {
  try {
	  
    const plan = await Client.findById(req.params.id);
	console.log(plan);
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateClient = async (req, res) => {
  try {
	  console.log('update plan');
	  console.log(req.body);
    const plan = await Client.findById(req.params.id);
    if (plan) {
     
	 if(req.body.first_name){
      plan.first_name = req.body.first_name;
	 }else{
		 plan.first_name = plan.first_name;
	 }
	 
	 if(req.body.last_name){
      plan.last_name = req.body.last_name;
	 }else{
		 plan.last_name = plan.last_name;
	 }
      
	  if(req.body.client_number){
      plan.client_number = req.body.client_number;
	 }else{
		 plan.client_number = plan.client_number;
	 }
	 
      if(req.body.email){
      plan.email = req.body.email;
	 }else{
		 plan.email = plan.email;
	 }
      if(req.body.phone){
      plan.phone = req.body.phone;
	 }else{
		 plan.phone = plan.phone;
	 }
      if(req.body.fax){
      plan.fax = req.body.fax;
	 }else{
		 plan.fax = plan.fax;
	 }
      if(req.body.company){
      plan.company = req.body.company;
	 }else{
		 plan.company = plan.company;
	 }
      
     if(req.body.address){
      plan.address = req.body.address;
	 }else{
		 plan.address = plan.address;
	 }
      
     if(req.body.state){
      plan.state = req.body.state;
	 }else{
		 plan.state = plan.state;
	 }
      
     if(req.body.description){
      plan.description = req.body.description;
	 }else{
		 plan.description = plan.description;
	 }
      
     
      await plan.save();
      res.send({ data: plan, message: 'Client updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Client.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Plan ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deletePlan = (req, res) => {
  Client.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Client Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addClient,
  addAllPlans,
  getAllClients,
  getShowingPlans,
  getDiscountedPlans,
  getStockOutPlans,
  getClientById,
  getPlanBySlug,
  updateClient,
  updateStatus,
  deletePlan,
};
