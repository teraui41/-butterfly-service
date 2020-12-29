require("dotenv").config();
const express = require("express");
const cors = require("cors");
const redis = require('redis')
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectRedis = require('connect-redis');
const authRoute = require('./router/authRoute');
const userRoute = require('./router/userRoute');
const reportRoute = require('./router/reportRoute');
const answerRouter = require('./router/answerRoute');

const port = process.env.PORT || 8099;

const {jwtAuthorizationMiddleware} = require("./managers/passportManager");

const {REDIS_PORT, REDIS_HOST, AUTH_SECRET} = process.env;

const app = express();
const server = require('http').createServer(app);

const RedisStore = connectRedis(session);
let redisClient = redis.createClient();

app.set('trust proxy', 1) // trust first proxy
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new RedisStore({
    client: redisClient,
    host: REDIS_HOST,
    port: REDIS_PORT,
  }),
  secret: AUTH_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60 * 60 * 24 * 1000 // 1天
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/report', jwtAuthorizationMiddleware, reportRoute);
app.use('/answer', jwtAuthorizationMiddleware, answerRouter);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
