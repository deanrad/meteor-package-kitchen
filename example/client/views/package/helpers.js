Template.allFiles.helpers({
  contents: function () {
    return Blaze.toHTMLWithData(this.template, packageModel);
  }
})
