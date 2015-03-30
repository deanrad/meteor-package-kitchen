Package.describe({
 name: "deanius:new-package",
 summary: "Description of package amazingness.",
 version: "0.1.0",
 git: "https://github.com/chicagogrooves/meteor-new-package"
});

Package.onUse(function(api) {
 api.versionsFrom("1.0.2");
 api.use(["tracker", "meteor", "ddp", "ejson"]);

 api.addFiles("lib/index.js", ["client", "server"]);

 api.export("log", ["client", "server"]);
});


Package.onTest(function (api) {
 api.use("tinytest");
 api.use("deanius:new-package");

api.addFiles("tests/index.js", ["server"]);

});
