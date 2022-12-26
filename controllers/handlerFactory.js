const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.createOne = (Model, name_model) =>
  catchAsync(async (req, res, next) => {
    if (
      name_model == "phone" ||
      name_model == "Accessory" ||
      name_model == "Wanted"
    ) {
      req.body.user = req.user._id;
    }
    // console.log(req.body);
    // try {
    const doc = await Model.create(req.body);
    // } catch (error) {
    //   return res.status(400).json(error);
    // }

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // console.log(popOptions);
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.id) filter = { phone: req.params.id };

    // const features = new APIFeatures(Model.find(), req.query)
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      //   runValidators: true,
    });

    if (!doc) {
      return next(new AppError("no document found with that Id", 404));
    }

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("no document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      message: "Document deleted...",
    });
  });
