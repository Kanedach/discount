import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import cors from "cors";
import * as secrets from "./util/secrets";
import * as discountController from "./controllers/discount";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerUi = require("swagger-ui-express");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require("./swagger.json");


// Create Express server
const app = express();

const baseUrlV1 = "/spb/v1";

// Express configuration
app.set("port", process.env.PORT || secrets.getCredentials().serviceServerPort);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Public
app.use("/api-doc", cors(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.get(baseUrlV1, cors(), singleProjectBusinessController.getAllPublic);
//app.get(baseUrlV1 + '/search/:term', cors(), singleProjectBusinessController.searchPublic);
//app.get('/auth',  cors(),authController.authRequest);
app.get("/discount", cors(), discountController.getAll);


export default app;
