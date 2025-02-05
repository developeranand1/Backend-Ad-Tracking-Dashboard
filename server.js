const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const metricsRouter = require("./routes/metricsRoutes");

// Import error handler middleware
const errorHandler = require("./middlewares/errorHandler");

// Global CORS Configuration - Allow all domains (you can update origin if needed)
app.use(cors({
  origin: '*',  // This will allow requests from any domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers for request
  credentials: true,  // If you want to allow credentials (cookies, authorization headers)
}));

// Body parser middleware
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded bodies

// Use routes
app.use("/api/metrics", metricsRouter);

// Global error handler middleware
app.use(errorHandler);

// Catch-all route for unknown requests
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
