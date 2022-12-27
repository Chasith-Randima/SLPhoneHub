const express = require("express");
const phoneController = require("./../controllers/phoneController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(phoneController.getAllPhones)
  .post(
    authController.protect,
    phoneController.uploadPhoneImages,
    phoneController.resizePhoneImages,
    phoneController.createOnePhone
  );
router
  .route("/:id")
  .get(phoneController.getOnePhone)
  .patch(authController.protect, phoneController.updateAPhone)
  .delete(authController.protect, phoneController.deleteAPhone);

module.exports = router;
