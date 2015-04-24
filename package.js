Package.describe({
 name: "deanius:package-kitchen",
 summary: "Easy bootstrapping of Meteor packages, demo at: http://package-kitchen.meteor.com",
 version: "1.1.2",
 git: "https://github.com/chicagogrooves/meteor-package-kitchen",
 debugOnly: true
});

Npm.depends({
  "mkdirp": "0.5.0"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.2");
  api.use(["meteor", "spacebars", "templating", "underscore"]);
  api.use("iron:router@1.0.0");
  api.use("deanius:worksheet@1.0.0");
  api.use("deanius:promise@2.0.4");
  api.use("mrt:session-amplify@0.1.0");
  // use it, and make its exports available in the app that includes us
  api.imply("perak:markdown@1.0.4");

  api.addFiles("server/methods.js", ["server"]);
  api.addFiles("client/jszip.js", ["client"]);
  api.addFiles("client/templates/code.html", ["client"]);
  api.addFiles("client/templates/mocha.html", ["client"]);
  api.addFiles("client/templates/packageJs.html", ["client"]);
  api.addFiles("client/templates/readme.html", ["client"]);
  api.addFiles("client/templates/travis.html", ["client"]);
  api.addFiles("client/templates/tinytest.html", ["client"]);
  api.addFiles("client/allFiles.html", ["client"]);
  api.addFiles("client/flair.html", ["client"]);
  api.addFiles("client/kitchen.html", ["client"]);
  api.addFiles("client/package.html", ["client"]);
  api.addFiles("client/packageModel.js", ["client"]);
  api.addFiles("client/routes.js", ["client"])
  api.addFiles("client/zip.js", ["client"]);
  api.addFiles("client/helpers.js", ["client"]);

  // we don't actually need to export, globals will leak!!
  //api.exports("packageModel");
});
