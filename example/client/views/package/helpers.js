var updatePackage = _.debounce(_updatePackage, 100);

Template.package.events({
  "click .savePackage" : updatePackage,
  "change input" : updatePackage,
  "keyup input" : updatePackage
});
Template.allFiles.events({
  "click .download" : function (e) {
    zipPackage()
  }
});
Template.package.onRendered(function () {
  //Tracker.autorun(function () {
    $("[name=atmosphereName]").val( SessionAmplify.get("atmosphereName"));
    $("[name=githubName]").val( SessionAmplify.get("githubName"));
  //});
});


function _updatePackage () {
  Meteor.defer(function () {
    SessionAmplify.set("atmosphereName", $("[name=atmosphereName]").val());
    SessionAmplify.set("githubName", $("[name=githubName]").val());
  });

  packageModel.publisher = {
    atmosphere: {
      name: $("[name=atmosphereName]").val()
    },
    github: {
      name: $("[name=githubName]").val()
    }
  };

  packageModel.testFramework = $("input:checked[name=test]").val();

  packageModel.package = {
    name: $("input[name=packageName]").val(),
    summary: $("input[name=summary]").val(),
    version: "0.1.0"
  };

  packageModel.packageType = $("input:checked[name=scope]").val();
  packageModel.code = $("#code").val();
  packageModel.export = $("[name=export]").val();
}
