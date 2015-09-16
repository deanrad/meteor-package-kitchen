Template['package-kitchen-kitchen'].events({
  "click .saveToApp" : function (e) {
    analytics.track("Download Package", {
      packageName: packageViewModel.fullPackageName()
    });
  }
});
