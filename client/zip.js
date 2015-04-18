zipPackage = function () {
  console.log("zipping package");
  var zipContent, zip = new JSZip();

  packageModel.allFilesRendered.forEach(function (file) {
    zip.file(file.path, file.contents);
  });

  window.location = "data:application/zip;base64," + zip.generate({type:"base64"});
}
