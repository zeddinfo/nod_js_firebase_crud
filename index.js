'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const newsRoutes = require('./routes/news-routes');
const authRoutes = require('./routes/auth-routes');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', studentRoutes.routes);
app.use('/api', newsRoutes.routes);
app.use('/api', authRoutes.routes);


app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api Documentation for Xcidic Technical Test",
            version: "1.0.0",
            description: "A Simple CRUD Api News App with firebase",
        },
        servers: [
            {
                url: "https://serene-earth-55262.herokuapp.com/api"
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
