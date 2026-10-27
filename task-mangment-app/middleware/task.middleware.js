
const middleware = (req, res, next) => {
    const { title, description, priority, isComplete } = req.body;

    if (!title || !description || !priority || isComplete === undefined) {
        return res.status(400).json({
            message: "Please provide all the required fields",
        });
    }

    if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
            message: "Priority must be low, medium, or high",
        });
    }

    next();
};

module.exports = middleware;
