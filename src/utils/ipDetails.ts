const ipDetails = async (ip: string) => {
  const data = await fetch(`https://ipapi.co/${ip}/json/`);
  return await data.json();
};

export default ipDetails;
