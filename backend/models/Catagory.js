import mongoose from "mongoose";

const CatagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    labelName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Catagory = mongoose.model("Catagory", CatagorySchema);
export default Catagory;
