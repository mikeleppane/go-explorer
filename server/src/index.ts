import express = require("express");
import { morganMiddleware } from "./middleware/httpLogging";
import Logger from "./startup/logging";

const app = express();
app.use(morganMiddleware);
// require('./startup/logging');
// require('./startup/routes')(app);
// require('./startup/db')();
// require('./startup/config')();
// require('./startup/validation')();

const port = process.env.PORT || 5000;
app.listen(port, () => Logger.info(`Listening on port ${port}...`));
