import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  passwordHash: String,
  skills: [{ type: String, trim: true }],
  city: { type: String, trim: true, default: null },
  about: { type: String, trim: true, default: null },
});

export default mongoose.model('User', UserSchema);
