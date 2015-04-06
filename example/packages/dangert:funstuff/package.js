Package.describe({
  name: "dangert:funstuff",
  summary: "makes Mondays fun",
  version: "0.1.0",
  git: "https://github.com/opus1no2/meteor-funstuff"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["tracker", "meteor", "ddp", "ejson"]);
  
  api.addFiles("shared/index.js", ["client", "server"]);

  api.export("funstuff");
});



  
    
    
  