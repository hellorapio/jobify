import BaseService from "../../bases/base.service";
import INotification from "./notification.interface";
import notificationRepository from "./notification.repository";

class NotificationService extends BaseService<INotification> {
  constructor() {
    super(notificationRepository);
  }

  async getUserNotifications(id: string) {
    return await this.repo.find({ user: id });
  }
}

export default NotificationService.getInstance<NotificationService>();
