const express = require("express");
const router = express.Router();

const { createBooking, getBookings, updateBooking, cancelBooking, approveBooking, rejectBooking, deleteBooking } = require("../controller/bookingController");
const { authMiddleware,autorizeAdmin} = require("../middleware/authMiddleware");
router.use(authMiddleware);
router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:id", updateBooking);

//"User cancelled booking"
router.delete("/:id", (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    }
    return cancelBooking(req, res);
}, autorizeAdmin, deleteBooking);

router.put("/:id/approve",autorizeAdmin,approveBooking);
router.put("/:id/reject",autorizeAdmin,rejectBooking);


module.exports = router;