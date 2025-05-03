const express = require("express");
const router = express.Router();
const routeController=require("../controller/rentalController.js");
const protect=require("../middleware/auth.js");

router.get("/user/all",routeController.getAllRentals);

router.get("/user/:id",protect,routeController.getRentals);

router.post("/add",protect,routeController.addRental);

router.delete("/delete/:id",protect,routeController.deleteRental);

router.put("/payment/:id",protect,routeController.addPayment)

router.get("/:id",protect,routeController.getRental);



module.exports = router;