Package.describe({
  name: "m:n",
  summary: "does magic",
  version: "0.1.0",
  git: "https://github.com/g/meteor-n"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["tracker", "meteor", "ddp", "ejson"]);

  api.addFiles("server/index.js", ["client"]);

  api.export("foo");
});






    Package.onTest(function (api) {
  api.use(["mike:mocha-package", "practicalmeteor:chai"]);
  api.use("m:n");

  api.addFiles("tests/index.js", ["server"]);

});
