const filePath = require('./filePaths');

const BLOCK_COMPONENT = 'Block';
const MENU_COMPONENT = 'Menu';
const TEXT_COMPONENT = 'Text';
const IMAGE_COMPONENT = 'Image';
const LIST_COMPONENT = 'List';

const inlineComponent = (type) => {
  if (type === TEXT_COMPONENT ||
      type === LIST_COMPONENT) {
    return true;
  } else {
    return false;
  }
};


const getComponent = (tree) => {
  const type = tree.componentType;
  let componentPath = '';

  switch(type) {
    case BLOCK_COMPONENT:
      componentPath = filePath.BLOCK_TEMPLATE_PATH;
      break;
    case MENU_COMPONENT:
      componentPath = filePath.BLOCK_TEMPLATE_PATH;
      break;
    case IMAGE_COMPONENT:
      componentPath = filePath.IMAGE_TEMPLATE_PATH;
      break;
    default:
      break;
  }

  return componentPath;
};

module.exports = {
  BLOCK_COMPONENT,
  MENU_COMPONENT,
  TEXT_COMPONENT,
  IMAGE_COMPONENT,
  LIST_COMPONENT,
  getComponent,
  inlineComponent,
};
