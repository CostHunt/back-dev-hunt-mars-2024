// controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const secretKey = 'yourSecretKey'; // Change this to a secure secret key

async function register(req, res) {
  const { username, password, email, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user with the hashed password
    const user = await prisma.account.create({
      data: {
        username,
        password: hashedPassword,
        email,
        image,
      },
    });
    // Fetch the complete user data (excluding password)
   
    const completeUserData = await prisma.account.findUnique({
      where: { username },
      select: {
        id:true,
        username: true,
        email: true,
        image: true,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ message: 'User registered successfully', user: completeUserData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
}


async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await prisma.account.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
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
    const newAccessToken = jwt.sign({ id: decoded.id }, secretKey, { expiresIn: '1h' });

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
      where: { username: decoded.id },
    });

    if (!user) {
      return res.status(403).json({ message: 'Not authorized, Account not found' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Not authorized, Invalid token' });
  }
}
module.exports = { register, login, refreshTokens, verifyToken };
