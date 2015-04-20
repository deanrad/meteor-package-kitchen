Package.describe({
  name: "deanius:foo",
  summary: "Play pong",
  version: "0.1.0",
  git: "https://github.com/chicagogrooves/meteor-foo"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "ddp", "jquery"]);
  
  api.addFiles("shared/index.js", ["client", "server"]);

  api.export("log");
});



  
    
    
    Package.onTest(function (api) {
  api.use("tinytest");
  api.use("deanius:foo");
  
  api.addFiles("tests/shared/index.js", ["client", "server"]);

});    
  
  