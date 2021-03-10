const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    Reference: String,
    billDate: Date,
    totalHT: Number,
    totalTTC: Number,
    member: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", billSchema);
