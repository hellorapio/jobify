import { IWorker } from "./model/worker.interface";
import NotFound from "../../errors/notFound";
import repository from "./worker.repository";
import BaseService from "../../bases/base.service";

class WorkerService extends BaseService<IWorker, typeof repository> {
  constructor() {
    super(repository);
  }

  override async get(username: string) {
    const worker = await this.repo.findOne({ username });
    if (!worker) throw new NotFound("There is no user found");
    return worker;
  }

  override async update(id: any, body: IWorker) {
    const worker = await this.repo.updateOne({ user: id }, body);
    if (!worker) throw new NotFound("There is no user Found");
    return worker;
  }

  async me(id: any) {
    return await this.repo.findOne({ user: id });
  }
}

export default WorkerService.getInstance();
