const mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  img: { type: String, required: true, default: "default" },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  type: { type: mongoose.Schema.Types.Number, required: true, enum: [0, 1, 2] },
  //   superAdmin: { type: Boolean, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }]
});

module.exports = mongoose.model("User", UserModelSchema);
