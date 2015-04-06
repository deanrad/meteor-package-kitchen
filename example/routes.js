if (Meteor.isClient) {
  Router.route("layout", {
    path: "/",
    data: packageModel
  })
}
