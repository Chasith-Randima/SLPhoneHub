const express = require("express");
const router = express.Router();
const wantedController = require("./../controllers/wantedController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(wantedController.getAllWanted)
  .post(authController.protect, wantedController.createOneWanted);
router
  .route("/:id")
  .get(wantedController.getOneWanted)
  .patch(authController.protect, wantedController.updateOneWanted)
  .delete(authController.protect, wantedController.deleteOneWanted);

module.exports = router;
