import validCatch from "../../utils/validCatch";
import jobJoi from "./job.joi";

class JobValidator {
  static async jobId(id: object) {
    return await validCatch(jobJoi.jobId, id);
  }

  static async createJob(body: object) {
    return await validCatch(jobJoi.createJob, body);
  }

  static async updateJob(body: object) {
    return await validCatch(jobJoi.updateJob, body);
  }
}

export default JobValidator;
