var _npmVersions = new ReactiveDict("npmVersions");
var _meteorVersions = new ReactiveDict("meteorVersions");

packageModel = {
  atmosphereName: "deanius",
  githubName: "deanius",
  packageName: "new-package",
  version: "0.1.0",
  demoUrl: "",

  summary: "Description of package amazingness",
  "export": "log",

  packageType: "shared", // client, server, or shared
  meteorDepNames: ["ddp", "tracker"],
  meteorDepNamesWithVersions: function () {
    var self = this;

    return self.meteorDepNames().map(function(name){
      var versionByName = _meteorVersions.get(name);

      return versionByName ? name + "@" + versionByName : name;
    });
  },
  meteorVersion: "1.2.0.1",
  npmDepsString: "", // comma-separated

  testFramework: "tinytest", // tinytest, mocha, ""
  code: "/* global log:true */\nlog = console.log.bind(console);",

  fullPackageName: function () {
    return this.atmosphereName() + ":" + this.packageName();
  },

  gitProject: function () {
    return this.githubName() + "/meteor-" + this.packageName();
  },

  gitPath: function () {
    return "https://github.com/" + this.gitProject();
  },

  npmDepNames: function () {
    if(this.npmDepsString()==="") return [];
    return this.npmDepsString().split(/\s*,\s*/);
  },

  npmVersions: function () {
    if(this.npmDepNames().length === 0) return null;
    if( Object.keys(_npmVersions.keys).length > 0) return _npmVersions;

    this.npmDepNames().forEach(function (name) {
      _npmVersions.set(name, "latest");
    });
    return _npmVersions;
  },

  npmDependencies: function () {
    var self = this;
    if(self.npmDepNames().length === 0) return null;

    var npmBlock = self.npmDepNames().reduce(function (all, name){
      var version = self.npmVersions().get(name);
      all[name] = version;
      return all;
    }, {});

    self.npmDepNames().forEach(function (name){
      Meteor.promise("okgrow:package-linter#latestNpmVersionOfPackage", name).then(function (version){
        if (!version) return;
        _npmVersions.set(name, version);
      })
    });
    return JSON.stringify(npmBlock, null, 2);
  },

  travisBadgeMarkdown: function () {
    return "[![Build Status](https://secure.travis-ci.org/" +
      this.gitProject() +
      ".png?branch=master)](https://travis-ci.org/" +
      this.gitProject() + ")"
  },

  // the test code to start us off with
  testCode: function () {
      if(this.testFramework() == "tinytest")
        return "Tinytest.add(\"" + this.packageName() + "\", function (test) {\n  test.equal(true, true);\n});";
      if(this.testFramework() == "mocha")
        return "describe(\"" + this.packageName() + "\", function () {\n  it(\"should be awesome\", function (done) {\n    assert.equal(1,2);\n  });\n});"
  },

  onTestCode: function () {
    var onTestCode;
    if(! this.testFramework() ) return "\n";

    if(this.testFramework() === "tinytest"){
      onTestCode = 'Package.onTest(function (api) {\n' +
        '  api.use("tinytest");\n';
    }
    if(this.testFramework() === "mocha"){
      onTestCode = 'Package.onTest(function (api) {\n' +
        '  api.use(["mike:mocha-package", "practicalmeteor:chai"]);\n';
    }
    onTestCode +=  '  api.use("' + this.fullPackageName() + '");\n';

    this.testFiles().forEach(function(testFile){
      onTestCode += '  api.addFiles("' + testFile.path + '", ' + testFile.where + ');';
    });
    return onTestCode + "\n});";
  },

  fileLocation: function () {
    if (this.packageType() ==="shared")
      return '["client", "server"]';
    else if (this.packageType() ==="client")
      return '["client"]';
    else if (this.packageType() ==="server")
      return '["server"]';
  },

  apiFiles: function () {
    return [{
      path: this.packageType() + "/index.js",
      where: this.fileLocation(),
      contents: this.code()
    }]
  },

  testFiles: function () {
    if (! this.testFramework() ) return [];
    return [{
      path: "tests/" + this.packageType() + "/index.js",
      where: this.fileLocation(),
      contents: this.testCode()
    }];
  },

  allFiles: function () {
    return [
      {
        path: "package.js",
        template: Template.packageJs
      },
      {
        path: "README.md",
        template: Template.readme
      }
    ]
    .concat(this.apiFiles())
    .concat(this.testFiles())
    .concat([
      {
        path: ".travis.yml",
        template: Template.travis
      }
    ]);
  },

  allFilesRendered: function () {
    var self = this;
    return self.allFiles().map(function (file) {
      return {
        path: file.path,
        contents: file.contents || Blaze.toHTMLWithData(file.template, self)
      };
    });
  },

  exportSuggestion: function () {
    var match = this.code().match(/^(\w+)\s?=/m);
    return match ? match[1] : "";
  },

  autorun: function () {
    var self = this;
    self.meteorDepNames().list().forEach(function (name){
      if (name.indexOf(":") === -1) return;


      savedName = _meteorVersions.get(name);
      if( !savedName || savedName===""){
        _meteorVersions.set(name, "");
        Meteor.promise("okgrow:package-linter#latestMeteorVersionOfPackage", name)
          .then(function (version){
            _meteorVersions.set(name, version);
          });
      }});
  },

  clearVersions: function () {
    for (var key in _meteorVersions.keys){
      _meteorVersions.set(key, undefined)
    }
    for (var key in _npmVersions.keys){
      _npmVersions.set(key, undefined)
    }
  }
};

Template["package-kitchen-editor"].viewmodel("packageModel", packageModel);
window.packageModel = packageModel;
