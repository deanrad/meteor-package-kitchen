var fs = Npm.require('fs');
var path = Npm.require('path');
var mkdirp = Meteor.wrapAsync(Npm.require('mkdirp'));

Meteor.methods({
  "deanius:package-kitchen#saveToApp" : function (packageName, allFilesRendered) {
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
  }
})
