const Plan = require('../models/Plan');

const addPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(200).send({
      message: 'Plan Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllPlans = async (req, res) => {
  try {
    await Plan.deleteMany();
    await Plan.insertMany(req.body);
    res.status(200).send({
      message: 'Plan Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ status: 'Show' }).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({}).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ quantity: { $lt: 1 } }).sort({
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
    const plan = await Plan.findOne({ slug: req.params.slug });
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getPlanById = async (req, res) => {
  try {
	  console.log('plan');
    const plan = await Plan.findById(req.params.id);
	console.log(plan);
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan) {
     
      plan.title = req.body.title;
      plan.slug = req.body.slug;
      plan.description = req.body.description;      
      plan.originalPrice = req.body.originalPrice;
      plan.price = req.body.price;
     
      plan.image = req.body.image;
     
      await plan.save();
      res.send({ data: plan, message: 'Plan updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Plan.updateOne(
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
  Plan.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Plan Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addPlan,
  addAllPlans,
  getAllPlans,
  getShowingPlans,
  getDiscountedPlans,
  getStockOutPlans,
  getPlanById,
  getPlanBySlug,
  updatePlan,
  updateStatus,
  deletePlan,
};
