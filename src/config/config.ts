const config = {
  env: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  DB: process.env.DATABASE || "",
  DBPassword: process.env.DATABASE_PASSWORD || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtRefresh: process.env.JWT_REFRESH_TOKEN || "",
  jwtExpLimit: process.env.JWT_EXPIRES_IN || "1h",
  jwtExpCookie: process.env.JWT_EXPIRES_COOKIE_IN || "12",
  emailHost: process.env.EMAIL_HOST || "",
  emailPort: process.env.EMAIL_PORT || "",
  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || "",
}

export default config