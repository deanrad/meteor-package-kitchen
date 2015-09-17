logObj = function (obj) { console.log(JSON.stringify(obj, null, 2))}
window.LintErrors = new Mongo.Collection();

Template["package-kitchen-linter"].events({
  'click #lintIt' : function () {
      var packageJsCode = $("#packageJsToLint").val();
      Meteor.promise("getPackageModel", packageJsCode).then(logObj);

      Meteor.promise("getLintErrors", packageJsCode)
        .then(function (errs) {
          errs.forEach( function(e){ LintErrors.insert(e); });
        })
        .then(logObj)
  }
});

Template["package-kitchen-linter"].helpers({
  lintErrors: function () {
    return LintErrors.find();
  }
});
