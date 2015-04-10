Package.describe({
 name: "deanius:package-kitchen",
 summary: "Source for http://package-kitchen.meteor.com - not for installation",
 version: "1.0.1",
 git: "https://github.com/chicagogrooves/meteor-package-kitchen",
 debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.2");
  api.use(["meteor"]);
});
