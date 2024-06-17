import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/userModel.js';

let users = [];

export const getUsers = (req, res) => {
  UserModel.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
};

export const createUser = (req, res) => {
  const user = req.body;
  const userId = uuidv4();

  const userWithId = { ...user, id: userId };

  const data = new UserModel(userWithId);
  const val = data.save();
  res.status(201).json(val);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  UserModel.findByIdAndDelete(id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  UserModel.findById(id)
    .then((user) => {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (age) user.age = age;

      user.save();
      res.json('User updated!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};
