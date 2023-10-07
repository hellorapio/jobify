import validCatch from "../../utils/validCatch";
import jobJoi from "./job.joi";

class JobValidator {
  static async jobId(id: object) {
    const data = await validCatch(jobJoi.jobId, id);
    return data;
  }

  static async createJob(body: object) {
    const data = await validCatch(jobJoi.createJob, body);
    return data;
  }
  static async updateJob(body: object) {
    const data = await validCatch(jobJoi.updateJob, body);
    return data;
  }
}

export default JobValidator;
