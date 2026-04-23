const Request = require("../models/Request");
const Food = require("../models/Food");

// POST /api/request/create (NGO only)
const createRequest = async (req, res, next) => {
  try {
    const { foodId } = req.body;
    if (!foodId) {
      res.status(400);
      throw new Error("foodId is required");
    }

    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }
    if (food.status !== "available") {
      res.status(400);
      throw new Error("Food item is not available for request");
    }

    const existing = await Request.findOne({
      food: food._id,
      ngo: req.user._id,
      status: { $in: ["pending", "accepted"] },
    });
    if (existing) {
      res.status(409);
      throw new Error("You already requested this food");
    }

    const request = await Request.create({
      food: food._id,
      ngo: req.user._id,
    });

    food.status = "requested";
    await food.save();

    const populated = await Request.findById(request._id)
      .populate("food")
      .populate("ngo", "name email role");

    return res.status(201).json({
      success: true,
      message: "Request created successfully",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/request/my (user specific)
const getMyRequests = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;

    let filter = {};
    if (req.user.role === "ngo") {
      filter = { ngo: req.user._id };
    } else if (req.user.role === "donor") {
      const donorFoodIds = await Food.find({ donor: req.user._id }).distinct("_id");
      filter = { food: { $in: donorFoodIds } };
    }

    const [items, total] = await Promise.all([
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
      data: items,
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

// PUT /api/request/update/:id (accept/reject/complete)
const updateRequest = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !["accepted", "rejected", "completed", "cancelled"].includes(status)) {
      res.status(400);
      throw new Error("status must be one of: accepted, rejected, completed, cancelled");
    }

    const request = await Request.findById(req.params.id).populate("food");
    if (!request) {
      res.status(404);
      throw new Error("Request not found");
    }

    const isAdmin = req.user.role === "admin";
    const isDonorOwner =
      request.food?.donor && request.food.donor.toString() === req.user._id.toString();
    const isNgoOwner = request.ngo.toString() === req.user._id.toString();

    // Donor/admin can accept/reject/cancel. NGO can mark accepted request as completed.
    if (!isAdmin) {
      if (["accepted", "rejected", "cancelled"].includes(status) && !isDonorOwner) {
        res.status(403);
        throw new Error("Only donor/admin can accept, reject or cancel");
      }
      if (status === "completed" && !isNgoOwner) {
        res.status(403);
        throw new Error("Only request owner NGO can mark completed");
      }
    }

    request.status = status;
    await request.save();

    if (status === "accepted") request.food.status = "accepted";
    if (status === "rejected") request.food.status = "available";
    if (status === "completed") request.food.status = "delivered";
    if (status === "cancelled") request.food.status = "available";
    await request.food.save();

    const populated = await Request.findById(request._id)
      .populate({
        path: "food",
        populate: { path: "donor", select: "name email role" },
      })
      .populate("ngo", "name email role");

    return res.json({
      success: true,
      message: "Request updated",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/request/all (admin only)
const getAllRequests = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;
    const filter = status ? { status } : {};

    const [items, total] = await Promise.all([
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
      data: items,
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

module.exports = {
  createRequest,
  getMyRequests,
  updateRequest,
  getAllRequests,
};
