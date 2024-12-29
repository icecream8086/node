var express = require('express');
var router = express.Router();
const query = require('../lib/datasource/mysql_connection_promise');  // Database connection
const { verifyToken, generateToken } = require('../lib/encrypt/token');
const {error_control}=require('../lib/life_cycle/error_control');

module.exports = router;