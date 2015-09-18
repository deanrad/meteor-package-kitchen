Template['package-kitchen-editor'].events({
  'click .deleteDep': function (e, t) {
    var packageName  = e.target.attributes['data-package-name'].value;
    var packages = packageViewModel.packageDeps();
    var delIdx = packages.indexOf(packageName);
    if(delIdx > -1) packages.splice(delIdx, 1);
  }
})

Template['package-kitchen-editor'].helpers({
  packagesWithVersions: function () {
    //this helper will be called at least once before our VM, or its global variable are defined
    return (ViewModel.byId("packageModel") && ViewModel.byId("packageModel").packageDeps()) || [];
  }
})

Template['package-kitchen-editor'].onRendered( function () {
  $("#addNewPackageDep").on('submit', function (e) {
    e.preventDefault();
    var $pkg = $("input[name=addNewPackageDep]");
    var packageName = $pkg.val();
    packageViewModel.packageDeps().push(packageName);
    $pkg.val('');
  });
});

// because exports aren't exported with debugOnly package
Template['package-kitchen-editor'].onRendered(function(){
  window.packageModel = packageModel;
  window.packageViewModel = ViewModel.byId("packageModel");
})