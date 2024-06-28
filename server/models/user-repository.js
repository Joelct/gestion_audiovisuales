import { pool } from '../../database/db.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { SALT_ROUNDS } from '../config.js';

export class UserRepository {
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const connection = await pool.getConnection();
    try {
      // Verificar si el usuario ya existe
      const [rows] = await connection.execute('SELECT * FROM login WHERE username = ?', [username]);
      if (rows.length > 0) throw new Error('username already exists');

      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      await connection.execute('INSERT INTO login (id, username, password) VALUES (?, ?, ?)', [id, username, hashedPassword]);
      return id;
    } finally {
      connection.release();
    }
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute('SELECT * FROM login WHERE username = ?', [username]);
      if (rows.length === 0) throw new Error('username does not exist');

      const user = rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('password is invalid');

      const { password: _, ...publicUser } = user;
      return publicUser;
    } finally {
      connection.release();
    }
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('username must be a string');
    if (username.length < 3) throw new Error('username must be at least 3 characters long');
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('password must be a string');
    if (password.length < 6) throw new Error('password must be at least 6 characters long');
  }
}
