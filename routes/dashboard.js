const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.get("/detailsUser", auth.authenticateToken, (req, res, next) => {
  var inboxCount;
  const email = res.locals.email; //email address get using token
  var query =
    "SELECT count(message_id) AS inboxCount FROM message_data WHERE toAddr=?";
  connection.query(query, [email], (err, results) => {
    if (!err) {
      inboxCount = results[0].inboxCount;
      return res.status(200).json({ inboxCount: inboxCount });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get(
  "/detailsAdmin",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    var resCount;
    var query = "SELECT count(email) AS resCount FROM recipient";
    connection.query(query, (err, results) => {
      if (!err) {
        resCount = results[0].resCount;
        return res.status(200).json({ resCount: resCount });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
