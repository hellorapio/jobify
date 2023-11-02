import BaseRepository from "../../bases/base.repository";
import INotification from "./notification.interface";
import Notification from "./notification.model";

class NotificationRepository extends BaseRepository<INotification> {
  constructor() {
    super(Notification);
  }
}

export default NotificationRepository.getInstance<NotificationRepository>();
