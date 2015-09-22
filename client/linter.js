logObj = function (obj) { console.log(JSON.stringify(obj, null, 2)); return logObj; }
window.LintErrors = new Mongo.Collection();

Template["package-kitchen-linter"].events({
  'click #lintIt' : function (e) {
      e.preventDefault();
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
  },
  'click #fixIt': function () {
    // set content of modal
    var packageJsCode = $("#packageJsToLint").val();
    var lintErrors = LintErrors.find().fetch();
    var replacements22 = lintErrors
      .filter(function (err) { return (err.code === "2.2")})
      .map(function (err){
        return [err.offender + "@" + err.details.oldVersion,
                err.details.newName + "@" + err.details.newVersion];
      });
    var replacements23 = lintErrors
      .filter(function (err) { return (err.code === "2.3")})
      .map(function (err){
        return [err.offender + "@" + err.details.current,
                err.offender + "@" + err.details.latest];
      });

    //important - update 2.2 - the deprecations first !!
    var replacements = [].concat(replacements22, replacements23);
    replacements.forEach(function (replaceArgs) {
      packageJsCode = "".replace.apply(packageJsCode, replaceArgs);
    })
    $("#packageJSFixedCode").val(packageJsCode);
  }
});

Template["package-kitchen-linter"].helpers({
  lintErrors: function () {
    return LintErrors.find();
  },
  details: function () {
    return JSON.stringify(this.details);
  }
});
