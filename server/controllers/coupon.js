const Coupon = require('../models/coupon');

// create, remove, list

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    if (new Date(expiry) < new Date()) {
      return res.json({
        err: 'Coupon expiration date cannot be in past time',
      });
    }
    if (discount > 100) {
      return res.json({
        err: 'Discount cannot exceed 100%',
      });
    }
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (error) {
    console.log(error);
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (error) {
    console.log(error);
  }
};
