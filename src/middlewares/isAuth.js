const jwt = require('jsonwebtoken')

const isAuth  = (req, res, next) => {
    console.log('----> isAuth middleware')
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({message:  "Permissão negada"}); 
    }

    try {
        const tokenValidado = jwt.verify(token, "SECRET%$#");
        req.user = tokenValidado;
    } catch (error) {
        return res.status(401).json({ message: "Permissão negada" });
    }
    
    next();
}

module.exports = { isAuth };