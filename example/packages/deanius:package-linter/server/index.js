var localeval = Npm.require('localeval');

//TODO fully mock out as in https://gist.github.com/deanius/d3f18b07454cd8416417
Meteor.methods({
  getPackageModel: function (packageJsCodeHopefully) {
    check(packageJsCodeHopefully, String);
    console.log("determining package model from:\n", packageJsCodeHopefully);

    var packageModel = {
      description: {},
      versionsFrom: null,
      uses: [],
      implies: []
    };

    var mockApi = {
      use: function () {
        packageModel.uses.push([].slice.call(arguments));
      },
      versionsFrom: function(versionsFrom) {
        packageModel.versionsFrom = versionsFrom;
      }
    };

    var env = {
      Package: {
        describe: function (x) {
          packageModel.description = x;
        },
        onUse: function (definitionFn) {
          definitionFn.call({}, mockApi);
        },
        getModel: function () {
          return packageModel;
        }
    }};

    var result = localeval(packageJsCodeHopefully + '; Package.getModel()', env);
    try{
      localeval.clear();
    } catch(err) {
      if (err.toString()!="TypeError: Cannot call method 'kill' of undefined")
        console.log(err);
    }
    return result;
  }
});

/* How to Manually Test:
log=console.log.bind(console);
var pjs = `Package.describe({
  name: "deanius:sandbox",
  summary: "Description of package amazingness",
  version: "0.1.0",
  git: "https://github.com/deanius/meteor-sandbox"
});
Package.onUse(function(api) {
  // Meteor releases below this version are not supported
  api.versionsFrom("1.1.0.3");

  // Core packages and 3rd party packages
  api.use("ddp");
})`;

Meteor.promise("getPackageModel", pjs).then(r => log(JSON.stringify(r, null, 2)));
{
  "description": {
    "name": "deanius:sandbox",
    "summary": "Description of package amazingness",
    "version": "0.1.0",
    "git": "https://github.com/deanius/meteor-sandbox"
  },
  "versionsFrom": "1.1.0.3",
  "uses": [
    [
      "ddp"
    ]
  ],
  "implies": []
}
 */
