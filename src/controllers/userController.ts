import { Request, Response, NextFunction } from "express";
import { users, User } from "../models/user";
import { randomUUID } from "node:crypto";

// Create an user
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newUser: User = { id: randomUUID(), name };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Read all users
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Read single user
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = users.find((i) => i.id === id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update an user
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const userIndex = users.findIndex((i) => i.id === id);
    if (userIndex === -1) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    users[userIndex].name = name;
    res.json(users[userIndex]);
  } catch (error) {
    next(error);
  }
};

// Delete an user
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userIndex = users.findIndex((i) => i.id === id);
    if (userIndex === -1) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};
