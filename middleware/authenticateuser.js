const jwt = require('jsonwebtoken');

// Force deployment rebuild - authentication middleware
function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ 
      message: 'Unauthorized', 
      error: 'No token provided' 
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      message: 'Unauthorized', 
      error: 'Malformed token' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    const errorMessage = err.name === 'TokenExpiredError' 
      ? 'Token expired' 
      : 'Invalid token';
    res.status(401).json({ 
      message: 'Unauthorized', 
      error: errorMessage 
    });
  }
}

module.exports = authenticateUser;