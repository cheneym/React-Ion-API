
const ENV = 'development';

module.exports.consoleLog = (msg) => {
  if (ENV !== 'production') {
    console.log(msg);
  }
};
