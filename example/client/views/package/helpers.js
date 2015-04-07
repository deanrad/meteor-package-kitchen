var updatePackage = _.debounce(_updatePackage, 50);

Template.package.events({
  "click .savePackage" : updatePackage,
  "keyup input" : updatePackage,
  "keyup textarea" : updatePackage,
  "keyup #code" : suggestExports
});

Template.package.onRendered(function () {
  $("[name=atmosphereName]").val( SessionAmplify.get("atmosphereName"));
  $("[name=githubName]").val( SessionAmplify.get("githubName"));
  $("[name=code]").val(packageModel.code);
  $("[name=export]").val(packageModel.export);
});

Template.allFiles.events({
  "click .download" : function (e) {
    zipPackage()
  }
});

function _updatePackage () {
  Meteor.defer(function () {
    SessionAmplify.set("atmosphereName", $("[name=atmosphereName]").val());
    SessionAmplify.set("githubName", $("[name=githubName]").val());
  });

  packageModel.atmosphereName = $("[name=atmosphereName]").val();
  packageModel.githubName = $("[name=githubName]").val();
  packageModel.packageName = $("input[name=packageName]").val();

  packageModel.summary = $("input[name=summary]").val(),
  packageModel.export = $("[name=export]").val();
  packageModel.packageType = $("input:checked[name=scope]").val();

  packageModel.testFramework = $("input:checked[name=testFramework]").val();
  packageModel.code = $("[name=code]").val();
}

function suggestExports (e) {
  if (!$("[name=code]").val()){
    $("[name=export]").val("");
    return;
  }
  //if (!$("[name=export]").val()) {
  $("[name=export]").val(packageModel.exportSuggestion);
  //}
}
