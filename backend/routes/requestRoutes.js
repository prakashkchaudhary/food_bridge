const express = require("express");
const {
  createRequest,
  getMyRequests,
  updateRequest,
  getAllRequests,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", protect, allowRoles("ngo"), createRequest);
router.get("/my", protect, getMyRequests);
router.put("/update/:id", protect, allowRoles("donor", "ngo", "admin"), updateRequest);
router.get("/all", protect, allowRoles("admin"), getAllRequests);

module.exports = router;
