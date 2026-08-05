require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database Name:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
   console.log("❌ Database Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 CodeAlpha URL Shortener Server is Running");
});

// Routes
app.use("/", urlRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});