Template['package-kitchen-kitchen'].events({
  "click .download" : function (e) {
    analytics.track("Download Package", {
      packageName: packageViewModel.fullPackageName()
    });
  }
});
