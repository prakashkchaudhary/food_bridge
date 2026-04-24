const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const requestRoutes = require("./routes/requestRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load .env only in development (Render injects env vars directly in production)
dotenv.config();

const app = express();

// Use 'combined' log format in production for structured logs, 'dev' locally
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors());
app.use(express.json());

// Root health check — required by Render and load balancers
app.get("/", (req, res) => {
  res.json({ success: true, message: "FoodBridge API is running" });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "FoodBridge API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

// Render sets PORT automatically — always use process.env.PORT
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    // Bind to 0.0.0.0 so Render can detect the open port
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
