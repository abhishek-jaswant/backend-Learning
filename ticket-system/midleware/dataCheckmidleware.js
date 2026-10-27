

const dataCheckMiddleware = (req, res, next) => {
    const { title, description, priority, user } = req.body;
    
    if (!title?.trim() || !description?.trim() || !priority?.trim() || !user.trim())
    {
        return res.status(400).json({
            error:"Data insufficient, please provide all required fields"
        })
    }

    next()
}

export default dataCheckMiddleware