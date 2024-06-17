import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DB_URL);

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
});
