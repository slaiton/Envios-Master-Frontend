const environments = {
    development: {
      API_URL: "http://localhost:3000/",
    },
    production: {
      API_URL: "https://api.example.com",
    },
  };
  
  const ENV = process.env.NODE_ENV || "development";
  
  export const Config = environments[ENV as keyof typeof environments];