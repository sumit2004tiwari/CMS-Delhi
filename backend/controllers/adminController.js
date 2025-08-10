import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const  authAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
};
// @desc    Register admin (default values or from body)
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  const { username = 'admin@yopmail.com', password = 'admin@123' } = req.body;

  // Check if admin already exists
  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  // Create new admin
  const admin = await Admin.create({ username, password });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
};


export { authAdmin , registerAdmin };
