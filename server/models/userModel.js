import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserSchema } from '../schemas/userSchema.js';

dotenv.config();

mongoose.connect(process.env.DB_URL);
export const UserModel = mongoose.model('User', UserSchema);
