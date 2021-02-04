const multer = require('multer');
const router = require('express').Router();
const mailLogger = require('../utils/mailLogger');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

router.post('/', async(req, res, next) => {
    const upload = multer({ storage }).single('file');
    upload(req, res, async(err) => {
        if (err) {
            return res.status(400).send(err);
        }
        const path = req.file.path;
        const fileDetails = JSON.parse(req.body);
        if (fileDetails) {
            fileDetails.filePath = path;
        }
        const response = await mailLogger.saveMailLog(fileDetails);
        return res.json(response);
    });
});

module.exports = router