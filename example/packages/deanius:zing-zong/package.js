Package.describe({
  name: "deanius:zing-zong",
  summary: "Play pong",
  version: "0.1.0",
  git: "https://github.com/chicagogrooves/meteor-zing-zong"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "ddp", "jquery"]);
  
  api.addFiles("shared/index.js", ["client", "server"]);

  api.export("zing");
});



  
    
    
    Package.onTest(function (api) {
  api.use(["mike:mocha-package", "practicalmeteor:chai"]);
  api.use("deanius:zing-zong");
  
  api.addFiles("tests/shared/index.js", ["client", "server"]);

});    
  
  