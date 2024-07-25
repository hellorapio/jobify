import { EventEmitter } from "events";
import INotification from "./notification.interface";
import { Response } from "express";
import redis from "../../core/redis";
import RedisClientType from "ioredis";

class NotificationEmitter extends EventEmitter {
  private constructor() {
    super();
  }
  private static instance: NotificationEmitter;
  private responses = new Map<string, Response>();
  private subscriber: RedisClientType;

  static getInstance() {
    if (!this.instance) this.instance = new NotificationEmitter();
    return this.instance;
  }

  async init() {
    this.subscriber = redis.duplicate();
    this.subscriber.subscribe("notifications");
    this.subscriber.on("message", (_, message) => {
      this.handleNotification(message);
    });
  }

  async publishNotification(notification: INotification) {
    await redis.publish("notifications", JSON.stringify(notification));
  }

  async sendNotification(data: INotification) {
    const res = await this.getRes(data.id);
    if (!res) return;
    res.write(`event: notification\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.flush();
  }

  async addRes(userId: string, response: Response) {
    this.responses.set(userId, response);
  }

  async getRes(id: string): Promise<Response | undefined> {
    return this.responses.get(id);
  }

  async removeRes(userId: string) {
    this.responses.delete(userId);
  }

  private handleNotification(message: string) {
    const notification: INotification = JSON.parse(message);
    this.sendNotification(notification);
  }
}

export default NotificationEmitter.getInstance();

NotificationEmitter.getInstance().init();
