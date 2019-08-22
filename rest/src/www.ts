import express = require('express');
import http = require('http');
import cors = require('cors');
import bodyParser = require('body-parser');
import { connect } from './mongo';
import { parseTokenFromHeader } from './jwt';
import controllers = require('./controllers');

connect().then(() => {
    let app = express();
    app.use(cors({ credentials: true, origin: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', async (req, res, next) => {
        if (openRoutes.includes(req.originalUrl.split('?')[0])) {
            return next();
        }
        try {
            parseTokenFromHeader(req);
            if (!req["user"]) {
                throw new Error();
            }
        } catch{
            return res.status(400).send({ error: true, message: "unauthorized", result: false });
        }
        return next();
    });

    app.post("/signup", controllers.signup);
    app.get("/login", controllers.login);
    app.get("/get-transactions", controllers.getTransactions);
    app.post("/add-transaction", controllers.addTransaction);

    let server = http.createServer(app);

    server.listen(3000, () => {
        console.log("Server started....");
        console.log("Listening on port: " + 3000);
    });
});

let openRoutes = [
    '/login',
    '/signup',
];