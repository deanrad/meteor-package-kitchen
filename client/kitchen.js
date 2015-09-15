Template['package-kitchen-kitchen'].events({
  "click .download" : zipPackage,
  "click .saveToApp" : function (e) {
    Meteor.promise(
      "deanius:package-kitchen#saveToApp",
      packageViewModel.fullPackageName(),
      packageViewModel.allFilesRendered()
    ).then(
      function(){ alert("Your package has been created. App will now reload.") },
      function(err){ alert(err.reason); }
    );
  }
});
