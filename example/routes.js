Router.route("/", function () {
  this.render("package-kitchen-kitchen", {});
});
Router.route("/linter", function () {
  this.render("package-kitchen-linter", {});
});
