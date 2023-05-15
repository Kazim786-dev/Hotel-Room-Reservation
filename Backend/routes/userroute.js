const router = require("express").Router();

const { Signup, Signin } =  require("../controller/userController");


router.post("/signup", Signup);
router.post("/signin", Signin);


module.exports= router;
