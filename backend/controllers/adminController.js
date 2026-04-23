const User = require("../models/User");
const Food = require("../models/Food");
const Request = require("../models/Request");

const FOOD_STATUSES = ["available", "requested", "accepted", "delivered", "sold_out", "unavailable", "cancelled"];
const REQUEST_STATUSES = ["pending", "accepted", "rejected", "completed", "cancelled"];

function getPaging(query, defaultLimit = 10) {
  const { page = 1, limit = defaultLimit } = query;
  const pageNum = Number(page) > 0 ? Number(page) : 1;
  const limitNum = Number(limit) > 0 ? Number(limit) : defaultLimit;
  return { pageNum, limitNum };
}

const listUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const { pageNum, limitNum } = getPaging(req.query);
    const filter = role ? { role } : {};

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      User.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: users,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const listFoods = async (req, res, next) => {
  try {
    const { status } = req.query;
    const { pageNum, limitNum } = getPaging(req.query);
    const filter = status ? { status } : {};

    const [foods, total] = await Promise.all([
      Food.find(filter)
        .populate("donor", "name email role")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Food.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: foods,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const listRequests = async (req, res, next) => {
  try {
    const { status } = req.query;
    const { pageNum, limitNum } = getPaging(req.query);
    const filter = status ? { status } : {};

    const [requests, total] = await Promise.all([
      Request.find(filter)
        .populate({
          path: "food",
          populate: { path: "donor", select: "name email role" },
        })
        .populate("ngo", "name email role")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Request.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: requests,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateFoodByAdmin = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }

    const { name, quantity, status, expiry, location, contact, trackerUrl, image, imageGallery } = req.body;
    if (status && !FOOD_STATUSES.includes(status)) {
      res.status(400);
      throw new Error(`status must be one of: ${FOOD_STATUSES.join(", ")}`);
    }

    if (name !== undefined) food.name = name;
    if (quantity !== undefined) food.quantity = quantity;
    if (status !== undefined) food.status = status;
    if (expiry !== undefined) food.expiry = expiry;
    if (trackerUrl !== undefined) food.trackerUrl = trackerUrl;
    if (image !== undefined) food.image = image;
    if (imageGallery !== undefined) food.imageGallery = imageGallery;
    if (contact !== undefined) food.contact = contact;
    if (location !== undefined) {
      food.location = {
        address: location.address ?? food.location.address,
        lat: location.lat ?? food.location.lat,
        lng: location.lng ?? food.location.lng,
      };
    }

    const saved = await food.save();
    const populated = await Food.findById(saved._id).populate("donor", "name email role");

    return res.json({
      success: true,
      message: "Food item updated by admin",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteFoodByAdmin = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }

    await Promise.all([Request.deleteMany({ food: food._id }), food.deleteOne()]);

    return res.json({
      success: true,
      message: "Food item and related requests removed",
    });
  } catch (error) {
    return next(error);
  }
};

const updateRequestByAdmin = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !REQUEST_STATUSES.includes(status)) {
      res.status(400);
      throw new Error(`status must be one of: ${REQUEST_STATUSES.join(", ")}`);
    }

    const request = await Request.findById(req.params.id).populate("food");
    if (!request) {
      res.status(404);
      throw new Error("Request not found");
    }

    request.status = status;
    await request.save();

    if (request.food) {
      if (status === "accepted") request.food.status = "accepted";
      if (["rejected", "cancelled"].includes(status)) request.food.status = "available";
      if (status === "completed") request.food.status = "delivered";
      if (status === "pending") request.food.status = "requested";
      await request.food.save();
    }

    const populated = await Request.findById(request._id)
      .populate({
        path: "food",
        populate: { path: "donor", select: "name email role" },
      })
      .populate("ngo", "name email role");

    return res.json({
      success: true,
      message: "Request updated by admin",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const { name, role } = req.body;
    if (role !== undefined && !["donor", "ngo", "admin"].includes(role)) {
      res.status(400);
      throw new Error("role must be one of: donor, ngo, admin");
    }

    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    await user.save();

    const safeUser = await User.findById(user._id).select("-password");
    return res.json({
      success: true,
      message: "User updated by admin",
      data: safeUser,
    });
  } catch (error) {
    return next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalFoods, totalRequests, totalDeliveredFood] = await Promise.all([
      User.countDocuments(),
      Food.countDocuments(),
      Request.countDocuments(),
      Food.countDocuments({ status: "delivered" }),
    ]);

    return res.json({
      success: true,
      data: {
        totalUsers,
        totalFoodItems: totalFoods,
        totalRequests,
        totalDeliveredFood,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listUsers,
  listFoods,
  listRequests,
  updateFoodByAdmin,
  deleteFoodByAdmin,
  updateRequestByAdmin,
  updateUserByAdmin,
  getStats,
};
