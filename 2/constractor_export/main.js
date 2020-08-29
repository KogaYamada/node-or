const Logger = require('./logger');
const dbLogger = new Logger('DB');
dbLogger.info(' 一般情報提供用のメッセージ ');
const accessLogger = new Logger('ACCESS');
accessLogger.verbose(' 詳細情報提供用のメッセージ ');
