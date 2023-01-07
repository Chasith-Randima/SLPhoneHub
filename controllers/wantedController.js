const Wanted = require("./../models/wantedModel");
const factory = require("./handlerFactory");

// wanted model

exports.getAllWanted = factory.getAll(Wanted);
exports.getOneWanted = factory.getOne(Wanted);
exports.createOneWanted = factory.createOne(Wanted, "Wanted");
exports.updateOneWanted = factory.updateOne(Wanted);
exports.deleteOneWanted = factory.deleteOne(Wanted);
