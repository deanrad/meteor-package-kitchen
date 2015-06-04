Package.describe({
  name: "deanius:new-package",
  summary: "Description of package amazingness",
  version: "0.1.0",
  git: "https://github.com/chicagogrooves/meteor-new-package"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "ddp", "jquery"]);
  
  api.addFiles("shared/index.js", ["client", "server"]);

  api.export("log");
});


Npm.depends({
  "bluebird": "2.9.27"
});



  
    
    
    Package.onTest(function (api) {
  api.use("tinytest");
  api.use("deanius:new-package");
  
  api.addFiles("tests/shared/index.js", ["client", "server"]);

});    
  
  