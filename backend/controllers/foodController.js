const Food = require("../models/Food");

// POST /api/food/add (donor only)
const addFood = async (req, res, next) => {
  try {
    const { name, quantity, image, imageGallery, location, expiry, status, contact, trackerUrl } = req.body;

    if (
      !name ||
      !quantity ||
      location?.lat === undefined ||
      location?.lat === null ||
      location?.lng === undefined ||
      location?.lng === null ||
      !expiry
    ) {
      res.status(400);
      throw new Error("name, quantity, location.lat, location.lng and expiry are required");
    }

    const food = await Food.create({
      name,
      quantity,
      image: image || "",
      imageGallery: imageGallery || [],
      location: {
        address: location.address || "",
        lat: Number(location.lat),
        lng: Number(location.lng),
      },
      expiry,
      status: status || "available",
      donor: req.user?._id,
      contact: contact || undefined,
      trackerUrl: trackerUrl || "",
    });

    const populated = await Food.findById(food._id).populate("donor", "name email role");

    return res.status(201).json({
      success: true,
      message: "Food item added",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/food
const getFoods = async (req, res, next) => {
  try {
    const { status, location, page = 1, limit = 10 } = req.query;
    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;

    const filter = {};
    if (status) filter.status = status;
    if (location) {
      filter["location.address"] = { $regex: location, $options: "i" };
    }

    const [items, total] = await Promise.all([
      Food.find(filter)
        .populate("donor", "name email role")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Food.countDocuments(filter),
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

// GET /api/food/:id
const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate("donor", "name email role");
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }

    return res.json({ success: true, data: food });
  } catch (error) {
    return next(error);
  }
};

// PUT /api/food/update/:id (donor owner or admin)
const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = food.donor && food.donor.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      res.status(403);
      throw new Error("Not allowed to update this food item");
    }

    const updatable = [
      "name",
      "quantity",
      "image",
      "imageGallery",
      "expiry",
      "status",
      "contact",
      "trackerUrl",
    ];

    updatable.forEach((field) => {
      if (req.body[field] !== undefined) {
        food[field] = req.body[field];
      }
    });

    if (req.body.location) {
      food.location = {
        address: req.body.location.address ?? food.location.address,
        lat: req.body.location.lat ?? food.location.lat,
        lng: req.body.location.lng ?? food.location.lng,
      };
    }

    const saved = await food.save();
    const populated = await Food.findById(saved._id).populate("donor", "name email role");

    return res.json({
      success: true,
      message: "Food item updated",
      data: populated,
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE /api/food/delete/:id (admin only)
const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      res.status(404);
      throw new Error("Food item not found");
    }

    await food.deleteOne();
    return res.json({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
