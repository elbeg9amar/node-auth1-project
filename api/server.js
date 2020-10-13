const express = require("express");
const helmet = require("helmet");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const userRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const protected = require('../auth/protected')


const server = express();

server.use(helmet());
server.use(express.json());
// server.use(session(sessionConfig));


server.use('/api/auth', authRouter)
server.use('/api/users', userRouter);

server.get('/', (req,res) => {
    res.json({api:'up'})
});

module.exports = server