const Booking = require("../model/bookingModel")


const createBooking = async (req, res) => {
    try {
        const { serviceName, requestedDate, } = req.body;

         if (!serviceName || !requestedDate) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
     
        const booking = await Booking.create({ serviceName, requestedDate, userId: req.user.userId });

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {

        const filter=req.user.role=="admin"?{}:{userId:req.user.userId};
        console.log("this is the admin",filter);

        const bookings = await Booking.find(filter).populate("userId", "username email").sort({ requestedAt: -1 });

        res.status(200).json({ message: "Bookings retrieved successfully", bookings });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving bookings", error: error.message });
    }
};
const updateBooking = async (req, res) => {
    try {
        const { serviceName, requestedDate, } = req.body;
        
        const { id } = req.params;
        
        const booking = await Booking.findById({
            _id: id,
            userId: req.user.userId,
            status: "pending"
        });
        if (!booking) {
            return res.status(400).json({
                message: "Booking not found"
            });
        }

        if (serviceName !== undefined) { 
            if(typeof serviceName !== "string"||!serviceName.trim()) {
                return res.status(400).json({
                    message: "Service name is required"
                });
            }
            booking.serviceName = serviceName.trim();
        }
        if (requestedDate !== undefined) { 
            const date = new Date(requestedDate);
            if(!requestedDate || Number.isNaN(date.getTime())||date.getTime()<=Date.now()) {
                return res.status(400).json({
                    message: "Requested date is required"
                });
            }
            booking.requestedDate = date;
        }

        await booking.save();

        res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
        

    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
    }
}


const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findOneAndUpdate({
            _id: id,
            userId: req.user.userId,
            status: "pending"
        },{status:"cancelled"},{new:true});
        if (!booking) {
            return res.status(400).json({
                message: " Pending Booking not found"
            });
        }
       

       return res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
      return  res.status(500).json({ message: "Error cancelling booking", error: error.message });
    }
}

const approveBooking = async (req, res) => {
    try { 
        const booking = await Booking.findOneAndUpdate({
            _id: id,
            userId: req.user.userId,
            status: "pending"
        }, { status: "approved" }, { new: true }, { runValidators: true });

        if (!booking) {

            return res.status(400).json({
                message: "Pending Booking not found"
            });
        }

        return res.status(200).json({
            message: "Booking approved successfully",
            booking
        });
    } catch (error) {
        return res.status(500).json({ message: "Error approving booking", error: error.message });
     }
}
 
const rejectBooking = async (req, res) => {
    try { 
        const booking=await Booking.findOneAndUpdate({_id:req.params.id,status:"pending"},{status:"rejected"},{new:true,runValidators:true});
        if (!booking) {
            return res.status(400).json({
                message: "Pending Booking not found"
            });
        }
        return res.status(200).json({
            message: "Booking rejected successfully",
            booking
        });

    }catch (error) {
        return res.status(500).json({ message: "Error rejecting booking", error: error.message });
     }
}

const deleteBooking = async (req, res) => {
    try { 
        const booking = await Booking.findOneAndDelete({ _id: req.params.id });
        if (!booking) {
            return res.status(400).json({
                message: "Booking not found"
            });
        }
        return res.status(200).json({
            message: "Booking deleted successfully",
            booking
        });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
}

module.exports = { createBooking, getBookings, updateBooking,cancelBooking,approveBooking,rejectBooking,deleteBooking };