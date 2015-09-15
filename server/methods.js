var fs = Npm.require('fs');
var path = Npm.require('path');
var mkdirp = Meteor.wrapAsync(Npm.require('mkdirp'));
var latestVersion = Meteor.wrapAsync(Npm.require("latest-version"));

DDPClient = Npm.require('ddp');

Meteor.methods({
  "deanius:package-kitchen#saveToApp" : function (packageName, allFilesRendered) {
    check(packageName, String);
    check(allFilesRendered, [Match.ObjectIncluding({path: String, contents: String})]);

    // check - array of {path, contents}
    // check - make sure folder doesn't exist, or warn


    var packageFolder = path.join(process.env.PWD, 'packages', packageName);

    if (fs.existsSync(packageFolder) ||
        fs.readFileSync(process.env.PWD+'/.meteor/packages', {encoding:'utf8'}).match(packageName)
    ) {
      throw new Meteor.Error("packageExists", "Refusing to overwrite existing package " + packageName);
    }

    //LEFTOFF - dont add package to .meteor/packages if it exists, either

    // make directories, files
    _.each(allFilesRendered, function (fileSpec) {
      var fileContents = fileSpec.contents,
          filePath = fileSpec.path,
          fullFilePath = path.join(packageFolder, filePath);

      mkdirp(path.dirname(fullFilePath));
      fs.writeFileSync(fullFilePath, fileContents);
    });

    console.log('deanius:package-kitchen - wrote out packge files');

    //effectively, call "meteor add"
    fs.appendFileSync(process.env.PWD+'/.meteor/packages', packageName+"\n");

    console.log('deanius:package-kitchen - finished package generation and registration');
    //note: we hope not to get screwed by-an auto-reload breaking us up..
  },

  "deanius:package-kitchen#latest-version": function (name) {
    check(name, String);
    try{
      return latestVersion(name);
    } catch (ex) {
      return undefined;
    }
  },

  "deanius:package-kitchen#latest-meteor-version": function (name) {
    check(name, String);

    var ddpclient = new DDPClient({url: 'wss://atmospherejs.com/websocket'});
    var connected = new Promise(function(resolve) {
      ddpclient.connect(function(error) {
        if (error) throw error;
        console.log('DDP connected.');
        resolve(ddpclient);
      });
    });

    var result = connected
      .then(function (ddpclient) {
        return new Promise(function (resolve, reject) {
          ddpclient.subscribe('package', [name], function () {
            console.log("package query ready for " + name + ".")
            var allPackages = ddpclient.collections.packages;
            if( ! allPackages ) {
              reject(name)
            } else {
              var thePackage = _.values(ddpclient.collections.packages).filter(function (p){
                return p.name === name;
              })[0];
              resolve(thePackage && thePackage.latestVersion.version);
            }
          })
        })
      })
      .then(function(version){
        console.log('DDP closed.');
        ddpclient.close();
        return version;
      })
      .catch(function (err) {
        console.log("Package Lookup Error:", err);
      });

    return Promise.await(result);
  }


});
