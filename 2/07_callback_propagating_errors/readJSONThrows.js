const fs = require('fs');
function readJSONThrows(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      return callback(err); // ファイル読み込みエラーを通知して関数を抜ける
    }
    callback(null, JSON.parse(data)); // エラーなし。処理結果(JSONデータ)を通知
  });
}

// 実行 => エラーはキャッチされない
readJSONThrows('nonjson.txt', (err) => {
  if (err) {
    console.log(err);
  } else {
    JSON.stringify(json);
  }
});

// 実行 => これでもエラーはキャッチされない
try {
  readJSONThrows('nonjson.txt', (err) => {
    console.log(err);
  });
} catch (err) {
  console.log(' こうしてもキャッチはできない ');
}

// uncaughtExceptionイベントの処理例
readJSONThrows('nonjson.txt', (err) => {
  console.log(err);
});
process.on('uncaughtException', (err) => {
  console.error('これでエラーをキャッチできる:' + err.message);
  process.exit(1); // エラーコード1で終了。これがないと実行を継続する
});
