import bcrypt from 'bcrypt';
import { User } from '../models';

export const listUsers = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const total = await User.count();

    const query = User.find();

    if (parseInt(offset, 10)) {
      query.skip(parseInt(offset, 10));
    }

    if (parseInt(limit, 10)) {
      query.limit(parseInt(limit, 10));
    }

    const users = await query;
    const items = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      skills: user.skills,
      city: user.city,
    }));

    res.json({ total, items });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email });

  user.passwordHash = await bcrypt.hash(password, 10);

  try {
    await user.save();

    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
