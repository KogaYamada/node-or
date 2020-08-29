const fs = require('fs');
function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      return callback(err); // ファイル読み込みエラーを通知して関数を抜ける
    }
    try {
      parsed = JSON.parse(data); // ファイルの中身を解析する
    } catch (err) {
      return callback(err); // 解析エラーを通知して関数を抜ける
    }
    callback(null, parsed); // エラーなし。処理結果(JSONデータ)を通知
  });
}
