const express               = require('express');
const bodyParser            = require('body-parser');
const app                   = express();
const cors                  = require('cors');
const userRoutes            = require('./src/routes/user.route');
const projectRoutes            = require('./src/routes/project.route');
const clientsRoutes            = require('./src/routes/client.route');
const centroCustoRoutes            = require('./src/routes/centroCusto.route');
const activityTypeRoutes            = require('./src/routes/activityType.route');
const activityRoutes        = require('./src/routes/activity.route');
const jwt                   = require('jsonwebtoken');
const mongoose              = require('mongoose');


mongoose.connect('mongodb://localhost:27017/tymeet', {useNewUrlParser: true});


app.set('secretKey', 'somethingKey')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

userRoutes(app);
projectRoutes(app);
clientsRoutes(app);
centroCustoRoutes(app);
activityTypeRoutes(app);
activityRoutes(app);


module.exports = app;
