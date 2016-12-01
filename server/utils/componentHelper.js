const filePath = require('./filePaths');

const BLOCK_COMPONENT = 'Block';
const MENU_COMPONENT = 'Menu';
const TEXT_COMPONENT = 'Text';
const IMAGE_COMPONENT = 'Image';
const LIST_COMPONENT = 'List';
const RADIO_COMPONENT = 'Radio';
const DROPDOWN_COMPONENT = 'DropDown';
const CAROUSEL_COMPONENT = 'Carousels';

const inlineComponent = (type) => {
  if (type === TEXT_COMPONENT ||
      type === LIST_COMPONENT ||
      type === DROPDOWN_COMPONENT) {
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
    case RADIO_COMPONENT:
      componentPath = filePath.RADIO_TEMPLATE_PATH;
      break;
    case IMAGE_COMPONENT:
      componentPath = filePath.IMAGE_TEMPLATE_PATH;
      break;
    case CAROUSEL_COMPONENT:
      componentPath = filePath.CAROUSEL_TEMPLATE_PATH;
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
  RADIO_COMPONENT,
  DROPDOWN_COMPONENT,
  getComponent,
  inlineComponent,
};
