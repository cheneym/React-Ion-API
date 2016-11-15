const filePath = require('./filePaths');

const BLOCK_COMPONENT = 'Block';
const MENU_COMPONENT = 'Menu';
const TEXT_COMPONENT = 'Text';

module.exports.getComponent = (tree) => {
  const type = tree.componentType;
  let componentPath = '';

  switch(type) {
    case BLOCK_COMPONENT:
      componentPath = filePath.BLOCK_TEMPLATE_PATH;
      break;
    case MENU_COMPONENT:
      componentPath = filePath.BLOCK_TEMPLATE_PATH;
      break;
    default:
      break;
  }

  return componentPath;
};

module.exports.BLOCK_COMPONENT = BLOCK_COMPONENT;
module.exports.MENU_COMPONENT = MENU_COMPONENT;
module.exports.TEXT_COMPONENT = TEXT_COMPONENT;
