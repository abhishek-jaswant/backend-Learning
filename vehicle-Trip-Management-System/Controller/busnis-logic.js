
const Vehicle  = require("../model/vehicle-model");

const createVehicle = async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json({
            message: "Vehicle created successfully",
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({
            message: "Vehicles fetched successfully",
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getVehicleByDistance = async (req, res) => {
    try {

        const vehicles = await Vehicle.find({ trips: { $elemMatch: { distance: { $gt: 200 } } }});

        res.status(200).json({
            message: "Vehicles fetched successfully",
            data: vehicles
        });
    }
    catch (error)
    {
        res.status(500).json({
            error: error.message
        });
    }
}
 

const getVehicleByCity = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ trips: { $elemMatch: { startLocation: { $in:["Bangalore","Mumbai","Delhi"] } } }});
        res.status(200).json({
            message: "Vehicles fetched successfully",
            data: vehicles
        });
    }
    catch (error)
    {
        res.status(500).json({
            error: error.message
        });
    }
}


const getCarsAndTrucks = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
        res.status(200).json({
            message: "Vehicles fetched successfully",
            data: vehicles
        });
    }
    catch (error)
    {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }
        const { registrationNumber, type, model, isActive } = req.body;
        if (registrationNumber !== undefined) vehicle.registrationNumber = registrationNumber;
        if (type !== undefined) vehicle.type = type;
        if (model !== undefined) vehicle.model = model;
        if (isActive !== undefined) vehicle.isActive = isActive;
        await vehicle.save();
        res.status(200).json({
            message: "Vehicle updated successfully",
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }
        res.status(200).json({
            message: "Vehicle deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const addTrip = async (req, res) => {
    const {vehicleId,tipId} = req.params
    try {
const vehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    {
        $push: {
            trips: req.body
        }
    },
    {
        new: true,
        runValidators: true
    }
);
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }
        const trip = new Vehicle(req.body);
        vehicle.trips.push(trip);
        await vehicle.save();
        res.status(201).json({
            message: "Trip added successfully",
            data: vehicle
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const removeTrip = async (req, res) => {
    const {vehicleId,tripId} = req.params
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            vehicleId,
            {       
                $pull: {
                    trips: { _id: tripId }
                }
            },
            {
                new: true,
                runValidators: true
            }
        );
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }
        res.status(200).json({
            message: "Trip removed successfully",
            data: vehicle
        });
            
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const updateTrip = async (req, res) => {
    try {
        const { vehicleId, tripId } = req.params;

        const vehicle = await Vehicle.findOneAndUpdate(
            {
                _id: vehicleId,
                "trips._id": tripId
            },
            {
                $set: {
                    "trips.$.startLocation": req.body.startLocation,
                    "trips.$.endLocation": req.body.endLocation,
                    "trips.$.distance": req.body.distance,
                    "trips.$.startTime": req.body.startTime,
                    "trips.$.endTime": req.body.endTime
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle or trip not found"
            });
        }

        res.status(200).json({
            message: "Trip updated successfully",
            data: vehicle
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleByDistance,
    getVehicleByCity,
    getCarsAndTrucks,
    updateVehicle,
    deleteVehicle,
    addTrip,
    removeTrip,
    updateTrip
    
};