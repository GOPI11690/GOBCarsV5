const express = require("express");
const router = express.Router();
const routeController=require("../controller/rentalController.js");
const protect=require("../middleware/auth.js");

router.get("/all",routeController.getAllRentals);

router.get("/:id",routeController.getRental);

router.post("/add",routeController.addRental);

router.delete("/delete/:id",protect,routeController.deleteRental);

router.put("/payment/:id",protect,routeController.addPayment)



module.exports = router;