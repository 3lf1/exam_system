const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

exports.protect = async (req, res, next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) { 
            return res.status(401).json({ status: 'fail', message: 'You are not logged in! Please log in to get access.' });
        }

        const decoded = jwt.verify(token, jwtSecret);

        const currentUser = await User.findById(decoded.id);

        if(!currentUser) {
            return res.status(401).json({ status: 'fail', message: 'The user belonging to this token does no longer exist.' });
        }

        req.user = currentUser;
        next();
        
    }catch(err){
        res.status(401).json({ status: 'fail', message: 'Invalid token or token has expired' });
    }
};

