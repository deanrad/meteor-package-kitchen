//TODO allow changes to this model through a GUI
var packageModel = new worksheet({
  publisher: {
    atmosphere: {
      name: "deanius"
    },
    github: {
      name: "chicagogrooves"
    }
  },

  package: {
    name: "new-package",
    summary: "Description of package amazingness.",
    version: "0.1.0",
  },

  atmosphereName: function () {
    return this.publisher.atmosphere.name + ":" + this.package.name;
  },

  gitPath: function () {
    return "https://github.com/" + this.publisher.github.name + "/meteor-" + this.package.name;
  },

  "export": "log",

  // client, server, or shared
  packageType: "shared",

  packageDeps: '["tracker", "meteor", "ddp", "ejson"]',

  // falsy or tinytest, eventually mocha, etc..
  testFramework: "tinytest",

  // the code we want in our package
  code: "/*global log*/\nlog = console.log.bind(console);",

  // the test code to start us off with
  testCode: function () {
      return "Tinytest.add(\"" + this.atmosphereName + "\", function (test) {\n  test.equal(true, true);\n});";
  },

  apiFiles: function () {
    var folder = (this.packageType==="shared") ? "lib" : this.packageType;
    return [{
      path: folder + "/index.js",
      where: whereArray(this.packageType),
      template: Template.code
    }]
  },

  testFiles: function () {
    if (! this.testFramework ) return [];
    return [{
      path: 'tests/index.js',
      where: whereArray(this.packageType),
      template: Template.testCode
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
    ].concat(this.apiFiles).concat(this.testFiles);
  },

});

function whereArray (packageType) {
  if (packageType==="shared")
    return '["client", "server"]';
  else if (packageType==="client")
    return '["client"]';
  else if (packageType==="server")
    return '["server"]';
}


this.packageModel = packageModel;
