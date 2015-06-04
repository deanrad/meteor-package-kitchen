Template.kitchen.events({
  "click .download" : zipPackage,
  "click .saveToApp" : function (e) {
    alert("Save to App only works when deanius:package-kitchen is a dependency of your application. Do meteor add deanius:package-kitchen, go to '/kitchen', and then try Save To App again.")
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
