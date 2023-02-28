import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: String,
  number: String,
  gender: String,
  photo: String,
});
