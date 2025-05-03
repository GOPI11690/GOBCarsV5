const express = require("express");
const router = express.Router();
const routeController=require("../controller/userController.js");
const protect=require("../middleware/auth.js");

router.get("/all",protect,routeController.getAllUsers);

router.get("/checkauth",protect,routeController.getUser);

router.get("/:id",protect,routeController.getUser);

router.post("/add",routeController.addUser);

router.delete("/delete/:id",protect,routeController.deleteUser);

router.put("/update/:id",protect,routeController.updateUser)

router.get('/profile',protect,routeController.getProfile);

router.post("/login", routeController.loginUser);

router.post("/license",protect,routeController.addLicense);

router.post("/logout",routeController.logOut)


module.exports = router;