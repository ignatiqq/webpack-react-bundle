const env = process.env.NODE_ENV;
const envConfig = require(`./webpack/webpack.${env}.js`);

module.exports = envConfig;