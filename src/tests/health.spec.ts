import { Express } from 'express';
require("dotenv").config({ path: `${__dirname}/../config/.env` });

import request from "supertest";
import init from "../app";

let app: Express;

beforeAll(async () => {
  app = await init();
});

describe("GET /health", () => {
  it("Should output status of 200", async () => {
    const res = await request(app).get("/health").expect(200);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
  });
});
