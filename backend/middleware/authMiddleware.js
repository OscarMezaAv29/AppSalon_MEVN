const authMiddleware = (req, res, next) => {
    console.log('Desde AuthMiddleware');

    next()
}

export default authMiddleware