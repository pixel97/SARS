const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");

// middleware to keep server keep runnning
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");

const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");
const { handleError, convertToApiError } = require("./middleware/apiError");

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

/// body parse
app.use(express.json());

/// sanitize
app.use(xss());

///passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

///routes
app.use("/api", routes);

// to make sure data coming is not harmful for server
app.use(mongoSanitize());

app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
