### Libraries:

* Axios
* dotenv
*npm install webpack dotenv
npm install dotenv-webpack --save-dev
rm -rf node_modules && npm install

When working with front-end projects and needing to switch between different configurations for development and production environments, you can use separate configuration files and determine the current environment by checking the hostname.

Create separate configuration files for development and production:

config.development.js
config.production.js
In each configuration file, export an object containing the relevant key-value pairs for that environment.

Create a config.js file that imports both configurations and determines the environment based on the hostname:

javascript
Copy code
import devConfig from "./config.development.js";
import prodConfig from "./config.production.js";

const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const config = isDevelopment ? devConfig : prodConfig;

export default config;
Import the configuration object in your application, and use the appropriate keys and values based on the current environment.
Please note that this approach includes the configuration values directly in the bundled code. For sensitive data, consider using a backend to securely store and serve the information.