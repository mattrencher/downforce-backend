const model = require('../schemas/GameSchema');

exports.create = function (item) {
  return new model(item).save();
}

exports.list = function () {
  return model.find({});
}

exports.get = function (id) {
  return model.findById(id);
}

exports.update = function (id, item) {
  return model.findByIdAndUpdate(id, item,{ runValidators: true });
}

exports.delete = function (id) {
  return model.findByIdAndDelete(id);
}

// exports.getByUsername = function (username) {
//   return model.findOne({ username: username });
// }

exports.listWithPagination = function (page, per_page, list_all) {
  if (list_all === "true") {
      return model.find({}).sort({ created_at: -1 });
  } else {
      return model.find({}).sort({ created_at: -1 }).skip((page - 1) * per_page).limit(per_page);
  }
}