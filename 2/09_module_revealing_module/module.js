// privateFoo, privateBarはアクセスできない
// publicFoo, publicBarはアクセスできる
const module = (() => {
  const privateFoo = () => {
    //
  };
  const privateBar = [];
  const exported = {
    publicFoo: () => {
      //
    },
    publicBar: () => {
      //
    },
  };
  return exported;
})();
console.log(module);
