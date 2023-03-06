const quizRouter = require("./quizRoutes");

const router = require("express").Router();

router.use("/quiz", quizRouter);

module.exports = router;
