const express = require("express");
const router = express.Router();
const routeController=require("../controller/carController.js");
const protect=require("../middleware/auth.js");

router.get("/all",routeController.getAllCars);

router.get("/:id",protect,routeController.getCar);

router.post("/add",protect,routeController.addCar);

router.delete("/delete/:id",protect,routeController.deleteCar);

router.put("/update/:id",protect,routeController.updateCar);

router.get("/dealer/:id",protect,routeController.getDealerCars);



module.exports = router;