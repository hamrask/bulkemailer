const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

const files = require('./routes/core/files');
const project = require('./routes/core/project');
const gallery = require('./routes/core/mailBatch');
const documents = require('./routes/core/documents');
const auth = require('./routes/core/auth');
const public = require('./routes/core/public');

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');



const env = require('dotenv');
env.config();

app.use(express.json());
app.use(cors());
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));



mongoose.connect(process.env.mongoose_connection, { useNewUrlParser: true, useUnifiedTopology: true },
    success => {
        console.log('Database connection successful');
    },
    err => {
        console.log(err);
    });

const port = process.env.PORT | 3000;
app.listen(port, () => {
    console.log('application started in port ', port)
});

var tokenExtractor = (req, res, next) => {
    if (req.headers.authorization) {
        const data = jwt.decode(req.headers.authorization.split(' ')[1]);
        if (data && data.projectId) {
            req.body.projectId = data.projectId
        }
        next();
    } else {
        return res.status(401).json({ message: 'login required' });
    }
}

app.use('/auth', auth);
app.use('/public', public);

// app.use(tokenExtractor);

app.use('/files', files);
app.use('/project', project);
app.use('/gallery', gallery);
app.use('/document', documents);


module.exports = app;