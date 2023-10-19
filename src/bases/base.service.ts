import NotFound from "../errors/notFound";
import BaseRepository from "./base.repository";

class BaseService<T, S extends BaseRepository<T> = BaseRepository<T>> {
  constructor(protected repo: S) {}

  //@ts-ignore
  protected static instance: this;

  public static getInstance() {
    if (!this.instance)
      //@ts-ignore
      this.instance = new this();
    return this.instance;
  }

  async create(body: Partial<T>){
    return await this.repo.insertOne(body);
  }

  async getAll(): Promise<T[]> {
    return await this.repo.find({});
  }

  async get(id: string): Promise<T> {
    const data = await this.repo.findById(id);
    if (!data) throw new NotFound("Not Found");
    return data;
  }
  async update(id: string, body: Partial<T>): Promise<T> {
    const data = await this.repo.updateOneById(id, body);
    if (!data) throw new NotFound("Not Found");
    return data;
  }
  async delete(id: string) {
    const data = await this.repo.deleteOneById(id);
    if (!data) throw new NotFound("Not Found");
  }
}

export default BaseService;
