const express = require("express");
const helmet = require("helmet");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const userRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const protected = require('../auth/protected');
const db = require('../database/db-config')


const server = express();

const sessionConfig = {
    name:"monster",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10,
        secure: process.env.SECURE_COOKIES || false,
    },
    resave: false,
    saveUninitialized: true,
    store:new KnexSessionStore({
        knex: db,
        tablename:"sessions",
        sidfieldname:"sid",
        createtable:true,
        clearInterval: 1000 * 60 * 60
    })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));


server.use('/api/auth', authRouter);
server.use('/api/users', protected , userRouter);

server.get('/', (req,res) => {
    res.json({api:'up'})
});

module.exports = server;