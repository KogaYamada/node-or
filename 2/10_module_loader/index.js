function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require) {
  ${fs.readFileSync(filename, 'utf8')}
})(module, module.exports, require);`;
  eval(wrappedSrc);
}

const requireMine = (moduleName) => {
  console.log(`RequireMine invoked for module: ${moduleName}`);
  const id = requireMine.resolve(moduleName); //--- 1
  if (requireMine.cache[id]) {
    //--- 2
    return requireMine.cache[id].exports;
  }
  // モジュールのメタデータ(モジュールに保持するデータ)
  const module = {
    //--- 3
    exports: {},
    id: id,
  };
  // キャッシュの更新
  requireMine.cache[id] = module; //--- 4
  // モジュールをロード
  loadModule(id, module, requireMine); //--- 5
  // 公開する変数をリターン
  return module.exports; //--- 6
};
requireMine.cache = {};
requireMine.resolve = (moduleName) => {
  // モジュール名を完全な識別子(ここではファイルパス)に変換する
};

/*
 -- 1 --
 モジュール名(moduleName)が引数に指定されているので、
 ファイルシステム内でモジュールのファイルの場所を特定しフルパスに変換する
 (この処理は後述の requireMine.resolve()で 実装される)。結果を定数 idに記憶する

 -- 2 --
 過去にロードされていたものの場合はキャッシュに入っているはずなので、キャッシュを戻す

 -- 3 --
 キャッシュに見つからなかった場合はファイルからロードすることになる。
 空のオブジェクトをもつ exports というプロパティを含む module オブジェクトを生成する。
 exports は外部に公開する API を保持するオブジェクトということになる

 -- 4 --
 オブジェクトmoduleをキャッシュする

 -- 5 --
 loadModule()を、moduleオブジェクトとrequireMine()自身への参照を引数として呼び出
 し、既に見たようにモジュールのソースをファイルから読み込み、eval()を実行する。ここで、
 オブジェクト module.exportsに公開 API をエクスポートする

 -- 6 --
 最後にmodule.exportsが呼び出し元に返される。module.exportsは、
 そのモジュールの公開APIを含んでいる
 */
