import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from "body-parser";
import logger from "morgan";
import session from 'express-session';

// postgre session creation start
const pgSession = require('connect-pg-simple')(session);
import { Pool } from "pg";
const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    database: "chicago_business_intelligence",
    password: "root",
    port: 5432,
  });

// postgre session creation end

// Sequelize setup start
import { sequelize } from "./models";
async function main() {
    await sequelize.sync();
}

main();

// Sequelize setup end


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
app.use(session({
    store: new pgSession({
        pool : pool,              // Connection pool
        createTableIfMissing: true,
        tableName : 'user_sessions'   // Use another table-name than the default "session" one
        // Insert connect-pg-simple options here
      }),
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneHour }
}));


const isAuth = (req, res, next) => {
  console.log("here i am", req.session.isAuth);
  if(req.session.isAuth) {
    next();
  } else {
    res.send(401).json({
      message: 'Unauthorized User'
    });
  }
};

//Import Routes
import authRoute from './routes/authroute';
import covidDailyDataRoute from './routes/coviddailyroute';
import covidCCVIRoute from './routes/covidccviroute';
import highCCVITaxiTripRoute from './routes/highccvitaxitripsroute';
import taxiRoute from './routes/taxitrip';
import unempPovertyRoute from './routes/unemploymentpoverty';
import buildingPermitRoute from './routes/buildingpermitroute';

// Route Middlewares
app.use('/api', authRoute);
app.use('/api/covid_daily', covidDailyDataRoute);
app.use('/api/covid_ccvi', covidCCVIRoute);
app.use('/api/taxi', taxiRoute);
app.use('/api/high_ccvi_taxi_trip', highCCVITaxiTripRoute);
app.use('/api/unemployment_poverty', unempPovertyRoute);
app.use('/api/building_permit', buildingPermitRoute);

app.listen(4000, isAuth, async () => {
    console.log('server is running on port', 4000);
});

module.exports = app;
