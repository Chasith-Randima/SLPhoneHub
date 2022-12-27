const express = require("express");
const router = express.Router();
const accessoriesController = require("./../controllers/accessoryController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(accessoriesController.getAllAccessories)
  .post(
    authController.protect,
    accessoriesController.uploadAccessoryImages,
    accessoriesController.resizeAccessoryImages,
    accessoriesController.createOneAccessory
  );
router
  .route("/:id")
  .get(accessoriesController.getOneAccessory)
  .patch(authController.protect, accessoriesController.updateOneAccessory)
  .delete(authController.protect, accessoriesController.deleteOneAccessory);

module.exports = router;
