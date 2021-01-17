import mongoose from "mongoose";
import unique from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: [true, "Name required"],
  },
  description: {
    type: String,
    required: [true, "Description required"],
  },
  symbol: {
    type: String,
    required: [true, "Symbol required"],
    unique: true
  },
  market_values: [{
    _id: false,
    value: {
      type: Number,
      required: [true, "Market value required"]
    },
    date: {
      type: Date,
      required: [true, "Market date required"]
    },
    created: {
      type: Date,
      default: new Date()
    },
  }],
  created: {
    type: Date,
    default: new Date()
  },
  modified: {
    type: Date,
    default: new Date()
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false
});

schema.plugin(unique, { message: '{PATH} should be unique value' });
export default mongoose.model("StockExchange", schema);
