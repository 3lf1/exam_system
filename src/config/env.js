require('dotenv').config();

const required = ['MONGO_DB_SECRET', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

for( const key of required ){
    if( !process.env[key]){
        throw new Error(`Missing required env var: ${key}`);
    }
}

module.exports = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoDbSecret: process.env.MONGO_DB_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};