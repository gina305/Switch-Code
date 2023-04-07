import devConfig from "./config.development.js";
import prodConfig from "./config.production.js";

const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const config = isDevelopment ? devConfig : prodConfig;

export default config;
