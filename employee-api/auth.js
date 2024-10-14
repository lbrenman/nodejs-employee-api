require('dotenv').config();

const apiKeys = process.env.API_KEYS.split(',');

const authenticate = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey || !apiKeys.includes(apiKey)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

module.exports = authenticate;