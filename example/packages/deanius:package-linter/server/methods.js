var localeval = Npm.require('localeval');

//We do this server side since we haven't found a better sandboxed eval (sandbox, shovel, etc..)
Meteor.methods({
  getPackageModel: function (packageJsCodeHopefully) {
    check(packageJsCodeHopefully, String);
    console.log("determining package model from:\n", packageJsCodeHopefully);
    return new PackageModel(packageJsCodeHopefully);
  },
  getLintErrors: function (packageJsCodeHopefully) {
    console.log(packageJsCodeHopefully)
    check(packageJsCodeHopefully, String);
    var packageModel = new PackageModel(packageJsCodeHopefully);
    return PackageLinter.getLintErrors(packageModel);
  }
});
