const express = require("express");
const router = express.Router();
const routeController=require("../controller/userController.js");
const {logIn} = require("../controller/auth-controllers/authControllerLogin.js");
const protect=require("../middleware/auth.js");

router.get("/all",protect,routeController.getAllUsers);

router.get("/:id",protect,routeController.getUser);

router.post("/add",routeController.addUser);

// router.post("/login",routeController.loginUser);

router.delete("/delete/:id",protect,routeController.deleteUser);

router.put("/update/:id",protect,routeController.updateUser)

router.get('/profile',routeController.getProfile);

router.post("/login", logIn);


module.exports = router;