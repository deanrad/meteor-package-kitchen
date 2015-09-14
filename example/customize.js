if (Meteor.isClient){
  Template['package-kitchen-kitchen'].onRendered(function () {
    if (document.location.hostname==="package-kitchen.meteor.com") {
      $(".saveToApp").hide()
    }
  });
}
