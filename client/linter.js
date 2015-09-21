logObj = function (obj) { console.log(JSON.stringify(obj, null, 2)); return logObj; }
window.LintErrors = new Mongo.Collection();

Template["package-kitchen-linter"].events({
  'click #lintIt' : function () {
      LintErrors.remove({});
      var packageJsCode = $("#packageJsToLint").val();
      Meteor.promise("okgrow:package-linter#getPackageModel", packageJsCode)
        .then(function(model){ window.packageModel = model; logObj(model)});

      Meteor.promise("okgrow:package-linter#getLintErrors", packageJsCode)
        .then(function (errs) {
          if(errs.length === 0)
            LintErrors.insert({error: "No errors detected!"})
          else
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
