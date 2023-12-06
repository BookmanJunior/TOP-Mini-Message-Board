var express = require("express");
var router = express.Router();
const commentController = require("../controller/commentController");

/* GET home page. */
router.get("/", commentController.get_comments);

router.get("/new", function (req, res, next) {
  res.render("form");
});

router.post("/new");

module.exports = router;
