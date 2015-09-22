Template['package-kitchen-editor'].events({
  'click .deleteDep': function (e, t) {
    var packageName  = e.target.attributes['data-package-name'].value;
    var names = packageViewModel.meteorDepNames();
    var delIdx = names.indexOf(packageName);
    if(delIdx > -1) names.splice(delIdx, 1);
  }
})

Template['package-kitchen-editor'].helpers({
  packagesWithVersions: function () {
    //this helper will be called at least once before our VM, or its global variable are defined
    return (ViewModel.byId("packageModel") && ViewModel.byId("packageModel").meteorDepNames()) || [];
  }
})

function exposeVars () {
  window.packageModel = packageModel;
  window.packageViewModel = ViewModel.byId("packageModel");
}

function activateButtons () {
  $('.btnNext').click(function(){
    $('.tab-content > .active').next('li').find('a').trigger('click');
  });
}

function detectNewMeteorPackage () {
  function submitMeteorDepName (e) {
    e.preventDefault();
    var $pkg = $("input[name=addNewPackageDep]");
    var packageName = $pkg.val();
    packageViewModel.meteorDepNames().push(packageName);
    $pkg.val('');
  }
  $("#submitMeteorDepName").on('click', submitMeteorDepName)
  $("#addNewPackageDep").on('submit', submitMeteorDepName);
}

[exposeVars, detectNewMeteorPackage,
  activateButtons].forEach(function (fn) {
  Template['package-kitchen-editor'].onRendered(fn);
})
