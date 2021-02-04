const express = require('express');
const user = require('../../models/user');
const router = express.Router();

// save user
router.post('/', async(req, res) => {
    const data = new user(req.body);
    try{
        const response = await data.save({validateBeforeSave: true});
        res.json(response);
      } catch(error) {
        res.json(error);
      }
});

// get all users
router.get('/', async() => {
    user.find()
    .exec()
    .then(x => {
        return res.json(x);
    })
    .catch(x => {
        return res.status(500).json(x);
    })
});

// get user by Id
router.get('/:userId', async(req, res) => {
    const userId = req.params.userId;
    user.findById(userId)
    .exec()
    .then(x => {
        return res.json(x);
    })
    .catch(x => {
        return res.status(500).json(x);
    })
});


module.exports = router