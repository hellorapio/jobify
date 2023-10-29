import config from "../config/config";
import InternalError from "../errors/internalError";
import NotFound from "../errors/notFound";

const addressDetails = async (address: string) => {
  const data = await fetch(
    `https://us1.locationiq.com/v1/search?q=${address}&format=json&limit=1&key=${config.apis.address}`
  );
  if (data.status === 404)
    throw new NotFound("There is No Location with Given inputs");
  if (!data.ok) throw new InternalError("Something Went Wrong");
  return await data.json();
};

export default addressDetails;
