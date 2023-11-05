require("dotenv").config({ path: `${__dirname}/config/.env` });
import config from "./config/config";
import app from "./app";

process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const server = app.listen(config.port, () => {
  console.log(`I'm listening on ${config.port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Event");
  server.close(() => {
    console.log("SIGTERM");
  });
});

// Some Security Features related to auth and verification

// Login Attempts
// Using Refresh Tokens
// Prevent CSRF
// See if there is any features i can add later and making some brain storming

// Require password on high value action such as Changing emails -- TESTING

// Email Verification on signup with Welcome Message -- DONE

// Adding real delete on jobs not just deactivation
// Implementing Notifications -- PROGRESS
// Implementing Payments -- PROGRESS
// Adding aggregation Framework to My Applicants
// Missing with some Geo operators on the jobs Geo Query
// Calculating distances on every job from the user's location

// Adding lng and lat to every collection that has address key through Mongoose Hooks -- TESTING
// using livesin with the job search -- TESTING -- NOT WORKING RIGHT NOW PROBLEM IN MONGOOSE MIDDLEWARES

// Making reciepts and sending them to emails (PDFs) about subscriptions -- THEY SAY STRIPE HANDLES BUT I WILL HAVE MY TURN

// Adding Stripe -- DONE
// Adding API Features on all Find() Queries -- DONE
// Making function that gets lng and lat from the locationIQ API -- DONE
// Added Image Validation and Image upload for users to cloudinary -- DONE
// Trying to use JWT with Email-Verification // tried ** The user can verify his email multiple times which is Not good **
