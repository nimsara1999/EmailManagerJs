require('dotenv').config();

//check role and only admin can go forward when use that function
function checkRole(req, res, next) {
    if (res.locals.role == process.env.USER)
        res.sendStatus(401)
    else
        next()
}

module.exports = { checkRole: checkRole }