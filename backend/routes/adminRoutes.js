const express = require("express");
const {
  listUsers,
  listFoods,
  listRequests,
  updateFoodByAdmin,
  deleteFoodByAdmin,
  updateRequestByAdmin,
  updateUserByAdmin,
  getStats,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, allowRoles("admin"));

router.get("/users", listUsers);
router.put("/users/:id", updateUserByAdmin);
router.get("/foods", listFoods);
router.put("/foods/:id", updateFoodByAdmin);
router.delete("/foods/:id", deleteFoodByAdmin);
router.get("/requests", listRequests);
router.put("/requests/:id", updateRequestByAdmin);
router.get("/stats", getStats);

module.exports = router;
