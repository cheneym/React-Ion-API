const path = require('path');

// TEMPLATE PATHS
module.exports.WEBPACK_TEMPLATAE_PATH = path.join(__dirname, '../templates/webpackConfigTemplate.ejs');
module.exports.CSS_TEMPLATE_PATH = path.join(__dirname, '../templates/cssTemplate.ejs');
module.exports.SERVER_TEMPLATE_PATH = path.join(__dirname, '../templates/serverTemplate.ejs');
module.exports.ROUTER_TEMPLATE_PATH = path.join(__dirname, '../templates/components/reactRouteTemplate.ejs');
module.exports.PAGE_TEMPLATE_PATH = path.join(__dirname, '../templates/pageTemplate.ejs');

module.exports.HTML_TEMPLATE_PATH = path.join(__dirname, '../templates/htmlTemplate.ejs');
module.exports.STRUCTURE_TEMPLATE_PATH = path.join(__dirname, '../../server/structure');

// COMPONENT TEMPLATES
module.exports.BLOCK_TEMPLATE_PATH = path.join(__dirname, '../templates/components/blockComponent.ejs');
module.exports.IMAGE_TEMPLATE_PATH = path.join(__dirname, '../templates/components/imageComponent.ejs');

// USER PATHS
module.exports.getWebpackPath = userId => path.join(__dirname, `../../user/${userId}`);
module.exports.getCssPath = userId => path.join(__dirname, `../../user/${userId}/src/css`);
module.exports.getServerPath = userId => path.join(__dirname, `../../user/${userId}/server`);
module.exports.getRouterPath = userId => path.join(__dirname, `../../user/${userId}/src/js`);
module.exports.getHtmlPath = userId => path.join(__dirname, `../../user/${userId}/src`);
module.exports.getPagePath = userId => path.join(__dirname, `../../user/${userId}`);
module.exports.getUserPath = userId => path.join(__dirname, `../../user/${userId}`);
module.exports.getMainJsPath = userId => path.join(__dirname, `../../user/${userId}/src/js`);
module.exports.getComponentPath = userId => path.join(__dirname, `../../user/${userId}/src/components`);

