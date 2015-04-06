zipPackage = function () {
  console.log("zipping package");
  var zipContent, zip = new JSZip();

  packageModel.allFilesRendered.forEach(function (file) {
    zip.file(file.path, file.contents);
  });

  // zipContent = zip.generate({
  //   type : (JSZip.support.uint8array) ? "uint8array" : "string"
  // });

  window.location = "data:application/zip;base64," + zip.generate({type:"base64"});

}
