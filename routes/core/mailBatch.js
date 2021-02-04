const router = require('express').Router();
const batch = require('../../models/batchDetails');


// save batch 
router.post('/', async(req, res) => {
    try {
        const data = new batch(req.body);
        const response = await data.save();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});
// get all batches
router.get('/', async(req, res) => {
    try {
        const batchDetails = await batch.find();
        return res.json(batchDetails);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


module.exports = router;