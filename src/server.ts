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

// TODO: Refactor to use QueryBuilder
// TODO: resume implementation
// TODO: Use redis with sse
// TODO: Add tests
// TODO: Add CI/CD
// TODO: Add Location search by Coordinates also on /jobs
