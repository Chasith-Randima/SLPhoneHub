const Accessory = require("./../models/accessoriesModel");
const factory = require("./handlerFactory");

exports.getAllAccessories = factory.getAll(Accessory);
exports.getOneAccessory = factory.getOne(Accessory);
exports.createOneAccessory = factory.createOne(Accessory, "Accessory");
exports.updateOneAccessory = factory.updateOne(Accessory);
exports.deleteOneAccessory = factory.deleteOne(Accessory);
