import INotification from "./notification.interface";
import { Response } from "express";

class NotificationEmitter {
  private constructor() {}
  private static instance: NotificationEmitter;
  private responses = new Map<string, Response>();
  static getInstance() {
    if (!this.instance) this.instance = new NotificationEmitter();
    return this.instance;
  }

  async sendNotification(id: any, data: INotification) {
    const res = this.responses.get(id.toString());
    if (!res) return;
    res.write(`event: notification\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.flush();
  }

  async addRes(userId: string, response: Response) {
    this.responses.set(userId, response);
  }

  async removeRes(userId: string) {
    this.responses.delete(userId);
  }
}

export default NotificationEmitter.getInstance();
