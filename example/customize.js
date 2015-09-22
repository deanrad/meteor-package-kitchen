if (Meteor.isClient){
  Template['package-kitchen-kitchen'].onRendered(function hideSaveToApp () {
    if (document.location.hostname==="package-kitchen.meteor.com") {
      $(".saveToApp").hide()
    }
  });
  Template['package-kitchen-editor'].onRendered(function getValuesFromSession () {
    //XXX TODO getValuesFromSession
  });
  // Template['package-kitchen-editor'].onRendered(function(){
  //     window.packageViewModel = ViewModel.byId("packageModel");
  // });
}
