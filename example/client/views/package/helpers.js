var updatePackage = _.debounce(_updatePackage, 50);

Template.package.events({
  "click .savePackage" : updatePackage,
  "change input[type=radio]": updatePackage,
  "keyup input" : updatePackage,
  "keyup textarea" : updatePackage,
  "keyup #code" : suggestExports
});

Template.package.onRendered(function () {
  $("[name=atmosphereName]").val(SessionAmplify.get("atmosphereName"));
  $("[name=githubName]").val(SessionAmplify.get("githubName"));
  $("[name=packageName]").val(SessionAmplify.get("packageName"));
  $("[name=summary]").val(SessionAmplify.get("summary") || packageModel.summary);
  $("[name=code]").val(SessionAmplify.get("code") || packageModel.code);
  $("[name=export]").val(SessionAmplify.get("export") || packageModel.export);
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
    SessionAmplify.set("packageName", $("[name=packageName]").val());
    SessionAmplify.set("summary", $("[name=summary]").val());
    SessionAmplify.set("code", $("[name=code]").val());
  });

  packageModel.atmosphereName = $("[name=atmosphereName]").val();
  packageModel.githubName = $("[name=githubName]").val();
  packageModel.packageName = $("input[name=packageName]").val();

  packageModel.summary = $("input[name=summary]").val(),
  packageModel.code = $("[name=code]").val();
  packageModel.export = $("[name=export]").val();

  packageModel.packageType = $("input:checked[name=packageType]").val();
  packageModel.testFramework = $("input:checked[name=testFramework]").val();
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
