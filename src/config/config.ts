const config = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  database: process.env.DATABASE || "",
  jwt: {
    secret: process.env.JWT_SECRET || "",
    refresh: process.env.JWT_REFRESH_TOKEN || "",
    expires: "1d",
    cookie: 1,
  },
  email: {
    host: process.env.EMAIL_HOST || "",
    port: process.env.EMAIL_PORT || "",
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
};

export default config;
