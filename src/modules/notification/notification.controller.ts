import { Request, Response } from "express";
import notificationService from "./notification.service";
import notificationEmitter from "./notification.emitter";
import sendResponse from "../../utils/sendResponse";
// import redis from "../../core/redis";

class NotificationController {
  private constructor(private service: typeof notificationService) {
    this.getUserNotifications = this.getUserNotifications.bind(this);
    this.readNotifications = this.readNotifications.bind(this);
  }
  private static instance: NotificationController;
  static getInstance() {
    if (!this.instance)
      this.instance = new NotificationController(notificationService);
    return this.instance;
  }

  async readNotifications(req: Request, res: Response) {
    const { _id } = req.user;
    await this.service.readNotifications(_id);
    sendResponse(res, 200, "Notifications read successfully");
  }

  async getUserNotifications(req: Request, res: Response) {
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };

    res.writeHead(200, headers);
    const { id } = req.user;
    const notifications = JSON.stringify(
      await this.service.getUserNotifications(id)
    );

    res.write(`event: notifications\n`);
    res.write(`data: ${notifications}\n\n`);
    res.flush();

    const resInterval = setInterval(() => {
      res.write("event: heartbeat\n");
      res.write("data: heartbeat\n\n");
      res.flush();
    }, 30000);

    notificationEmitter.addRes(id, res);

    req.on("close", () => {
      notificationEmitter.removeRes(id);
      clearInterval(resInterval);
      res.end();
    });
  }
}

export default NotificationController.getInstance();
