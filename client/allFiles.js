Template['package-kitchen-allFiles'].helpers({
  isMarkdown : function () {
    return this.path.match(/\.md$/);
  },
  allFilesRendered: function () {
    return ViewModel.byId("packageModel") && ViewModel.byId("packageModel").allFilesRendered();
  }
});
