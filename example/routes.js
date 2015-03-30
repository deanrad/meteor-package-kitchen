if (Meteor.isClient) {
  Router.route("package", {
    path: "/",
    data: packageModel
  })
}
