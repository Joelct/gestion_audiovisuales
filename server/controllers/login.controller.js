import { UserRepository } from '../models/user-repository.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login({ username, password });
    res.send({ user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
