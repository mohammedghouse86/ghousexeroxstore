var jwt = require('jsonwebtoken');
const jwt_SECRET = "BLAH#BL@#";

const getUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        req.state(401).send({Error:"INVALID TOKEN BRAV!!!!"});
    }
    try {
        const data = jwt.verify(token,jwt_SECRET);
        req.user = data.user;
        //console.log('data = ', data);
        //console.log('user = ', user);
        next();
    } catch (error) {
        req.state(401).send({Error:"INVALID TOKEN BRAV!!!!"});        
    }
}

module.exports = getUser