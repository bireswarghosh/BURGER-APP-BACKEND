import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  photo: String,
  eMailId: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: "String",
    // hear pass this 2 value  either admin or user without this 2 no body can access 
    enum: ["admin", "user"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },   
});

export const User = mongoose.model("User", schema);
