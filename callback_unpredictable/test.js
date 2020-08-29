const fs = require('fs'); // Node.jsのFile System Moduleの読み込み
const cache = {};
// filenameから読み込んだデータをcallbackを呼び出して処理
function inconsistentRead(filename, callback) {
  //「一貫性のない読み込み」
  if (cache[filename]) {
    // 同期的に実行される。cacheにデータがある時
    callback(cache[filename]);
  } else {
    // 非同期の関数fs.readFile()を呼び出す
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });
  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader1 = createFileReader('data.txt');

reader1.onDataReady((data) => {
  console.log('First call data: ' + data);
  // ... しばらくして同じファイルを再度読み込む
  const reader2 = createFileReader('data.txt');
  reader2.onDataReady((data) => {
    console.log('Second call data: ' + data);
  });
});
// ２回目の呼び出しが行われない p19
