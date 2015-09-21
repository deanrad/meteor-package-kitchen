logObj = function (obj) { console.log(JSON.stringify(obj, null, 2)); return logObj; }
window.LintErrors = new Mongo.Collection();

Template["package-kitchen-linter"].events({
  'click #lintIt' : function () {
      LintErrors.remove({});
      var packageJsCode = $("#packageJsToLint").val();
      Meteor.promise("getPackageModel", packageJsCode)
        .then(function(model){ window.packageModel = model; logObj(model)});
        
      Meteor.promise("getLintErrors", packageJsCode)
        .then(function (errs) {
          errs.forEach(function (err) { LintErrors.insert(err); });
        })
        .then(logObj)
  }
});

Template["package-kitchen-linter"].helpers({
  lintErrors: function () {
    return LintErrors.find();
  }
});
