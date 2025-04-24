const handleDuplicateError = (error)=>{
    const errorKey = Object.keys(error.keyValue)[0]
    const errorVal = Object.values(error.keyValue)[0]
    const errorMessage = new Error(`${errorKey} of ${errorVal} already exists.`)
    const statusCode = 400
    return {
        statusCode,
        errorMessage: errorMessage.message
    }
}


// const handleCastError = (err) => {
//     const errorMessage = `Invalid ${err.value}`;
//     const statusCode = 400;
//     return {
//         statusCode,
//         errorMessage
//     };
// };


const handleValidationError = (err)=>{
    console.log(err);
    
    const errorMessage = Object.values(err.errors).map(item=>item.message)[0] // [{message: "path email is required"}].map(item=>item.message)
    const statusCode = 400
    return {
        statusCode,
        errorMessage
    }
}

const errorHandler = (err, req, res, next)=>{
    console.log(err);
    
    // duplicate error
    if(err.code === 11000){
        const error = handleDuplicateError(err)
        res.status(error.statusCode).json({
            message: error.errorMessage
        })
    }
    
    else if (err.name === "TokenExpiredError") {
        res.status(401).json({
            status: "error",
            message: " Ogbeni your Token has expired"
        });
    } else if (err.name === "JsonWebTokenError"){
        res.status(404).json({
            status: "error",
            message: " Ogbeni your token is invalid"
        });
    }

    // validation error
    else if(err.name === "ValidationError"){
        const error = handleValidationError(err)
        res.status(error.statusCode).json({
            message: error.errorValue
        })
    }  else if (err.name === "CastError") {
        res.status(404).json({
            status: "error",
            message: `Invalid ${err.path} of ${err.value}`
        });
    }
     else{
        res.status(500).json({
            message: "An error occurred!"
        })
    }
    
}

module.exports = errorHandler