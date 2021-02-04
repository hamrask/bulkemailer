const router = require('express').Router();
const gallery = require('../../models/batchDetails');

// get all public gallery
router.get('/gallery/:index?', async(req, res) => {
    try {
        const filter = {
            private: false
        };
        let index = Number(req.params.index);
        if (!index) {
            index = 0;
        }
        const pageSize = Number(process.env.pageSize);
        const galleryDetails = await gallery.find(filter).skip(index * pageSize).limit(pageSize).exec();
        let documentCount = await gallery.countDocuments(filter).exec();
        const response = {
            data: galleryDetails,
            totalCount: documentCount,
            currentIndex: index++,
            pageSize: pageSize
        };
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// 
module.exports = router;