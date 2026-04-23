const express = require("express");
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/add-public", addFood);
router.post("/add", protect, allowRoles("donor", "admin"), addFood);
router.put("/update/:id", protect, allowRoles("donor", "admin"), updateFood);
router.delete("/delete/:id", protect, allowRoles("admin"), deleteFood);

module.exports = router;
