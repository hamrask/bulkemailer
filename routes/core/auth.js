const express = require('express');
const router = express.Router();
const auth = require('../../models/auth');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

// authenticate
router.post('/', async(req, res) => {
    try {
        const userData = await auth.findOne({ 'username': req.body.username, 'password': req.body.password });
        if (userData) {
            userData.password = 'REDACTED';
            const token = jwt.sign(JSON.stringify(userData), process.env.jwtKey);
            return res.send({ token: token, role: userData.role });
        } else {
            return res.status(400).json({ message: 'invalid credentials' });
        }
    } catch (error) {
        console.log('err', error);
        return res.status(500).json(error);
    }
});
// add user
router.post('/add', async(req, res) => {
    try {
        const data = new auth(req.body);
        const response = await data.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router