const morgan = require("morgan");
const express = require("express")
const cors = require('cors')
const winston = require("winston");
const Table = require('cli-table');
const listAllRoutes = require('express-list-endpoints');
require('dotenv').config()

const port = process.env.PORT || 3000;

const app = express();
app.use(morgan('tiny'));
app.use(cors());

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);

let routesList = listAllRoutes(app);
routesList = routesList.map((route) => {
    const obj = {};
    obj[route.path] = route.methods.join(' | ');
    return obj;
});

const table = new Table();
table.push({ Endpoints: 'Methods' }, ...routesList);

console.log(`THESE ARE THE AVAILABLE ENDPOINTS: \n${table.toString()}`);


app.listen(port, () => {
    winston.info(`----slack-bot is running on http://localhost:${port}--------`)
})