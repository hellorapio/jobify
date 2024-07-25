import Redis from "ioredis";
import config from "../config/config";

const redis = new Redis(config.redis, { maxRetriesPerRequest: null });

redis.connect(() => console.log("Redis is up"));

export default redis;
