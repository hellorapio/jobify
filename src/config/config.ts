const config = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  mongo: process.env.MONGO || "",
  redis: process.env.REDIS || "",
  host: process.env.CLIENT_HOST || "",
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
  apis: {
    address: process.env.ADDRESS_API || "",
    stripe: process.env.STRIPE_SECRET || "",
    webhook: process.env.STRIPE_WEBHOOK || "",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
  },
};

export default config;
