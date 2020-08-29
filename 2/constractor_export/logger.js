function Logger(name) {
  this.name = name;
}
Logger.prototype.log = function (message) {
  console.log(`[${this.name}] ${message}`);
};
Logger.prototype.info = function (message) {
  this.log(`概要: ${message}`);
};
Logger.prototype.verbose = function (message) {
  this.log(`詳細: ${message}`);
};
module.exports = Logger;
