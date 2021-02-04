const router = require('express').Router();
const sender = require('../utils/sender');



// save document 
router.get('/', async(req, res) => {
    try {
        const request = {
            mailFrom: 'chank bro <chankbro@gmail.com>',
            mailTo: 'khamras@gmail.com',
            subject: 'this is a wonderful subject',
            mailBody: '<p>this is a body</p>',

        };
        const response = await sender.sendMail(request);
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// get all documents
router.post('/', async(req, res) => {
    try {
        documents.find()
            .exec()
            .then(x => {
                return res.status(200).send(x);
            })
            .catch(x => {
                return res.status(500).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});
// get document by id
router.get('/getById/:docId', (req, res) => {
    try {
        const docId = req.params.docId;
        documents.findById(docId)
            .exec()
            .then(x => {
                return res.status(200).json(x);
            })
            .error(x => {
                return res.status(500).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});
/**
 * get document by project id
 * @swagger
 * /getByProject/:projectId:
 * get:
 *      description: get document by projectid
 *  */

router.get('/getByProject/:projectId', async(req, res) => {
    try {
        const projectId = req.params.projectId;
        documents.find({ projectId })
            .exec()
            .then(x => {
                return res.status(200).send(x);
            })
            .catch(x => {
                return res.status(500).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/userDocuments', async(req, res) => {
    try {
        const projectId = req.body.projectId;
        documents.find({ projectId })
            .exec()
            .then(x => {
                return res.status(200).send(x);
            })
            .catch(x => {
                return res.status(500).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;