UI.registerHelper('equals', function(a, b) {
  return a == b; // == intentional
});

Template.allFiles.helpers({
  contents: function () {
    return Blaze.toHTMLWithData(this.template, packageModel);
  },
  isMarkdown: function () {
    return this.path.match(/.md$/);
  }
})

Template.package.events({
  "click .savePackage" : updatePackage,
  "click a.download" : function (e) {
    zipPackage()
  }
})

function updatePackage () {
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

  packageModel.code = $("#code").val();
  packageModel.export = $("[name=export]").val();
}
