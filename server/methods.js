var fs = Npm.require('fs');

Meteor.methods({
  "deanius:package-kitchen#saveToApp" : function (packageName, allFilesRendered) {
    console.log(allFilesRendered);
    // check - array of {path, contents}

    var zip = zipFiles(allFilesRendered);
    var content = zip.generate({type:"uint8array"});

    //unzip to local packages dir - must mkdirp ?
    var createReadStream = Npm.require('streamifier');
    // var streamOfZip = createReadStream(undefined);
    //
    // streamOfZip.pipe(unzip.Extract({
    //   path: process.env.PWD + '/packages/' + packageName
    // }));

    //effectively, call "meteor add"
    fs.appendFileSync(process.env.PWD+'/.meteor/packages', packageName+"\n");

    //note: we hope not to get screwed by-an auto-reload breaking us up..
  }
})

function zipFiles (allFilesRendered) {
  return allFilesRendered.reduce(function (zip, file) {
    zip.file(file.path, file.contents);
    return zip;
  }, new JSZip());
}
