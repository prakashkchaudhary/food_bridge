const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

async function seedAdmin() {
  const name = process.env.ADMIN_NAME || "System Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in server/.env");
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    existing.name = name;
    existing.role = "admin";
    existing.password = password;
    await existing.save();
    console.log(`Admin user updated: ${email}`);
  } else {
    await User.create({
      name,
      email,
      password,
      role: "admin",
    });
    console.log(`Admin user created: ${email}`);
  }

  process.exit(0);
}

seedAdmin().catch((error) => {
  console.error("Failed to seed admin:", error.message);
  process.exit(1);
});
