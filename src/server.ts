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
// See if there is any features i can add later and making some brain storming

// Added Image Validation and Image upload for users to cloudinary --DONE
// Adding real delete on jobs not just deactivation
// Adding API Features on all Find() Queries -- PROGRESS
// Implementing Notifications -- PROGRESS
// Implementing Payments --PROGRESS
// Making reciepts and sending them to emails about subscriptions
// Adding aggregation Framework to My Applicants
// Missing with some Geo operators on the jobs Geo Query
// Making function that gets lng and lat from the locationIQ API -- DONE
// Adding lng and lat to every collection that has address key
// Calculating distances on every job from the user's location
