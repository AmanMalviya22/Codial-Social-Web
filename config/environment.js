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
};

module.exports = development;
