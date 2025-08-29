const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json');

class UserStore {
  constructor() {
    this.users = new Map();
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      const users = JSON.parse(data);
      this.users = new Map(users);
    } catch (error) {
      // File doesn't exist yet, start with empty storage
      this.users = new Map();
    }
  }

  async saveUsers() {
    try {
      await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
      await fs.writeFile(USERS_FILE, JSON.stringify([...this.users]), 'utf8');
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }

  async createUser(userData) {
    const { username, email, password, firstName, lastName } = userData;
    
    // Check if user already exists
    for (const [id, user] of this.users) {
      if (user.email === email || user.username === username) {
        throw new Error('User already exists with this email or username');
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const user = {
      _id: userId,
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    this.users.set(userId, user);
    await this.saveUsers();

    return user;
  }

  async findUserByEmail(email) {
    for (const [id, user] of this.users) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async updateUserLogin(userId) {
    const user = this.users.get(userId);
    if (user) {
      user.lastLogin = new Date().toISOString();
      this.users.set(userId, user);
      await this.saveUsers();
    }
  }

  async findUserById(userId) {
    return this.users.get(userId) || null;
  }
}

module.exports = new UserStore();