const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration: Allow all origins
app.use(cors({
  origin: '*',  // Allow all origins, you can specify domains like 'http://localhost:4200'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true  // If needed to send credentials (cookies)
}));

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes and error handler
const metricsRouter = require("./routes/metricsRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Use routes
app.use("/api/metrics", metricsRouter);

// Global error handler middleware
app.use(errorHandler);

// Catch-all route for unknown requests
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
