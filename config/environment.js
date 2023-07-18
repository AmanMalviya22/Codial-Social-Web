const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "somethingBlah",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // 'post' should be 'port'
    secure: false,
    auth: {
      user: "amanaman26802@gmail.com",
      pass: "huwfumwnqvlrblbt",
    },
  },
  google_client_id: "246769253050-la1k7eorjl8ug2n8n43dnnjvstdhq7ca.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret:'codial',
};

const production = {
  name: "production",
  asset_path:process.env.CODIAL_ASSET_PATH,
  session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
  db:process.env.CODIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587, // 'post' should be 'port'
    secure: false,
    auth: {
      user: process.env.CODIAL_USER_NAME,
      pass:process.env.CODIAL_USER_PASSWORD,
    },
  },
  google_client_id:process.env.CODIAL_GOOGLE_CLIENT_ID,
  google_client_secret:process.env.CODIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url:process.env.CODIAL_GOOGLE_CALLBACK_URL,
  jwt_secret:process.env.CODIAL_JWT_SECRET,
};

// module.exports = development;

module.exports=eval(process.env.CODIAL_ENVIRONMENT)==undefined?development:eval(process.env.CODIAL_ENVIRONMENT);

