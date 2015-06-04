Template.kitchen.events({
  "click .download" : zipPackage,
  "click .saveToApp" : function (e) {
    var packageModel = ViewModel.byId("packageModel");
    Meteor.promise(
      "deanius:package-kitchen#saveToApp",
      packageModel.fullPackageName(), packageModel.allFilesRendered()
    ).then(
      function(){ alert("Your package has been created. App will now reload.") },
      function(err){ alert(err.reason); }
    );
  }
});

Template.allFiles.helpers({
  isMarkdown : function () {
    return this.path.match(/\.md$/);
  },
  allFilesRendered: function () {
    return ViewModel.byId("packageModel") && ViewModel.byId("packageModel").allFilesRendered();
  }

});
