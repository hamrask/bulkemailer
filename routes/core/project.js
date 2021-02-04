const router = require('express').Router();
const project = require('../../models/mailLog');
const auth = require('../../models/auth');
const gallery = require('../../models/batchDetails');

// save project 
router.post('/', async(req, res) => {
    try {
        const projectId = req.body._id;
        if (projectId) {
            const response = await project.updateOne({ _id: projectId }, req.body);
            return res.json(response);
        } else {
            const data = new project(req.body);
            const response = await data.save();
            const authData = {
                username: req.body.projectCode,
                password: req.body.phone,
                role: 'customer',
                projectId: response._id
            };
            const login = new auth(authData);
            const responseLogin = await login.save();
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
// get all projects
router.get('/', async(req, res) => {
    try {
        project.find()
            .sort({ projectCode: -1 })
            .exec()
            .then(x => {
                return res.status(200).json(x);
            });
    } catch (error) {
        return res.status(500).json(error);
    }
});
// get project by id
router.get('/getById/:projectId', (req, res) => {
    try {
        const projectId = req.params.projectId;
        project.findById(projectId)
            .exec()
            .then(x => {
                return res.status(200).json(x);
            })
    } catch (error) {
        return res.status(500).json(error);
    }
});
// view project by user token
router.post('/userproject', (req, res) => {
    try {
        if (req.body.projectId) {
            project.findById(req.body.projectId)
                .exec()
                .then(x => {
                    return res.status(200).json(x);
                })
        } else {
            return res.status(400).json({ message: 'project id cannot be found' });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});
router.delete('/byId/:projectId', async(req, res) => {
    try {
        const projectId = req.params.projectId;
        const response = await project.findByIdAndRemove(projectId, { useFindAndModify: false });
        const galleryDelete = await gallery.deleteMany({ projectId: projectId });
        return res.json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;