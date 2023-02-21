const Banner = require('../models/Banner');

const addPlan = async (req, res) => {
  try {
    const newPlan = new Banner(req.body);
    await newPlan.save();
    res.status(200).send({
      message: 'Banner Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllPlans = async (req, res) => {
  try {
    await Banner.deleteMany();
    await Banner.insertMany(req.body);
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
    const plans = await Banner.find({ status: 'Show' }).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedPlans = async (req, res) => {
  try {
    const plans = await Banner.find({ discount: { $gt: 5 } }).sort({
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
    const plans = await Banner.find({}).sort({ _id: -1 });
    res.send(plans);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutPlans = async (req, res) => {
  try {
    const plans = await Banner.find({ quantity: { $lt: 1 } }).sort({
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
    const plan = await Banner.findOne({ slug: req.params.slug });
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getPlanById = async (req, res) => {
  try {
    const plan = await Banner.findById(req.params.id);
    res.send(plan);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const plan = await Banner.findById(req.params.id);
    if (plan) {
     
      plan.title = req.body.title;
      plan.video_url = req.body.video_url;
      plan.description = req.body.description;      
      plan.image = req.body.image;
      plan.image1 = req.body.image1;
      plan.image2 = req.body.image2;
      plan.image3 = req.body.image3;
     
      await plan.save();
      res.send({ data: plan, message: 'Banner updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Banner.updateOne(
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
          message: `Banner ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deletePlan = (req, res) => {
  Banner.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Banner Deleted Successfully!',
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
