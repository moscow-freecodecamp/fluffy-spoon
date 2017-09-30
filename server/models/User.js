import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  passwordHash: String,
  interests: [String],
  location: String,
});

export default mongoose.model('User', UserSchema);
