const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("name, email and password are required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Invalid email format");
    }

    // Strong password validation
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters long");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/;
    if (!passwordRegex.test(password)) {
      res.status(400);
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)"
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409);
      throw new Error("Email already in use");
    }

    // Public registration cannot self-assign admin privileges.
    const safeRole = role === "ngo" ? "ngo" : "donor";

    const user = await User.create({
      name,
      email,
      password,
      role: safeRole,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token: generateToken(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
