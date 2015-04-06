//try this renaming out
var Recipe = worksheet;

//TODO allow changes to this model through a GUI, separate user parts
var packageModel = new Recipe({
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

  "export": "log",

  // client, server, or shared
  packageType: "shared",

  packageDeps: '["tracker", "meteor", "ddp", "ejson"]',

  // falsy or tinytest, eventually mocha, etc..
  testFramework: "tinytest",

  // the code we want in our package, any variables to be exported defined w/o var
  code: "/* global log:true */\nlog = console.log.bind(console);",

  atmosphereName: function () {
    return this.publisher.atmosphere.name + ":" + this.package.name;
  },

  gitPath: function () {
    return "https://github.com/" + this.publisher.github.name + "/meteor-" + this.package.name;
  },

  // the test code to start us off with
  testCode: function () {
      if(this.testFramework == "tinytest")
        return "Tinytest.add(\"" + this.atmosphereName + "\", function (test) {\n  test.equal(true, true);\n});";
      if(this.testFramework == "mocha")
        return "describe('" + this.atmosphereName + "', function () {\n  it('should be awesome', function (done) {\n    assert.equal(1,2);\n  });\n});"
  },

  fileLocation: function () {
    if (this.packageType==="shared")
      return '["client", "server"]';
    else if (this.packageType==="client")
      return '["client"]';
    else if (this.packageType==="server")
      return '["server"]';
  },

  apiFiles: function () {
    return [{
      path: this.packageType + "/index.js",
      where: this.fileLocation,
      contents: this.code,
      template: Template.code
    }]
  },

  testFiles: function () {
    if (! this.testFramework ) return [];
    return [{
      path: 'tests/' + this.packageType + '/index.js',
      where: this.fileLocation,
      contents: this.testCode,
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
    .concat(this.apiFiles)
    .concat(this.testFiles);
  },

  allFilesRendered: function () {
    return this.allFiles.map(function (file) {
      return {
        path: file.path,
        contents: file.contents || Blaze.toHTMLWithData(file.template, packageModel)
      };
    });
  }
});


this.packageModel = packageModel;
