var _npmVersions = new ReactiveDict("npmVersions");

packageModel = {
  atmosphereName: "deanius",
  githubName: "chicagogrooves",
  packageName: "new-package",
  version: "0.1.0",
  demoUrl: "",

  summary: "Description of package amazingness",
  "export": "log",

  packageType: "shared", // client, server, or shared
  packageDeps: ["meteor", "ddp"],
  npmDepsString: "", // comma-separated
  npmDeps: function () {
    if(this.npmDepsString()==="") return [];
    return this.npmDepsString().split(/\s*,\s*/);
  },

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

  npmVersions: function () {
    if(this.npmDeps().length === 0) return null;
    if( Object.keys(_npmVersions.keys).length > 0) return _npmVersions;

    this.npmDeps().map(function (name) {
      _npmVersions.set(name, "latest");
    });
    return _npmVersions;
  },

  npmDependencies: function () {
    var self = this;
    if(self.npmDeps().length === 0) return null;

    var npmBlock = self.npmDeps().reduce(function (all, name){
      var version = self.npmVersions().get(name);
      all[name] = version;
      return all;
    }, {});

    self.npmDeps().map(function (name){
      Meteor.promise("deanius:package-kitchen#latest-version", name).then(function (version){
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
      contents: this.code(),
      template: Template.code
    }]
  },

  testFiles: function () {
    if (! this.testFramework() ) return [];
    return [{
      path: "tests/" + this.packageType() + "/index.js",
      where: this.fileLocation(),
      contents: this.testCode(),
      template: Template.code
    }];
  },

  allFiles: function () {
    return [
      {
        path: "README.md",
        template: Template.readme
      },
      {
        path: "package.js",
        template: Template.packageJs
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
  }
};

Template["package-kitchen-editor"].viewmodel("packageModel", packageModel);
