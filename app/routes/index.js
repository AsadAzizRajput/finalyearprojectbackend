// this is the main file for all routes


const signupRoute = require('./signup');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const updateRoute = require('./updateusers');
const createandgetstours = require('./createandgetstours');
const getusers = require('./getusers')

module.exports = function(app,database)
{
    
    signupRoute(app,database);
    loginRoute(app,database);
    logoutRoute(app,database);
    updateRoute(app,database);
    createandgetstours(app,database);
    getusers(app,database);

}