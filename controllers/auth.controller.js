// controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const secretKey = '$cost-hunt03-24';
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const {
      username,
      email,
      nom,
      prenoms,
      password,
      image_profile,
      matricule,
      id_quartier,
    } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new account using Prisma
    const newAccount = await prisma.account.create({
      data: {
        username,
        email,
        nom,
        prenoms,
        matricule,
        password: hashedPassword,
        image_profile,
        id_quartier,
      },
    });

    // Remove the password field from the response for security reasons
    const { password: _, ...accountWithoutPassword } = newAccount;
    const token = jwt.sign({ accountId: newAccount.id }, secretKey, { expiresIn: '1h' });
    res.json({ token, account: accountWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const account = await prisma.account.findUnique({
      where: { username },
    });

    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, account.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ accountId: account.id }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, account });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
}

async function refreshTokens(req, res) {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const newAccessToken = jwt.sign({ accountId: decoded.accountId }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Token refreshed successfully', token: newAccessToken });
  });
}

async function verifyToken(req, res, next) {
  const token = req.header('X-access-token');

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await prisma.account.findUnique({
      where: { id: decoded.accountId },
    });

    if (!user) {
      return res.status(403).json({ message: 'Not authorized, Account not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Not authorized, Token has expired' });
    }
    return res.status(403).json({ message: 'Not authorized, Invalid token' });
  }
}

module.exports = { register, login, refreshTokens, verifyToken };
