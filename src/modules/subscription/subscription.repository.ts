import BaseRepository from "../../bases/base.repository";
import ISub from "./model/subscription.interface";
import Sub from "./model/subscription.model";

class SubRepository extends BaseRepository<ISub> {
  constructor() {
    super(Sub);
  }
}

export default SubRepository.getInstance<SubRepository>();
