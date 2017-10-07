import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  skills: [{ type: String, trim: true }],
  city: { type: String, trim: true, default: null },
});

export default mongoose.model('User', UserSchema);
