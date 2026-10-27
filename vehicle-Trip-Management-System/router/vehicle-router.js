const express = require("express");
const router = express.Router();
const { createVehicle, getVehicles, getVehicleByDistance, getVehicleByCity,
    getCarsAndTrucks, updateVehicle, deleteVehicle, addTrip,removeTrip,updateTrip} = require("../Controller/busnis-logic");


router.post("/", createVehicle);
router.get("/", getVehicles);
router.get("/distance", getVehicleByDistance);
router.get("/city", getVehicleByCity);
router.get("/cars-and-trucks", getCarsAndTrucks);
router.patch("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.post("/:vehicleId/trips/:tipId", addTrip);
router.delete("/:vehicleId/trips/:tripId", removeTrip);
router.patch("/:vehicleId/trips/:tripId", updateTrip);





module.exports = router;