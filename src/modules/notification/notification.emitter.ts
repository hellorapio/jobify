import EventEmitter from "events";
import INotification from "./notification.interface";

class NotificationEmitter extends EventEmitter {
  private constructor() {
    super();
  }
  private static instance: NotificationEmitter;
  static getInstance() {
    if (!this.instance) this.instance = new NotificationEmitter();
    return this.instance;
  }
  async sendNotification(id: any, data: INotification) {
    this.emit("notification", id.toString(), data);
  }
}

export default NotificationEmitter.getInstance();
