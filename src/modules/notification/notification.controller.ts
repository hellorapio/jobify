import { Request, Response } from "express";
import notificationService from "./notification.service";
import notificationEmitter from "./notification.emitter";
// import redis from "../../core/redis";

class NotificationController {
  private constructor(private service: typeof notificationService) {
    this.getUserNotifications = this.getUserNotifications.bind(this);
  }
  private static instance: NotificationController;
  static getInstance() {
    if (!this.instance)
      this.instance = new NotificationController(notificationService);
    return this.instance;
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

    notificationEmitter.on("notification", (userId, data) => {
      if (id !== userId) return;
      res.write(`event: notification\n`);
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      res.flush();
    });

    req.on("close", () => {
      console.log(`Connection closed`);
      res.end();
    });
  }
}

export default NotificationController.getInstance();
