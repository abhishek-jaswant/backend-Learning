

const datamidleware = (req, res, next) => {
     
    const {title}=req.body;
    if(!title||typeof title!=="string"||title.trim().length===0){
        return res.status(400).json({
            message:"title is required"
        })
    }

    
    next();
}

export default datamidleware;