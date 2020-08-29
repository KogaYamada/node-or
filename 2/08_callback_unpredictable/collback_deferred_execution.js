const fs = require('fs');
const cache = {};

// inconsistentReadを完全な非同期関数として実装 p21
function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename]));
  } else {
    // 非同期の関数
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}
function createFileReader(filename) {
  const listeners = [];
  consistentReadAsync(filename, (value) => {
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

// First call data: node is cool!!!
// Second call data: node is cool!!!
