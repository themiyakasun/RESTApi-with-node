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
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated`);
};
